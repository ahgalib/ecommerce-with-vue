<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/layout/Header.vue'
</script>

<template>
  <div class="min-h-screen orange-300">
    <Header />
    <main>
      <RouterView />
    </main>
  </div>
</template>