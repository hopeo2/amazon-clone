const { getUserInfo, getCartItems } = require("../localStorage")


const Header = {
    render: () => {
        const {name} = getUserInfo()
        const cartItems = getCartItems();
        return `
        <div class="brand navbar-brand">
                <a style="background-color: #203040" href="/#/">amazon</a>
        </div>
        <div class=''>
            <form class="form-inline">
                <input class="form-control mr-sm-2 p-4" type="search" placeholder="Search" aria-label="Search">
                <button style='padding: 8px' class="btn btn-primary my-2 my-sm-0" type="submit">Search</button>
            </form>
        </div>
        <div>
                ${name ? `<a href="/#/profile">Welcome ${name}</a>`:`<a href="/#/signin">Sign-In</a>`}
                ${cartItems.length === 0 ? `<a class="cart-num" href="/#/cart">Cart</a>` : 
                `<a class="cart-num" href="/#/cart">
                ${cartItems.reduce((a, c) => a + c.qty, 0)} <i class="fas fa-shopping-cart"></i> <span style="font-size: 13px;">cart</span></a>`
            }
            
        </div>
        
        `
    },
    after_render: () => {
       
    }
}
module.exports = Header