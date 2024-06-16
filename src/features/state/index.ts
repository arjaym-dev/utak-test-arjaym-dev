import { create } from "zustand"
import { v4 as uuidv4 } from "uuid"

import { TMenuState, TProductOptions } from "./index.types"

const useMenuStore = create<TMenuState>()((set, state) => ({
    category: "All",
    categories: ["All", "Foods", "Drinks", "Foods & Drinks"],
    categoriesDd: ["Foods", "Drinks", "Foods & Drinks"],
    create: false,
    menus: [],
    optionsError: [],
    variantsError: [],
    add: {
        product_name: "",
        product_cost: "",
        product_price: "",
        product_stock: "",
        product_category: "Foods",
        product_options: [],
    },
    setMenus: (payload) => {
        set({ ...payload })
    },
    setCategory: (category) => {
        set({ category: category })
    },
    setCreate: (status) => {
        const { add } = state()

        if (status) {
            set({ create: status })
        } else {
            set({
                create: status,
                add: { ...add, product_options: [] },
                optionsError: [],
                variantsError: [],
            })
        }
    },
    setUpdateOptionName: (option, optionUuid) => {
        const { add, optionsError } = state()

        const productOptions = add.product_options as TProductOptions[]
        const copiedProductOptions = [...productOptions]
        const copiedOptionsError = [...optionsError]
        const newProductOptions = copiedProductOptions.map((product) => {
            if (product.uuid == optionUuid) {
                return { ...product, ...option }
            } else {
                return product
            }
        })

        const newOptionsError = copiedOptionsError.filter(
            (error) => error.uuid != optionUuid
        )
        set({
            add: {
                ...add,
                product_options: newProductOptions,
            },
            optionsError: newOptionsError,
        })
    },
    setUpdateOptionVariantName: (option, variantUuid, optionUuid) => {
        const { add, variantsError } = state()

        const productOptions = add.product_options as TProductOptions[]
        const copiedProductOptions = [...productOptions]
        const copiedVariantsError = [...variantsError]
        const newProductOptions = copiedProductOptions.map((product) => {
            if (product.uuid == optionUuid) {
                const variants = [...product.variants]

                const newVariants = variants.map((variant) => {
                    if (variant.uuid == variantUuid) {
                        return { ...variant, ...option }
                    } else {
                        return variant
                    }
                })

                return { ...product, variants: newVariants }
            } else {
                return product
            }
        }) as TProductOptions[]

        const newVariantsError = copiedVariantsError.filter(
            (error) => error.uuid != variantUuid
        )

        set({
            add: {
                ...add,
                product_options: newProductOptions,
            },
            variantsError: newVariantsError,
        })
    },

    setAddOptions: () => {
        const { add } = state()
        const product_options = add.product_options as TProductOptions[]
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
        const product_options = add.product_options as TProductOptions[]
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
        const product_options = add.product_options as TProductOptions[]

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
        const product_options = add.product_options as TProductOptions[]

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
    setValidateOptions: () => {
        const { add } = state()

        const productOptions = add.product_options as TProductOptions[]
        const optionErrors = []
        const variantErrors = []

        for (let i = 0; i < productOptions.length; i++) {
            const option = productOptions[i]
            const variants = productOptions[i].variants

            if (option.name == "") {
                optionErrors.push({
                    uuid: option.uuid,
                    error: "Option name is required",
                })
            }

            for (let v = 0; v < variants.length; v++) {
                const variant = variants[v]

                if (variant.name == "") {
                    variantErrors.push({
                        uuid: variant.uuid,
                        error: "Variant name is required",
                    })
                }
            }
        }

        set({ optionsError: optionErrors, variantsError: variantErrors })
    },
}))

export default useMenuStore
