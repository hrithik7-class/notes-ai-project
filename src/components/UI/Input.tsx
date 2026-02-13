import React from "react";

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  id,
  name,
  className = "",
  ...props
}) => {
  const inputId = id || name;

  return (
    <div className="space-y-2 w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-semibold text-slate-700"
        >
          {label}
        </label>
      )}

      <input
        id={inputId}
        name={name}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={`w-full px-4 py-3 rounded-xl border ${
          error
            ? "border-red-500"
            : "border-slate-300 focus:border-emerald-600"
        } outline-none transition`}
        {...props}
      />

      {error && (
        <p
          id={`${inputId}-error`}
          className="text-sm text-red-500"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
