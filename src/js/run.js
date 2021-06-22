// 引入run.less
require('../css/run.less');


// 预加载
document.ready(function () {
    // 获取输入框
    let beginInp = document.querySelector('#begin-inp');
    let endInp = document.querySelector('#end-inp');
    let confirmBtn = document.querySelector('#confirmBtn');

    // 提示用户输入
    utils.tatol(1, '请输入起点和终点完成路线规划', 3);

    // 引入公共顶部
    utils.addHeader('run');
    // 公共底部组件
    utils.addFooter('sports');

    // 确认按钮点击事件
    confirmBtn.addEventListener('click', function (ev) {
        // 获取输入框的值
        let beginValue = beginInp.value;
        let endValue = endInp.value;
        // console.log(beginValue, endValue);
        getMap(beginValue, endValue);

    })

    function getMap(begin, end) {
        // 高德地图js部分
        let map = new AMap.Map("container", {
            resizeEnable: true,
            center: [104.398305, 31.09905],//地图中心点
            zoom: 13 //地图显示的缩放级别
        });
        //步行导航
        var walking = new AMap.Walking({
            map: map,
            panel: "panel"
        });
        walking.search([
            { keyword: begin, city: '德阳' },
            { keyword: end, city: '德阳' }
        ],
            // function (status, result) {
            //     // result即是对应的步行路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_WalkingResult
            //     if (status === 'complete') {
            //         log.success('绘制步行路线完成')
            //     } else {
            //         log.error('步行路线数据查询失败' + result)
            //     }
            // }
        );
    }
    getMap();

})