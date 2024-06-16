"use client"

import React, { useEffect, useMemo } from "react"
import { onChildAdded, onValue, ref } from "firebase/database"
import useMenuStore from "../state"
import { TProductOptionsVariant } from "../state/index.types"
import { db, flattenObjToArray } from "./utils"
const displayVariants = (variant: TProductOptionsVariant) => {
    if (typeof variant == "undefined" || variant == null) return null

    let elem: React.ReactNode[] = []

    for (let i = 0; i < variant.length; i++) {
        elem.push(
            <span className="text-xs" key={i}>
                <span className="font-medium">{variant[i].name}</span>
                {/* <span className="text-gray-600">{variant[i].stock}</span> */}
            </span>
        )
    }

    return <span className="flex select-none flex-col pl-2">{elem}</span>
}
const displayOptions = (options: any) => {
    if (
        options == "undefined" ||
        options == null ||
        typeof options == "undefined"
    )
        return null

    return (
        <div>
            <div className="text-sm font-medium">Options: </div>
            {options.map((option: any, index: number) => (
                <div className="flex flex-col" key={index}>
                    <span className="select-none text-xs font-medium">
                        name:{" "}
                        <span className="font-normal text-gray-600">
                            {option.name}
                        </span>
                    </span>
                    {displayVariants(option.variants)}
                </div>
            ))}
        </div>
    )
}

const Menus = () => {
    const { create, menus, category, setCategory, setMenus } = useMenuStore()

    const menusRef = ref(db, "menus")

    useEffect(() => {
        onValue(menusRef, (snapshot) => {
            const data = snapshot.val()

            const flatten = flattenObjToArray(data).filter((dt) => {
                if (category === "All") {
                    return menus
                } else if (category == dt.product_category) {
                    return dt
                }
            })

            setMenus({ menus: flatten })
        })
    }, [category])

    if (create) return null

    return (
        <div className="flex h-full max-h-[500px] min-h-[500px] flex-wrap content-baseline gap-2.5 overflow-y-auto">
            {menus.map((menu, index) => (
                <div key={index} className="w-full max-w-[209px]">
                    <div className="flex h-[100px] w-full select-none items-center justify-center border-2">
                        Image Here
                    </div>
                    <div className="flex h-full max-h-[100px] w-full flex-col overflow-y-auto bg-gray-100/50 p-2.5 shadow-md">
                        <span className="select-none text-xs font-medium">
                            name:{" "}
                            <span className="font-normal text-gray-600">
                                {menu.product_name}
                            </span>
                        </span>
                        <span className="select-none text-xs font-medium">
                            price:{" "}
                            <span className="font-normal text-gray-600">
                                {menu.product_price}
                            </span>
                        </span>
                        <span className="select-none text-xs font-medium">
                            cost:{" "}
                            <span className="font-normal text-gray-600">
                                {menu.product_cost}
                            </span>
                        </span>
                        <span className="select-none text-xs font-medium">
                            stock:{" "}
                            <span className="font-normal text-gray-600">
                                {menu.product_stock}
                            </span>
                        </span>
                        <span className="select-none text-xs font-medium">
                            category:{" "}
                            <span className="font-normal text-gray-600">
                                {menu.product_category}
                            </span>
                        </span>
                        {displayOptions(menu.product_options)}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Menus
