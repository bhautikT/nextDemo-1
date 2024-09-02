"use client";

import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Select from "react-select";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { signInUser } from "@/services/authService";
import withAuthPublic from "@/components/AuthGuard/Auth-wrapper-public";
import { AiOutlineClose, AiOutlineCloudUpload } from "react-icons/ai";
import { signupValidationSchema } from "../../../../../utils/validation/signUpValidation";
import { AppDispatch } from "@/redux/store";

interface SignupFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  gender: string;
  skills: { label: string; value: string }[];
  terms: boolean;
  images: File[];
}

const skillOptions = [
  { value: 1, label: "JavaScript" },
  { value: 2, label: "React" },
  { value: 3, label: "Node.js" },
  { value: 4, label: "TypeScript" },
  { value: 5, label: "CSS" },
];

const Signup = () => {
  const [previews, setPreviews] = useState<string[]>([]);
  const dispatch: AppDispatch = useDispatch();

  const initialValues: SignupFormValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    gender: "",
    skills: [],
    terms: false,
    images: [],
  };

  const onSubmit = async (values: SignupFormValues, { resetForm }: { resetForm: () => void }) => {
    // Create a FormData object
    const formData = new FormData();
    const skillValues = values?.skills?.map((skill) => skill.value);

    // Append each field to FormData
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("password", values.password);
    // formData.append("confirmPassword", values.confirmPassword);
    formData.append("phoneNumber", values.phoneNumber);
    formData.append("gender", values.gender);
    formData.append("terms", values.terms.toString()); // Convert boolean to string

    // Append skills as a comma-separated string if needed
    formData.append("skills", JSON.stringify(skillValues));
    formData.append("role", "admin");
    // Append images
    values.images.forEach((image) => {
      formData.append("profile_image", image);
    });

    try {
      const response = await dispatch(signInUser(formData)).unwrap();
      // Handle success
      console.log("Success:", response);
    } catch (error) {
      // Handle error
      console.error("Error:", error);
    }

    // Reset form and previews
    resetForm();
    setPreviews([]);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8 max-h-screen overflow-y-auto">
        <h1 className="text-2xl font-bold text-center mb-6 mt-[27px]">Formik Sign Up</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={signupValidationSchema}
          onSubmit={onSubmit}
          encType="multipart/form-data"
        >
          {({ setFieldValue, values }) => (
            <Form className="space-y-4">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Phone Number Field */}
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <Field
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Gender Radio Buttons */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center">
                    <Field
                      type="radio"
                      id="male"
                      name="gender"
                      value="male"
                      className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    />
                    <label htmlFor="male" className="ml-2 block text-sm text-gray-700">
                      Male
                    </label>
                  </div>
                  <div className="flex items-center">
                    <Field
                      type="radio"
                      id="female"
                      name="gender"
                      value="female"
                      className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    />
                    <label htmlFor="female" className="ml-2 block text-sm text-gray-700">
                      Female
                    </label>
                  </div>
                </div>
                <ErrorMessage name="gender" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Skills Multi-Select */}
              <div>
                <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
                  Skills
                </label>
                <Field name="skills">
                  {({ field, form }: any) => (
                    <Select
                      isMulti
                      options={skillOptions}
                      value={field.value}
                      onChange={(selectedOptions: any) =>
                        form.setFieldValue("skills", selectedOptions)
                      }
                      className="basic-multi-select"
                      classNamePrefix="select"
                    />
                  )}
                </Field>
                <ErrorMessage name="skills" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Multiple Images Upload with Previews */}
              <div>
                <label htmlFor="images" className="block text-sm font-medium text-gray-700">
                  Profile Images (Multi Images)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="images"
                    name="images"
                    accept="image/jpeg, image/png, image/jpg"
                    multiple
                    onChange={(event) => {
                      if (event.currentTarget.files) {
                        const files = Array.from(event.currentTarget.files);
                        setFieldValue("images", files);
                        setPreviews(files.map((file) => URL.createObjectURL(file)));
                      }
                    }}
                    className="sr-only" // Hide the actual input element
                  />
                  <button
                    type="button"
                    onClick={() => document.getElementById("images")?.click()}
                    className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-full bg-gray-100 hover:bg-gray-200"
                  >
                    <AiOutlineCloudUpload className="text-gray-500 w-6 h-6" />
                  </button>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {previews.map((preview, index) => (
                      <div key={index} className="relative w-32 h-32">
                        <Image
                          src={preview}
                          alt={`Preview ${index}`}
                          layout="fill"
                          objectFit="cover"
                          className="border border-gray-300 rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updatedPreviews = previews.filter((_, i) => i !== index);
                            setPreviews(updatedPreviews);
                            setFieldValue(
                              "images",
                              values.images.filter((_, i) => i !== index)
                            );
                          }}
                          className="absolute top-1 right-1 text-sm text-red-600 hover:text-red-700"
                        >
                          <AiOutlineClose className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <ErrorMessage name="images" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Terms and Conditions Checkbox */}
              <div>
                <Field
                  type="checkbox"
                  id="terms"
                  name="terms"
                  className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                  I accept the terms and conditions
                </label>
                <ErrorMessage name="terms" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Sign Up
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default withAuthPublic(Signup);
