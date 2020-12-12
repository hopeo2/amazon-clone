import { parseRequestUrl, rerender } from "../utils";
import { getProduct } from "../api";
import { getCartItems, setCartItems } from "../localStorage";

const addToCart = (item, forceUpdate = false) => {
    let cartItems = getCartItems();
    const existItem = cartItems.find((x) => x.product === item.product);
    if (existItem) {
      if(forceUpdate){
        cartItems = cartItems.map((x) =>
        x.product === existItem.product ? item : x
      )
      }
    } else {
      cartItems = [...cartItems, item];
    }
    setCartItems(cartItems);
    if(forceUpdate){
      rerender(CartScreen)
    }
};

const removeFromCart = (id) => {
  setCartItems(getCartItems().filter((x) => x.product !== id))
  if(id === parseRequestUrl().id){
    document.location.hash = '/cart'
  } else {
    rerender(CartScreen)
  }
}


const CartScreen = {
    after_render: () => {
      const qtySelects = document.getElementsByClassName('qty-select')
      Array.from(qtySelects).forEach(qtySelect => {
        qtySelect.addEventListener('change', (e) => {
          const item = getCartItems().find(x => x.product === qtySelect.id)
          addToCart({...item, qty: Number(e.target.value)}, true)
        })
      })
      const deletButton = document.getElementsByClassName('delete-button')
      Array.from(deletButton).forEach((deletButton) => {
        deletButton.addEventListener('click', function(){
          removeFromCart(deletButton.id)
        })
      })
      document.getElementById('checkout-button').addEventListener('click', () => {
        document.location.hash = '/shipping'
      })
    },
    render: async () => {
      const request = parseRequestUrl();
      if (request.id) {
        const product = await getProduct(request.id);
        addToCart({
          product: product._id,
          name: product.name,
          image: product.image,
          price: product.price,
          countInStock: product.countInStock,
          qty: 1,
        });
      }
      const cartItems = getCartItems();
      return `
      <div class="card">
      <div class="cart-list">
        <ul class="cart-list-container">
          <li>
            <h3 class="text-primary">Shopping Cart</h3>
            <div class="text-warning">Price</div>
          </li>
          ${
            cartItems.length === 0
              ? '<div>Cart is empty. <a href="/#/">Go Shopping</a>'
              : cartItems
                  .map(
                    (item) => `
            <li>
              <div class="cart-image">
                <img src="${item.image}" alt="${item.name}" />
              </div>
              <div class="cart-name">
                <div>
                  <a href="/#/product/${item.product}">
                    ${item.name}
                  </a>
                </div>
                <div>
                  Qty: 
                  <select style="width: 20%;" class="qty-select custom-select" id="${item.product}">
                    ${[...Array(item.countInStock).keys()].map(x => 
                      item.qty === x + 1 ? `<option selected value=${x + 1}>${x + 1}</option>` :
                      `<option value=${x + 1}>${x + 1}</option>`
                    )}
                  </select>
                  <button type="button" class="delete-button btn btn-danger" id="${item.product}">
                    Delete
                  </button>
                </div>
              </div>
              <div class="cart-price text-success">
                $${item.price}
              </div>
            </li>
            `
                  )
                  .join('\n')
          } 
        </ul>
      </div>
    </div>
    
    <div class="card">
          <div class="cart-action">
          <h3>
            Total (${cartItems.reduce((a, c) => a + c.qty, 0)} items)
            :
            <span class="text-success" >$${cartItems.reduce((a, c) => a + c.price * c.qty, 0)} </span>
          </h3>
          <button id="checkout-button" class="fw btn btn-primary">
            Proceed to Checkout
          </button>
    </div>
    </div>
      `;
    },
};

export default CartScreen;