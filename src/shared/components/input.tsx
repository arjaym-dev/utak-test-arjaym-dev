"use client"

import classNames from "classnames"
import { forwardRef } from "react"

type InputProps = {
    label?: string
    error?: string
    parentClass?: string
    labelClass?: string
} & React.InputHTMLAttributes<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const { className, parentClass, labelClass, label, error, ...rest } = props

    const inputClass = classNames(
        "rounded-md border border-slate-300 p-1 placeholder-slate-400 shadow-sm focus:border-sky-400 focus:outline-none focus:ring-1",
        className
    )
    return (
        <div className={parentClass}>
            {label && <span className={labelClass}>{label}</span>}
            <input ref={ref} className={inputClass} {...rest} />
            {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
        </div>
    )
})
export default Input
