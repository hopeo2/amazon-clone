import { hideLoading, parseRequestUrl, showLoading } from '../utils.js'
import { getProduct } from '../api';
import Rating from '../components/rating'
const ProductScreen = {
    after_render: () => {
        const request = parseRequestUrl()
        document.getElementById('add-btn').addEventListener('click', () => {
            document.location.hash = `/cart/${request.id}`
        })
    },
    render: async () => {
        const request = parseRequestUrl()
        showLoading()
        const product = await getProduct(request.id)
        if(product.error){
            return `<div>${product.error}</div>`
        }
        hideLoading()
        return `<div class='content'>
            <div class='back-to-result'>
                <a href='/#/'>Back To Result</a>
            </div>
            <div class='details'>
                <div class='details-image'>
                    <img src='${product.image}' alt='${product.name}' />
                </div>
                <div class='details-info'>
                    <ul>
                        <li>
                            <h1>${product.name}</h1>
                        </li>
                        <li>
                            ${Rating.render({
                                value: product.rating,
                                text: `${product.numReviews} reviews`
                            })}
                        </li>
                            <li>Price: <strong>$${product.price}</strong> </li>
                        <li>
                            Description:
                            <p>${product.description}</p>
                        </li>
                    </ul>
                </div>
                <div class='details-action'>
                        <ul>
                            <li> Price: <strong>$${product.price}</strong> </li>
                            <li>
                                Status:
                                ${
                                    product.countInStock > 0 ?
                                     `<span class='success'>In Stock</span>`
                                      : `<span class='error'>Unavalable</span>`}
                            </li>
                            <li>
                                <button id='add-btn' class=' fw primary'>Add to Cart</button>
                            </li>
                        </ul>
                </div>
            </div>
        </div>`
    }
}
export default ProductScreen;