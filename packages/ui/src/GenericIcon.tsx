import React from 'react';

export interface GenericIconProps {
  /**
   * The icon to render. Can be a React component or a string name (for Material Symbols).
   */
  icon?: string | React.ComponentType<{ size?: number | string; className?: string }>;
  /**
   * Optional provider for Material Symbols logic if 'icon' is a string.
   */
  provider?: 'material-symbols' | 'internal';
  className?: string;
  /**
   * Predefined size tokens or a custom number/string.
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number | string;
}

const SIZE_MAP: Record<string, number> = {
  xs: 12,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
  '2xl': 64,
};

/**
 * GenericIcon Component
 * A modular, high-performance icon renderer that supports dynamic component injection,
 * custom SVG components, and Material Symbols with unified sizing tokens.
 */
const GenericIcon: React.FC<GenericIconProps> = ({
  icon: Icon,
  provider,
  className,
  size = 'md',
}) => {
  const pixelSize = typeof size === 'string' && SIZE_MAP[size] ? SIZE_MAP[size] : size;
  const iconSizeStyle =
    typeof pixelSize === 'number'
      ? { width: pixelSize, height: pixelSize }
      : { width: pixelSize, height: pixelSize };

  // 1. Handle Component-based Icons (React Icons or Custom SVGs)
  if (typeof Icon === 'function' || (typeof Icon === 'object' && Icon !== null)) {
    const IconComponent = Icon as React.ComponentType<
      React.SVGProps<SVGSVGElement> & { size?: number | string }
    >;
    return <IconComponent className={className} size={pixelSize} style={iconSizeStyle} />;
  }

  // 2. Handle Material Symbols (Icon is a string)
  if (typeof Icon === 'string' || provider === 'material-symbols') {
    const iconName = typeof Icon === 'string' ? Icon : '';
    return (
      <span
        className={`material-symbols-outlined ${className || ''}`}
        style={{ fontSize: pixelSize }}
      >
        {iconName}
      </span>
    );
  }

  return null;
};

export default GenericIcon;
