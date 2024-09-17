// src/components/ui/CheckboxWithIndeterminate.tsx
import React, { useEffect, useRef, forwardRef } from 'react';
import { Checkbox, CheckboxProps } from '@/components/ui/checkbox';

interface CheckboxWithIndeterminateProps extends CheckboxProps {
  indeterminate?: boolean;
}

const CheckboxWithIndeterminate = forwardRef<HTMLInputElement, CheckboxWithIndeterminateProps>(
  ({ indeterminate = false, ...props }, ref) => {
    const defaultRef = useRef<HTMLInputElement>(null);
    const resolvedRef = ref || defaultRef;

    useEffect(() => {
      if (resolvedRef && 'current' in resolvedRef && resolvedRef.current) {
        resolvedRef.current.indeterminate = indeterminate;
      }
    }, [resolvedRef, indeterminate]);

    return <Checkbox ref={resolvedRef} {...props} />;
  }
);

CheckboxWithIndeterminate.displayName = 'CheckboxWithIndeterminate';

export default CheckboxWithIndeterminate;
