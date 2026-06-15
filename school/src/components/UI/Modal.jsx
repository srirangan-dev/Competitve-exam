import React from 'react';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

export const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className={`card w-full mx-4 ${sizes[size]} animate-slide-up`}>
        <div className="flex items-center justify-between p-6 border-b border-accent-100">
          <h3 className="h5">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-accent-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export const Alert = ({ variant = 'info', title = '', children, onClose, icon: Icon }) => {
  const variants = {
    success: {
      className: 'alert-success',
      icon: CheckCircle,
    },
    error: {
      className: 'alert-error',
      icon: AlertCircle,
    },
    warning: {
      className: 'alert-warning',
      icon: AlertTriangle,
    },
    info: {
      className: 'alert-info',
      icon: Info,
    },
  };

  const { className, icon: DefaultIcon } = variants[variant];
  const IconComponent = Icon || DefaultIcon;

  return (
    <div className={`alert ${className} animate-slide-down`}>
      <IconComponent size={20} className="flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        {title && <h4 className="font-semibold mb-1">{title}</h4>}
        <p className="text-sm">{children}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 ml-4 text-current opacity-70 hover:opacity-100"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
};

export const Tooltip = ({ content, children, position = 'top' }) => {
  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div className="relative inline-block group">
      {children}
      <div
        className={`
          absolute ${positions[position]} hidden group-hover:block
          bg-accent-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap
          z-50 animate-fade-in
        `}
      >
        {content}
        <div className="absolute w-2 h-2 bg-accent-900 rotate-45" />
      </div>
    </div>
  );
};

export default Modal;
