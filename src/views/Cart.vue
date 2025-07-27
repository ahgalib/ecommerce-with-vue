<template>
  <div class="cart-page p-6 max-w-5xl mx-auto">
    <h1 class="text-3xl font-bold mb-8 flex items-center gap-3">
      <svg class="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 9h14l1 12H4L5 9z" /></svg>
      My Cart
    </h1>
    <div v-if="cart.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="item in cart" :key="item.id" class="bg-white rounded-xl shadow-lg p-6 flex flex-col hover:shadow-2xl transition-shadow relative group">
        <img :src="item.image || (item.product_images && item.product_images[0]?.url) || 'https://via.placeholder.com/300'" :alt="item.name" class="w-full h-48 object-contain rounded mb-4 bg-gray-50" />
        <h2 class="text-lg font-semibold mb-1 line-clamp-2">{{ item.name }}</h2>
        <p class="text-primary-600 font-bold mb-1 text-xl">${{ item.price }}</p>
        <div class="flex flex-wrap gap-2 mb-2">
          <span v-if="item.brand?.name" class="bg-primary-100 text-primary-700 px-2 py-1 rounded text-xs font-semibold">{{ item.brand.name }}</span>
          <span v-if="item.category?.name" class="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-semibold">{{ item.category.name }}</span>
        </div>
        <div class="flex-1"></div>
        <button class="absolute top-3 right-3 bg-primary-100 text-primary-600 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity" @click="removeFromCart(item.id)">
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
    </div>
    <div v-else class="text-center text-gray-400 py-20 text-2xl flex flex-col items-center">
      <svg class="h-16 w-16 mb-4 text-primary-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 9h14l1 12H4L5 9z" /></svg>
      Your cart is empty.
    </div>
    <div v-if="cart.length" class="mt-10 flex flex-col items-end">
      <div class="bg-gray-50 rounded-lg p-6 shadow w-full max-w-md">
        <div class="flex justify-between items-center mb-2">
          <span class="text-lg font-semibold">Total</span>
          <span class="text-2xl font-bold text-primary-600">${{ totalPrice }}</span>
        </div>
        <button class="btn-primary w-full mt-4 py-3 text-lg font-semibold" @click="goToCheckout">Proceed to Checkout</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const cart = ref([])
const router = useRouter()

const loadCart = () => {
  const data = localStorage.getItem('cart')
  cart.value = data ? JSON.parse(data) : []
}

const removeFromCart = (id) => {
  cart.value = cart.value.filter(item => item.id !== id)
  localStorage.setItem('cart', JSON.stringify(cart.value))
  window.dispatchEvent(new Event('storage'))
}

const totalPrice = computed(() => {
  return cart.value.reduce((sum, item) => sum + Number(item.price), 0).toFixed(2)
})

const goToCheckout = () => {
  router.push('/checkout')
}

onMounted(loadCart)
</script>

<style scoped>
.cart-page {
  min-height: 60vh;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>