"use client"

import React, { useMemo } from "react"
import useMenuStore from "../state"

const displayVariants = (variant: any) => {
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
                    {displayVariants(option.variant)}
                </div>
            ))}
        </div>
    )
}

const Menus = () => {
    const { create, menus, category, setCategory } = useMenuStore()

    const filterMenus = useMemo(() => {
        return menus.filter((menu) => {
            if (category == "All") {
                return menus
            } else if (menu.category == category) {
                return menu
            }
        })
    }, [menus, category, setCategory])

    if (create) return null

    return (
        <div className="flex h-full max-h-[500px] min-h-[500px] flex-wrap content-baseline gap-2.5 overflow-y-auto">
            {filterMenus.map((menu, index) => (
                <div key={index} className="w-full max-w-[209px]">
                    <div className="flex h-[100px] w-full select-none items-center justify-center border-2">
                        Image Here
                    </div>
                    <div className="flex h-full max-h-[100px] w-full flex-col overflow-y-auto bg-gray-100/50 p-2.5 shadow-md">
                        <span className="select-none text-xs font-medium">
                            name:{" "}
                            <span className="font-normal text-gray-600">
                                {menu.name}
                            </span>
                        </span>
                        <span className="select-none text-xs font-medium">
                            price:{" "}
                            <span className="font-normal text-gray-600">
                                {menu.price}
                            </span>
                        </span>
                        <span className="select-none text-xs font-medium">
                            cost:{" "}
                            <span className="font-normal text-gray-600">
                                {menu.cost}
                            </span>
                        </span>
                        <span className="select-none text-xs font-medium">
                            stock:{" "}
                            <span className="font-normal text-gray-600">
                                {menu.stock}
                            </span>
                        </span>
                        <span className="select-none text-xs font-medium">
                            category:{" "}
                            <span className="font-normal text-gray-600">
                                {menu.category}
                            </span>
                        </span>
                        {displayOptions(menu.options)}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Menus