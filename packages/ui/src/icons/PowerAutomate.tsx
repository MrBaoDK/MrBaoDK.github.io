import React from 'react';

const PowerAutomate: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox='0 0 96 96'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    stroke='currentColor'
    {...props}
  >
    {/* Upper Leaf - Solid Fill for Primary Anchor */}
    <path
      d='M52.5093 3C55.3657 3 58.0858 4.22148 59.9834 6.35636L82.6577 31.8649C88.9106 38.8995 85.0005 50.0661 75.7251 51.6632L21.5 61L28.2997 53.3134C30.9819 50.2813 30.9765 45.7235 28.287 42.6979L7.79435 19.6436C2.06189 13.1946 6.63995 3 15.2684 3H52.5093Z'
      strokeWidth='4'
    />
    {/* Middle Leaf - Outlined for depth */}
    <path
      d='M15.2684 93C6.63995 93 2.0619 82.8054 7.79436 76.3563L59.0945 18.6436C62.4624 14.8548 62.4624 9.14522 59.0945 5.35636L57 3L91.0945 41.3564C94.4624 45.1453 94.4624 50.8548 91.0945 54.6437L59.9834 89.6436C58.0858 91.7785 55.3657 93 52.5093 93H15.2684Z'
      strokeWidth='3'
      fill='currentColor'
    />
    {/* Bottom Leaf - Outlined */}
    <path
      d='M38.3611 93C33.184 93 30.4371 86.8833 33.8766 83.0139L75.0945 36.6436C78.4624 32.8548 78.4624 27.1452 75.0945 23.3563L71 18.75L91.0945 41.3563C94.4624 45.1452 94.4624 50.8547 91.0946 54.6436L59.9834 89.6437C58.0858 91.7785 55.3657 93 52.5093 93H38.3611Z'
      strokeWidth='3'
      fill='currentColor'
    />
  </svg>
);

export default PowerAutomate;
