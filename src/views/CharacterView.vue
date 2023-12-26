<script setup>
   import { useRouter, RouterLink } from 'vue-router';
   import { onMounted } from 'vue';

   import CharacterStatus from '@/components/CharacterStatus/CharacterStatus.vue';
   import Hero from '@/assets/Hero.png'

   import { usePlayerStore } from '../stores/player'

   const router = useRouter()
   const statStore = usePlayerStore()

   onMounted(() => {
      if (statStore.name === '') {
         router.push({ name: 'home' })
      }
   })
</script>

<template>
   <section class="container max-w-6xl max-h-[600px] h-[600px] box">
      <div class="flex flex-col items-center justify-center w-full h-full gap-5 p-10 lg:flex-row">
         <div class="hidden w-1/3 h-full box lg:block">
            <img
               class="object-cover h-full"
               :src="Hero"
               alt="character-img"
            >
         </div>
         <CharacterStatus />
         <RouterLink
            :to="{ name: 'fight' }"
            class="w-full text-xl lg:w-fit lg:h-full btn btn-error btn-outline"
         >
            FIGHT
         </RouterLink>
      </div>
   </section>
</template>