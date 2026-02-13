import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger";
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  isLoading = false,
  className = "",
  disabled,
  type = "button",
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-emerald-600 text-white hover:bg-emerald-700 shadow-md",
    secondary:
      "bg-slate-900 text-white hover:bg-slate-800 shadow-md",
    outline:
      "border border-slate-300 text-slate-700 hover:bg-slate-100",
    danger:
      "bg-red-500 text-white hover:bg-red-600 shadow-md",
  };

  return (
    <button
      type={type}
      disabled={isLoading || disabled}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin mr-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5 0 0 5 0 12h4z"
          />
        </svg>
      )}

      <span className={isLoading ? "opacity-80" : ""}>
        {children}
      </span>
    </button>
  );
};

export default Button;
