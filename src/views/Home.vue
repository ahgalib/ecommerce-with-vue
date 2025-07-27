<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import ProductCard from '../components/product/ProductCard.vue'
import FeaturedSlider from '../components/home/FeaturedSlider.vue'
import CategoryGrid from '../components/home/CategoryGrid.vue'
import SearchBar from '../components/common/SearchBar.vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const banners = ref([
  {
    id: '1',
    title: 'Summer Collection 2025',
    description: 'Up to 50% off on selected items',
    image: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg',
    link: '/products?category=summer'
  },
  {
    id: '2',
    title: 'New Electronics Arrivals',
    description: 'Latest gadgets and accessories',
    image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg',
    link: '/products?category=electronics'
  },
  {
    id: '3',
    title: 'Home & Living Essentials',
    description: 'Transform your living space',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
    link: '/products?category=home'
  }
])

const featuredProducts = ref([
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 199.99,
    image: 'https://images.pexels.com/photos/3945667/pexels-photo-3945667.jpeg',
    category: 'Electronics',
    rating: 4.5,
    reviews: 128,
    stock: 50
  },
  {
    id: '2',
    name: 'Leather Weekend Bag',
    price: 149.99,
    image: 'https://images.pexels.com/photos/2534961/pexels-photo-2534961.jpeg',
    category: 'Accessories',
    rating: 4.8,
    reviews: 89,
    stock: 35
  },
  {
    id: '3',
    name: 'Smart Watch Series 5',
    price: 299.99,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg',
    category: 'Electronics',
    rating: 4.7,
    reviews: 256,
    stock: 75
  },
  {
    id: '4',
    name: 'Designer Sunglasses',
    price: 129.99,
    image: 'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg',
    category: 'Accessories',
    rating: 4.6,
    reviews: 167,
    stock: 45
  }
])

const categories = ref([])

onMounted(async () => {
  const cacheKey = 'categories_cache'
  const cacheExpiryKey = 'categories_cache_expiry'
  const now = Date.now()
  const expiry = localStorage.getItem(cacheExpiryKey)
  const cached = localStorage.getItem(cacheKey)

  if (cached && expiry && now < Number(expiry)) {
    try {
      categories.value = JSON.parse(cached)
      console.log('Categories loaded from cache:', categories.value)
      return
    } catch (e) {
      // If cache is corrupted, ignore and fetch
      localStorage.removeItem(cacheKey)
      localStorage.removeItem(cacheExpiryKey)
    }
  }

  try {
    const response = await axios.get('http://127.0.0.1:8000/api/categories')
    categories.value = response.data.data
    localStorage.setItem(cacheKey, JSON.stringify(categories.value))
    localStorage.setItem(cacheExpiryKey, (now + 60 * 60 * 1000).toString()) // 1 hour
    console.log('Categories fetched from API:', categories.value)
  } catch (error) {
    console.error('Failed to fetch categories:', error)
  }
})
// const categories = ref([
//   {
//     id: '1',
//     name: 'Electronics',
//     image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg',
//     count: 120,
//     featured: true
//   },
//   {
//     id: '2',
//     name: 'Fashion',
//     image: 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg',
//     count: 350,
//     featured: true
//   },
//   {
//     id: '3',
//     name: 'Home & Living',
//     image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
//     count: 230,
//     featured: true
//   },
//   {
//     id: '4',
//     name: 'Sports',
//     image: 'https://images.pexels.com/photos/2247179/pexels-photo-2247179.jpeg',
//     count: 180,
//     featured: true
//   },
//   {
//     id: '5',
//     name: 'Beauty',
//     image: 'https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg',
//     count: 200,
//     featured: true
//   },
//   {
//     id: '6',
//     name: 'Books',
//     image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
//     count: 150,
//     featured: true
//   }
// ])

const newArrivals = ref([
  {
    id: '5',
    name: 'Organic Green Tea',
    price: 24.99,
    image: 'https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg',
    category: 'Food & Beverages',
    rating: 4.3,
    reviews: 45,
    stock: 100
  },
  {
    id: '6',
    name: 'Fitness Tracker',
    price: 79.99,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg',
    category: 'Electronics',
    rating: 4.4,
    reviews: 78,
    stock: 60
  },
  {
    id: '7',
    name: 'Bamboo Water Bottle',
    price: 34.99,
    image: 'https://images.pexels.com/photos/1342529/pexels-photo-1342529.jpeg',
    category: 'Accessories',
    rating: 4.2,
    reviews: 34,
    stock: 85
  },
  {
    id: '8',
    name: 'Wireless Earbuds',
    price: 159.99,
    image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg',
    category: 'Electronics',
    rating: 4.6,
    reviews: 192,
    stock: 40
  }
])
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section with Swiper -->
    <section class="relative">
      <Swiper
        :modules="[Autoplay, Pagination, Navigation]"
        :slides-per-view="1"
        :loop="true"
        :autoplay="{
          delay: 5000,
          disableOnInteraction: false,
        }"
        :pagination="{
          clickable: true,
        }"
        :navigation="true"
        class="h-[500px] w-full"
      >
        <SwiperSlide v-for="banner in banners" :key="banner.id">
          <div class="relative h-full">
            <img :src="banner.image" :alt="banner.title" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div class="text-center text-white">
                <h2 class="text-4xl md:text-6xl font-bold mb-4">{{ banner.title }}</h2>
                <p class="text-xl md:text-2xl mb-8">{{ banner.description }}</p>
                <RouterLink :to="banner.link" class="btn-primary text-lg">
                  Shop Now
                </RouterLink>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>

    <!-- Search Section -->
    <section class="py-8 bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SearchBar />
      </div>
    </section>

    <!-- Featured Categories -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-8">Shop by Category</h2>
        <CategoryGrid :categories="categories" />
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-3xl font-bold text-gray-900">Featured Products</h2>
          <RouterLink to="/products" class="text-primary-600 hover:text-primary-700">
            View All →
          </RouterLink>
        </div>
        <FeaturedSlider :products="featuredProducts" />
      </div>
    </section>

    <!-- New Arrivals -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-3xl font-bold text-gray-900">New Arrivals</h2>
          <RouterLink to="/products?sort=newest" class="text-primary-600 hover:text-primary-700">
            View All →
          </RouterLink>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductCard v-for="product in newArrivals" :key="product.id" :product="product" />
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="py-16 bg-primary-600">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-bold text-white mb-4">Subscribe to Our Newsletter</h2>
          <p class="text-lg text-white mb-8">Get updates about new products and special offers!</p>
          <form @submit.prevent class="max-w-md mx-auto">
            <div class="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                class="flex-1 px-4 py-3 rounded-lg focus:ring-2 focus:ring-white"
              />
              <button type="submit" class="px-6 py-3 bg-white text-primary-600 rounded-lg hover:bg-gray-100">
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>