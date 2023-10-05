import { defineStore } from 'pinia'
import { Names } from './store-namespace'
import { ref } from 'vue'
import http from '@/utils/http'

interface Infos {
  [index: string]: unknown
}

export interface SignsState {
  infos: Infos
}

export const useSignsStore = defineStore(Names.signs, () => {

  const signsInfos=ref<Infos>({})
  
  // const state = ref<SignsState>({
  //   infos: {}
  // })

  // 同步信息方法
  function updateInfos(payload:Infos) {
    signsInfos.value=payload
  }

  // 获取数据
  function getTime(payload:Infos){
    return http.get('/signs/time',payload)
  }

  // 打卡签到
  function putTime(payload:Infos){
    return http.put('/signs/time',payload)
  }
  return { signsInfos,updateInfos ,getTime,putTime}
})
