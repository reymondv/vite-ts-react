import { DocumentData, QuerySnapshot } from 'firebase/firestore';
import React, { useEffect, useRef } from 'react';

interface Value {
  value: DocumentData | undefined;
}
export const AlwaysScrollToBottom = ({ value }: Value) => {
  const elementRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    elementRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [value]);
  return <div ref={elementRef} />;
};
