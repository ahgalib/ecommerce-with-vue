<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useCartStore } from '../../stores/cart'

const cart = useCartStore()

const cartCount = ref(0)
const wishlistCount = ref(0)

const updateCounts = () => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]')
  const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]')
  cartCount.value = cart.length
  wishlistCount.value = wishlist.length
}

onMounted(() => {
  updateCounts()
  window.addEventListener('storage', updateCounts)
})
</script>

<template>
  <header class="bg-white shadow-sm">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
      <div class="w-full py-6 flex items-center justify-between border-b border-gray-200">
        <div class="flex items-center space-x-8">
          <RouterLink to="/" class="text-2xl font-bold text-primary-600">
            ShopVue
          </RouterLink>
          <div class="relative group">
            <button class="text-base font-medium text-gray-500 hover:text-gray-900">
              Categories
            </button>
            <div class="absolute left-0 mt-2 w-64 bg-white shadow-lg rounded-md hidden group-hover:block">
              <ul class="py-2">
                <li class="px-4 py-2 hover:bg-gray-100 relative group">
                  <RouterLink to="/products?category=electronics">Electronics</RouterLink>
                  <div class="absolute left-full top-0 mt-0 w-64 bg-white shadow-lg rounded-md hidden group-hover:block">
                    <ul class="py-2">
                      <li v-for="i in 5" :key="`electronics-sub-${i}`" class="px-4 py-2 hover:bg-gray-100">
                        <RouterLink :to="`/products?subcategory=electronics-sub-${i}`">Subcategory {{ i }}</RouterLink>
                      </li>
                    </ul>
                  </div>
                </li>
                <li class="px-4 py-2 hover:bg-gray-100 relative group">
                  <RouterLink to="/products?category=fashion">Fashion</RouterLink>
                  <div class="absolute left-full top-0 mt-0 w-64 bg-white shadow-lg rounded-md hidden group-hover:block">
                    <ul class="py-2">
                      <li v-for="i in 10" :key="`fashion-sub-${i}`" class="px-4 py-2 hover:bg-gray-100">
                        <RouterLink :to="`/products?subcategory=fashion-sub-${i}`">Subcategory {{ i }}</RouterLink>
                      </li>
                    </ul>
                  </div>
                </li>
                <li class="px-4 py-2 hover:bg-gray-100 relative group">
                  <RouterLink to="/products?category=home-kitchen">Home & Kitchen</RouterLink>
                  <div class="absolute left-full top-0 mt-0 w-64 bg-white shadow-lg rounded-md hidden group-hover:block">
                    <ul class="py-2">
                      <li v-for="i in 15" :key="`home-kitchen-sub-${i}`" class="px-4 py-2 hover:bg-gray-100">
                        <RouterLink :to="`/products?subcategory=home-kitchen-sub-${i}`">Subcategory {{ i }}</RouterLink>
                      </li>
                    </ul>
                  </div>
                </li>
                <!-- Add more categories here -->
              </ul>
            </div>
          </div>
          <RouterLink to="/about" class="text-base font-medium text-gray-500 hover:text-gray-900">
            About
          </RouterLink>
        </div>
        <div class="ml-10 space-x-4 flex items-center">
          <RouterLink to="/wishlist" class="relative">
            <span class="sr-only">Wishlist</span>
            <svg class="h-6 w-6 text-gray-400 hover:text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
            </svg>
            <span v-if="wishlistCount > 0" class="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {{ wishlistCount }}
            </span>
          </RouterLink>
          <RouterLink to="/cart" class="relative">
            <span class="sr-only">Cart</span>
            <svg class="h-6 w-6 text-gray-400 hover:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span v-if="cartCount > 0" class="absolute -top-2 -right-2 bg-primary-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {{ cartCount }}
            </span>
          </RouterLink>
          <RouterLink to="/auth/login" class="btn-primary">
            Sign in
          </RouterLink>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.group:hover .group-hover\:block {
  display: block;
}
</style>