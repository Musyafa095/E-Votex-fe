<template>
  <div
    class="hero bg-gradient-to-br from-purple-100 to-blue-100 min-h-screen rounded-lg shadow-xl border-2 border-gray-200"
  >
    <div
      class="hero-content max-w-7xl mx-auto w-full justify-between gap-12 flex-col lg:flex-row-reverse"
    >
      <!-- Text Section -->
      <div class="lg:w-1/2 max-w-xl">
        <h1
          class="text-4xl md:text-5xl text-black font-bold pb-2 bg-gradient-to-r from-red-500 via-purple-800 to-blue-600 bg-clip-text text-transparent"
        >
          Selamat Datang Kembali!
        </h1>
        <p class="text-gray-700 text-lg leading-relaxed font-roboto">
          Silakan masuk ke akun Anda untuk mengakses Voting Mahasiswa terbaru. Tetap terhubung
          dengan informasi terkini hanya di E-Votex.
        </p>
      </div>

      <div class="lg:w-1/2 w-full max-w-xl">
        <Form :isRegister="false" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Form from '@/components/Form.vue'
</script>
