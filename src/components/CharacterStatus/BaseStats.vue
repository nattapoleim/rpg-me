<script setup>
   const props = defineProps(['baseStats'])


</script>

<template>
   <div class="flex flex-col flex-1 gap-5 p-10 text-lg box">
      <div
         v-for="base in props.baseStats"
         :key="base.title"
         class="grid grid-cols-3"
      >
         <p><strong :class="base.style">{{ base.title }}</strong></p>
         <p>{{ base.title === 'ATK' ? `${base.min} - ${base.max}` : base.value }}</p>
      </div>
   </div>
</template>