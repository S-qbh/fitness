/**
 * 封装ajax get post ajax
 * 2021-06-09
 */

/**
 * 将对象转换为url
 * {name:张三,age:18}
 * name=张三&age=18
 */
function urlData(obj) {
    // 判断参数调整返回值
    // 两个参数
    if (typeof obj == 'function') {
        return '';
    }

    // 不是两个参数则转换
    // 1、取出对象所有的属性名组成数组
    let nameArr = Object.keys(obj);
    // 2、拼接字符串
    // 定义字符变量
    let str = '';
    // 遍历拼接字符串
    for (let i = 0; i < nameArr.length; i++) {
        str += `&${nameArr[i]}=${obj[nameArr[i]]}`;
    }
    // 截取第一个&
    str = str.substr(1);
    return str;
}

const http = {
    // get请求
    /**
     * @get get请求
     * @url 请求地址+数据 地址和数据用?连接 http://139.9.177.51:3333/api/testGet?name=fengzhuang
     * @callback 回调函数，将值传回
     * @return  Object
     */
    get: function (url, data, callback) {

        // 判断参数，如果只有两个参数时将data的值赋值给callback
        if (typeof data == 'function') {
            callback = data;
        } else if (typeof data == 'object') {//三个值拼接url重新赋值
            // console.log(urlData(data));
            url = url + '?' + urlData(data);
        }
        // 实例化ajax
        let xhr = new XMLHttpRequest();
        // 请求方式 请求地址+数据
        xhr.open('get', url);
        // 监听 步骤 状态码
        xhr.onreadystatechange = function () {
            // 判断步骤 状态码
            if (xhr.readyState === 4 && xhr.status === 200) {
                // 将数据转换为js对象传回
                callback(JSON.parse(xhr.responseText));
            }
        }
        // 发送
        xhr.send();
    },

    /**
     * @post post请求
     * @url 请求地址 http://139.9.177.51:3333/api/testPost
     * @data String 'name=张三'
     * @callback 回调函数，将值传回
     * @return Object
     */
    post: function (url, data, callback) {
        // 实例化ajax
        let xhr = new XMLHttpRequest();
        // 请求方式 请求地址
        xhr.open('post', url);
        // post请求修改请求头 模仿form
        // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Content-Type', 'application/json');//json格式
        // 监听 步骤 状态码
        xhr.onreadystatechange = function () {
            // 判断步骤 状态码
            if (xhr.readyState === 4 && xhr.status === 200) {
                // 转换为js对象 回调函数传回
                callback(JSON.parse(xhr.responseText));
            }
        }
        // 发送+数据
        xhr.send(JSON.stringify(data));
    },


    /**
     * @ajax 万能方法
     * @url 请求地址
     * @type 类型
     * @data 发送数据
     * @callback  回调函数
     * 
     */
    ajax: function (obj) {
        // toLowerCase适配大小写
        if (obj.type.toLowerCase() === 'get') {
            http.get(obj.url, obj.data, obj.callback);
        }
        if (obj.type.toLowerCase() === 'post') {
            http.post(obj.url, obj.data, obj.callback)
        }
    }
}

// 文件上传
function $updateFile(url, fdKey, fdValue, success) {
    const xhr = new XMLHttpRequest();

    const fd = new FormData();
    fd.append(fdKey, fdValue);

    xhr.open('POST', url);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const resData = JSON.parse(xhr.responseText)
            success(resData)
        }
    }
    xhr.send(fd);
}


// 挂载
window.$http = http;
window.$updateFile = $updateFile;
