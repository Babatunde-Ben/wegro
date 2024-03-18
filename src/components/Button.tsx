import React from "react";

type ButtonProps = {
  variant: "primary" | "secondary";
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
};
const Button = ({ variant, onClick, children, disabled }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full h-full rounded-full outline-none inline-flex justify-center items-center font-medium transition duration-150  disabled:bg-primary-100 disabled:text-primary-300 ${
        variant === "primary"
          ? "bg-primary-500 text-white border-none text-lg hover:bg-primary-400"
          : "text-primary-500 border-2 border-primary-500 text-sm hover:bg-primary-100 hover:border-primary-400 md:text-lg"
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
