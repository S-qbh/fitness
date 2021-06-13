// 导入login的css
require('../css/register.css');
// // 导入离线字体图标
// require('../lib/iconfont/iconfont.css');

console.log('register');
// 获取登录节点
let loadDom = document.querySelector(".load>span");
loadDom.addEventListener('click', function () {
    location.href = './login.html';
})