export type TCreate = {
    product_name: string
    product_cost: string
    product_price: string
    product_stock: string
    product_category: string
    product_options?: TProductOptions
}

export type TProductOptionsVariant = {
    uuid: string
    name: string
    stock?: string
}[]

export type TProductOptions = {
    uuid: string
    name: string
    variants: TProductOptionsVariant
}[]

export type TMenus =
    | {
          product_name: string
          product_price: string
          product_cost: string
          product_stock: string
          product_category: string
          product_options?: {
              name: string
              variants?: {
                  name: string
                  stock?: string
              }[]
          }[]
      }[]
    | []

export type TMenuState = {
    category: string
    categories: string[]
    categoriesDd: string[]
    create: boolean
    add: TCreate
    menus: TMenus

    setCategory: (category: string) => void
    setCreate: (status: boolean) => void
    setAddOptions: () => void
    setRemoveOptions: (uuid: string) => void
    setAddVariant: (uuid: string) => void
    setRemoveVariant: (option_uuid: string, variant_uuid: string) => void
}
