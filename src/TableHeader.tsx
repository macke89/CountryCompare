import React from 'react';

const TableHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <th className="whitespace-nowrap border-l-0 border-r-0 bg-gray-50 px-2 py-3 text-center align-middle text-xs font-semibold uppercase text-gray-700 w-1/5">
            {children}
        </th>
    );
};

export default TableHeader;