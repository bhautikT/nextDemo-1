import { handleKeyDown } from "@/utils/CommonInputValidation";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordInput = ({ id, label, register, error, ...rest }: any) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        <input
          type={passwordVisible ? "text" : "password"}
          id={id}
          autoComplete="current-password"
          placeholder={label}
          {...rest}
          {...register}
          onKeyDown={handleKeyDown}
          className="border border-gray-300 rounded-lg py-2 px-4 w-full pr-12 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary_orange focus:border-transparent"
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
        >
          {passwordVisible ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
};

export default PasswordInput;
