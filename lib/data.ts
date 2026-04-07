export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  gender?: "Men" | "Women" | "Unisex"
  brand?: string
  sizes: string[]
  featured?: boolean
  rating?: number
  createdAt?: string

}

export interface Category {
  id: string
  name: string
  icon: string
  description: string
}

/* ------------------ CATEGORIES ------------------ */

export const categories: Category[] = [
  {
    id: "tshirts",
    name: "T-Shirts",
    icon: "👕",
    description: "Casual and comfortable tees for everyday wear",
  },
  {
    id: "shirts",
    name: "Shirts",
    icon: "👔",
    description: "Formal and casual shirts for any occasion",
  },
  {
    id: "jeans",
    name: "Jeans",
    icon: "👖",
    description: "Classic denim in various fits and styles",
  },
  {
    id: "jackets",
    name: "Jackets",
    icon: "🧥",
    description: "Outerwear for all seasons",
  },
  {
    id: "hoodies",
    name: "Hoodies",
    icon: "🧣",
    description: "Cozy hoodies and sweatshirts",
  },
]

/* ------------------ PRODUCTS ------------------ */

export const products: Product[] = [
  // T-Shirts
  {
    id: "1",
    name: "Classic Black T-Shirt",
    brand: "Nikee",
    gender: "Men",
    description:
      "Essential black t-shirt made from 100% organic cotton. Soft, breathable fabric with a relaxed fit perfect for everyday wear.",
    price: 299,
    sizes: ["S", "M", "L", "XL"],
    category: "tshirts",
    image: "/images/blacktshirt.jpg",
    featured: true,
    rating: 4.5,
    createdAt: "2024-01-01",
  },
  {
    id: "2",
    name: "Classic White T-Shirt",
    brand: "Adidaas",
    gender: "Men",
    description:
      "Retro-inspired graphic t-shirt with distressed print. Made from soft cotton blend for ultimate comfort.",
    price: 299,
    sizes: ["S", "M", "L", "XL"],
    category: "tshirts",
    image: "/images/alexhaighwhitetee.jpg",
    rating: 4.2,
    createdAt: "2024-01-02",
  },
  {
    id: "3",
    name: "Essential Pima Crew",
    brand: "Nikee",
    gender: "Men",
    description: "Casual and Lightweight jersey fabric perfect for layering.",
    price: 279,
    sizes: ["S", "M", "L", "XL"],
    category: "tshirts",
    image: "/images/baobaotee.jpg",
    rating: 4.6,
    createdAt: "2024-01-03",
  },
  {
    id: "4",
    name: "The Midnight Crew",
    brand: "Adidaas",
    gender: "Men",
    description:
      "Premium cotton with dropped shoulders for a contemporary look.",
    price: 349,
    sizes: ["S", "M", "L", "XL"],
    category: "tshirts",
    image: "/images/aejazmemontee.jpg",
    rating: 4.8,
    createdAt: "2024-01-04",
  },

  // Shirts
  {
    id: "5",
    name: "Evergreen Essential",
    brand: "Nikee",
    gender: "Men",
    description:
      "Dyed in a deep, saturated hunter green, this tee offers a sophisticated alternative to standard neutrals.",
    price: 549,
    sizes: ["S", "M", "L", "XL"],
    category: "shirts",
    image: "/images/bennyhassumtee.jpg",
    featured: true,
    rating: 4.9,
    createdAt: "2024-01-05",
  },
  {
    id: "6",
    name: "The Signature White",
    brand: "Nikee",
    gender: "Men",
    description: "Clean lines and a pristine white palette.",
    price: 499,
    sizes: ["S", "M", "L", "XL"],
    category: "shirts",
    image: "/images/brandomakestee.jpg",
    rating: 4.1,
    createdAt: "2024-01-06",
  },
  {
    id: "7",
    name: "The Essential V-Neck",
    brand: "Adidaas",
    gender: "Men",
    description:
      "A wardrobe foundation designed with a flattering deep V-neckline",
    price: 449,
    sizes: ["S", "M", "L", "XL"],
    category: "shirts",
    image: "/images/joshuarobertstee.jpg",
    rating: 4.5,
    createdAt: "2024-01-07",
  },
  {
    id: "8",
    name: "The Utility Gauze Top (Women)",
    brand: "Nikee",
    gender: "Women",
    description:
      "Crafted from double-layered cotton gauze, this shirt is incredibly soft and virtually wrinkle-free.",
    price: 599,
    sizes: ["S", "M", "L", "XL"],
    category: "shirts",
    image: "/images/damirsemirkhanovladiesshirt.jpg",
    rating: 5.0,
    createdAt: "2024-01-08",
  },

  // Jeans
  {
    id: "9",
    name: "Slim Fit Dark Wash Jeans",
    brand: "Nikee",
    gender: "Men",
    description:
      "Modern slim fit jeans in deep indigo wash. Stretch denim for comfort and mobility.",
    price: 699,
    sizes: ["S", "M", "L", "XL"],
    category: "jeans",
    image: "/images/pantsjeans.jpg",
    featured: true,
    rating: 4.2,
    createdAt: "2024-01-09",
  },
  {
    id: "10",
    name: "The Infinite Slim Fit (Women)",
    gender: "Women",
    brand: "Nikaa",
    description: "The perfect balance between structure and comfort.",
    price: 649,
    sizes: ["S", "M", "L", "XL"],
    category: "jeans",
    image: "/images/laurachouette.jpg",
    rating: 4.7,
    createdAt: "2024-01-10",
  },
  {
    id: "11",
    name: "Straight Leg Jeans",
    gender: "Men",
    brand: "Nikee",
    description:
      "Versatile black jeans with straight leg cut. Perfect for dressing up or down.",
    price: 749,
    sizes: ["S", "M", "L", "XL"],
    category: "jeans",
    image: "/images/jasonleungjeans.jpg",
    rating: 4.3,
    createdAt: "2024-01-11",
  },
  {
    id: "12",
    name: "Ripped Skinny Jeans",
    gender: "Men",
    brand: "Nikee",
    description:
      "Edgy skinny jeans with distressed detailing. Stretch denim with trendy ripped knees.",
    price: 799,
    sizes: ["S", "M", "L", "XL"],
    category: "jeans",
    image: "/images/maudefredriquejeans.jpg",
    rating: 4.0,
    createdAt: "2024-01-12",
  },

  // Jackets
  {
    id: "13",
    name: "Classic Leather Biker Jacket",
    gender: "Men",
    brand: "Adidaas",
    description: "Sleek, sharp, and unapologetically black.",
    price: 199,
    sizes: ["S", "M", "L", "XL"],
    category: "jackets",
    image: "/images/bikeleatherjacket.jpg",
    featured: true,
    rating: 4.9,
    createdAt: "2024-01-13",
  },
  {
    id: "14",
    name: "The Vintage Sky Style",
    gender: "Men",
    brand: "Nikee",
    description:
      "The lightweight layer for breezy evenings and festival weekends.",
    price: 899,
    sizes: ["S", "M", "L", "XL"],
    category: "jackets",
    image: "/images/mikesantosdenimjacket.jpg",
    rating: 4.5,
    createdAt: "2024-01-14",
  },
  {
    id: "15",
    name: "The Arctic Canvas Shell",
    gender: "Men",
    brand: "Nikee",
    description: "Pure, bright, and effortlessly cool.",
    price: 359,
    sizes: ["S", "M", "L", "XL"],
    category: "jackets",
    image: "/images/brianlawsonjacket.jpg",
    rating: 4.7,
    createdAt: "2024-01-15",
  },
  {
    id: "16",
    name: "The Phantom Tech Shell",
    gender: "Men",
    brand: "Adidaas",
    description:
      "Crafted from water-resistant flight nylon and finished with tonal hardware.",
    price: 399,
    sizes: ["S", "M", "L", "XL"],
    category: "jackets",
    image: "/images/mohamadkosravijacket.jpg",
    rating: 4.4,
    createdAt: "2024-01-16",
  },

  // Hoodies
  {
    id: "17",
    name: "Essential Pullover Hoodie",
    gender: "Men",
    brand: "Nikee",
    description:
      "Classic pullover hoodie in soft fleece. Kangaroo pocket and adjustable drawstring hood.",
    price: 499,
    sizes: ["S", "M", "L", "XL"],
    category: "hoodies",
    image: "/images/abrahamfloreshoodie.jpg",
    featured: true,
    rating: 4.6,
    createdAt: "2024-01-17",
  },
  {
    id: "18",
    name: "Zip-Up Athletic Hoodie",
    gender: "Men",
    brand: "Adidaas",
    description:
      "Performance zip-up hoodie with moisture-wicking fabric.",
    price: 599,
    sizes: ["S", "M", "L", "XL"],
    category: "hoodies",
    image: "/images/alisaadattee.jpg",
    rating: 4.3,
    createdAt: "2024-01-18",
  },
  {
    id: "19",
    name: "Oversized Cropped Hoodie",
    gender: "Women",
    brand: "Nikee",
    description:
      "Trendy cropped hoodie with oversized fit. Soft cotton blend.",
    price: 449,
    sizes: ["S", "M", "L", "XL"],
    category: "hoodies",
    image: "/images/amirabbaspoorhoodie.jpg",
    rating: 4.8,
    createdAt: "2024-01-19",
  },
  {
    id: "20",
    name: "Heavyweight Champion Hoodie (Women)",
    gender: "Women",
    brand: "Adidaas",
    description:
      "Premium heavyweight hoodie built to last.",
    price: 699,
    sizes: ["S", "M", "L", "XL"],
    category: "hoodies",
    image: "/images/antonpolidovets.jpg",
    rating: 4.9,
    createdAt: "2024-01-20",
  },
]

/* ------------------ STORE INFO ------------------ */

export const storeInfo = {
  name: "Mahi Fashions",
  tagline: "Shop the Look. Love the Price.",
  phone: "+919876543210",
  whatsapp: "+919876543210",
  email: "ch@mahif.com",
  address: "123 Afza Street, Ganesh N, Chintal - 505001",
  hours: "Mon-Sat: 9AM - 8PM, Sun: 10AM - 6PM",
  social: {
    facebook: "https://facebook.com/mahifashion",
    instagram: "https://instagram.com/mahifashion",
    twitter: "https://twitter.com/mahifashion",
  },
}

/* ------------------ UTILITIES ------------------ */

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((product) => product.category === categoryId)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured === true)
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim()

  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(q) ||
      product.description.toLowerCase().includes(q) ||
      product.category.toLowerCase().includes(q)
  )
}