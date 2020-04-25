import axios from 'axios'
import service from './Api'
import ViewUI from 'view-design';

let instance = axios.create({
    baseURL: 'http://localhost:8888',
    timeout: 5000
})

// 包裹请求方法的容器
const Http = {};

for (let key in service) {
    let api = service[key];

    // async异步方法，避免回调地狱
    Http[key] = async function(
        params, // get,delete:url; put,post,path:data
        isFormData = false, // 是否是formdata
        config={}, // 配置参数
        urlParam="", // 路径参数
    ) {
        let newParams = {}
        // 是否是formdata
        if (params && isFormData) {
            newParams = new FormData()
            for (let i in params) {
                if (i == "imageList") {
                    for (let image in params[i]) {
                        newParams.append(i, params[i][image])
                    }          
                } else {
                    newParams.append(i, params[i])
                }
            }
        } else {
            newParams = params
        }

        let newUrl = api.url;
        if (urlParam != null && urlParam != "") {
            newUrl += urlParam 
        }

        // 不同请求判断
        let response = {} // 请求的返回值
        if (api.method === 'put' || api.method === 'post' || api.method === 'patch') {
            try {
                response = await instance[api.method](newUrl, newParams, config)
            } catch(err) {
                console.log(err)
                response = err
            }
        } else if (api.method === 'delete' || api.method === 'get') {
            // 参数放在路径上
            config.params = newParams
            try {
                response = await instance[api.method](newUrl, config)
            } catch(err) {
                response = err
            }
        }
        return response
    }

}

// 请求拦截器
instance.interceptors.request.use(config=>{
    // 添加token
    config.headers.Authorization = sessionStorage['token'];
    ViewUI.LoadingBar.start();
    return config
}, (response)=>{
    // 请求错误
    ViewUI.LoadingBar.finish();
    return response
})

// 响应拦截器
instance.interceptors.response.use(res=>{
    // 请求成功
    ViewUI.LoadingBar.finish();
    return res
}, (response)=>{
    // 请求错误
    ViewUI.LoadingBar.finish();
    return response
})

export default Http