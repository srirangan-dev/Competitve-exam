import React from 'react';

export const Badge = ({ children, variant = 'primary', className = '' }) => {
  const variants = {
    primary: 'badge-primary',
    success: 'badge-success',
    warning: 'badge-warning',
    danger: 'badge-danger',
  };

  return (
    <span className={`badge ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export const Progress = ({ value = 0, max = 100, color = 'primary', showLabel = true }) => {
  const percentage = (value / max) * 100;
  
  const colors = {
    primary: 'bg-primary-600',
    success: 'bg-success-600',
    warning: 'bg-warning-600',
    danger: 'bg-danger-600',
  };

  return (
    <div className="w-full">
      <div className="progress-bar">
        <div
          className={`${colors[color]} h-full rounded-full transition-all duration-500`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-sm text-accent-600 mt-1">{percentage.toFixed(0)}%</p>
      )}
    </div>
  );
};

export const StatusBadge = ({ status = 'online' }) => {
  const statuses = {
    online: 'status-online',
    offline: 'status-offline',
    busy: 'status-busy',
    away: 'status-away',
  };

  return <div className={`status-badge ${statuses[status]}`} />;
};

export default Badge;
