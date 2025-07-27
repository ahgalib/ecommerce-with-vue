<template>
  <div class="product-listing">
    <h1 class="text-2xl font-bold mb-4">Product Listing Page</h1>



    <!-- Subcategory Bar -->
    <div v-if="subcategories.length" class="flex flex-wrap gap-2 mb-4 overflow-x-auto pb-2">
      <button
        v-for="sub in subcategories"
        :key="sub.id"
        @click="toggleSubcategory(sub)"
        :class="['relative px-4 py-2 rounded-full border flex items-center', selectedSubcategory && selectedSubcategory.id === sub.id ? 'bg-primary-600 text-white' : 'bg-white text-gray-800']"
      >
        <span>{{ sub.name }}</span>
        <span v-if="selectedSubcategory && selectedSubcategory.id === sub.id" @click.stop="toggleSubcategory(sub)" class="ml-2 cursor-pointer flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </span>
      </button>
    </div>

    <!-- Brand Bar -->
    <div v-if="brands.length" class="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-2">
      <button
        v-for="brand in brands"
        :key="brand.id"
        @click="toggleBrand(brand)"
        :class="['relative px-4 py-2 rounded-full border flex items-center', selectedBrand && selectedBrand.id === brand.id ? 'bg-primary-600 text-white' : 'bg-white text-gray-800']"
      >
        <span>{{ brand.name }}</span>
        <span v-if="selectedBrand && selectedBrand.id === brand.id" @click.stop="toggleBrand(brand)" class="ml-2 cursor-pointer flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </span>
      </button>
    </div>

    <!-- Filters Section -->
    <div class="filters flex flex-wrap gap-6 mb-6 items-center">
      <div>
        <label class="block font-semibold mb-1">Price Range:</label>
        <div class="flex items-center gap-2">
          <input type="number" v-model.number="minPrice" placeholder="Min" class="w-20 px-2 py-1 border rounded" />
          <span>-</span>
          <input type="number" v-model.number="maxPrice" placeholder="Max" class="w-20 px-2 py-1 border rounded" />
          <button @click="applyPriceFilter" class="ml-2 px-3 py-1 bg-primary-600 text-white rounded">Apply</button>
        </div>
      </div>
      <div>
        <label class="block font-semibold mb-1">Sort by:</label>
        <select v-model="sortOption" @change="applySort" class="px-2 py-1 border rounded">
          <option value="newest">Newest</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating">Rating</option>
          <option value="name_asc">Name: A-Z</option>
          <option value="name_desc">Name: Z-A</option>
        </select>
      </div>
      <div>
        <button @click="resetFilters" class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 font-semibold">Reset Filters</button>
      </div>
    </div>

    <!-- Product Grid -->
    <div v-if="loading">
      <LoadingSpinner />
    </div>
    <div v-else class="product-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <router-link
        v-for="product in paginatedProducts"
        :key="product.id"
        :to="{ name: 'product-details', params: { slug: product.slug } }"
        class="block"
      >
        <ProductCard :product="{ ...product, brand: product.brand }" />
      </router-link>
    </div>

    <!-- Pagination -->
    <div class="pagination mt-6 flex justify-center space-x-2">
      <button @click="prevPage" :disabled="currentPage === 1" class="btn-secondary">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="btn-secondary">Next</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import ProductCard from '../components/product/ProductCard.vue'
import LoadingSpinner from '../components/common/LoadingSpinner.vue'

const products = ref([])
const loading = ref(false)
const currentPage = ref(1)
const totalPages = ref(1)
const perPage = ref(20)
const total = ref(0)
const route = useRoute()

// Subcategory and brand bar state
const subcategories = ref([])
const selectedSubcategory = ref(null)
const brands = ref([])
const selectedBrand = ref(null)

// Filters and sort
const minPrice = ref('')
const maxPrice = ref('')
const sortOption = ref('newest')

