"use client";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  isProduct?: any;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, data, isProduct }) => {
  if (!isOpen || !data) return null;

  return (
    <>
      {isProduct ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-1/3">
            <h2 className="text-2xl font-semibold mb-4">
              {data?.product?.name}
            </h2>
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_URL}${data?.product?.image[0]}`}
              alt={data?.name}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p className="text-gray-700 mb-4">{data?.description}</p>
            <p className="text-gray-700 font-semibold">
              Price: ${data?.product?.price}
            </p>
            <p className="text-gray-700 font-semibold">
              Category:{" "}
              {data?.product?.category ? data?.product?.category?.name : "-"}
            </p>
            <p className="text-gray-700 font-semibold">
              Stock: {data?.product?.stock}
            </p>
            <button
              onClick={onClose}
              className="mt-6 bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-200"
            >
              Close
            </button>
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-1/3">
            <h2 className="text-2xl font-semibold mb-4">{data?.name}</h2>
            <p className="text-gray-700 mb-4 font-semibold">
              Description: {data?.description}
            </p>
            <p className="text-gray-700 font-semibold">
              Status: {data?.isActive ? "Active" : "InActive"}
            </p>
            <button
              onClick={onClose}
              className="mt-6 bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
