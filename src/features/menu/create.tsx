"use client"

import Input from "@/shared/components/input"
import useMenuStore from "../state"
const Create = () => {
    const { create, categoriesDd } = useMenuStore()

    if (!create) return null

    return (
        <div>
            <div className="mt-2.5 flex flex-col flex-wrap gap-y-2.5 p-2.5 sm:flex-row">
                <div className="w-full sm:w-1/2">
                    <Input
                        labelClass="mr-2 inline-block w-[100px] text-sm"
                        parentClass="flex items-center"
                        label="Product name"
                        className="flex-1 sm:w-2/4 sm:flex-initial md:w-2/3"
                    />
                </div>
                <div className="w-full sm:w-1/2">
                    <Input
                        labelClass="mr-2 inline-block w-[100px] text-sm"
                        parentClass="flex items-center"
                        label="Product price"
                        className="flex-1 sm:w-2/4 sm:flex-initial md:w-2/3"
                        type="number"
                        min={0}
                    />
                </div>
                <div className="w-full sm:w-1/2">
                    <Input
                        labelClass="mr-2 inline-block w-[100px] text-sm"
                        parentClass="flex items-center"
                        label="Product cost"
                        className="flex-1 sm:w-2/4 sm:flex-initial md:w-2/3"
                        type="number"
                        min={0}
                    />
                </div>
                <div className="w-full sm:w-1/2">
                    <Input
                        labelClass="mr-2 inline-block w-[100px] text-sm"
                        parentClass="flex items-center"
                        label="Product stock"
                        className="flex-1 sm:w-2/4 sm:flex-initial md:w-2/3"
                        type="number"
                        min={0}
                    />
                </div>
                <div className="w-full sm:w-1/2">
                    <div className="flex items-center">
                        <span className="mr-2 inline-block w-[100px] text-sm">
                            Product category
                        </span>
                        <select className="flex-1 appearance-none rounded-md border border-slate-300 p-1 focus:outline-none sm:w-2/4 sm:flex-initial md:w-2/3">
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
                <button className="rounded-md bg-green-500 px-1.5 py-1.5 text-sm text-white hover:bg-green-500/70">
                    Add options +
                </button>
            </div>
            <div className="p-2.5">
                <div>
                    <button className="mb-2.5 rounded-md bg-green-500 px-1.5 py-1.5 text-sm text-white hover:bg-green-500/70">
                        Add variant +
                    </button>
                    <div className="mb-2.5">
                        <Input
                            labelClass="mr-2 text-sm mb-2.5"
                            parentClass="flex flex-col"
                            label="Product option name"
                        />
                    </div>
                    {/* <div className="flex items-end">
                        <Input
                            parentClass="flex flex-col"
                            labelClass="mr-2 mb-2.5 text-sm"
                            label="Product variant name"
                            min={0}
                        />
                        <button className="mb-2 ml-2 rounded-md bg-red-500 px-1.5 text-sm text-white hover:bg-red-500/70">
                            -
                        </button>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Create
