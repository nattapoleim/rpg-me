<script setup>
   import { computed, watch } from 'vue';

   const props = defineProps({
      hp: Number,
      mp: Number
   })

   const maxHp = props.hp
   const maxMp = props.mp

   const hpBar = computed(() => {
      return (props.hp / maxHp) * 100
   })

   const mpBar = computed(() => {
      return (props.mp / maxMp) * 100
   })

</script>

<template>
   <div class="flex flex-col w-full h-full text-xl">
      <div class="relative border rounded-t-md h-1/2">
         <div
            class="flex items-center justify-center h-full bg-red-500 rounded-t-md"
            :style="{ width: `${hpBar}%` }"
         >
         </div>
         <p class="absolute inset-0 grid text-white place-content-center">
            {{ props.hp }}
         </p>
      </div>
      <div
         v-if="props.mp"
         class="relative border rounded-b-md h-1/2"
      >
         <div
            class="flex items-center justify-center h-full bg-blue-500 rounded-b-md"
            :style="{ width: `${mpBar}%` }"
         >
         </div>
         <p class="absolute inset-0 grid text-white place-content-center">
            {{ props.mp }}
         </p>
      </div>
   </div>
</template>