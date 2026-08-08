'use client';

import * as React from "react";
import { cn } from "@/lib/utils";
import { IconType } from 'react-icons';

interface IconBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  icon: IconType;
  className?: string;
  children?: React.ReactNode;
}

const IconBox = React.forwardRef<HTMLDivElement, IconBoxProps>(
  ({ size = 'md', icon: IconComponent, className = '', children, ...props }, ref) => {
    const sizeClasses = {
      sm: 'w-10 h-10 text-lg',
      md: 'w-12 h-12 text-2xl',
      lg: 'w-14 h-14 text-3xl'
    };

    const baseClasses = cn(
      "inline-flex items-center justify-center rounded-xl bg-brand text-pageBg font-semibold border border-black/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_6px_12px_rgba(0,0,0,0.25)] transition-all duration-150 select-none",
      sizeClasses[size],
      className
    );

    return (
      <div ref={ref} className={baseClasses} {...props}>
        {IconComponent && <IconComponent className="w-5 h-5" />}
        {children}
      </div>
    );
  }
);

IconBox.displayName = "IconBox";

export { IconBox };