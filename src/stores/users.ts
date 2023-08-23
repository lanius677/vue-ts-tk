import { defineStore } from 'pinia'
import { Names } from './store-namespace'
import http from '@/utils/http';

type Token = String
interface Infos {
  [index: string]: unknown
}

interface Login {
  email: string
  pass: string
  [index: string]: unknown
}


export const useUsersStore = defineStore(Names.users,()=> {

  // 登录 
  function loginAction(payload:Login) {
    return http.post('/users/login',payload)
  }

  return {loginAction}
})


export type {Token,Infos,Login}

