// 引入userInfo.less
require('../css/userInfo.less');

// 预加载
document.ready(function () {

    // 获取用户名节点
    let userNameTextDom = document.querySelector(".user-name-text");
    // 获取性别节点
    let genderBoxDom = document.querySelector("#gender-box");//性别
    let genderTextDom = document.querySelector("#gender-text");//性别渲染
    // 获取生日节点
    let birthdayBoxDom = document.querySelector('#birthday-box');
    let birthdayTextDom = document.querySelector("#birthday-text");
    // 获取省节点
    let provinceBoxDom = document.querySelector("#province-box");
    let provinceTextDom = document.querySelector("#province-text");
    // 获取市节点
    let cityBoxDom = document.querySelector("#city-box");
    let cityTextDom = document.querySelector("#city-text");
    // 获取个人描述
    let personTextDom = document.querySelector("#personText");
    // 返回按钮
    let backBtn = document.querySelector(".back-btn");
    // 保存按钮
    let saveBtn = document.querySelector(".save-btn");

    // 获取本地存储中的userId
    let user = JSON.parse(localStorage.getItem('user'));
    let userId = user.userId;


    // 通过userId获取用户信息进行渲染
    function getUserInfo() {
        $http.get('http://139.9.177.51:8099/users/accountinfo', { userId: userId }, function (result) {
            console.log(result);
            let arr = result.data.address.split(',');

            // 格林威治时间转常用事件
            function getTime(dataBir) {
                // 获取本地时间
                let date = new Date(dataBir);
                // 获取年
                let y = date.getFullYear();
                // 获取月 范围0-11 取整后+1
                let m = parseInt(date.getMonth()) + 1;
                m = m < 10 ? '0' + m : m;
                // 获取天
                let d = date.getDate() + 1;
                d = d < 10 ? '0' + d : d;

                let timeStr = `${y}-${m}-${d}`;
                return timeStr;
            }
            let nowTime = getTime(result.data.birthday);


            // 页面渲染

            // 昵称
            userNameTextDom.value = result.data.nickname;
            data.nicName = result.data.nickname;//修改用户的默认值
            // 性别
            if (result.data.gender) {
                genderTextDom.textContent = result.data.gender;
                data.gender = result.data.gender;
            }
            // 生日
            if (result.data.birthday) {
                birthdayTextDom.textContent = nowTime;
                data.birthday = nowTime;
            }
            // 省份
            if (arr[0]) {
                provinceTextDom.textContent = arr[0];
                data.pro = arr[0];
            }
            // 城市
            if (arr[1]) {
                cityTextDom.textContent = arr[1];
                data.city = arr[1];
            }
            // 描述-个性签名
            if (result.data.sign) {
                personTextDom.value = result.data.sign;
                data.sign = result.data.sign;
            }


        })
    }
    getUserInfo();

    // 定义全局对象存放选择的值，最后作为参数进行数据保存
    // 每次选择 进行信息修改
    let data = {
        nicName: '',//昵称
        gender: '',//性别
        birthday: '',//生日
        pro: '',//省份
        city: '',//城市
        sign: ''//简介
    }


    // 返回点击事件监听
    backBtn.addEventListener('click', function (e) {
        location.href = './personal.html';
    })

    // 性别添加点击事件监听
    genderBoxDom.addEventListener('click', function (e) {
        // 生成下拉列表
        weui.picker([{
            label: '男',
            value: 0
        }, {
            label: '女',
            value: 1
        }], {
            onConfirm: function (result) {
                // console.log(result);
                genderTextDom.textContent = result[0].label;
                // 将性别存入全局对象data中
                data.gender = genderTextDom.textContent;
            },
            title: '请选择性别'
        });
    })

    // 生日添加点击事件监听
    birthdayBoxDom.addEventListener('click', function (e) {
        weui.datePicker({
            // 开始年份
            start: 1937,
            // 获取当前年份为终止年份
            end: new Date().getFullYear(),
            onConfirm: function (result) {
                // 拼接渲染到页面
                birthdayTextDom.textContent = `${result[0].value}-${result[1].value}-${result[2].value}`;
                // 将生日信息存放到全局对象data中
                data.birthday = birthdayTextDom.textContent;
            },
            title: '请选择生日'
        });
    })

    // 点击省份从后台获取数据
    provinceBoxDom.addEventListener('click', function (e) {
        // 通过ajax从后台获取省份数据
        $http.get('http://139.9.177.51:8099/address/province', function (result) {
            // console.log(result);
            // 将获取的数据通过map方法构造为weui需要的格式
            let arr = result.data.map(function (item) {
                return {
                    label: item.name,
                    value: item.addressId
                }
            });
            // console.log(arr);//省级单位
            // 生成下拉列表
            // 生成下拉列表
            weui.picker(arr, {
                onConfirm: function (result) {
                    // console.log(result);
                    provinceTextDom.textContent = result[0].label;
                    // 将性别存入全局对象data中
                    data.pro = result[0];



                    // 如果选择省份，市级清空
                    // 1、清空存储在全局中的数据
                    data.city = '';
                    // 清除页面的数据
                    cityTextDom.textContent = '请选择';
                },
                title: '请选择省份'
            });

        })
    })

    // 点击城市通过省份的id从后台获取数据
    cityBoxDom.addEventListener('click', function (e) {
        // 判断全局对象data中pro的值是否为空，未选择省份则提示并终止操作
        if (data.pro == '') {
            // 提示
            utils.tatol(1, '请先选择省份');
            return;//终止
        }
        // 通过全局对象data中的pro下的value值进行城市获取
        // console.log(data.pro.value);
        let cityId = data.pro.value;
        // console.log(cityId);//省级的id
        // 通过ajax传递省级id进行城市获取
        $http.get('http://139.9.177.51:8099/address/city/' + cityId, function (result) {
            // console.log(result);//获取的市级单位
            // 将获取的数据通过map方法构造为weui需要的格式
            let arr = result.data.map(function (item) {
                return {
                    label: item.name,
                    value: item.addressId
                }
            });
            // console.log(arr);
            // 生成下拉列表
            // 生成下拉列表
            weui.picker(arr, {
                onConfirm: function (result) {
                    // console.log(result);
                    cityTextDom.textContent = result[0].label;
                    // 将性别存入全局对象data中
                    data.city = result[0];
                },
                title: '请选择城市'
            });
        })
    })



    // 保存按钮事件监听
    saveBtn.addEventListener("click", function (e) {
        // 获取信息
        // 将昵称和个人简介传入到data中
        data.nicName = userNameTextDom.value;//昵称
        data.sign = personTextDom.value;//描述
        // 将省市信息构造为数据
        let addressArr = [data.pro.label, data.city.label];
        console.log(addressArr);

        // 构造要传递的数据格式
        let editInfo = {
            nickname: data.nicName,//昵称
            gender: data.gender,//性别
            birthday: new Date(data.birthday),//生日
            address: addressArr,//已经构造为数组的省市
            sign: data.sign,//描述
            userId: userId//已经获取到的本地数据中的id
        }
        console.log(editInfo.birthday);
        // ajax请求
        editUserInfo(editInfo);

    })
    // 封装修改信息ajax数据请求
    function editUserInfo(data) {
        // ajax数据请求
        $http.post('http://139.9.177.51:8099/users/userEdit', data, function (result) {
            if (status == 0) {
                utils.tatol(0, '保存成功');
            }
        })
    }



})