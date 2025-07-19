<template>
  <form
    class="w-full max-w-xl p-8 bg-white rounded-lg shadow-xl border-2 border-gray-200 text-black"
    @submit.prevent="onSubmit"
  >
    <!-- Alert Component -->
    <div
      v-if="auth.showAlert"
      role="alert"
      class="alert alert-success mb-6 p-4 flex items-center gap-2 bg-black text-blue-600 rounded-lg shadow-lg"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{{ auth.alertMessage }}</span>
    </div>
    <!-- Title -->
    <h2 class="text-2xl font-bold text-center text-gray-800 mb-8">
      {{ isRegister ? 'Buat Akun' : 'Login Akun' }}
    </h2>

    <!-- Name Field -->
    <div class="form-control space-y-2 mb-6" v-if="isRegister">
      <label class="label">
        <span class="block text-sm font-medium text-gray-700">Nama</span>
      </label>
      <input
        type="text"
        placeholder="Masukkan nama"
        required
        class="w-full h-12 px-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white text-black"
        v-model="formData.name"
        @blur="v$.name.$touch()"
      />
      <p v-if="v$.name.$error" class="invalid text-sm">
        {{ v$.name.$errors[0].$message }}
      </p>
    </div>

    <!-- Email Field -->
    <div class="form-control space-y-2 mb-6">
      <label class="label">
        <span class="block text-sm font-medium text-gray-700">Email</span>
      </label>
      <input
        type="email"
        placeholder="Masukkan email"
        required
        class="w-full h-12 px-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white text-black"
        v-model="formData.email"
        @blur="v$.email.$touch()"
      />
      <p v-if="v$.email.$error" class="invalid text-sm">
        {{ v$.email.$errors[0].$message }}
      </p>
    </div>

    <!-- Password Field -->
    <div class="form-control space-y-2 mb-6">
      <label class="label">
        <span class="block text-sm font-medium text-gray-700">Kata Sandi</span>
      </label>
      <input
        type="password"
        placeholder="Masukkan kata sandi"
        required
        class="w-full h-12 px-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white text-black"
        v-model="formData.password"
        @blur="v$.password.$touch()"
      />
      <p v-if="v$.password.$error" class="invalid text-sm">
        {{ v$.password.$errors[0].$message }}
      </p>
    </div>

    <!-- konfirmasi pasword -->
    <div class="form-control space-y-2 mb-6" v-if="isRegister">
      <label class="label">
        <span class="block text-sm font-medium text-gray-700">Konfirmasi Kata Sandi</span>
      </label>
      <input
        type="password"
        placeholder="Konfirmasi kata sandi"
        required
        class="w-full h-12 px-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white text-black"
        v-model="formData.password_confirmation"
        @blur="v$.password_confirmation.$touch()"
      />
      <p v-if="v$.password_confirmation.$error" class="invalid text-sm">
        {{ v$.password_confirmation.$errors[0].$message }}
      </p>
    </div>

    <!-- Login/Register Switch -->
    <p class="text-center text-sm text-gray-600 mb-6">
      {{ isRegister ? 'Sudah punya akun?' : 'Belum punya akun?' }}
      <RouterLink
        :to="isRegister ? '/login' : '/register'"
        class="text-blue-600 hover:text-blue-700 font-medium ml-1"
        >{{ isRegister ? 'Masuk' : 'Daftar' }}</RouterLink
      >
    </p>

    <!-- Submit Button with Gradient -->
    <div class="form-control">
      <button
        class="w-full h-12 bg-gradient-to-r from-red-500 via-purple-800 to-blue-600 text-white font-bold rounded-lg transition-all duration-300 hover:scale-105 active:scale-95"
        type="submit"
        :disabled="loading"
      >
        {{ isRegister ? 'Daftar' : 'Masuk' }}
      </button>
    </div>
  </form>
</template>

<script setup>
// Your existing script stays exactly the same
import { authStore } from '@/stores/auth'
import { ref, computed, reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

const showAlert = ref(false)
const alertMessage = ref('')

const rules = computed(() => {
  return {
    name: { required },
    email: { required },
    password: { required },
    password_confirmation: { required },
  }
})

const auth = authStore()
const props = defineProps({
  isRegister: {
    type: Boolean,
    default: false,
  },
})

const formData = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
})

const v$ = useVuelidate(rules, formData)
const onSubmit = async () => {
  try {
    if (props.isRegister) {
      await auth.register(formData)
      alertMessage.value = 'Akun berhasil dibuat!'
    } else {
      await auth.login(formData)
      alertMessage.value = 'Login berhasil!'
    }
    showAlert.value = true

    setTimeout(() => {
      showAlert.value = false
    }, 5000)
  } catch (error) {
    console.error(error)
  }
}
</script>

<style scoped>
.invalid {
  color: red;
  font-size: 12px;
  font-weight: bold;
}
</style>
