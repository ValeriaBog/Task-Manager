import React from 'react'
import { SVGProps, Ref, forwardRef, memo } from 'react'

const DeleteTodolist = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={30}
        height={30}
        viewBox="0 0 48 48"
        {...props}
        ref={ref}
    >
        <g fill="#D1C4E9">
            <path d="M38 7H10c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h28c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM38 19H10c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h28c1.1 0 2-.9 2-2v-6c0-1.1-.9-2-2-2zM38 31H10c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h28c1.1 0 2-.9 2-2v-6c0-1.1-.9-2-2-2z" />
        </g>
        <circle cx={38} cy={38} r={10} fill="#F44336" />
        <g fill="#fff">
            <path d="m43.31 41.181-2.12 2.121-8.484-8.483 2.12-2.121z" />
            <path d="m34.819 43.31-2.121-2.12 8.483-8.484 2.121 2.12z" />
        </g>
    </svg>
)
const ForwardRef = forwardRef(DeleteTodolist)
const Memo = memo(ForwardRef)

export { Memo as DeleteTodolist }