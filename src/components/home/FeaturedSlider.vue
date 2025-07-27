<script setup lang="ts">
import { defineProps } from 'vue'
import ProductCard from '../product/ProductCard.vue'

defineProps<{
  products: Array<{
    id: string
    name: string
    price: number
    image: string
    category: string
  }>
}>()
</script>

<template>
  <div class="relative">
    <div class="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
      <ProductCard v-for="product in products" :key="product.id" :product="product" class="w-72 flex-shrink-0" />
    </div>
  </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>