import React from "react";

type TableColumn<T> = {
  header: string;
  accessor: keyof T;
  render?: (value: any, row: T) => JSX.Element | string;
  className?: string;
};

type TableProps<T> = {
  columns: TableColumn<T>[];
  data: T[];
  onDelete?: (id: string) => void;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  pageClassNames?: string;
  actionButtons?: (row: T) => JSX.Element;
};

export const CommonTable = <T extends { id: string }>({
  columns,
  data,
  onDelete,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  pageClassNames = "",
  actionButtons,
}: TableProps<T>) => {
  return (
    <>
      <table className="min-w-full bg-white rounded-lg overflow-hidden shadow">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((column) => (
              <th
                key={column.header}
                className={`py-4 px-6 text-left font-semibold text-gray-600 ${
                  column.className || ""
                }`}
              >
                {column.header}
              </th>
            ))}
            {onDelete && (
              <th className="py-4 px-6 text-left font-semibold text-gray-600">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {columns.map((column) => (
                <td
                  key={column.header}
                  className={`py-4 px-6 border-gray-200 text-gray-800 ${column.className || ""}`}
                >
                  {/* {column.render ? column.render(row[column.accessor], row) : row[column.accessor]} */}
                </td>
              ))}
              {onDelete && (
                <td className="py-4 px-6 border-gray-200 flex space-x-4">
                  {actionButtons ? (
                    actionButtons(row)
                  ) : (
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => onDelete(row.id)}
                    >
                      Delete
                    </button>
                  )}
                </td>
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
