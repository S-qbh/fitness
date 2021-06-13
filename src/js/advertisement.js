// 引入advertisement.css
require('../css/advertisement.css')


// console.log('advertisement');
// 获取跳过节点
let skipDom = document.querySelector(".skip");
skipDom.addEventListener('click', function () {
    location.href = './register.html';
})