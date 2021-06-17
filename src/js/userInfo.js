// 引入userInfo.less
require('../css/userInfo.less');

// 预加载
document.ready(function () {
    // 返回按钮
    let backBtn = document.querySelector(".back-btn");

    // 返回点击事件监听
    backBtn.addEventListener('click', function (e) {
        location.href = './personal.html';
    })








})