"use client";
interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: any;
}

const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-1/3">
        <h2 className="text-2xl font-semibold mb-4">
          {product?.product?.name}
        </h2>
        <img
          src={`${process.env.NEXT_PUBLIC_BASE_URL}${product?.product?.image[0]}`}
          alt={product?.name}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <p className="text-gray-700 mb-4">{product?.description}</p>
        <p className="text-gray-700 font-semibold">
          Price: ${product?.product?.price}
        </p>
        <p className="text-gray-700 font-semibold">
          Category: {product?.product?.category}
        </p>
        <p className="text-gray-700 font-semibold">
          Stock: {product?.product?.stock}
        </p>
        <button
          onClick={onClose}
          className="mt-6 bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProductModal;
