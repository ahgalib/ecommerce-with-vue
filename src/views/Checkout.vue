<template>
  <div class="checkout-page p-6 max-w-3xl mx-auto">
    <h1 class="text-3xl font-bold mb-8 flex items-center gap-3">
      <svg class="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 9h14l1 12H4L5 9z" /></svg>
      Checkout
    </h1>
    <form @submit.prevent="submitOrder">
      <!-- Contact Info -->
      <div class="bg-white rounded-xl shadow-lg p-8 mb-8">
        <h2 class="text-xl font-semibold mb-4">Contact Information</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block font-semibold mb-1">Full Name</label>
            <input v-model="form.name" required class="w-full border rounded px-3 py-2 mb-2" placeholder="Your Name" />
          </div>
          <div>
            <label class="block font-semibold mb-1">Email</label>
            <input v-model="form.email" required type="email" class="w-full border rounded px-3 py-2 mb-2" placeholder="you@email.com" />
          </div>
          <div>
            <label class="block font-semibold mb-1">Phone</label>
            <input v-model="form.phone" required class="w-full border rounded px-3 py-2 mb-2" placeholder="Phone Number" />
          </div>
        </div>
      </div>
      <!-- Shipping Address -->
      <div class="bg-white rounded-xl shadow-lg p-8 mb-8">
        <h2 class="text-xl font-semibold mb-4">Shipping Address</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block font-semibold mb-1">Country/Region</label>
            <input v-model="form.country" required class="w-full border rounded px-3 py-2 mb-2" placeholder="Country" />
          </div>
          <div>
            <label class="block font-semibold mb-1">City</label>
            <input v-model="form.city" required class="w-full border rounded px-3 py-2 mb-2" placeholder="City" />
          </div>
          <div>
            <label class="block font-semibold mb-1">State/Province/Region</label>
            <input v-model="form.state" required class="w-full border rounded px-3 py-2 mb-2" placeholder="State/Province" />
          </div>
          <div>
            <label class="block font-semibold mb-1">Zip/Postal Code</label>
            <input v-model="form.zip" required class="w-full border rounded px-3 py-2 mb-2" placeholder="Zip/Postal Code" />
          </div>
          <div class="md:col-span-2">
            <label class="block font-semibold mb-1">Street Address</label>
            <input v-model="form.address" required class="w-full border rounded px-3 py-2 mb-2" placeholder="Street Address" />
          </div>
          <div class="md:col-span-2">
            <label class="block font-semibold mb-1">Apartment/Suite (optional)</label>
            <input v-model="form.apt" class="w-full border rounded px-3 py-2 mb-2" placeholder="Apartment, suite, etc." />
          </div>
        </div>
      </div>
      <!-- Billing Address -->
      <div class="bg-white rounded-xl shadow-lg p-8 mb-8">
        <div class="flex items-center mb-4">
          <input type="checkbox" v-model="billingSame" class="accent-primary-600 mr-2" id="billingSame" />
          <label for="billingSame" class="text-sm">Billing address is the same as shipping address</label>
        </div>
        <h2 class="text-xl font-semibold mb-4">Billing Address</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6" v-if="!billingSame">
          <div>
            <label class="block font-semibold mb-1">Country/Region</label>
            <input v-model="form.billingCountry" required :disabled="billingSame" class="w-full border rounded px-3 py-2 mb-2" placeholder="Country" />
          </div>
          <div>
            <label class="block font-semibold mb-1">City</label>
            <input v-model="form.billingCity" required :disabled="billingSame" class="w-full border rounded px-3 py-2 mb-2" placeholder="City" />
          </div>
          <div>
            <label class="block font-semibold mb-1">State/Province/Region</label>
            <input v-model="form.billingState" required :disabled="billingSame" class="w-full border rounded px-3 py-2 mb-2" placeholder="State/Province" />
          </div>
          <div>
            <label class="block font-semibold mb-1">Zip/Postal Code</label>
            <input v-model="form.billingZip" required :disabled="billingSame" class="w-full border rounded px-3 py-2 mb-2" placeholder="Zip/Postal Code" />
          </div>
          <div class="md:col-span-2">
            <label class="block font-semibold mb-1">Street Address</label>
            <input v-model="form.billingAddress" required :disabled="billingSame" class="w-full border rounded px-3 py-2 mb-2" placeholder="Street Address" />
          </div>
          <div class="md:col-span-2">
            <label class="block font-semibold mb-1">Apartment/Suite (optional)</label>
            <input v-model="form.billingApt" :disabled="billingSame" class="w-full border rounded px-3 py-2 mb-2" placeholder="Apartment, suite, etc." />
          </div>
        </div>
        <div v-else class="text-gray-500 text-sm mb-2">Billing address will match shipping address.</div>
      </div>
      <!-- Shipping Method -->
      <div class="bg-white rounded-xl shadow-lg p-8 mb-8">
        <h2 class="text-xl font-semibold mb-4">Shipping Method</h2>
        <div class="flex flex-col gap-3">
          <label class="flex items-center gap-3">
            <input type="radio" v-model="form.shipping" value="standard" required class="accent-primary-600" />
            <span>Standard Delivery (3-5 days) - <span class="font-semibold">$5.00</span></span>
          </label>
          <label class="flex items-center gap-3">
            <input type="radio" v-model="form.shipping" value="express" class="accent-primary-600" />
            <span>Express Delivery (1-2 days) - <span class="font-semibold">$15.00</span></span>
          </label>
        </div>
      </div>
      <!-- Payment Method -->
      <div class="bg-white rounded-xl shadow-lg p-8 mb-8">
        <h2 class="text-xl font-semibold mb-4">Payment Method</h2>
        <div class="flex flex-col gap-3 mb-4">
          <label class="flex items-center gap-3">
            <input type="radio" v-model="form.paymentMethod" value="card" required class="accent-primary-600" />
            <span>Credit/Debit Card</span>
          </label>
          <label class="flex items-center gap-3">
            <input type="radio" v-model="form.paymentMethod" value="paypal" class="accent-primary-600" />
            <span>PayPal</span>
          </label>
        </div>
        <div v-if="form.paymentMethod === 'card'" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block font-semibold mb-1">Cardholder Name</label>
            <input v-model="form.cardName" required class="w-full border rounded px-3 py-2 mb-2" placeholder="Name on Card" />
          </div>
          <div>
            <label class="block font-semibold mb-1">Card Number</label>
            <input v-model="form.cardNumber" required maxlength="19" class="w-full border rounded px-3 py-2 mb-2" placeholder="Card Number" />
          </div>
          <div>
            <label class="block font-semibold mb-1">Expiry Date</label>
            <input v-model="form.cardExpiry" required maxlength="5" class="w-full border rounded px-3 py-2 mb-2" placeholder="MM/YY" />
          </div>
          <div>
            <label class="block font-semibold mb-1">CVV</label>
            <input v-model="form.cardCVV" required maxlength="4" class="w-full border rounded px-3 py-2 mb-2" placeholder="CVV" />
          </div>
        </div>
        <div v-if="form.paymentMethod === 'paypal'" class="mb-4">
          <div class="bg-yellow-50 border border-yellow-200 rounded p-4 text-yellow-700 flex items-center gap-2">
            <svg class="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a5 5 0 00-10 0v2a2 2 0 01-2 2v7a2 2 0 002 2h12a2 2 0 002-2v-7a2 2 0 01-2-2z" /></svg>
            PayPal payment is simulated for demo purposes.
          </div>
        </div>
      </div>
      <!-- Order Summary -->
      <div class="bg-white rounded-xl shadow-lg p-8 mb-8">
        <h2 class="text-xl font-semibold mb-4">Order Summary</h2>
        <div v-if="cart.length" class="divide-y divide-gray-200 mb-4">
          <div v-for="item in cart" :key="item.id" class="flex items-center py-3 gap-4">
            <img :src="item.image || (item.product_images && item.product_images[0]?.url) || 'https://via.placeholder.com/80'" :alt="item.name" class="w-16 h-16 object-contain rounded bg-gray-50" />
            <div class="flex-1">
              <div class="font-semibold">{{ item.name }}</div>
              <div class="text-sm text-gray-500">${{ item.price }}</div>
            </div>
          </div>
        </div>
        <div class="flex justify-between items-center mt-6">
          <span class="text-lg font-semibold">Subtotal</span>
          <span class="text-lg">${{ subtotal }}</span>
        </div>
        <div class="flex justify-between items-center mt-2">
          <span class="text-lg font-semibold">Shipping</span>
          <span class="text-lg">${{ shippingCost }}</span>
        </div>
        <div class="flex justify-between items-center mt-2">
          <span class="text-lg font-semibold">Total</span>
          <span class="text-2xl font-bold text-primary-600">${{ totalPrice }}</span>
        </div>
      </div>
      <div class="flex items-center mt-6">
        <input type="checkbox" v-model="form.agree" required class="accent-primary-600 mr-2" />
        <span class="text-sm">I agree to the <a href="#" class="underline text-primary-600">terms and conditions</a>.</span>
      </div>
      <div class="flex justify-end mt-8">
        <button class="btn-primary px-8 py-3 text-lg font-semibold" type="submit">Place Order</button>
      </div>
      <div v-if="orderPlaced" class="mt-8 p-6 bg-green-50 border border-green-200 rounded text-green-700 text-lg text-center">
        <svg class="h-8 w-8 mx-auto mb-2 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
        Thank you! Your order has been placed.
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

