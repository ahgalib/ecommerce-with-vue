import { defineStore } from 'pinia'

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    items: [] as Array<{ id: string; name: string; price: number; image: string; category: string }>,
  }),
  actions: {
    addItem(product: { id: string; name: string; price: number; image: string; category: string }) {
      if (!this.items.find((item) => item.id === product.id)) {
        this.items.push(product)
      }
    },
    removeItem(id: string) {
      this.items = this.items.filter((item) => item.id !== id)
    },
  },
})