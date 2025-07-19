<template>
  <Default>
    <div class="min-h-screen bg-base-100 transition-colors duration-200">
      <!-- Loading State -->
      <div
        v-if="isLoading"
        class="container mx-auto px-4 py-16 flex justify-center items-center min-h-[400px]"
      >
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"
        ></div>
        <p class="ml-4 text-gray-600 dark:text-gray-300">Memuat Voting...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="container mx-auto px-4 py-16 text-center">
        <div class="bg-red-50 dark:bg-red-900/30 p-6 rounded-lg max-w-lg mx-auto shadow-lg">
          <p class="text-red-600 dark:text-red-400 text-lg">{{ error }}</p>
          <button
            @click="fetchCandidateDetail"
            class="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            Coba Lagi
          </button>
        </div>
      </div>

      <!-- Main Content -->
      <div v-else-if="candidateDetail" class="w-full pb-12">
        <!-- Top Navigation -->
        <nav class="bg-white dark:bg-gray-800 shadow-sm mb-6 sticky top-0 z-10">
          <div class="container mx-auto px-4 max-w-6xl py-4">
            <RouterLink
              to="/"
              class="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clip-rule="evenodd"
                />
              </svg>
              Kembali ke Beranda
            </RouterLink>
          </div>
        </nav>

        <!-- Movie Header Section -->
        <div class="container mx-auto px-4 max-w-6xl">
          <div class="flex-col items-center mb-8">
            <h1
              class="text-4xl md:text-5xl font-bold light:text-gray-900 font-montserrat text-center mb-2 leading-tight"
            >
              {{ movieDetail.title }}
            </h1>
            <p class="light:text-gray-600 text-center font-roboto font-bold text-md">
              Tahun Rilis:
              <span class="text-lg font-bold text-cyan-600 dark:text-cyan-400 mb-8">
                {{ movieDetail.year }}</span
              >
            </p>
            <!-- Genre Tags -->
            <div class="flex flex-wrap justify-center gap-2 mb-8">
              <span
                v-for="genre in movieDetail.genres"
                :key="genre"
                class="px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium"
              >
                {{ genre }}
              </span>
            </div>
          </div>
          <!-- Video Player/Poster Section -->
          <div class="bg-black rounded-xl overflow-hidden shadow-xl mb-10 max-w-5xl mx-auto">
            <!-- Video Player -->
            <div v-if="showPlayer" class="w-full aspect-video">
              <iframe
                v-if="embedUrl"
                :src="embedUrl"
                frameborder="0"
                allowfullscreen
                class="w-full h-full"
              ></iframe>
              <div v-else class="w-full h-full flex items-center justify-center bg-gray-800">
                <p class="text-white">Video tidak tersedia</p>
              </div>
            </div>

            <!-- Poster dengan tombol play -->
            <div v-else class="relative aspect-video bg-gray-900">
              <img
                :src="movieDetail.poster"
                :alt="movieDetail.title"
                class="w-full h-full object-cover"
              />
              <div
                @click="playVideo"
                class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 hover:bg-opacity-50 transition-all cursor-pointer"
              >
                <div
                  class="w-20 h-20 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center transition-colors shadow-lg"
                >
                  <svg
                    class="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    ></path>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- Actions and Rating Section (Disejajarkan) -->
          <div class="flex flex-col md:flex-row items-center justify-center gap-6 mb-12 px-4">
            <!-- Rating Information -->
            <div
              class="bg-gray-100 dark:bg-gray-800 rounded-lg px-6 py-3 flex items-center shadow-md"
            >
              <div class="flex items-center">
                <svg class="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  ></path>
                </svg>
                <span class="ml-2 font-semibold text-gray-800 dark:text-gray-200"
                  >{{ reviews.length > 0 ? averageRating.toFixed(1) : '0.0' }}/5.0</span
                >
              </div>
              <div class="mx-3 h-5 border-r border-gray-300 dark:border-gray-600"></div>
              <span class="text-gray-600 dark:text-gray-300">{{ reviews.length }} reviews</span>
            </div>

            <!-- Action Buttons -->
            <div class="flex items-center gap-4">
              <button
                @click="playVideo"
                class="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center gap-2 font-medium shadow-md"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                Putar Film
              </button>
              <button
                @click="toggleLike"
                class="p-3 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors shadow-md"
              >
                <svg
                  class="w-6 h-6 transition-colors duration-200"
                  :class="liked ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          <!-- Summary dengan indent yang lebih lebar -->
          <div class="mb-12 max-w-5xl mx-auto px-6 md:px-12">
            <p
              class="text-lg light:text-gray-700 leading-relaxed text-justify first-letter:pl-4 font-montserrat"
            >
              {{ movieDetail.summary || movieDetail.content }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- Sosial Media -->
    <div class="border-t border-gray-200 light:border-gray-700 pt-6 mb-8 mx-8">
      <h3 class="text-lg font-semibold mb-4 light:text-gray-700">Bagikan movie</h3>
      <div class="flex items-center gap-3">
        <button
          class="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Bagikan ke Facebook"
        >
          <svg class="w-6 h-6 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z"
            />
          </svg>
        </button>
        <button
          class="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Bagikan ke X"
        >
          <svg class="w-6 h-6 text-black dark:text-white" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M3 3h4.37l4.62 7.63L16.63 3H21l-6.46 10.3L21 21h-4.37l-4.79-7.92L6.63 21H3l6.77-10.7L3 3z"
            />
          </svg>
        </button>
        <button
          class="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Bagikan ke WhatsApp"
        >
          <svg class="w-6 h-6 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
            />
          </svg>
        </button>
        <!-- Instagram Icon -->
        <button
          class="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Bagikan ke Instagram"
        >
          <svg class="w-6 h-6 text-[#E4405F]" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
            />
          </svg>
        </button>
      </div>
    </div>
    <!-- Reviews Section -->
    <section class="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 mb-2 mx-8">
      <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
        <span>Reviews</span>
        <span class="light:text-gray-700 text-lg">({{ reviews.length }})</span>
      </h2>
      <!-- Form Review (Hanya Jika User Login) -->
      <div v-if="user" class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm mb-2">
        <textarea
          v-model="newReview.comment"
          placeholder="Tulis review Anda..."
          class="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          rows="3"
        ></textarea>
        <!-- Rating Selection -->
        <div class="mt-3 flex items-center">
          <span class="mr-3 text-gray-700 dark:text-gray-300">Rating:</span>
          <div class="flex">
            <template v-for="star in 5" :key="star">
              <button
                @click="newReview.rating = star"
                @mouseover="hoverRating = star"
                @mouseleave="hoverRating = newReview.rating"
                type="button"
                class="p-1"
              >
                <svg
                  class="w-6 h-6"
                  :class="
                    star <= (hoverRating || newReview.rating)
                      ? 'text-yellow-400'
                      : 'text-gray-300 dark:text-gray-600'
                  "
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  ></path>
                </svg>
              </button>
            </template>
          </div>
          <span class="ml-2 text-gray-700 dark:text-gray-300">{{ newReview.rating }}/5</span>
        </div>
        <div class="mt-4 flex items-center justify-between">
          <p class="text-sm text-info font-mono">
            * Anda hanya dapat memberikan satu review untuk setiap film 📌
          </p>
          <button
            @click="handleSubmitReview"
            :disabled="!newReview.comment.trim() || newReview.rating === 0 || isSubmitting"
            class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
          >
            <span v-if="isSubmitting">Mengirim...</span>
            <span v-else>Kirim Review</span>
          </button>
        </div>
      </div>
      <!-- Jika Belum Login, Tampilkan Pesan -->
      <div v-else class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm mb-6 text-center">
        <p class="text-gray-600 dark:text-gray-400">
          Silakan
          <RouterLink to="/login" class="text-blue-600 hover:underline">login</RouterLink>
          untuk memberikan review
        </p>
      </div>
      <!-- Daftar Reviews -->
      <div v-if="sortedReviews.length > 0">
        <h2 class="text-xl font-semibold mb-2">Ulasan</h2>
        <div
          v-for="review in sortedReviews"
          :key="review.id"
          class="border p-4 rounded-lg my-3 bg-white dark:bg-gray-800"
        >
          <div class="flex items-center gap-3">
            <img
              :src="review.user.profile_image || defaultProfileImage"
              class="w-10 h-10 rounded-full object-cover"
              :alt="review.user.name"
            />
            <div>
              <p class="font-semibold text-gray-900 dark:text-gray-100">{{ review.user.name }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ formatDate(review.created_at) }}
              </p>
            </div>
          </div>
          <div class="flex items-center mt-2">
            <div class="flex">
              <template v-for="i in 5" :key="i">
                <svg
                  class="w-5 h-5"
                  :class="i <= review.rating ? 'text-yellow-400' : 'text-gray-300'"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  ></path>
                </svg>
              </template>
              <span class="ml-2 text-sm text-gray-600">{{ review.rating }}/5</span>
            </div>
          </div>
          <p class="mt-3 text-gray-700 dark:text-gray-300">{{ review.comment }}</p>
        </div>
      </div>
      <!-- Jika Tidak Ada Reviews -->
      <div v-else class="text-center py-8">
        <p class="light:text-gray-700 mb-2 font-roboto">Belum ada review untuk film ini 💬</p>
        <p class="text-sm light:text-gray-500">Jadilah yang pertama berbagi pendapat Anda!</p>
      </div>
    </section>
  </Default>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useMovieStore } from '@/stores/movie'
