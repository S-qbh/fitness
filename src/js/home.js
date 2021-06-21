// 导入home页的样式
require('../css/home.less');


document.ready(function () {
    // 节点获取
    let rankNumDom = document.querySelector(".rank-num");//排名
    let cardDaysDom = document.querySelector("#cardDays");//打卡天数
    let badeNumDom = document.querySelector("#badgeNum");//徽章数量
    // 打卡按钮
    let cardBtn = document.querySelector(".card-btn");

    // 获取本地存储中的登录数据
    let user = JSON.parse(localStorage.getItem('user'));
    // 提取userId
    let userId = user.userId;


    // 从utils.js中引入底部组件
    utils.addFooter('home');
    // 首页轮播图
    var mySwiper = new Swiper('.swiper-container', {
        // direction: 'vertical', //垂直切换选项 横向horizontal(默认)
        loop: true, // 循环模式选项
        // 自动循环播放
        autoplay: {
            delay: 1000,
            stopOnLastSlide: false,
            disableOnInteraction: true,
        },
        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
        },

        // 如果需要前进后退按钮
        // navigation: {
        //   nextEl: '.swiper-button-next',
        //   prevEl: '.swiper-button-prev',
        // },

        // 如果需要滚动条
        // scrollbar: {
        //   el: '.swiper-scrollbar',
        // },
    })


    // ajax请求首页数据--打卡/徽章/排名 封装调用
    // rank排名 insigniaNum徽章数量 isPunch是否打卡 punchIn打卡天数
    function getInfo() {
        $http.get('http://139.9.177.51:8099/headPageInfo', { userId: userId }, function (result) {
            // 获取成功status==0
            if (result.status == 0) {
                // 渲染页面
                rankNumDom.textContent = result.data.rank;
                cardDaysDom.textContent = result.data.punchIn;
                badeNumDom.textContent = result.data.insigniaNum;
            }
            // 判断是否打卡，打过卡则隐藏按钮
            if (result.data.isPunch == 'true') {
                cardBtn.style.display = 'none';
            } else {
                cardBtn.style.display = 'block';
            }
        })
    }

    // 调用封装首页数据请求
    getInfo();

    // 打卡封装  今日打卡点击事件监听
    cardBtn.addEventListener('click', function (e) {
        // ajax数据请求
        $http.get('http://139.9.177.51:8099//clockIn', { userId: userId }, function (result) {
            // console.log(result.status);
            if (result.status == 0) {
                utils.tatol(0, '打卡成功', 2);
                getInfo();
            } else {
                utils.tatol(0, result.msg, 2);
            }
        })
    })
})