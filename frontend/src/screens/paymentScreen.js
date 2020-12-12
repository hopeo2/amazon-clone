import CheckoutSteps from "../components/checkoutSteps";
import { getUserInfo, setpayment } from "../localStorage";


const paymentScreen = {
    after_render: () => {
        document.getElementById('payment-form').addEventListener('submit', async (e) => {
            e.preventDefault()
            const paymentMethod = document.querySelector("input[name='payment-method']:checked").value;
            setpayment({
                paymentMethod
            })
            document.location.hash = '/placeorder'
        })
    },
    render: () => {
        const {name} = getUserInfo()
        if(!name){
            document.location.hash = '/'
        }
        return `
            ${CheckoutSteps.render({step1: true, step2: true, step3: true})}
            <div class='form-container'>
                <form style="margin: 55px" id='payment-form'>
                    <ul class='form-items'>
                        <li>
                            <h1>Payment </h1>
                        </li>
                        <li>
                        <li>
                            <div>
                                <input type="radio" name="payment-method"
                                 value="Paypal" id="paypal" checked />
                                 <label for="paypal">Paypal</label>
                            </div>
                        </li>
                        <li>
                            <div>
                                <input type="radio" name="payment-method"
                                 value="Stripe" id="stripe" />
                                 <label for="stripe">Stripe</label>
                            </div>
                        </li>
                        
                        <li>
                            <button type='submit' class='primary'>Continue</button>
                        </li>
                        
                    </ul>
                </form>
            </div>
        `
    }
};

export default paymentScreen;