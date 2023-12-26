import { defineStore } from 'pinia'

export const useMonsterStore = defineStore('monster', {
   state() {
      return {
         name: 'Monster',
         level: 1,
      }
   },
   getters: {
      baseStats() {
         return {
            hp: {
               title: 'HP',
               value: Math.floor(this.status.vit.value * 12),
               style: 'text-red-500',
            },
            atk: {
               title: 'ATK',
               min: Math.floor(this.status.str.value * 1.2 + this.status.dex.value * 0.3),
               max: Math.floor(this.status.str.value * 1.4 + this.status.dex.value * 0.5),
            },
            def: {
               title: 'DEF',
               value: Math.floor(this.status.vit.value * 1.1 + this.status.str.value * 0.3),
            },
            speed: {
               title: 'SPEED',
               value: Math.floor(this.status.dex.value * 1.2 + this.status.str.value * 0.2),
            },
         }
      },
      status() {
         return {
            str: { title: 'STR', value: Math.floor(this.level * 1.1) + 6 },
            vit: { title: 'VIT', value: Math.floor(this.level * 1.2) + 6 },
            dex: { title: 'DEX', value: Math.floor(this.level * 1.1) + 6 },
         }
      },
   },
   actions: {
      getRandomValue(min, max) {
         return Math.floor(Math.random() * (max - min)) + min
      },
      monsterDamage() {
         return this.getRandomValue(this.baseStats.atk.min, this.baseStats.atk.max)
      },
      levelUp() {
         this.level += 1
      },
   },
})
