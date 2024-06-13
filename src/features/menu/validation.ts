import * as Yup from "yup"

export const MenuSchemaValidation = Yup.object().shape({
    product_name: Yup.string().required("Product name is required"),
    product_cost: Yup.string()
        .matches(/^\d+$/, "Invalid input only number allowed")
        .required("Product cost is required"),
    product_price: Yup.string()
        .matches(/^\d+$/, "Invalid input only number allowed")
        .required("Product price is required"),
    product_stock: Yup.string()
        .matches(/^\d+$/, "Invalid input only number allowed")
        .required("Product stock is required"),
    product_category: Yup.string().required("Product category is required"),
})
