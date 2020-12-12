import { getCartItems } from "./localStorage";

/* eslint-disable import/prefer-default-export */
export const parseRequestUrl = () => {
  const url = document.location.hash.toLowerCase();
  const request = url.split('/');
  return {
    resource: request[1],
    id: request[2],
    action: request[3],
  };
};
export const rerender = async (compponent) => {
  document.getElementById('main-container').innerHTML = await compponent.render()
  await compponent.after_render()
}
export const showLoading = () => {
  document.getElementById('loading-overlay').classList.add('active')
}
export const hideLoading = () => {
  document.getElementById('loading-overlay').classList.remove('active')
}
export const showMessage = (message, callback) => {
  document.getElementById('message-overlay').innerHTML = `
  <div>
    <div id='message-overlay-content'>${message}</div>
    <button style='font-size: 18px' id='message-overlay-close-btn' class="btn btn-danger">Ok</button>
  </div>
  `;
  document.getElementById('message-overlay').classList.add('active')
  document.getElementById('message-overlay-close-btn').addEventListener('click', () => {
    document.getElementById('message-overlay').classList.remove('active')
    if(callback){
      callback()
    }
  })
}

export const redirectUser = () => {
  if(getCartItems().length !== 0){
    document.location.hash = '/shipping'
  } else {
    document.location.hash = '/'
  }
}
