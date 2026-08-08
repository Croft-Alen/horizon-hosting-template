'use client';

import * as React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
  children?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md', 
    href, 
    target,
    rel,
    className = '', 
    children, 
    ...props 
  }, ref) => {
    const sizeClasses = {
      sm: 'px-4 py-2 text-sm gap-2',
      md: 'px-6 py-3 text-base gap-2.5',
      lg: 'px-8 py-4 text-lg gap-3'
    };

    const variantClasses = {
      primary: 'bg-brand text-pageBg font-semibold border border-black/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_6px_12px_rgba(0,0,0,0.25)] hover:brightness-105',
      secondary: 'bg-cardBg text-text-body font-semibold border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_6px_12px_rgba(0,0,0,0.3)] hover:bg-white/5',
      outline: 'border border-white/15 text-text-body font-semibold hover:bg-white/5',
      ghost: 'text-text-body font-medium hover:text-text-heading transition-colors'
    };

    const baseClasses = cn(
      "inline-flex items-center justify-center rounded-2xl transition-all duration-150 select-none",
      sizeClasses[size],
      variantClasses[variant],
      className
    );

    if (href) {
      return (
        <Link 
          href={href} 
          target={target}
          rel={rel}
          className={baseClasses}
        >
          {children}
        </Link>
      );
    }

    return (
      <button 
        ref={ref} 
        className={baseClasses} 
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };