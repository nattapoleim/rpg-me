<script setup>
   import { ArrowUp } from 'lucide-vue-next'
   import { computed } from 'vue';

   const props = defineProps(['status', 'statPoints', 'increaseStat'])


</script>

<template>
   <div class="relative flex flex-col flex-1 gap-5 p-10 text-lg box">
      <div
         v-for="(stat) in props.status"
         :key="stat.title"
         class="grid w-full grid-cols-3 gap-5"
      >
         <p><strong>{{ stat.title }}</strong></p>
         <p>{{ stat.value }}</p>
         <button
            class="flex-1 btn btn-sm btn-outline btn-primary"
            :disabled="props.statPoints <= 0"
            @click="props.increaseStat(stat.title)"
         >
            <ArrowUp class="w-4 h-4" />
         </button>
      </div>
      <div class="absolute bottom-5 right-5">
         <p><strong>Stats Points</strong> : {{ props.statPoints }}</p>
      </div>
   </div>
</template>