// 引入sportsData.less
require('../css/sportsData.less');

// 预加载
document.ready(function () {
    // 获取返回按钮
    let goBackBtn = document.querySelector(".go-back-person");
    // 点击事件监听
    goBackBtn.addEventListener('click', function (e) {
        // 跳转个人信息页
        location.href = './personal.html';
    })
})