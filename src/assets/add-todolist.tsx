import React from 'react'
import { SVGProps, Ref, forwardRef, memo } from 'react'

const AddTodolist = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={30}
        height={30}
        className="icon"
        viewBox="0 0 1024 1024"
        {...props}
        ref={ref}
    >
        <path
            fill="#D1C4E9"
            d="M810.667 149.333H213.333c-23.466 0-42.666 19.2-42.666 42.667v128c0 23.467 19.2 42.667 42.666 42.667h597.334c23.466 0 42.666-19.2 42.666-42.667V192c0-23.467-19.2-42.667-42.666-42.667zm0 256H213.333c-23.466 0-42.666 19.2-42.666 42.667v128c0 23.467 19.2 42.667 42.666 42.667h597.334c23.466 0 42.666-19.2 42.666-42.667V448c0-23.467-19.2-42.667-42.666-42.667zm0 256H213.333c-23.466 0-42.666 19.2-42.666 42.667v128c0 23.467 19.2 42.667 42.666 42.667h597.334c23.466 0 42.666-19.2 42.666-42.667V704c0-23.467-19.2-42.667-42.666-42.667z"
        />
        <path
            fill="#43A047"
            d="M597.333 810.667a213.333 213.333 0 1 0 426.667 0 213.333 213.333 0 1 0-426.667 0Z"
        />
        <path fill="#FFF" d="M768 682.667h85.333v256H768z" />
        <path fill="#FFF" d="M682.667 768h256v85.333h-256z" />
    </svg>
)
const ForwardRef = forwardRef(AddTodolist)
const Memo = memo(ForwardRef)

export { Memo as AddTodolist }