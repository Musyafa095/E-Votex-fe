<template>
  <div class="hero bg-gradient-to-br from-purple-100 to-blue-100 min-h-screen">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div class="text-center w-1/2 lg:text-left">
        <h1
          class="text-4xl md:text-5xl text-black font-bold pb-2 bg-gradient-to-r from-red-500 via-purple-800 to-blue-600 bg-clip-text text-transparent"
        >
          Register Akun
        </h1>
        <p class="py-6 text-gray-700 text-lg leading-relaxed font-roboto">
          Daftarkan diri Anda untuk mendapatkan Kandidat dan layanan eksklusif langsung ke email
          Anda. Jangan lewatkan update Kandidat penting setiap hari!
        </p>
      </div>
      <Form :isRegister="true" />
    </div>
  </div>
</template>

<script setup>
import Form from '@/components/Form.vue'
</script>
