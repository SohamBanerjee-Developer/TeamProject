import React from 'react'

interface ListProps<T> {
    className?: string;
    data: T[];
    render: (data: T) => React.ReactNode;
}
const List =<T,>({className, data, render}: ListProps<T>) => {
    return (
        <ul className={className}>
            {
                data.map(render)
            }
        </ul>
    )
}
export default List
