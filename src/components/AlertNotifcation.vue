<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="transform -translate-y-3 opacity-0"
    enter-to-class="transform translate-y-0 opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="transform translate-y-0 opacity-100"
    leave-to-class="transform -translate-y-3 opacity-0"
  >
    <div
      v-if="auth.showAlert"
      class="alert shadow-lg fixed top-4 left-1/2 transform -translate-x-1/2 w-96 z-50 animate-fade-in"
    >
      <div class="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="stroke-info flex-shrink-0 w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span class="ml-2">{{ auth.alertMessage }}</span>
      </div>
    </div>
  </Transition>
</template>
<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="transform -translate-y-3 opacity-0"
    enter-to-class="transform translate-y-0 opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="transform translate-y-0 opacity-100"
    leave-to-class="transform -translate-y-3 opacity-0"
  >
    <div
      v-if="auth.showAlert"
      role="alert"
      class="alert alert-vertical sm:alert-horizontal fixed top-4 left-1/2 -translate-x-1/2 w-96 z-50 shadow-lg"
      :class="alertColorClass"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="h-6 w-6 shrink-0 stroke-current"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <div>
        <h3 class="font-bold">{{ auth.alertTitle }}</h3>
        <div class="text-xs">{{ auth.alertMessage }}</div>
      </div>
      <button class="btn btn-sm" @click="auth.showAlert = false">Tutup</button>
    </div>
  </Transition>
</template>

<script setup>
import { computed } from 'vue'
import { authStore } from '@/stores/auth'

const auth = authStore()

const alertColorClass = computed(() => {
  switch (auth.alertType) {
    case 'success':
      return 'alert-success'
    case 'error':
      return 'alert-error'
    case 'warning':
      return 'alert-warning'
    case 'info':
    default:
      return 'alert-info'
  }
})
</script>
