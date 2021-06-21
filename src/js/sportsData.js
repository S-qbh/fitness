// 引入sportsData.less
require('../css/sportsData.less');

// 引入下载的三方包echarts
const echarts = require('echarts');
// 预加载
document.ready(function () {
    // 获取返回按钮
    let goBackBtn = document.querySelector(".go-back-person");
    // 获取头像节点
    let userPic = document.querySelector('.show-img img');
    // 获取卡路里节点
    let weekDom = document.querySelector('.week-ka');
    let weekShowDom = document.querySelector('.week-ka-show');
    // 获取运动分钟节点
    let weekMinutes = document.querySelector('.week-minutes');
    // 累计天数节点
    let allTimeDom = document.querySelector('.all-time');
    // 连续天数
    let continueDays = document.querySelector('.user-continuity-days');


    // echarts图表引入

    // --------------------------------------------------近7天运动时长柱状图
    // 基于准备好的dom，初始化echarts实例
    var myChartOne = echarts.init(document.getElementById('main-one'));
    // 柱状模拟数据
    let data = [
        { date: '6-16', time: 50 },
        { date: '6-17', time: 150 },
        { date: '6-18', time: 250 },
        { date: '6-19', time: 350 },
        { date: '6-20', time: 450 },
        { date: '6-21', time: 550 },
        { date: '6-22', time: 650 }
    ]
    // 定义存放时间和数据的数组
    let firstDate = [];
    let firstTime = [];
    // 遍历获取数据
    data.forEach(function (item) {
        firstDate.push(item.date);
        firstTime.push(item.time);
    })
    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '近7天运动时长'
        },
        tooltip: {},
        legend: {
            data: ['销量']
        },
        xAxis: {
            data: firstDate
        },
        yAxis: {},
        series: [{
            // name: '销量',
            type: 'bar',
            data: firstTime
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChartOne.setOption(option);

    // --------------------------------------------------运动分类饼图
    // 基于准备好的dom，初始化echarts实例
    var myChartTwo = echarts.init(document.getElementById('main-two'));
    let dataTwo = [
        { value: 1048, name: '跑步' },
        { value: 735, name: '骑行' },
        { value: 580, name: '训练' }
    ]

    let optionTwo = {
        title: {
            text: '运动分类',
            // subtext: '纯属虚构',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '50%',
                data: dataTwo,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChartTwo.setOption(optionTwo);

    // --------------------------------------------------横向柱状图
    // 基于准备好的dom，初始化echarts实例
    var myChartThree = echarts.init(document.getElementById('main-three'));

    let optionThree = {
        title: {
            text: "近7日运动分类"
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // Use axis to trigger tooltip
                type: 'shadow'        // 'shadow' as default; can also be 'line' or 'shadow'
            }
        },
        // legend: {
        //     data: ['跑步', 'Mail Ad', 'Affiliate Ad']
        // },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value'
        },
        yAxis: {
            type: 'category',
            data: ['6-15', '6-16', '6-17', '6-18', '6-19', '6-20', '6-21']
        },
        series: [
            {
                name: 'Direct',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: [320, 302, 301, 334, 390, 330, 320]
            },
            {
                name: 'Mail Ad',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: 'Affiliate Ad',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: [220, 182, 191, 234, 290, 330, 310]
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChartThree.setOption(optionThree);


    // --------------------------------------------------折线图
    // 基于准备好的dom，初始化echarts实例
    var myChartFour = echarts.init(document.getElementById('main-four'));
    let dataFour = [
        { data: '6-15', times: 5 },
        { data: '6-16', times: 6 },
        { data: '6-17', times: 3 },
        { data: '6-18', times: 7 },
        { data: '6-19', times: 8 },
        { data: '6-20', times: 10 },
        { data: '6-21', times: 5 }
    ]
    // 定义空数组
    let dateFour = [];
    let timesFour = [];
    // 遍历构造数据
    dataFour.forEach(function (item) {
        dateFour.push(item.data);
        timesFour.push(item.times);
    })
    let optionFour = {
        title: {
            text: "近7日训练次数"
        },
        xAxis: {
            type: 'category',
            data: dateFour
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: timesFour,
            type: 'line'
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChartFour.setOption(optionFour);






    // 从本地存储获取userId
    let user = JSON.parse(localStorage.getItem('user'));
    let userId = user.userId;


    // 进入页面进行数据请求，渲染页面
    function getUserSports() {
        // ajax请求
        $http.get('http://139.9.177.51:8099/users/mysportsBadge', { userId: userId }, function (result) {
            // console.log(result);
            // 渲染头像
            userPic.src = result.data.user.imgurl;
            // 提取用户运动数据
            let data = result.data.sports;
            // console.log(data);
            // 卡路里消耗
            weekDom.textContent = data.calorie;
            weekShowDom.textContent = data.calorie;
            // 运动时间
            weekMinutes.textContent = data.times;
            // 运动累计天数
            allTimeDom.textContent = data.coursetims;
            continueDays.textContent = data.ridekm;
        })
    }
    // 调用请求函数
    getUserSports();


    // console.log(echarts);

    // 返回点击事件监听
    goBackBtn.addEventListener('click', function (e) {
        // 跳转个人信息页
        location.href = './personal.html';
    })
})