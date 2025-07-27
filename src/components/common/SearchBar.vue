<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push(`/products?search=${encodeURIComponent(searchQuery.value.trim())}`)
  }
}
</script>

<template>
  <div class="relative">
    <div class="flex">
      <input v-model="searchQuery" type="text" placeholder="Search products..."
        class="w-full px-4 py-2 rounded-l-md border-gray-300 focus:ring-primary-500 focus:border-primary-500"
        @keyup.enter="handleSearch" />
      <button @click="handleSearch"
        class="px-6 py-2 bg-primary-600 text-white rounded-r-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
        Search
      </button>
    </div>
  </div>
</template>