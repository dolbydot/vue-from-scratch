import { APP_CONTAINER_SELECTOR } from '../shared/config';
import Vue from 'vue';
import App from './App.vue';
new Vue({
  el:APP_CONTAINER_SELECTOR,
  render:h=>h(App)
});
// new Vue(App).$mount(APP_CONTAINER_SELECTOR);
// new Vue({
//   el:APP_CONTAINER_SELECTOR,
//   template:`Hello Dolby Xiaowen`
// });
// const APP={
//   name:"Test",
//   render:h=>{
//     return `
//       <h2>Hello Dolby Xiaowen</h2>
//     `;
//   }
// };
// new Vue({
//   render:h=>h(APP)
// }).$mount(APP_CONTAINER_SELECTOR);
// document.querySelector(APP_CONTAINER_SELECTOR).innerHTML = '<h1>Hello Dolby!</h1>';