const fetchProducts = async () => {
  loading.value = true
  let url = 'http://127.0.0.1:8000/api/products'
  const params = {
    page: currentPage.value,
    per_page: perPage.value
  }
  if (route.query.category) {
    params.category = route.query.category
  }
  if (selectedSubcategory.value) {
    params.sub_category = selectedSubcategory.value.name
  }
  if (selectedBrand.value) {
    params.brand = selectedBrand.value.name
  }
  if (minPrice.value !== '') {
    params.min_price = minPrice.value
  }
  if (maxPrice.value !== '') {
    params.max_price = maxPrice.value
  }
  // Sorting
  if (sortOption.value === 'price_asc') {
    params.sort_by = 'price'; params.sort_dir = 'asc'
  } else if (sortOption.value === 'price_desc') {
    params.sort_by = 'price'; params.sort_dir = 'desc'
  } else if (sortOption.value === 'rating') {
    params.sort_by = 'rating'; params.sort_dir = 'desc'
  } else if (sortOption.value === 'name_asc') {
    params.sort_by = 'name'; params.sort_dir = 'asc'
  } else if (sortOption.value === 'name_desc') {
    params.sort_by = 'name'; params.sort_dir = 'desc'
  } else {
    params.sort_by = 'created_at'; params.sort_dir = 'desc' // Newest
  }
  try {
    const response = await axios.get(url, { params })
    products.value = response.data.data || []
    currentPage.value = response.data.current_page || 1
    totalPages.value = response.data.last_page || 1
    perPage.value = response.data.per_page || 20
    total.value = response.data.total || 0
    // Extract unique subcategories from products
    const subMap = {}
    const brandMap = {}
    products.value.forEach(p => {
      if (p.sub_category && p.sub_category.id) {
        subMap[p.sub_category.id] = p.sub_category
      }
      if (p.brand && p.brand.id) {
        brandMap[p.brand.id] = p.brand
      }
    })
    subcategories.value = Object.values(subMap)
    brands.value = Object.values(brandMap)
    // If selected subcategory is not in the new list, reset
    if (selectedSubcategory.value && !subcategories.value.find(s => s.id === selectedSubcategory.value.id)) {
      selectedSubcategory.value = null
    }
    // If selected brand is not in the new list, reset
    if (selectedBrand.value && !brands.value.find(b => b.id === selectedBrand.value.id)) {
      selectedBrand.value = null
    }
    console.log('Products fetched:', products.value)
  } catch (error) {
    console.error('Failed to fetch products:', error)
    products.value = []
    subcategories.value = []
  } finally {
    loading.value = false
  }
}


const toggleSubcategory = (sub) => {
  if (selectedSubcategory.value && selectedSubcategory.value.id === sub.id) {
    selectedSubcategory.value = null
  } else {
    selectedSubcategory.value = sub
  }
  currentPage.value = 1
  fetchProducts()
}

const toggleBrand = (brand) => {
  if (selectedBrand.value && selectedBrand.value.id === brand.id) {
    selectedBrand.value = null
  } else {
    selectedBrand.value = brand
  }
  currentPage.value = 1
  fetchProducts()
}

const resetFilters = () => {
  selectedSubcategory.value = null
  selectedBrand.value = null
  minPrice.value = ''
  maxPrice.value = ''
  sortOption.value = 'newest'
  currentPage.value = 1
  fetchProducts()
}

const applySort = () => {
  currentPage.value = 1
  fetchProducts()
}

const applyPriceFilter = () => {
  currentPage.value = 1
  fetchProducts()
}

onMounted(fetchProducts)
watch(() => route.query.category, () => {
  currentPage.value = 1
  selectedSubcategory.value = null
  fetchProducts()
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    fetchProducts()
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    fetchProducts()
  }
}

const paginatedProducts = computed(() => products.value)
</script>

<style scoped>
.product-listing {
  padding: 1rem;
}
</style>