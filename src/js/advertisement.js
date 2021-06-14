// 引入advertisement.css
require('../css/advertisement.css')


// console.log('advertisement');

// 倒计时
// 获取节点
let secondDom = document.querySelector(".second");
let a = 5;
let timeId = setInterval(function () {
    a--;
    secondDom.innerHTML = a;
    if (a <= 0) {
        clearInterval(timeId);
        location.href = './register.html';
    }

}, 1000)

// 跳过
let skipDom = document.querySelector(".skip");
// 监听点击事件
skipDom.addEventListener('click', function () {
    location.href = './register.html';
})