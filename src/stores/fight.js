import { defineStore } from 'pinia'

export const useFightStore = defineStore('fight', {
   state() {
      return {
         logs: [],
      }
   },
   actions: {
      addLog(who, what, value) {
         this.logs.unshift({
            by: who,
            action: what,
            value: value,
         })
      },
   },
})
