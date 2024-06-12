"use client"

import classNames from "classnames"
import useMenuStore from "../state"

const Categories = () => {
    const { create, category, categories, setCategory } = useMenuStore()

    const handleClickCategory = (name: string) => {
        setCategory(name)
    }

    if (create) return null

    return (
        <div className="flex gap-x-2.5 py-2.5">
            {categories.map((name, index) => (
                <span
                    key={index}
                    onClick={() => handleClickCategory(name)}
                    className={classNames(
                        {
                            "bg-blue-400 text-white": category == name,
                        },
                        {
                            "text-blue-400": category != name,
                        },
                        "cursor-pointer select-none rounded-md border border-blue-400 p-1 text-sm font-medium hover:bg-blue-400 hover:text-white"
                    )}
                >
                    {name}
                </span>
            ))}
        </div>
    )
}

export default Categories
