// utils/validation/productValidationSchema.ts
import * as Yup from "yup";

export const productValidationSchema = Yup.object({
  name: Yup.string()
    .test(
      "no-start-space",
      "Name cannot start with a space",
      (value) => !/^\s/.test(value || "")
    )
    .required("Name is required"),
  description: Yup.string()
    .test(
      "no-start-space",
      "Description cannot start with a space",
      (value) => !/^\s/.test(value || "")
    )
    .required("Description is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .positive("Price must be a positive number")
    .min(0.01, "Price must be at least 0.01")
    .max(10000, "Price cannot exceed 10,000")
    .required("Price is required"),
  stock: Yup.number()
    .typeError("Stock must be a number")
    .positive("Stock must be a positive number")
    .integer("Stock must be an integer")
    .min(1, "Stock must be at least 1")
    .max(1000, "Stock cannot exceed 1000")
    .required("Stock is required"),
  category: Yup.string().required("Category is required"),
  images: Yup.array()
    .of(
      Yup.mixed()
        .required("Image is required")
        .test("fileSize", "File size is too large", (value) => {
          if (value && value instanceof File) {
            return value.size <= 5 * 1024 * 1024; // 5MB
          }
          return false;
        })
        .test("fileFormat", "Unsupported file format", (value) => {
          if (value && value instanceof File) {
            return ["image/jpeg", "image/png", "image/jpg"].includes(
              value.type
            );
          }
          return false;
        })
    )
    .min(1, "Image is required")
    .required("Images are required"),
});
