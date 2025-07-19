import { ref } from 'vue'
import { defineStore } from 'pinia'
import { apiClient } from '@/config/api'

export const useCategoryStore = defineStore('category', () => {
  const category = ref([])
  const categoryId = ref(null)

  const getCategory = async () => {
    try {
      const response = await apiClient.get('/category')
      category.value = response.data.data
      return response.data.data
    } catch (error) {
      console.log('error fetching categories', error.message)
      return []
    }
  }
  const getCategoryDetail = async (id) => {
    try {
      const response = await apiClient.get(`/category/${id}`)
      categoryId.value = response.data.data
      return categoryId.value
    } catch (error) {
      console.error('Error fetching category detail:', error.message)
      return null
    }
  }

  return { category, categoryId, getCategory, getCategoryDetail }
})
