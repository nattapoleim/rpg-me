<script setup>
   import { ref, onMounted, watch } from 'vue';
   import { RouterLink, useRouter } from 'vue-router';

   import HealthBar from '@/components/HealthBar.vue';

   import { useMonsterStore } from '@/stores/monsterStats';
   import { useStatStore } from '@/stores/characterStats';
   import { useFightStore } from '@/stores/fightStore'

   const router = useRouter()

   const monsterStore = useMonsterStore()
   const statStore = useStatStore()
   const fightStore = useFightStore()

   const monsterHp = ref(monsterStore.baseStats.hp.value)
   const playerHp = ref(statStore.baseStats.hp.value)
   const playerMp = ref(statStore.baseStats.mp.value)
   const specialCooldown = ref(0)
   const success = ref(null)
   const gameover = ref(null)

   onMounted(() => {
      if (statStore.name === '') {
         router.push({ name: 'home' })
      }


      fightStore.logs = []
      success.value = null
      gameover.value = null
      monsterHp.value = monsterStore.baseStats.hp.value
      playerHp.value = statStore.baseStats.hp.value
   })

   watch(
      [playerHp, monsterHp], ([pValue, mValue]) => {
         if (mValue <= 0) {
            monsterHp.value = 0
            statStore.levelUp()
            monsterStore.levelUp()
            success.value = true
            monsterHp.value = 1
         } else if (pValue <= 0) {
            playerHp.value = 0
            gameover.value = true
         }

      }
   )

   const playerAttack = () => {
      const pDamage = statStore.playerDamage()
      monsterHp.value -= pDamage
      fightStore.addLog('player', 'attack', pDamage)

      if (specialCooldown.value > 0) {
         specialCooldown.value -= 1
      }

      monsterAttack()
   }

   const playerSpecialAttack = () => {
      const pDamage = statStore.playerSpecialDamage()
      monsterHp.value -= pDamage
      fightStore.addLog('player', 'special attack', pDamage)
      specialCooldown.value = 3
      monsterAttack()
   }

   const playerHeal = () => {
      const pHeal = statStore.healValue()
      if (playerMp.value > 10) {
         if (playerHp.value >= statStore.baseStats.hp.value) {
            playerHp.value = statStore.baseStats.hp.value
         } else {
            playerHp.value += pHeal
         }
         playerMp.value -= 10
      }

      if (specialCooldown.value > 0) {
         specialCooldown.value -= 1
      }

      fightStore.addLog('player', 'heal', pHeal)
      monsterAttack()
   }

   const monsterAttack = () => {
      const mDamage = monsterStore.monsterDamage()
      playerHp.value -= mDamage
      fightStore.addLog('monster', 'attack', mDamage)
   }

   const giveup = () => {
      playerHp.value = 0
   }

   const resetgame = () => {
      monsterStore.level = 1
      statStore.status.str.value = 5
      statStore.status.vit.value = 5
      statStore.status.int.value = 5
   }


</script>

<template>
   <div
      v-if="success || gameover"
      class="absolute inset-0 z-10 flex items-center justify-center bg-black/70"
   >
      <div class="flex flex-col items-center text-center modal-box">
         <h3
            class="text-3xl font-bold"
            :class="success ? 'text-green-500' : 'text-red-500'"
         >{{ success ? 'Success' : 'Game Over' }}</h3>
         <p class="py-4 text-xl">{{ success ? 'Level Up!' : '' }}</p>
         <div class="modal-action">
            <RouterLink
               :to="{ name: 'character' }"
               v-if="success"
               class="btn btn-lg btn-primary"
            >Next Level</RouterLink>
            <RouterLink
               :to="{ name: 'home' }"
               @click="resetgame"
               v-else
               class="btn btn-lg btn-error"
            >New Game</RouterLink>
         </div>
      </div>
   </div>

   <section class="container box h-3/4">
      <div class="flex flex-col h-full">
         <div class="flex justify-between w-full h-32 gap-5">
            <div class="flex flex-col w-1/2 gap-2">
               <div class="flex items-end justify-between w-full">
                  <span class="text-sm text-white">Level {{ statStore.level }}</span>
                  <p class="text-xl text-green-500">{{ statStore.name }}</p>
               </div>
               <HealthBar
                  :hp="playerHp"
                  :mp="playerMp"
               />
            </div>
            <div class="flex flex-col w-1/2 gap-2">
               <div class="flex items-end justify-between w-full">
                  <p class="text-xl text-red-500 text-end">Monster</p>
                  <span class="text-sm text-white">Level {{ monsterStore.level }}</span>
               </div>
               <HealthBar :hp="monsterHp" />
            </div>
         </div>

         <div class="flex flex-col items-center justify-center w-2/3 gap-5 mx-auto mt-5 lg:flex-row h-1/6">
            <button
               class="w-full lg:w-44 btn btn-lg btn-outline btn-primary"
               @click="playerAttack"
            >ATTACK</button>
            <button
               :disabled="specialCooldown > 0"
               class="w-full lg:w-44 btn btn-lg btn-outline btn-secondary"
               @click="playerSpecialAttack"
            >SPECIAL ATTACK</button>
            <button
               :disabled="playerMp < 10"
               class="w-full lg:w-44 btn btn-lg btn-outline btn-info"
               @click="playerHeal"
            >HEAL</button>
            <button
               class="w-full lg:w-44 btn btn-lg btn-outline btn-warning"
               @click="giveup"
            >GIVE UP</button>
         </div>

         <div class="flex-1 my-5 overflow-hidden">
            <div class="w-2/3 h-full mx-auto overflow-scroll text-center box">
               <p v-for="log in fightStore.logs">
                  <span
                     :class="{ 'text-green-500': log.by === 'player', 'text-red-500': log.by === 'monster' }">{{ log.by === 'player' ? 'Player' : 'Monster' }}
                  </span>
                  <span v-if="log.action === 'heal'">
                     heals himself for <span class="text-green-400">{{ log.value }}</span></span>
                  <span v-else> attacks and deals <span class="text-yellow-500">{{ log.value }}</span> </span>
               </p>
            </div>
         </div>


      </div>
   </section>
</template>