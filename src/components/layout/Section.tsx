import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  container?: boolean;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, container = true, children, ...props }, ref) => {
    return (
      <section ref={ref} className={cn('py-20 md:py-32', className)} {...props}>
        {container ? (
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            {children}
          </div>
        ) : (
          children
        )}
      </section>
    );
  }
);

Section.displayName = 'Section';
