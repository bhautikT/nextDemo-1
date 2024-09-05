// utils/validation/productValidationSchema.ts
import * as Yup from "yup";

export const categoryValidationSchema = Yup.object({
  name: Yup.string()
    .test(
      "no-start-space",
      "Category Name cannot start with a space",
      (value) => !/^\s/.test(value || "")
    )
    .required("Category is required"),
  description: Yup.string()
    .test(
      "no-start-space",
      "Description cannot start with a space",
      (value) => !/^\s/.test(value || "")
    )
    .required("Description is required"),
});
