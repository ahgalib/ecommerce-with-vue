<template>
  <div class="product-details">
    <template v-if="loading">
      <div class="py-10 text-center">Loading...</div>
    </template>
    <template v-else-if="product">
      <h1 class="text-2xl font-bold mb-4">{{ product.name }}</h1>

      <!-- Image Gallery -->
      <div class="image-gallery mb-6 flex flex-col md:flex-row gap-6 items-start">
        <div v-if="uniqueImages.length > 1" class="flex md:flex-col gap-2 md:mr-4 order-2 md:order-1">
          <img
            v-for="img in uniqueImages"
            :key="img.id"
            :src="img.url"
            :alt="product.name"
            class="w-16 h-16 object-cover rounded border cursor-pointer transition-all duration-150 hover:ring-2 hover:ring-primary-600"
            :class="activeImage === img.url ? 'ring-2 ring-primary-600 border-primary-600' : 'border-gray-300'"
            @click="activeImage = img.url"
          />
        </div>
        <img :src="activeImage || 'https://via.placeholder.com/300'" alt="Product Image" class="w-full max-w-lg h-auto max-h-96 object-contain rounded shadow mb-2 order-1 md:order-2" />
      </div>

      <!-- Product Info -->
      <div class="product-info mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 class="text-xl font-semibold mb-2">{{ product.name }}</h2>
          <div class="flex flex-wrap gap-2 mb-2">
            <span class="bg-primary-100 text-primary-700 px-2 py-1 rounded text-xs font-semibold">Brand: {{ product.brand?.name || '-' }}</span>
            <span class="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-semibold">Category: {{ product.category?.name || '-' }}</span>
            <span class="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-semibold">Subcategory: {{ product.sub_category?.name || '-' }}</span>
          </div>
          <div class="flex items-center gap-4 mb-2">
            <span class="text-2xl font-bold text-primary-600">${{ product.price }}</span>
            <span v-if="product.discount" class="text-sm text-red-500 font-semibold">-{{ product.discount }}% OFF</span>
          </div>
          <p v-if="product.stock_quantity > 0" class="text-green-600 font-semibold">In Stock: {{ product.stock_quantity }}</p>
          <p v-else class="text-red-600 font-semibold">Out of Stock</p>
          <div v-if="product.product_tags && product.product_tags.length" class="mt-2 flex flex-wrap gap-2">
            <span v-for="tag in product.product_tags" :key="tag.id" class="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">#{{ tag.tag }}</span>
          </div>
        </div>
        
      </div>

      <!-- Product Variants (Selector) -->
      <div v-if="product.product_variants && product.product_variants.length" class="mb-6">
        <h3 class="text-lg font-bold mb-2">Choose Variant</h3>
        <div class="flex flex-wrap gap-4 items-end">
          <div>
            <label class="block font-semibold mb-1">Size:</label>
            <div class="flex flex-wrap gap-2">
              <label v-for="size in Array.from(new Set(product.product_variants.map(v => v.size)))" :key="size" class="inline-flex items-center cursor-pointer">
                <input type="radio" class="form-radio accent-primary-600" :value="size" v-model="selectedSize" />
                <span class="ml-1 px-2 py-1 rounded border text-xs font-semibold" :class="selectedSize === size ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-gray-800 border-gray-300'">{{ size }}</span>
              </label>
            </div>
          </div>
          <div>
            <label class="block font-semibold mb-1">Color:</label>
            <div class="flex flex-wrap gap-2">
              <label v-for="color in Array.from(new Set(product.product_variants.map(v => v.color)))" :key="color" class="inline-flex items-center cursor-pointer">
                <input type="radio" class="form-radio accent-primary-600" :value="color" v-model="selectedColor" />
                <span class="ml-1 px-2 py-1 rounded border text-xs font-semibold" :class="selectedColor === color ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-gray-800 border-gray-300'">{{ color }}</span>
              </label>
            </div>
          </div>
        </div>
        <div v-if="selectedSize && selectedColor" class="mt-4">
          <div v-if="selectedVariant" class="p-4 border rounded bg-gray-50">
            <div class="font-semibold">SKU: <span class="text-xs text-gray-500">{{ selectedVariant.sku }}</span></div>
            <div class="text-primary-600 font-bold text-lg mt-1">${{ selectedVariant.price }}</div>
            <div class="text-xs mt-1" :class="selectedVariant.stock > 0 ? 'text-green-600' : 'text-red-600'">
              {{ selectedVariant.stock > 0 ? `Stock: ${selectedVariant.stock}` : 'Out of Stock' }}
            </div>
          </div>
          <div v-else class="text-red-600 mt-2">No variant found for this combination.</div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="actions mb-6">
        <button class="btn-primary" @click="addToCart">Add to Cart</button>
        <button class="btn-secondary">Buy Now</button>
      </div>

      <!-- Description -->
      <div class="description-reviews">
        <h3 class="text-lg font-bold mb-2">Description</h3>
        <p>{{ product.description }}</p>
      </div>

      <!-- Related Products -->
      <div v-if="relatedProducts.length" class="suggested-products mt-8">
        <h3 class="text-lg font-bold mb-4">Related Products</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductCard v-for="suggested in relatedProducts" :key="suggested.id" :product="suggested" />
        </div>
      </div>
    </template>
    <template v-else>
      <div class="py-10 text-center text-red-600">Product not found.</div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import ProductCard from '../components/product/ProductCard.vue'

const route = useRoute()
const product = ref(null)
const relatedProducts = ref([])
const loading = ref(false)
const selectedSize = ref('')
const selectedColor = ref('')
const activeImage = ref('')
const uniqueImages = computed(() => {
  if (!product.value || !product.value.product_images) return []
  // Remove duplicate URLs
  const seen = new Set()
  return product.value.product_images.filter(img => {
    if (seen.has(img.url)) return false
    seen.add(img.url)
    return true
  })
})

watch(
  () => product.value,
  (newProduct) => {
    if (newProduct && newProduct.product_images && newProduct.product_images.length) {
      activeImage.value = newProduct.product_images[0].url
    } else {
      activeImage.value = ''
    }
  },
  { immediate: true }
)

const selectedVariant = computed(() => {
  if (!product.value || !selectedSize.value || !selectedColor.value) return null
  return (product.value.product_variants || []).find(v => v.size === selectedSize.value && v.color === selectedColor.value)
})

const fetchProduct = async () => {
  loading.value = true
  try {
    const slug = route.params.slug
    const response = await axios.get(`http://127.0.0.1:8000/api/products/${slug}`)
    product.value = response.data.product
    relatedProducts.value = response.data.related_products || []
    activeImage.value = (response.data.product.product_images && response.data.product.product_images[0]?.url) || ''
  } catch (error) {
    product.value = null
    relatedProducts.value = []
    console.error('Failed to fetch product:', error)
  } finally {
    loading.value = false
  }
}

onMounted(fetchProduct)
watch(() => route.params.slug, fetchProduct)

const addToCart = () => {
  alert('Added to cart!')
}

const submitReview = () => {
  alert('Review submitted!')
}
</script>

<style scoped>
.product-details {
  padding: 1rem;
}
</style>