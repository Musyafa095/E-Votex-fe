import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { apiClient } from '@/config/api'
import { onMounted } from 'vue'

export const authStore = defineStore('auth', () => {
  const router = useRouter()
  const token = ref(localStorage.getItem('token') || null)
  const currentUser = ref(null)
  const profile = ref(null)
  try {
    const storedUser = localStorage.getItem('user')
    currentUser.value = storedUser ? JSON.parse(storedUser) : null
  } catch (error) {
    console.error('Error parsing user data:', error)
    localStorage.removeItem('user') // Hapus data yg korup
  }

  try {
    const storedProfile = localStorage.getItem('profile')
    profile.value = storedProfile ? JSON.parse(storedProfile) : null
  } catch (error) {
    console.error('Error parsing profile data:', error)
    localStorage.removeItem('profile') // Hapus data yg korup
  }

  // State untuk alert notif
  const showAlert = ref(false)
  const alertMessage = ref('')

  function showNotification(message) {
    alertMessage.value = message
    showAlert.value = true

    setTimeout(() => {
      showAlert.value = false
    }, 5000)
  }

  async function register({ name, email, password, password_confirmation }) {
    try {
      const { data } = await apiClient.post('/auth/register', {
        name,
        email,
        password,
        password_confirmation,
      })

      showNotification(data.message)
      router.replace('/login')
    } catch (error) {
      console.error(error.message)
      showNotification('Pendaftaran gagal, silakan coba lagi.')
    }
  }

  async function login({ email, password }) {
    try {
      const { data } = await apiClient.post('/auth/login', { email, password })

      token.value = data.token
      currentUser.value = data.user

      localStorage.setItem('token', token.value)
      localStorage.setItem('user', JSON.stringify(currentUser.value))

      if (currentUser.value?.role?.name === 'admin') {
        showNotification('Berhasil login sebagai admin')
        router.replace('/')
      } else if (currentUser.value?.is_verified) {
        showNotification('Selamat anda berhasil Login')
        router.replace('/')
      } else {
        showNotification('Silakan verifikasi email Anda terlebih dahulu')
        router.replace('/verify-account')
      }
    } catch (error) {
      console.error(error.message)
      showNotification('Email atau Password salah.')
    }
  }

  async function logout() {
    try {
      const { data } = await apiClient.post('/auth/logout', null, {
        headers: { Authorization: `Bearer ${token.value}` },
      })

      token.value = null
      currentUser.value = null
      profile.value = null

      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('profile')

      showNotification(data.message)
      router.replace('/login')
    } catch (error) {
      console.error(error.message)
      showNotification('Gagal logout, silakan coba lagi.')
    }
  }
  async function getUserLogged() {
    try {
      const { data } = await apiClient.get('/auth/me', {
        headers: { Authorization: `Bearer ${token.value}` },
      })

      currentUser.value = data.user
      localStorage.setItem('user', JSON.stringify(data.user))

      return data.user
    } catch (error) {
      console.error('Token invalid atau sesi habis, menghapus data user.')
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('profile')
      token.value = null
      currentUser.value = null
    }
  }

  async function verifyAccount(otp) {
    try {
      const { data } = await apiClient.post(
        '/auth/account_verification',
        { otp },
        { headers: { Authorization: `Bearer ${token.value}` } },
      )

      await getUserLogged()

      showNotification('Selamat Anda berhasil login dan telah terverifikasi.')
      router.replace('/')
    } catch (error) {
      console.error(error.message)
      showNotification('Kode OTP salah atau sudah kadaluarsa.')
    }
  }

  async function generateOtp(email) {
    try {
      const { data } = await apiClient.post(
        '/auth/generate_otp_code',
        { email },
        { headers: { Authorization: `Bearer ${token.value}` } },
      )

      showNotification(data.message)
    } catch (error) {
      console.error(error.message)
      showNotification('Gagal mengirim ulang kode OTP.')
    }
  }
  async function uploadProfile(payload) {
    try {
      const { data } = await apiClient.post('/profile', payload, {
        headers: { Authorization: `Bearer ${token.value}` },
      })

      currentUser.value = data.user
      localStorage.setItem('profile', JSON.stringify(data.user))

      showNotification('Profile berhasil diperbarui!')
    } catch (error) {
      console.error('Gagal mengupdate profile:', error.response?.data)
      showNotification(error.response?.data?.message || 'Gagal mengupdate profile.')
    }
  }
  async function uploadVote(candidate_id, vote) {
    try {
      if (!currentUser.value) {
        showNotification('Anda harus login untuk mengirim voting.')
        return
      }
      if (!token.value) {
        showNotification('Token tidak ditemukan. Silakan login ulang.')
        return
      }

      const payload = {
        candidate_id,
        vote,
      }

      const { data } = await apiClient.post('/vote', payload, {
        headers: { Authorization: `Bearer ${token.value}` },
      })

      if (!data || !data.data) {
        throw new Error('Data  vote anda tidak ditemukan dalam respons API.')
      }

      showNotification('Voting berhasil ditambahkan!')
      return data.data
    } catch (error) {
      console.error('Gagal mengirim voting:', error.response?.data || error.message)
      showNotification(error.response?.data?.message || 'Gagal mengirim voting.')
    }
  }

  onMounted(async () => {
    await getUserLogged()
  })

  return {
    token,
    register,
    currentUser,
    login,
    logout,
    getUserLogged,
    verifyAccount,
    generateOtp,
    uploadProfile,
    showAlert,
    alertMessage,
    showNotification,
    profile,
    uploadVote,
  }
})
