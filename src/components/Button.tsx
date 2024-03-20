import React from "react";
import ButtonLoader from "../assets/SVGs/button-loader.svg?react";

type ButtonProps = {
  variant: "primary" | "secondary";
  children: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};
const Button = ({
  variant,
  onClick,
  children,
  disabled,
  isLoading,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full h-full select-none rounded-full outline-none inline-flex gap-3 justify-center items-center font-medium transition duration-150  disabled:bg-primary-100 disabled:text-primary-300 ${
        variant === "primary"
          ? "bg-primary-500 text-white border-none hover:bg-primary-400"
          : "text-primary-500 border-2 border-primary-400  hover:bg-primary-100 hover:border-primary-400 "
      }`}
    >
      {isLoading ? <ButtonLoader className="animate-spin" /> : children}
    </button>
  );
};

export default Button;
