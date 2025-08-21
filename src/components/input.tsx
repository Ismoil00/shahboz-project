import type { InputType } from "./types";

export default function Input({
  type,
  name,
  value,
  onChange,
  placeholder,
  label,
  error = false,
  inputTailwindUtilities,
  labelTailwindUtilities,
  onKeyDown,
  disabled,
}: InputType) {
  return (
    <>
      <label
        htmlFor={name}
        className={`input-label w-full tracking-wide font-700 ${
          error ? "text-red-600" : "text-default-text"
        } ${labelTailwindUtilities}`}
      >
        {label || ""}
      </label>
      <input
        type={type}
        name={name}
        value={value === 0 ? "" : value}
        onChange={onChange}
        placeholder={placeholder}
        className={`input w-full px-5 py-3 mt-1 rounded-3xl bg-bg text-hover-text tracking-wide focus:outline-none transition duration-100 focus:ring-1 placeholder-hover-text/30 ${
          error ? "ring-1 ring-red-600" : "focus:ring-hover-text/50"
        } ${inputTailwindUtilities} ${
          disabled && "hover:cursor-not-allowed bg-gray-100"
        }`}
        onKeyDown={onKeyDown}
        disabled={disabled || false}
      />
    </>
  );
}
