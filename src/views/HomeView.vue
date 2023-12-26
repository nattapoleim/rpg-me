<script setup>
   import { ref } from 'vue';
   import { useRouter } from 'vue-router';

   import ForestImg from '@/assets/forest-home.png'

   import { useStatStore } from '../stores/characterStats'

   const statStore = useStatStore()
   const router = useRouter()

   const enteredName = ref('')

   const startGame = () => {
      if (enteredName.value) {
         statStore.name = enteredName.value
         router.push({ name: 'character' })
      }

   }

</script>

<template>
   <main class="container box h-3/4 lg:h-2/4">
      <div class="flex flex-col items-center justify-between h-full gap-10 pt-10">
         <img
            class="object-cover w-full h-3/5 card"
            :src="ForestImg"
            alt="home-img"
         >
         <div class="mb-4">
            <button
               class="text-3xl btn btn-wide btn-outline btn-lg btn-primary"
               onclick="my_modal_1.showModal()"
            >START</button>

         </div>
      </div>

      <dialog
         id="my_modal_1"
         class="modal"
      >
         <div class="flex flex-col items-center modal-box">
            <h3 class="text-lg font-bold">Enter your name..</h3>
            <input
               class="w-full mt-5 text-center input input-primary"
               type="text"
               v-model="enteredName"
            >
            <div class="modal-action">
               <button
                  class="text-3xl btn btn-wide btn-primary"
                  @click="startGame"
               >START</button>
            </div>
         </div>
      </dialog>
   </main>
</template>
