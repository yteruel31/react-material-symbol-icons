import React from 'react';
import { MaterialSymbol } from '@/components/MaterialSymbol/MaterialSymbol';

export default {
  title: 'Components/MaterialSymbol',
  component: MaterialSymbol,
};

export const Default = (props) => (
  <div>
    <MaterialSymbol
      {...props}
      icon="window_sensor"
      theme="rounded"
      weight="500"
      filled
    />
  </div>
);
