import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function Input({ 
  label, 
  error, 
  icon: Icon,
  type,
  ...props 
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500">
            <Icon size={20} />
          </div>
        )}
        <input
          {...props}
          type={inputType}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            w-full px-4 py-3 ${Icon ? 'pl-11' : ''} ${isPassword ? 'pr-11' : ''}
            border rounded-lg 
            text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
            bg-gray-50 dark:bg-gray-700
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:bg-white dark:focus:bg-gray-600
            transition-all duration-200
            ${error ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : isFocused ? 'border-primary-500' : 'border-gray-300 dark:border-gray-600'}
            ${props.disabled ? 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed' : ''}
          `}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}
