// 引入advertisement.css
require('../css/advertisement.less')


document.ready(function () {
    // 获取节点
    let secondDom = document.querySelector(".second");
    // 跳过按钮
    let skipBtn = document.querySelector(".timer");



    /*倒计时 */
    // 定义初始值变量
    let a = 5;
    // 定义计时器
    let timeId = setInterval(function (e) {
        // 变量自减
        a--;
        // 将值渲染到标签中
        secondDom.textContent = a;
        // 判断变量值 小于等于零 清除定时器并跳转页面
        if (a <= 0) {
            clearInterval(timeId);
            location.href = './login.html';
        }

    }, 1000)

    /*跳转按钮 */
    // 点击事件监听
    skipBtn.addEventListener('click', function (e) {
        location.href = './login.html';
    })
})


