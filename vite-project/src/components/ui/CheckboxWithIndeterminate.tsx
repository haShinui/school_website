import React, { useEffect, useRef, forwardRef } from 'react';
//import { Checkbox } from '@/components/ui/checkbox';

interface CheckboxWithIndeterminateProps extends React.InputHTMLAttributes<HTMLInputElement> {
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

    return <input type="checkbox" ref={resolvedRef} {...props} />;
  }
);

CheckboxWithIndeterminate.displayName = 'CheckboxWithIndeterminate';

export default CheckboxWithIndeterminate;
