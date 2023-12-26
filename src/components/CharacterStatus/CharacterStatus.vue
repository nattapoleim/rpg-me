<script setup>
   import BaseStats from './BaseStats.vue';
   import Status from './Status.vue';

   import { useStatStore } from '../../stores/characterStats'

   const statStore = useStatStore()
</script>

<template>
   <section class="flex flex-col w-full h-full gap-5 lg:w-2/3 box">
      <div class="flex items-end gap-5">
         <h2 class="text-3xl font-medium text-primary">{{ statStore.name }}</h2>
         <span>Level {{ statStore.level }}</span>
      </div>
      <div class="flex w-full h-full gap-5">
         <BaseStats :baseStats="statStore.baseStats" />
         <Status
            :status="statStore.status"
            :statPoints="statStore.statPoints"
            :increaseStat="statStore.increaseStat"
         />
      </div>
   </section>
</template>