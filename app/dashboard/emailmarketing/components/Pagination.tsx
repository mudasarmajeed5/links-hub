"use client";
type PatginationProps = {
    totalItems: number,
    itemsPerPage: number,
    paginate: (num:number) => void,
}
import React from 'react'

const Pagination: React.FC<PatginationProps> = ({ totalItems, itemsPerPage, paginate }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <div className="flex justify-center items-center gap-1">
            {pageNumbers.map(num => (
                <button className="px-4 py-1 h-fit bg-black-100 text-white" key={num} onClick={() => paginate(num)}>
                    {num}
                </button>
            ))}
        </div>
    )
}

export default Pagination