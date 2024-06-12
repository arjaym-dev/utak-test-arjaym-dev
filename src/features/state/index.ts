import { create } from "zustand"

type TMenuState = {
    category: string
    categories: string[]
    categoriesDd: string[]
    create: boolean
    menus:
        | {
              name: string
              price: number
              cost: number
              stock: number
              category: string
              options?: {
                  name: string
                  variant?: {
                      name: string
                      stock: number
                  }[]
              }[]
          }[]
        | []
    setCategory: (category: string) => void
    setCreate: (status: boolean) => void
}

const menus = [
    {
        name: "1 pc Fried chicken",
        price: 140,
        cost: 150,
        stock: 140,
        category: "Foods",
    },
    { name: "Coca Cola", price: 50, cost: 60, stock: 140, category: "Drinks" },
    { name: "Sprite", price: 50, cost: 60, stock: 140, category: "Drinks" },
    {
        name: "1 pc Fried chicken w/coke",
        price: 140,
        cost: 150,
        stock: 140,
        category: "Foods & Drinks",
        options: [
            {
                name: "Fries",
                variant: [
                    {
                        name: "Small",
                        stock: 3,
                    },
                    {
                        name: "Medium",
                        stock: 3,
                    },
                    {
                        name: "Large",
                        stock: 3,
                    },
                ],
            },
            {
                name: "Plain rice",
            },
        ],
    },
]

const useMenuStore = create<TMenuState>()((set) => ({
    category: "All",
    categories: ["All", "Foods", "Drinks", "Foods & Drinks"],
    categoriesDd: ["Foods", "Drinks", "Foods & Drinks"],
    create: false,
    menus: menus,
    add: {
        product_name: "",
        product_cost: "",
        product_price: "",
        product_stock: "",
        product_category: "Foods",
    },
    setCategory: (category) => {
        set({ category: category })
    },
    setCreate: (status) => {
        set({ create: status })
    },
}))

export default useMenuStore
