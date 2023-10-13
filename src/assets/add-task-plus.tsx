import React from 'react'
import { SVGProps, Ref, forwardRef, memo } from 'react'

const AddTaskPlus = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        fill="none"
        viewBox="0 0 24 24"
        {...props}
        ref={ref}
    >
        <path
            stroke="rgb(65, 68, 80)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 12h6m0 0h6m-6 0v6m0-6V6"
        />
    </svg>
)
const ForwardRef = forwardRef(AddTaskPlus)
const Memo = memo(ForwardRef)

export { Memo as AddTaskPlus }