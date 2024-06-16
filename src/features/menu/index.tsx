import React from "react"

import Categories from "./categories"
import Menus from "./menus"
import HeaderMenu from "./header"
import Create from "./create"
import Edit from "./edit"

export default function Menu() {
    return (
        <main className="absolute left-0 top-0 h-full w-full bg-gray-100/50">
            <div className="container mx-auto mt-10 rounded-md bg-white p-2.5 shadow-md md:max-w-4xl">
                <HeaderMenu />
                <Categories />
                <Menus />
                <Create />
                <Edit />
            </div>
        </main>
    )
}
