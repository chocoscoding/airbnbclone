"use client";
import type { FC } from "react";
interface MenuItemsProps {
  onClick: () => void;
  label: string;
}
const MenuItem: FC<MenuItemsProps> = ({ onClick, label }) => {
  return (
    <div onClick={onClick} className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'>
      {label}
    </div>
  );
};

export default MenuItem;
