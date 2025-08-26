import React from "react";

const Button = ({ 
flex,
  children, 
  onClick, 
  variant = "primary", 
  size = "md", 
  type = "button", 
  disabled = false 
}) => {
  const baseStyle =
    "rounded-xl font-medium transition-all duration-200 focus:outline-none";

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-100",
    danger:
      "bg-red-600 text-white hover:bg-red-700 disabled:bg-red-400",
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${flex}`}
    >
      {children}
    </button>
  );
};

export default Button;
