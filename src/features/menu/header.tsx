"use client"

import classNames from "classnames"
import useMenuStore from "../state"

const HeaderMenu = () => {
    const { create, update, setOpenForm } = useMenuStore()

    const handleOpenForm = (type: string) => {
        setOpenForm(type)
    }

    const btnClass = classNames(
        { "bg-green-500 hover:bg-green-500/70": create === false },
        { "bg-red-500 hover:bg-red-500/70": create === true },
        "rounded-md px-1.5 py-1.5 text-sm text-white"
    )

    return (
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">UTAK TEST</h1>
            <div>
                {create == false && update == false && (
                    <button
                        onClick={() => handleOpenForm("add")}
                        className={btnClass}
                    >
                        Create
                    </button>
                )}
                {create == true && update == false && (
                    <button
                        onClick={() => handleOpenForm("add")}
                        className={btnClass}
                    >
                        Cancel
                    </button>
                )}
                {create == false && update && (
                    <button
                        onClick={() => handleOpenForm("edit")}
                        className={
                            "rounded-md bg-red-500 px-1.5 py-1.5 text-sm text-white hover:bg-red-500/70"
                        }
                    >
                        Cancel
                    </button>
                )}
            </div>
        </div>
    )
}

export default HeaderMenu
