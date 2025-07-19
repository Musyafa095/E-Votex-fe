<template>
  <div>
    <!-- Mobile Menu Button -->
    <button
      @click="toggleSidebar"
      class="lg:hidden fixed top-4 left-4 z-20 btn btn-circle btn-ghost"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          v-if="!isOpen"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
        <path
          v-else
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>

    <!-- Sidebar buat back -->
    <div
      v-if="isOpen"
      @click="toggleSidebar"
      class="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
    ></div>

    <!-- Sidebar -->
    <div
      :class="[
        'bg-base-100 fixed lg:relative z-20 min-h-screen transition-all duration-300',
        isCollapsed ? 'w-20' : 'w-64',
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      ]"
    >
      <!-- Toggle Collapse Button (Desktop only) -->
      <button
        @click="toggleCollapse"
        class="hidden lg:block absolute -right-3 top-10 btn btn-circle btn-sm btn-ghost"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          :class="{ 'rotate-180': isCollapsed }"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <!-- Logo/Brand -->
      <div class="p-4 mb-6">
        <h2
          :class="[
            'font-bold transition-all duration-300 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 font-monserrat bg-clip-text text-transparent',
            isCollapsed ? 'text-lg text-center' : 'text-2xl',
          ]"
        >
          {{ isCollapsed ? 'EV' : 'E-Votex' }}
        </h2>
      </div>

      <!-- Main Menu -->
      <ul class="menu menu-sm bg-base-100 rounded-box mx-2">
        <li>
          <router-link to="/dashboard" class="active:bg-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
              />
            </svg>
            <span :class="{ hidden: isCollapsed }">Dashboard</span>
          </router-link>
        </li>
        <li>
          <router-link to="/dashboard/movie">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
              />
            </svg>
            <span :class="{ hidden: isCollapsed }">kandidat</span>
          </router-link>
        </li>
        <li>
          <router-link to="/dashboard/genre">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
            <span :class="{ hidden: isCollapsed }">Category</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      isOpen: false,
      isCollapsed: false,
    }
  },
  methods: {
    toggleSidebar() {
      this.isOpen = !this.isOpen
    },
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed
    },
  },
  watch: {
    $route() {
      if (window.innerWidth < 1024) {
        this.isOpen = false
      }
    },
  },
}
</script>