const cart = ref([])
const billingSame = ref(true)
const form = ref({
  name: '', email: '', phone: '',
  country: '', city: '', state: '', zip: '', address: '', apt: '',
  billingCountry: '', billingCity: '', billingState: '', billingZip: '', billingAddress: '', billingApt: '',
  shipping: '',
  paymentMethod: '',
  cardName: '', cardNumber: '', cardExpiry: '', cardCVV: '',
  notes: '', agree: false
})
const orderPlaced = ref(false)
const router = useRouter()

const loadCart = () => {
  const data = localStorage.getItem('cart')
  cart.value = data ? JSON.parse(data) : []
}

watch(billingSame, (val) => {
  if (val) {
    form.value.billingCountry = form.value.country
    form.value.billingCity = form.value.city
    form.value.billingState = form.value.state
    form.value.billingZip = form.value.zip
    form.value.billingAddress = form.value.address
    form.value.billingApt = form.value.apt
  }
})

const subtotal = computed(() => {
  return cart.value.reduce((sum, item) => sum + Number(item.price), 0).toFixed(2)
})
const shippingCost = computed(() => form.value.shipping === 'express' ? 15 : (form.value.shipping === 'standard' ? 5 : 0))
const totalPrice = computed(() => (Number(subtotal.value) + Number(shippingCost.value)).toFixed(2))

const submitOrder = () => {
  if (!form.value.name || !form.value.email || !form.value.phone || !form.value.country || !form.value.city || !form.value.state || !form.value.zip || !form.value.address || !form.value.shipping || !form.value.paymentMethod || !form.value.agree) {
    alert('Please fill in all required fields and agree to the terms.')
    return
  }
  if (form.value.paymentMethod === 'card' && (!form.value.cardName || !form.value.cardNumber || !form.value.cardExpiry || !form.value.cardCVV)) {
    alert('Please fill in all card details.')
    return
  }
  if (!billingSame.value && (!form.value.billingCountry || !form.value.billingCity || !form.value.billingState || !form.value.billingZip || !form.value.billingAddress)) {
    alert('Please fill in all billing address fields.')
    return
  }
  // Simulate order placement
  orderPlaced.value = true
  localStorage.removeItem('cart')
  window.dispatchEvent(new Event('storage'))
  setTimeout(() => {
    router.push('/')
  }, 2500)
}

onMounted(loadCart)
</script>

<style scoped>
.checkout-page {
  min-height: 60vh;
}
</style>