import axios from 'axios'
import service from './contactApi'

let instance = axios.create({
    baseURL: 'http://localhost',
    timeout: 1000
})

// 包裹请求方法的容器
const Http = {};

for (let key in service) {
    let api = service[key];

    // async异步方法，避免回调地狱
    Http[key] = async function(
        params, // get,delete:url; put,post,path:data
        isFormData = false, // 是否是formdata
        config={} // 配置参数
    ) {
        let newParams = {}
        // 是否是formdata
        if (params && isFormData) {
            newParams = new FormData()
            for (let i in params) {
                newParams.append(i, params[i])
            }
        } else {
            newParams = params
        }

        // 不同请求判断
        let response = {} // 请求的返回值
        if (api.method === 'put' || api.method === 'post' || api.method === 'patch') {
            try {
                response = await instance[api.method](api.url, newParams, config)
            } catch(err) {
                response = err
            }
        } else if (api.method === 'delete' || api.method === 'get') {
            // 参数放在路径上
            config.params = newParams
            try {
                response = await instance[api.method](api.url, config)
            } catch(err) {
                response = err
            }
        }
        return response
    }

}

// 请求拦截器
instance.interceptors.request.use(config=>{
    // 请求前做什么
    return config
}, ()=>{
    // 请求错误
})

// 响应拦截器
instance.interceptors.response.use(res=>{
    // 请求成功
    return res.data
}, ()=>{
    // 请求错误
})

export default Http