import { authStore } from '@/stores/auth'
import { apiClient } from '@/config/api'
import Default from '@/layouts/Default.vue'

// Inisialisasi
const route = useRoute()
const movieStore = useMovieStore()
const auth = authStore()
const user = computed(() => auth.currentUser)
const movieDetail = ref(null)
const isLoading = ref(true)
const error = ref(null)
const reviews = ref([])
const isSubmitting = ref(false)
const showPlayer = ref(false)
const hoverRating = ref(0)
const liked = ref(false)
const defaultProfileImage =
  'https://images.vexels.com/content/145908/preview/male-avatar-maker-2a7919.png'
const newReview = ref({
  comment: '',
  rating: 0,
})
const toggleLike = () => {
  liked.value = !liked.value
}

// Computed untuk URL pemutaran video dari Google Drive
const embedUrl = computed(() => {
  if (!movieDetail.value || !movieDetail.value.movie_url) return null

  // Cek apakah URL dari Google Drive
  if (movieDetail.value.movie_url.includes('drive.google.com')) {
    // Ekstrak ID file dari URL Google Drive
    let fileId = ''

    // Format: https://drive.google.com/file/d/FILE_ID/view
    if (movieDetail.value.movie_url.includes('/file/d/')) {
      const match = movieDetail.value.movie_url.match(/\/file\/d\/([^\/]+)/)
      if (match && match[1]) {
        fileId = match[1]
      }
    }
    // Format: https://drive.google.com/open?id=FILE_ID
    else if (movieDetail.value.movie_url.includes('?id=')) {
      const match = movieDetail.value.movie_url.match(/[?&]id=([^&]+)/)
      if (match && match[1]) {
        fileId = match[1]
      }
    }
    // Jika ID file ditemukan, buat URL embed untuk Google Drive
    if (fileId) {
      return `https://drive.google.com/file/d/${fileId}/preview`
    }
  }

  // Jika bukan Google Drive atau format tidak dikenali, kembalikan URL asli
  return movieDetail.value.movie_url
})

