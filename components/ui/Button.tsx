"use client";

import { useFormStatus } from "react-dom";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string; // Add className prop
}

const Button: React.FC<ButtonProps> = ({
  type = "button", // Default to "button" if not provided
  children,
  onClick,
  disabled,
  className, // Receive the className prop
}) => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      aria-disabled={pending}
      className={`bg-gray-700 text-white py-1 px-3 shadow rounded-md ${className}`} // Use className prop
    >
      {children}
    </button>
  );
};

export default Button;
