/* eslint-disable import/extensions */
import Header from './components/header.js';
import CartScreen from './screens/CartScreen.js';
import Error404Screen from './screens/Error404Screen.js';
import HomeScreen from './screens/homeScreen.js';
import paymentScreen from './screens/paymentScreen.js';
import placeOrerScreen from './screens/placeOrderScreen.js';
import ProductScreen from './screens/ProductScreen.js';
import profileScreen from './screens/profileScreen.js';
import registerScreen from './screens/registerScreen.js';
import shippingScreen from './screens/shippingScreen.js';
import signInScreen from './screens/signInScreen.js';
import { hideLoading, parseRequestUrl, showLoading } from './utils.js';

const routes = {
  '/': HomeScreen,
  '/product/:id': ProductScreen,
  '/cart/:id': CartScreen,
  '/cart': CartScreen,
  '/signin': signInScreen,
  '/register': registerScreen,
  '/profile': profileScreen,
  '/shipping': shippingScreen,
  '/payment': paymentScreen,
  '/placeorder': placeOrerScreen
};
const router = async () => {
  showLoading()
  const request = parseRequestUrl();
  const parseUrl = (request.resource ? `/${request.resource}` : '/')
    + (request.id ? '/:id' : '')
    + (request.verb ? `/${request.verb}` : '');
  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;

  const header = document.getElementById('header-container')
  header.innerHTML = await Header.render()
  await Header.after_render()
  const main = document.getElementById('main-container');
  main.innerHTML = await screen.render();
  if(screen.after_render) await screen.after_render()
  hideLoading()
};
window.addEventListener('load', router);
window.addEventListener('hashchange', router);
