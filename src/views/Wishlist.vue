<template>
  <div class="wishlist-page p-6 max-w-5xl mx-auto">
    <h1 class="text-3xl font-bold mb-8 flex items-center gap-3">
      <svg class="h-8 w-8 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z" /></svg>
      My Wishlist
    </h1>
    <div v-if="wishlist.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="item in wishlist" :key="item.id" class="bg-white rounded-xl shadow-lg p-6 flex flex-col hover:shadow-2xl transition-shadow relative group">
        <img :src="item.image || (item.product_images && item.product_images[0]?.url) || 'https://via.placeholder.com/300'" :alt="item.name" class="w-full h-48 object-contain rounded mb-4 bg-gray-50" />
        <h2 class="text-lg font-semibold mb-1 line-clamp-2">{{ item.name }}</h2>
        <p class="text-primary-600 font-bold mb-1 text-xl">${{ item.price }}</p>
        <div class="flex flex-wrap gap-2 mb-2">
          <span v-if="item.brand?.name" class="bg-primary-100 text-primary-700 px-2 py-1 rounded text-xs font-semibold">{{ item.brand.name }}</span>
          <span v-if="item.category?.name" class="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-semibold">{{ item.category.name }}</span>
        </div>
        <div class="flex-1"></div>
        <button class="absolute top-3 right-3 bg-pink-100 text-pink-600 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity" @click="removeFromWishlist(item.id)">
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
    </div>
    <div v-else class="text-center text-gray-400 py-20 text-2xl flex flex-col items-center">
      <svg class="h-16 w-16 mb-4 text-pink-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z" /></svg>
      Your wishlist is empty.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const wishlist = ref([])

const loadWishlist = () => {
  const data = localStorage.getItem('wishlist')
  wishlist.value = data ? JSON.parse(data) : []
}

const removeFromWishlist = (id) => {
  wishlist.value = wishlist.value.filter(item => item.id !== id)
  localStorage.setItem('wishlist', JSON.stringify(wishlist.value))
  window.dispatchEvent(new Event('storage')) // update header badge
}

onMounted(loadWishlist)
</script>

<style scoped>
.wishlist-page {
  min-height: 60vh;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>