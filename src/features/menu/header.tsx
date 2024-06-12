"use client"

import classNames from "classnames"
import useMenuStore from "../state"

const HeaderMenu = () => {
    const { create, setCreate } = useMenuStore()

    const handleOpenCreate = () => {
        setCreate(!create)
    }

    const btnClass = classNames(
        { "bg-green-500 hover:bg-green-500/70": create === false },
        { "bg-red-500 hover:bg-red-500/70": create === true },
        "rounded-md px-1.5 py-1.5 text-sm text-white"
    )

    return (
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">UTAK TEST</h1>
            <button onClick={handleOpenCreate} className={btnClass}>
                {create ? "Cancel" : "Create"}
            </button>
        </div>
    )
}

export default HeaderMenu
