<script setup lang="ts">
import { defineProps } from 'vue'
import { useCartStore } from '../../stores/cart'
import { useWishlistStore } from '../../stores/wishlist'

const props = defineProps<{
  product: {
    id: string
    slug: string // <-- add slug
    name: string
    price: number
    image: string
    category: any // allow object for category name
    brand?: any // allow brand for future
  }
}>()

const cart = useCartStore()
const wishlist = useWishlistStore()

const addToCart = () => {
  // Get cart from localStorage
  const cart = JSON.parse(localStorage.getItem('cart') || '[]')
  // Avoid duplicates by id
  if (!cart.some(item => item.id === props.product.id)) {
    cart.push(props.product)
    localStorage.setItem('cart', JSON.stringify(cart))
    window.dispatchEvent(new Event('storage')) // update header badge
  }
}

const addToWishlist = () => {
  const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]')
  if (!wishlist.some(item => item.id === props.product.id)) {
    wishlist.push(props.product)
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
    window.dispatchEvent(new Event('storage'))
  }
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <RouterLink :to="`/product/${product.slug}`">
      <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover" />
    </RouterLink>
    <div class="p-4">
      <RouterLink :to="`/product/${product.slug}`" class="block">
        <h3 class="text-lg font-medium text-gray-900">{{ product.name }}</h3>
      </RouterLink>
      <p class="mt-1 text-gray-500">{{ typeof product.category === 'object' ? product.category.name : product.category }}</p>
      <div class="mt-2 flex items-center justify-between">
        <p class="text-lg font-semibold text-gray-900">${{ Number(product.price).toFixed(2) }}</p>
        <div class="flex space-x-2">
          <button @click="addToCart" class="btn-primary">
             Cart
          </button>
          <button @click="addToWishlist" class="btn-secondary">
             Wishlist
          </button>
        </div>
      </div>
    </div>
  </div>
</template>