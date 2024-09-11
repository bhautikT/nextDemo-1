import React from "react";
import { FaSortDown, FaSortUp, FaTrash } from "react-icons/fa";

type TableColumn<T> = {
  header: string;
  accessor: keyof T;
  render?: (value: any, row: T) => JSX.Element | string;
  className?: string;
};

type TableProps<T> = {
  columns: any;
  tableData:any;
  loading:any;
  onDelete?: (id: string) => void;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  pageClassNames?: string;
  actionButtons?: (row: T) => JSX.Element;
  defaultImage:any
  onSort:any
  sortorder:any
  sortcoloum:any
};


export const CommonTable = <T extends { id: string }>({
  columns,
  tableData,
  loading,
  onDelete,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  pageClassNames = "",
  actionButtons,
  defaultImage,
  sortcoloum,
  sortorder,
  onSort}: TableProps<T>) => {
  console.log(tableData,'data',columns)
  const renderSortIcon = (columnKey: string) => {
    if (sortcoloum === columnKey) {
      return sortorder === "asc" ? (
        <FaSortUp className="inline ml-2" />
      ) : (
        <FaSortDown className="inline ml-1" />
      );
    }
    return null;
  }
  return (
    <>
      <table className="min-w-full bg-white rounded-lg overflow-hidden shadow">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((column:any) => (
              <th
                key={column.label}
                onClick={() => onSort(column.key)} // Trigger sort on click
                className={`py-4 px-6 text-left font-semibold text-gray-600 ${
                  column.className || ""
                }`}
              >
                {column.label}
                {renderSortIcon(column.key)} 
              </th>
            ))}
            {onDelete && (
              <th className="py-4 px-6 text-left font-semibold text-gray-600">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
        {tableData?.map((row: any, index: number) => (
              <tr key={index} className="hover:bg-gray-50">
                {columns.map((column:any) => (
                  <td key={column.key} className="py-4 px-6 border-gray-200 text-gray-800">
                    {column.type === "image" ? (
                      <img
                        src={
                          row && row.provider
                            ? row[column.key]
                            : `${process.env.NEXT_PUBLIC_BASE_URL}${row[column.key]}` || defaultImage
                              
                        }
                        alt={row?.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      row[column.key]
                    )}
                  </td>
                ))}
                {onDelete && (
                  <td className="py-4 px-6 border-gray-200 flex space-x-4"> <button
                                    className="text-red-500 hover:text-red-700"
                                    onClick={() => onDelete(row?._id)}
                                  >
                                    <FaTrash size={20} />
                                  </button></td>
                )}
              </tr>
            ))}
        </tbody>
      </table>

      {onPageChange && (
        <div className={`mt-6 flex justify-between items-center ${pageClassNames}`}>
          <button
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            className={`px-4 py-2 rounded ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            className={`px-4 py-2 rounded ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};
