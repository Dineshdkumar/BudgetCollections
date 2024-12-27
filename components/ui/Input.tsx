import clsx from "clsx";

interface InputProps {
  label: string;
  id: string;
  type: string;
  disabled?: boolean;
  value: string; // Add the value prop
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  className?: string; // Add className prop
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  type,
  disabled,
  className, // Receive className prop
  value, // Receive the value prop
  onChange, // Receive the onChange prop
  required = false, // Set default value to false if not provided
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium leading-6">
        {label}
      </label>
      <div className="mt-2">
        <input
          disabled={disabled}
          name={id}
          required
          id={id}
          type={type}
          autoComplete={id}
          className={clsx(
            `block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6`,
            disabled && "opacity-50 cursor-default",
            className // Apply the custom className
          )}
        />
      </div>
    </div>
  );
};

export default Input;
