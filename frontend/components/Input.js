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
        <label className="block  text-sm font-semibold mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 ">
            <Icon size={20} />
          </div>
        )}
        <input
          {...props}
          type={inputType}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            backgroundColor: '#ffffff',
            color: '#111827',
            borderColor: error ? '#ef4444' : isFocused ? '#3b82f6' : '#d1d5db',
          }}
          className={`
            w-full px-4 py-3 ${Icon ? 'pl-11' : ''} ${isPassword ? 'pr-11' : ''}
            border-2 rounded-lg 
            placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-blue-500
            transition-all duration-200
            ${props.disabled ? 'opacity-60 cursor-not-allowed' : ''}
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
