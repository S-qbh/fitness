// 导入cycling.less
require('../css/cycling.less');

// 预加载
document.ready(function () {
    // 获取输入框
    let beginInp = document.querySelector('#begin-inp');
    let endInp = document.querySelector('#end-inp');
    let confirmBtn = document.querySelector('#confirmBtn');

    // 提醒用户输入
    utils.tatol(1, '请输入起点和终点完成路线规划', 3);

    // 引入公共头部
    utils.addHeader('cycling');
    // 引入公共底部
    utils.addFooter('sports');

    // 确认按钮点击事件
    confirmBtn.addEventListener('click', function (ev) {
        // 获取输入框的值
        let beginValue = beginInp.value;
        let endValue = endInp.value;
        getLines(beginValue, endValue)
    })

    function getLines(begin, end) {
        var map = new AMap.Map("container", {
            resizeEnable: true,
            center: [104.398305, 31.09905],//地图中心点
            zoom: 13 //地图显示的缩放级别
        });
        //步行导航
        var riding = new AMap.Riding({
            map: map,
            panel: "panel"
        });
        riding.search([
            { keyword: begin, city: '德阳' },
            { keyword: end, city: '德阳' }
        ],
            // function (status) {
            //     // result即是对应的骑行路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_RidingResult
            //     if (status === 'complete') {
            //         log.success('绘制骑行路线完成')
            //     } else {
            //         log.error('骑行路线数据查询失败' + result)
            //     }
            // }
        );
    }
    getLines();






})