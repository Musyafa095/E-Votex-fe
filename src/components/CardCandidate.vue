<template>
  <div
    class="card card-compact bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden dark:shadow-gray-700 dark:hover:shadow-gray-600"
    v-for="data in dataProps"
    :key="data.id"
  >
    <!-- Gambar Movie -->
    <figure class="w-full h-56 overflow-hidden">
      <img
        :src="data.iamge"
        :alt="data.name"
        class="w-full h-full object-cover transition-all duration-300 hover:scale-105"
        loading="lazy"
      />
    </figure>

    <!-- Konten Movie -->
    <div class="card-body light:text-gray-800 p-4">
      <h2 class="text-xl font-bold font-montserrat leading-tight line-clamp-2">
        {{ data.title }}
      </h2>
      <p class="text-sm light:text-gray-500 font-inter">📅 {{ data.date }}</p>
      <div class="card-actions justify-center mt-3 flex gap-2">
        <button
          @click="toggleTrailer(data.id)"
          class="btn btn-secondary hover:btn-primary transition-all duration-300 shadow-md"
        >
          visi & misi kandidat
        </button>

        <RouterLink
          :to="`/movie/${data.id}`"
          class="btn btn-info hover:bg-cyan-500 transition-all duration-300 shadow-md"
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  dataProps: {
    type: Array,
    required: true,
    default: () => [],
  },
})
</script>