// Computed untuk rata-rata rating
const averageRating = computed(() => {
  if (!reviews.value || reviews.value.length === 0) return 0

  const validRatings = reviews.value
    .map((review) => parseFloat(review.rating))
    .filter((rating) => !isNaN(rating))

  if (validRatings.length === 0) return 0

  // Calculate the average
  const total = validRatings.reduce((sum, rating) => sum + rating, 0)
  return total / validRatings.length
})

// Computed untuk sorting reviews (terbaru di atas)
const sortedReviews = computed(() => {
  return [...reviews.value].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
})

// Helper format tanggal
const formatDate = (dateString) => {
  if (!dateString) return ''
  const d = new Date(dateString)
  if (isNaN(d.getTime())) return ''

  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d)
}

// Fungsi untuk memulai pemutaran video
const playVideo = () => {
  showPlayer.value = true

  // Scroll ke atas video jika perlu
  setTimeout(() => {
    const playerElement = document.querySelector('.aspect-video')
    if (playerElement) {
      playerElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, 100)
}

// Ambil detail movie dan reviews
const fetchMovieDetail = async () => {
  isLoading.value = true
  error.value = null

  try {
    const { data } = await apiClient.get(`/movie/${route.params.id}`)

    if (data && data.data) {
      movieDetail.value = data.data

      // Memproses reviews
      if (data.data.review && Array.isArray(data.data.review)) {
        reviews.value = data.data.review.map((rev) => ({
          id: rev.id,
          comment: rev.comment,
          rating: rev.rating,
          created_at: rev.created_at || new Date().toISOString(),
          user: {
            id: rev.user?.id || 0,
            name: rev.user?.name || 'Anonymous',
            profile_image: rev.user?.profile?.image || defaultProfileImage,
          },
        }))
      } else {
        reviews.value = []
      }
    } else {
      error.value = 'Gagal memuat data film'
    }
  } catch (err) {
    console.error('Gagal mengambil detail movie:', err)
    error.value = 'Terjadi kesalahan saat memuat film. Silakan coba lagi.'
  } finally {
    isLoading.value = false
  }
}

// Fungsi kirim review menggunakan auth.uploadReview
// Fungsi kirim review menggunakan auth.uploadReview
const handleSubmitReview = async () => {
  if (!newReview.value.comment.trim() || newReview.value.rating === 0 || isSubmitting.value) return

  try {
    isSubmitting.value = true

    const reviewData = await auth.uploadReview(
      route.params.id,
      newReview.value.comment.trim(),
      newReview.value.rating,
    )

    if (reviewData) {
      // Reset form review
      newReview.value.comment = ''
      newReview.value.rating = 0
      hoverRating.value = 0

      // Refresh seluruh data movie termasuk reviews terbaru
      await fetchMovieDetail()
    }
  } catch (error) {
    console.error('Gagal mengirim review:', error.response?.data || error.message)
  } finally {
    isSubmitting.value = false
  }
}
onMounted(() => {
  fetchMovieDetail()
})
</script>
