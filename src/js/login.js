// 引入login.css
require('../css/login.css');

console.log('login');
// 注册节点获取
let regDom = document.querySelector(".register");
regDom.addEventListener('click', function () {
    location.href = "./register.html";
})