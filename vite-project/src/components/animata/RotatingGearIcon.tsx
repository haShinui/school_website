import React from 'react';
import { Gear } from 'phosphor-react';

function RotatingGearIcon() {
  return (
    <Gear
      size={40}
      weight="duotone"
      className="mb-2 text-primary group-hover:animate-spin-slow group-hover:text-gray-400"
    />
  );
}

export default RotatingGearIcon;
