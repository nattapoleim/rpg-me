<script setup>
   import { useRouter, RouterLink } from 'vue-router';
   import { onMounted } from 'vue';

   import CharacterStatus from '@/components/CharacterStatus/CharacterStatus.vue';
   import Hero from '@/assets/Hero.png'

   import { useStatStore } from '../stores/characterStats'

   const router = useRouter()
   const statStore = useStatStore()

   onMounted(() => {
      if (statStore.name === '') {
         router.push({ name: 'home' })
      }
   })
</script>

<template>
   <section class="container h-3/4 box lg:h-2/4">
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