"use client"

import { Formik, FormikProps } from "formik"
import { useRef } from "react"
import classNames from "classnames"

import Input from "@/shared/components/input"
import useMenuStore from "../state"
import { TProductOptionsVariant, TCreate } from "../state/index.types"
import { MenuSchemaValidation } from "./validation"

import { ref, set, push } from "firebase/database"
import { db } from "./utils"

const DisplayVariant = ({
    variants,
    productId,
}: {
    variants: TProductOptionsVariant
    productId: string
}) => {
    const { variantsError, setRemoveVariant, setUpdateOptionVariantName } =
        useMenuStore()

    if (variants.length == 0) return null

    const handleChangeOptionsVariant = (
        e: React.ChangeEvent<HTMLInputElement>,
        variantUuid: string,
        optionUuid: string
    ) => {
        const { name, value } = e.target

        setUpdateOptionVariantName({ [name]: value }, variantUuid, optionUuid)
    }

    return variants.map((variant, index) => {
        let error = ""

        for (let i = 0; i < variantsError.length; i++) {
            if (variant.uuid == variantsError[i].uuid) {
                error = variantsError[i].error
            }
        }
        return (
            <div key={index} className="mb-2.5 flex items-end">
                <Input
                    parentClass="flex flex-col"
                    labelClass="mr-2 mb-2.5 text-sm"
                    label="Product variant name"
                    name="name"
                    value={variant.name}
                    error={error}
                    onChange={(e) =>
                        handleChangeOptionsVariant(e, variant.uuid, productId)
                    }
                />
                <button
                    onClick={() => setRemoveVariant(productId, variant.uuid)}
                    className={classNames(
                        { "mb-2": !error, "mb-7": error },
                        "ml-2 rounded-md bg-red-500 px-1.5 text-sm text-white hover:bg-red-500/70"
                    )}
                >
                    -
                </button>
            </div>
        )
    })
}

const DisplayOptions = () => {
    const {
        add,
        optionsError,
        setRemoveOptions,
        setAddVariant,
        setUpdateOptionName,
    } = useMenuStore()

    if (add.product_options && add.product_options.length == 0) return null

    const handleChangeOptions = (
        e: React.ChangeEvent<HTMLInputElement>,
        optionUuid: string
    ) => {
        const { name, value } = e.target

        setUpdateOptionName({ [name]: value }, optionUuid)
    }

    return add.product_options?.map((product, index) => {
        let error = ""

        for (let i = 0; i < optionsError.length; i++) {
            if (product.uuid == optionsError[i].uuid) {
                error = optionsError[i].error
            }
        }

        return (
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
                        value={product.name}
                        error={error}
                        name="name"
                        onChange={(e) => handleChangeOptions(e, product.uuid)}
                    />
                </div>
                <DisplayVariant
                    variants={product.variants}
                    productId={product.uuid}
                />
            </div>
        )
    })
}

const Create = () => {
    const {
        create,
        categoriesDd,
        add,
        optionsError,
        variantsError,
        setAddOptions,
        setValidateOptions,
        setMenus,
    } = useMenuStore()
    const formRef = useRef<FormikProps<TCreate> | null>(null)

    if (!create) return null

    const handleValidateForm = () => {
        formRef.current?.handleSubmit()

        setValidateOptions()
    }

    const handleSubmit = (values: TCreate) => {
        const { product_options, ...restValues } = values

        if (optionsError.length === 0 || variantsError.length === 0) {
            const obj = { product_options: add.product_options, ...restValues }

            set(push(ref(db, "menus")), obj)

            setMenus({
                create: false,
                add: { ...add, product_options: [] },
                optionsError: [],
                variantsError: [],
            })
        }
    }

    const handleAddOptions = () => setAddOptions()

    return (
        <div>
            <Formik
                validationSchema={MenuSchemaValidation}
                innerRef={formRef}
                initialValues={add}
                onSubmit={handleSubmit}
            >
                {({ values, errors, handleChange }) => {
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
                                    type="button"
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
