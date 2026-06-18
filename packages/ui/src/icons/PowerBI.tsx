import React from 'react';

const PowerBI: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox='0 0 96 96'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    stroke='currentColor'
    {...props}
  >
    {/* Middle Bar - Primary Anchor (Filled) */}
    <path
      d='M32 28C32 25.7909 33.791 24 36.0001 24H60C62.2091 24 64 26.1909 64 28V96H32V28Z'
      fill='currentColor'
    />
    {/* Short Bar (Left) - Secondary Context (Filled) */}
    <path
      d='M12 52C12 49.7909 13.7909 48 16 48H40C42.2091 48 44 49.7909 44 52V96H12V52Z'
      fill='currentColor'
    />
    {/* Tallest Bar (Right) - Design Accent (Outlined) */}
    <path
      d='M52 4C52 1.79086 53.7909 0 56 0H80C82.2091 0 84 1.79086 84 4V92C84 94.2091 82.2091 96 80 96H52V4Z'
      strokeWidth='4'
    />
  </svg>
);

export default PowerBI;
