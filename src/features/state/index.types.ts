export type TCreate = {
    product_name: string
    product_cost: string
    product_price: string
    product_stock: string
    product_category: string
    product_options?: TProductOptions[]
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
}

export type TErrors = { [key: string]: string }[]

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
    update: boolean
    add: TCreate
    edit: TCreate
    menus: TMenus
    optionsError: TErrors
    variantsError: TErrors
    setMenus: (payload: any) => void
    setCategory: (category: string) => void
    setOpenForm: (status: string) => void
    setEdit: (status: boolean, menu: TCreate) => void
    setUpdateOptionName: (
        { name }: { [name: string]: string },
        uuid: string
    ) => void
    setUpdateOptionVariantName: (
        { name }: { [name: string]: string },
        variantUuid: string,
        optionUuid: string
    ) => void
    setAddOptions: () => void
    setRemoveOptions: (uuid: string) => void
    setAddVariant: (uuid: string) => void
    setRemoveVariant: (option_uuid: string, variant_uuid: string) => void
    setValidateOptions: () => void
}
