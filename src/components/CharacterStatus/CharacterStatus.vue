<script setup>
   import BaseStats from './BaseStats.vue';
   import Status from './Status.vue';

   import { usePlayerStore } from '../../stores/player'

   const playerStore = usePlayerStore()
</script>

<template>
   <section class="flex flex-col w-full h-full gap-5 lg:w-2/3 box">
      <div class="flex items-end gap-5">
         <h2 class="text-3xl font-medium text-primary">{{ playerStore.name }}</h2>
         <span>Level {{ playerStore.level }}</span>
      </div>
      <div class="flex w-full h-full gap-5">
         <BaseStats :baseStats="playerStore.baseStats" />
         <Status
            :status="playerStore.status"
            :statPoints="playerStore.statPoints"
            :increaseStat="playerStore.increaseStat"
         />
      </div>
   </section>
</template>../../stores/player