import React from 'react';

const Input = ({
  type = 'text',
  placeholder = '',
  value = '',
  onChange,
  disabled = false,
  error = '',
  label = '',
  required = false,
  size = 'md',
  icon: Icon,
  className = '',
  ...props
}) => {
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-5 py-3 text-lg',
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-accent-900 mb-2">
          {label}
          {required && <span className="text-danger-600 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent-400">
            <Icon size={20} />
          </div>
        )}
        
        <input
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          className={`
            input-text
            ${sizes[size]}
            ${Icon ? 'pl-10' : ''}
            ${error ? 'border-danger-500 focus:border-danger-500 focus:ring-danger-200' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      
      {error && (
        <p className="text-danger-600 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default Input;
