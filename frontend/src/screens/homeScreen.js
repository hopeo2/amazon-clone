import { hideLoading, showLoading } from "../utils.js";

const axios = require("axios");
const Rating = require("../components/rating.js");

const HomeScreen = {
  render: async () => {
    showLoading();
    const response = await axios({
      url: "http://localhost:5000/api/products",
      headers: { "Content-Type": "aplication/json" },
    });
    hideLoading();
    if (!response || response.statusText !== "OK") {
      return "<div>Error in getting data</div>";
    }
    const products = await response.data;

    return `
    <div class="container col-6">
    <div class="row">
      <div id="carouselExampleIndicators" class="carousel slide carousel-fade" data-ride="carousel">
        <ol class="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner">
          <div class="carousel-item active" data-interval="2000">
            <img src="./images/p1.jpg" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item" data-interval="2000">
            <img src="./images/p2.jpg" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item" data-interval="2000">
            <img src="./images/p5.jpg" class="d-block w-100" alt="...">
          </div>
        </div>
        
      </div>
    </div>
    <a style="background-color: #c1b9b97a; " class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a style="background-color: #c1b9b97a;" class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
  </div>


            ${products
              .map(
                (product) => `
      <div class="card mb-3 shadow" style="max-width: 450px; display: inline-grid; margin: 50px;">
      <div class="row no-gutters">
        <div class="col-md-4">
        <a href="/#/product/${product._id}">
          <img src="${product.image}" class="card-img" alt="${product._id}">
        </a>
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">
                <a href="/#/product/${product._id}">
                        ${product.name}
                </a>
            </h5>
            <div class="product-rating">
              ${Rating.render({
                value: product.rating,
                text: `${product.numReviews} reviews`,
              })}
            </div>
            <p class="card-text"><small class="text-muted">${
              product.brand
            }</small></p>
            <p class="card-text">${product.price}$</p>

            <a class="text-primary" href="/#/product/${product._id}">See more</a>
          </div>
        </div>
      </div>
    </div>
    
            `
              )
              .join("\n")}
        `;
  },
};
export default HomeScreen;
