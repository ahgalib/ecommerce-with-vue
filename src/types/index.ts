export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  rating: number
  reviews: Review[]
  variants?: ProductVariant[]
}

export interface ProductVariant {
  id: string
  name: string
  value: string
}

export interface CartItem extends Product {
  quantity: number
}

export interface Review {
  id: string
  userId: string
  userName: string
  rating: number
  comment: string
  date: string
}

export interface User {
  id: string
  email: string
  name: string
  orders: Order[]
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: string
  createdAt: string
}