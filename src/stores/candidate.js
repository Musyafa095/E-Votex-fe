import { ref } from 'vue'
import { defineProps } from 'vue'
import { apiClient } from '@/config/api'

export const useCandidateStore = defineStore('candidate', () => {
  const candidate = ref([])
  const candidateDetail = ref(null)
  const vote = ref([])
  const isLoading = ref(false)
  const error = ref(null)
  const currentPage = ref(1)
  const totalPages = ref(1)
  const totalCandidateCount = ref(0)

  const getCandidadate = async (page = 1, categoryId = null) => {
    isLoading.value = true
    error.value = null
    try {
      const url = categoryId
        ? `/candidate?page=${page}&per_page=8&category=${categoryId}`
        : `/candidate?page=${page}&per_page=8`
      const response = await apiClient.get(url)
      candidate.value = response.data.data.data || []
      currentPage.value = response.data.data.current_page || 1
      totalPages.value = response.data.data.last_page || 1
      totalCandidateCount.value = response.data.data.total || 0
    } catch (err) {
      error.value = err.message || 'Gagal mengambil data candidate'
      console.error('Error fetching candidates:', err)
      candidate.value = []
    } finally {
      isLoading.value = false
    }
  }

  const getCandidateById = async (id) => {
    isLoading.value = true
    error.value = null
    try {
      const response = await apiClient.get(`/candidate/${id}`)
      if (!response.data || !response.data.data) {
        throw new Error('Kandidat tidak ditemukan')
      }
      candidateDetail.value = response.data.data
      vote.value = response.data.data.reviews || []
      return candidateDetail.value
    } catch (err) {
      error.value = err.message || 'Gagal mengambil detail kandidat'
      console.error('Error fetching kandidat detail:', err)
      candidateDetail.value = null
      vote.value = []
      throw err // Lempar eror supaya bisa ditangkap di komponen
    } finally {
      isLoading.value = false
    }
  }
  return {
    candidate,
    candidateDetail,
    vote,
    isLoading,
    error,
    getCandidate,
    getCandidateById,
    totalPages,
    currentPage,
    totalCandidateCount,
  }
})
