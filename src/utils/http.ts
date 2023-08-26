import { useUsersStore } from '@/stores/users';
import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { ElMessage } from 'element-plus';
import { storeToRefs } from 'pinia';


// 创建实例
const instance = axios.create({
  baseURL: 'http://127.0.0.1:3000/',
  timeout: 5000
})


// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (config.headers) {
    // 把请求头信息设置为token
    const store = useUsersStore()
    const { token } = storeToRefs(store)
    config.headers.setAuthorization(token.value as string)
  }

  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  if (response.data.errmsg === 'token error') {
    ElMessage.error('token error')
    const store = useUsersStore()
    store.clearToken()
    setTimeout(() => {
      window.location.replace('/login')
    }, 2000)
  }
  return response;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});

interface Data {
  [index: string]: unknown
}

interface Http {
  get: (url: string, data?: Data, config?: AxiosRequestConfig) => Promise<AxiosResponse>
  post: (url: string, data?: Data, config?: AxiosRequestConfig) => Promise<AxiosResponse>
  put: (url: string, data?: Data, config?: AxiosRequestConfig) => Promise<AxiosResponse>
  patch: (url: string, data?: Data, config?: AxiosRequestConfig) => Promise<AxiosResponse>
  delete: (url: string, data?: Data, config?: AxiosRequestConfig) => Promise<AxiosResponse>
}

// 接口
const http: Http = {
  get(url, data, config) {
    return instance.get(url, {
      params: data,
      ...config
    })
  },

  post(url, data, config) {
    return instance.post(url, data, config)
  },

  put(url, data, config) {
    return instance.put(url, data, config)
  },

  patch(url, data, config) {
    return instance.patch(url, data, config)
  },

  delete(url, data, config) {
    return instance.delete(url, {
      data,
      ...config
    })
  },
}

export default http