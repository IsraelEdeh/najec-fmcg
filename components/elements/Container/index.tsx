import React from 'react'

type ContainerProps = {
    children: React.ReactNode,
    className?: string
}

const index = ({ children, className }: ContainerProps) => {
    return (
        <div className={`mx-auto max-w-[1300px] lg:w-11/12 w-11/12 ${className}`}>
            {children}
        </div>
    )
}

export default index