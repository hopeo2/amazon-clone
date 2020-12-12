import { createorder } from "../api";
import CheckoutSteps from "../components/checkoutSteps";
import { hideLoading, showLoading, showMessage } from "../utils";

const { getCartItems, getshipping, getpayment, cleanCart } = require("../localStorage");

const converCartToOrder = () => {
  const orderItems = getCartItems();
  if (orderItems.length === 0) {
    document.location.hash = "/cart";
  }
  const shipping = getshipping();
  if (!shipping.address) {
    document.location.hash = "/shipping";
  }
  const payment = getpayment();
  if (!payment.paymentMethod) {
    document.location.hash = "/payment";
  }
  const itemprice = orderItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingprice = itemprice > 100 ? 0 : 10;
  const taxPrice = Math.round(0.15 * itemprice * 100) / 100;
  const totalprice = itemprice + shippingprice + taxPrice;
  return {
    orderItems,
    shipping,
    payment,
    itemprice,
    shippingprice,
    taxPrice,
    totalprice,
  };
};

const placeOrerScreen = {
  after_render: async () => {
    document.getElementById('place-order-btn').addEventListener('click',async() => {
    const order = converCartToOrder()
    showLoading()
    const data = await createorder(order)
    hideLoading()
    if(data.error){
      showMessage(data.error)
    } else {
      cleanCart()
      document.location.hash = `/order/${data.order._id}`
    }
    })
  },
  render: () => {
    const {
      orderItems,
      shipping,
      payment,
      itemprice,
      shippingprice,
      taxPrice,
      totalprice,
    } = converCartToOrder();
    return `
    <div>
    ${CheckoutSteps.render({
      step1: true,
      step2: true,
      step3: true,
      step4: true,
    })}
    <div class="order">
      <div class="order-info">
        <div>
          <h2>Shipping</h2>
          <div>
          ${shipping.address}, ${shipping.city}, ${shipping.postalcode}, 
          ${shipping.country}
          </div>
        </div>
        <div>
          <h2>Payment</h2>
          <div>
            Payment Method : ${payment.paymentMethod}
          </div>
        </div>
        <div>
          <ul class="cart-list-container">
            <li>
              <h2>Shopping Cart</h2>
              <div>Price</div>
            </li>
            ${orderItems
              .map(
                (item) => `
              <li>
                <div class="cart-image">
                  <img src="${item.image}" alt="${item.name}" />
                </div>
                <div class="cart-name">
                  <div>
                    <a href="/#/product/${item.product}">${item.name} </a>
                  </div>
                  <div> Qty: ${item.qty} </div>
                </div>
                <div class="cart-price"> $${item.price}</div>
              </li>
              `
              )
              .join('\n')}
          </ul>
        </div>
      </div>
      <div class="order-action">
         <ul>
              <li>
                <h2>Order Summary</h2>
               </li>
               <li><div>Items</div><div>$${itemprice}</div></li>
               <li><div>Shipping</div><div>$${shippingprice}</div></li>
               <li><div>Tax</div><div>$${taxPrice}</div></li>
               <li class="total"><div>Order Total</div><div>$${totalprice}</div></li> 
               <li>
               <button class="btn btn-success ff" id="place-order-btn">
               Place Order
               </button>
      </div>
    </div>
  </div>
    `;
  }
};

export default placeOrerScreen;


