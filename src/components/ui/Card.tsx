import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  elevation?: 'lowest' | 'low' | 'highest';
  interactive?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, elevation = 'low', interactive = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg transition-colors',
          {
            'bg-surface': elevation === 'lowest',
            'bg-surface-container-low': elevation === 'low',
            'bg-surface-container-highest': elevation === 'highest',
            'hover:bg-surface-container-highest cursor-pointer': interactive && elevation === 'low',
          },
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';
