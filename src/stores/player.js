import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', {
   state() {
      return {
         name: '',
         status: {
            str: { title: 'STR', value: 5 },
            vit: { title: 'VIT', value: 5 },
            int: { title: 'INT', value: 5 },
         },
         statPoints: 5,
         level: 1,
      }
   },
   getters: {
      baseStats() {
         return {
            hp: {
               title: 'HP',
               value: Math.floor(this.status.vit.value * 10.3),
               style: 'text-red-500',
            },
            mp: {
               title: 'MP',
               value: this.status.int.value * 5,
               style: 'text-blue-500',
            },
            atk: {
               title: 'ATK',
               min: Math.floor(this.status.str.value * 1.4),
               max: Math.floor(this.status.str.value * 1.8),
               style: 'text-green-500',
            },
            def: {
               title: 'DEF',
               value: Math.floor(this.status.vit.value * 1.1 + this.status.str.value * 0.3),
               style: 'text-orange-500',
            },
         }
      },
   },
   actions: {
      increaseStat(s) {
         if (s === 'STR') {
            this.status.str.value += 1
         } else if (s === 'VIT') {
            this.status.vit.value += 1
         } else if (s === 'DEX') {
            this.status.dex.value += 1
         } else if (s === 'INT') {
            this.status.int.value += 1
         }

         this.statPoints--
      },
      levelUp() {
         this.level += 1
         this.statPoints += 3
         console.log('level up')
      },
      getRandomValue(min, max) {
         return Math.floor(Math.random() * (max - min)) + min
      },
      playerDamage() {
         return this.getRandomValue(this.baseStats.atk.min, this.baseStats.atk.max)
      },
      playerSpecialDamage() {
         return Math.floor(this.getRandomValue(this.baseStats.atk.min * 1.4, this.baseStats.atk.max * 1.6))
      },
      healValue() {
         return Math.floor(this.getRandomValue(this.status.int.value * 2.1, this.status.int.value * 3.2))
      },
   },
})
