<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
  categories: Array<{
    id: string
    name: string
    image: string
    count: number
  }>
}>()
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <RouterLink v-for="category in categories" :key="category.id" :to="`/products?category=${category.name}`"
      class="relative rounded-lg overflow-hidden group">
      <img :src="category.image" :alt="category.name" class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" />
      <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <div class="text-center">
          <h3 class="text-xl font-bold text-white">{{ category.name }}</h3>
          <p class="text-white mt-2">{{ category.count }} Products</p>
        </div>
      </div>
    </RouterLink>
  </div>
</template>