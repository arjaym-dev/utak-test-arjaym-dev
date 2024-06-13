"use client"

import { Formik, FormikProps } from "formik"
import { useRef } from "react"
import Input from "@/shared/components/input"
import useMenuStore from "../state"
import { TProductOptionsVariant, TCreate } from "../state/index.types"
import { MenuSchemaValidation } from "./validation"

{
    /*  */
}
const DisplayVariant = ({
    variants,
    productId,
}: {
    variants: TProductOptionsVariant
    productId: string
}) => {
    const { setRemoveVariant } = useMenuStore()

    if (variants.length == 0) return null

    return variants.map((variant, index) => (
        <div key={index} className="flex items-end">
            <Input
                parentClass="flex flex-col"
                labelClass="mr-2 mb-2.5 text-sm"
                label="Product variant name"
                min={0}
            />
            <button
                onClick={() => setRemoveVariant(productId, variant.uuid)}
                className="mb-2 ml-2 rounded-md bg-red-500 px-1.5 text-sm text-white hover:bg-red-500/70"
            >
                -
            </button>
        </div>
    ))
}

const DisplayOptions = () => {
    const { add, setRemoveOptions, setAddVariant } = useMenuStore()

    if (add.product_options && add.product_options.length == 0) return null

    return add.product_options?.map((product, index) => (
        <div key={index} className="mb-5">
            <button
                onClick={() => setAddVariant(product.uuid)}
                className="mb-2.5 rounded-md bg-green-500 px-1.5 py-1.5 text-sm text-white hover:bg-green-500/70"
            >
                Add variant +
            </button>
            <button
                onClick={() => setRemoveOptions(product.uuid)}
                className="ml-2.5 rounded-md bg-red-500 px-1.5 py-1.5 text-sm text-white hover:bg-red-500/70"
            >
                Remove options -
            </button>
            <div className="mb-2.5">
                <Input
                    labelClass="mr-2 text-sm mb-2.5"
                    parentClass="flex flex-col"
                    label="Product option name"
                />
            </div>
            <DisplayVariant
                variants={product.variants}
                productId={product.uuid}
            />
        </div>
    ))
}
const Create = () => {
    const { create, categoriesDd, add, setAddOptions } = useMenuStore()
    const formRef = useRef<FormikProps<TCreate> | null>(null)

    if (!create) return null

    const handleValidateForm = () => {
        formRef.current?.handleSubmit()
    }

    const handleSubmit = (values: TCreate) => {
        const { product_options, ...restValues } = values
    }

    const handleAddOptions = () => {
        setAddOptions()
    }
    console.log("add:", add)
    return (
        <div>
            <Formik
                validationSchema={MenuSchemaValidation}
                innerRef={formRef}
                initialValues={add}
                onSubmit={handleSubmit}
            >
                {({ values, errors, handleChange }) => {
                    console.log("errors:", errors)
                    return (
                        <>
                            <div className="mt-2.5 flex flex-col flex-wrap gap-y-2.5 p-2.5 sm:flex-row">
                                <div className="w-full sm:w-1/2 sm:pr-2.5">
                                    <Input
                                        labelClass="mb-1 inline-block w-[100px] text-sm"
                                        parentClass="flex flex-col"
                                        label="Product name"
                                        className="flex-1"
                                        name="product_name"
                                        value={values.product_name}
                                        onChange={handleChange}
                                        error={errors.product_name}
                                    />
                                </div>
                                <div className="w-full sm:w-1/2">
                                    <Input
                                        labelClass="mb-1 inline-block w-[100px] text-sm"
                                        parentClass="flex flex-col"
                                        label="Product price"
                                        className="flex-1"
                                        name="product_price"
                                        value={values.product_price}
                                        onChange={handleChange}
                                        error={errors.product_price}
                                    />
                                </div>
                                <div className="w-full sm:w-1/2 sm:pr-2.5">
                                    <Input
                                        labelClass="mb-1 inline-block w-[100px] text-sm"
                                        parentClass="flex flex-col"
                                        label="Product cost"
                                        className="flex-1"
                                        name="product_cost"
                                        value={values.product_cost}
                                        onChange={handleChange}
                                        error={errors.product_cost}
                                    />
                                </div>
                                <div className="w-full sm:w-1/2">
                                    <Input
                                        labelClass="mb-1 inline-block w-[100px] text-sm"
                                        parentClass="flex flex-col"
                                        label="Product stock"
                                        className="flex-1"
                                        name="product_stock"
                                        value={values.product_stock}
                                        onChange={handleChange}
                                        error={errors.product_stock}
                                    />
                                </div>
                                <div className="w-full sm:w-1/2 sm:pr-2.5">
                                    <div className="flex flex-col">
                                        <span className="mb-1 inline-block text-sm">
                                            Product category
                                        </span>
                                        <select
                                            name="product_category"
                                            className="flex-1 appearance-none rounded-md border border-slate-300 p-1 focus:outline-none"
                                            value={values.product_category}
                                            onChange={handleChange}
                                        >
                                            {categoriesDd.map((val, index) => (
                                                <option
                                                    className="p-2"
                                                    tabIndex={index}
                                                    key={index}
                                                    value={val}
                                                >
                                                    {val}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full text-right">
                                {" "}
                                <button
                                    onClick={handleAddOptions}
                                    className="rounded-md bg-green-500 px-1.5 py-1.5 text-sm text-white hover:bg-green-500/70"
                                >
                                    Add options +
                                </button>
                                <button
                                    onClick={handleValidateForm}
                                    className="ml-2.5 rounded-md bg-green-500 px-1.5 py-1.5 text-sm text-white hover:bg-green-500/70"
                                >
                                    Save
                                </button>
                            </div>
                        </>
                    )
                }}
            </Formik>
            <div className="mt-2.5 h-full max-h-80 overflow-y-auto p-2.5">
                <DisplayOptions />
            </div>
        </div>
    )
}

export default Create
