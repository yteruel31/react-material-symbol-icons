import React from 'react';
import { MaterialSymbol } from '@/components/MaterialSymbol/MaterialSymbol';

export default {
  title: 'Components/MaterialSymbol',
  component: MaterialSymbol,
};

export const Default = () => (
  <div style={{ backgroundColor: 'black' }}>
    <MaterialSymbol
      icon="1k"
      color="#fff"
      theme="rounded"
      weight="100"
      size={100}
    />
  </div>
);
