<script setup>
import { onMounted } from 'vue'
import { useCategoryStore } from '@/stores/category'

const categoryStore = useCategoryStore()

onMounted(async () => {
  await categoryStore.getCategory()
  console.log('Data kategori:', categoryStore.category)
})
</script>

<template>
  <div class="p-4">
    <h1 class="text-xl font-bold mb-4">Kategori</h1>
    <ul>
      <li v-for="item in categoryStore.category" :key="item.id">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>
