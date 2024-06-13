import { create } from "zustand"
import { v4 as uuidv4 } from "uuid"

import { TMenuState, TProductOptions } from "./index.types"

const menus = [
    {
        product_name: "1 pc Fried chicken",
        product_price: "140",
        product_cost: "150",
        product_stock: "140",
        product_category: "Foods",
    },
    {
        product_name: "Coca Cola",
        product_price: "50",
        product_cost: "60",
        product_stock: "140",
        product_category: "Drinks",
    },
    {
        product_name: "Sprite",
        product_price: "50",
        product_cost: "60",
        product_stock: "140",
        product_category: "Drinks",
    },
    {
        product_name: "1 pc Fried chicken w/coke",
        product_price: "140",
        product_cost: "150",
        product_stock: "140",
        product_category: "Foods & Drinks",
        product_options: [
            {
                name: "Fries",
                variants: [
                    {
                        name: "Small",
                        stock: "3",
                    },
                    {
                        name: "Medium",
                        stock: "3",
                    },
                    {
                        name: "Large",
                        stock: "3",
                    },
                ],
            },
            {
                name: "Plain rice",
            },
        ],
    },
]

const useMenuStore = create<TMenuState>()((set, state) => ({
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
        product_options: [],
    },
    setCategory: (category) => {
        set({ category: category })
    },
    setCreate: (status) => {
        set({ create: status })
    },
    setAddOptions: () => {
        const { add } = state()
        const product_options = add.product_options as TProductOptions
        const newProductOptions = [
            ...product_options,
            { uuid: uuidv4(), name: "", variants: [] },
        ]

        set({
            add: {
                ...add,
                product_options: newProductOptions,
            },
        })
    },
    setRemoveOptions: (uuid: string) => {
        const { add } = state()
        const product_options = add.product_options as TProductOptions
        const newProductOptions = product_options.filter(
            (product) => product.uuid != uuid
        )

        set({
            add: {
                ...add,
                product_options: newProductOptions,
            },
        })
    },
    setAddVariant: (uuid: string) => {
        const { add } = state()
        const product_options = add.product_options as TProductOptions

        const newProductOptions = product_options.map((product) => {
            const variant = [...product.variants]

            if (uuid == product.uuid) {
                variant.push({ uuid: uuidv4(), name: "" })

                return { ...product, variants: variant }
            } else {
                return product
            }
        })

        set({
            add: {
                ...add,
                product_options: newProductOptions,
            },
        })
    },
    setRemoveVariant: (option_uuid, variant_uuid) => {
        const { add } = state()
        const product_options = add.product_options as TProductOptions

        const newProductOptions = product_options.map((product) => {
            const variants = [...product.variants]

            if (option_uuid == product.uuid) {
                const newVariants = variants.filter(
                    (variant) => variant.uuid != variant_uuid
                )

                return { ...product, variants: newVariants }
            } else {
                return product
            }
        })

        set({
            add: {
                ...add,
                product_options: newProductOptions,
            },
        })
    },
}))

export default useMenuStore
