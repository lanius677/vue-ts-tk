import { defineStore } from 'pinia'
import { Names } from './store-namespace'
import http from '@/utils/http';
import { ref } from 'vue';

type Token = String
interface Infos {
  [index: string]: unknown
}

interface Login {
  email: string
  pass: string
  [index: string]: unknown
}


export const useUsersStore = defineStore(Names.users, () => {

  // Token
  const token = ref<Token>('');

  // 用户信息
  const userInfos = ref<Infos>({})

  // 获取用户信息
  function userInfosAction() {
    return http.get('/users/infos')
  }

  // 更新用户信息
  function updateUserInfos(payload: Infos) {
    userInfos.value = payload
  }

  // 清空Token
  function clearToken() {
    token.value = ''
  }

  // 更新Token
  function updateToToken(payload: string) {
    token.value = payload
  }

  // 登录 
  function loginAction(payload: Login) {
    return http.post('/users/login', payload)
  }


  return { loginAction, updateToToken, userInfosAction, updateUserInfos, clearToken, userInfos, token }
}, {
  persist: {
    paths: ['token'],
    storage: localStorage,	//修改存储位置
    key: 'Token',	//设置存储的key
  }
}
)


export type { Token, Infos, Login }

