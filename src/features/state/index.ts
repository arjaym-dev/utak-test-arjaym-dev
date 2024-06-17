import { create } from "zustand"
import { v4 as uuidv4 } from "uuid"

import { TMenuState, TProductOptions } from "./index.types"

const useMenuStore = create<TMenuState>()((set, state) => ({
    category: "All",
    categories: ["All", "Foods", "Drinks", "Foods & Drinks"],
    categoriesDd: ["Foods", "Drinks", "Foods & Drinks"],
    create: false,
    update: false,
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
    edit: {
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
    setOpenForm: (type) => {
        const { add, create, update } = state()

        if (type == "add") {
            if (create) {
                set({ create: !create })
            } else {
                set({
                    create: !create,
                    add: { ...add, product_options: [] },
                    optionsError: [],
                    variantsError: [],
                })
            }
        } else {
            if (update) {
                set({ update: !update })
            }
        }
    },
    setEdit: (status, menu) => {
        if (status) {
            if (menu.product_options == undefined) {
                menu.product_options = []
            }
            set({ update: status, edit: menu })
        } else {
            set({ update: status, optionsError: [], variantsError: [] })
        }
    },
    setUpdateOptionName: (option, optionUuid) => {
        const { add, edit, optionsError, create, update } = state()

        let productOptions: TProductOptions[] = []

        if (create) productOptions = add.product_options as TProductOptions[]
        if (update) productOptions = edit.product_options as TProductOptions[]

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

        if (create) {
            set({
                add: {
                    ...add,
                    product_options: newProductOptions,
                },
                optionsError: newOptionsError,
            })
        }
        if (update) {
            set({
                edit: {
                    ...edit,
                    product_options: newProductOptions,
                },
                optionsError: newOptionsError,
            })
        }
    },
    setUpdateOptionVariantName: (option, variantUuid, optionUuid) => {
        const { add, edit, create, update, variantsError } = state()

        let productOptions: TProductOptions[] = []

        if (create) productOptions = add.product_options as TProductOptions[]
        if (update) productOptions = edit.product_options as TProductOptions[]

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

        if (create) {
            set({
                add: {
                    ...add,
                    product_options: newProductOptions,
                },
                variantsError: newVariantsError,
            })
        }

        if (update) {
            set({
                edit: {
                    ...edit,
                    product_options: newProductOptions,
                },
                variantsError: newVariantsError,
            })
        }
    },

    setAddOptions: () => {
        const { add, edit, create, update } = state()

        let productOptions: TProductOptions[] = []

        if (create) productOptions = add.product_options as TProductOptions[]
        if (update) productOptions = edit.product_options as TProductOptions[]

        if (typeof productOptions == "undefined") productOptions = []

        const newProductOptions = [
            ...productOptions,
            { uuid: uuidv4(), name: "", variants: [] },
        ]

        if (create) {
            set({
                add: {
                    ...add,
                    product_options: newProductOptions,
                },
            })
        }

        if (update) {
            set({
                edit: {
                    ...edit,
                    product_options: newProductOptions,
                },
            })
        }
    },
    setRemoveOptions: (uuid: string) => {
        const { add, edit, create, update } = state()

        let productOptions: TProductOptions[] = []

        if (create) productOptions = add.product_options as TProductOptions[]
        if (update) productOptions = edit.product_options as TProductOptions[]

        const newProductOptions = productOptions.filter(
            (product) => product.uuid != uuid
        )

        if (create) {
            set({
                add: {
                    ...add,
                    product_options: newProductOptions,
                },
            })
        }
        if (update) {
            set({
                edit: {
                    ...edit,
                    product_options: newProductOptions,
                },
            })
        }
    },
    setAddVariant: (uuid: string) => {
        const { add, edit, create, update } = state()

        let productOptions: TProductOptions[] = []

        if (create) productOptions = add.product_options as TProductOptions[]
        if (update) productOptions = edit.product_options as TProductOptions[]

        const newProductOptions = productOptions.map((product) => {
            const variant = [...product.variants]

            if (uuid == product.uuid) {
                variant.push({ uuid: uuidv4(), name: "" })

                return { ...product, variants: variant }
            } else {
                return product
            }
        })

        if (create) {
            set({
                add: {
                    ...add,
                    product_options: newProductOptions,
                },
            })
        }
        if (update) {
            set({
                edit: {
                    ...edit,
                    product_options: newProductOptions,
                },
            })
        }
    },
    setRemoveVariant: (option_uuid, variant_uuid) => {
        const { add, edit, create, update } = state()

        let productOptions: TProductOptions[] = []

        if (create) productOptions = add.product_options as TProductOptions[]
        if (update) productOptions = edit.product_options as TProductOptions[]

        const newProductOptions = productOptions.map((product) => {
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

        if (create) {
            set({
                add: {
                    ...add,
                    product_options: newProductOptions,
                },
            })
        }
        if (update) {
            set({
                edit: {
                    ...edit,
                    product_options: newProductOptions,
                },
            })
        }
    },
    setValidateOptions: () => {
        const { add, edit, create, update } = state()

        let productOptions: TProductOptions[] = []

        if (create) productOptions = add.product_options as TProductOptions[]
        if (update) productOptions = edit.product_options as TProductOptions[]

        const optionErrors = []
        const variantErrors = []

        console.log("productOptions", productOptions)
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
