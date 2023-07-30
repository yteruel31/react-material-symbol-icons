import React, { createElement, forwardRef } from 'react';
import { IconKey } from '../Icons/generated/generated-icon-keys';
import 'material-symbols/index.css';

interface MaterialSymbolProps {
  icon: IconKey;
  filled?: boolean;
  theme?: 'outlined' | 'rounded' | 'sharp';
  weight?: '100' | '200' | '300' | '400' | '500' | '600' | '700';
  size?: '20' | '24' | '40' | '48';
  color?: React.CSSProperties['color'];
  grade?: '-25' | '0' | '200';
  children?: React.ReactNode;
}

export const MaterialSymbol = forwardRef<HTMLSpanElement, MaterialSymbolProps>(
  (
    {
      icon,
      filled,
      color = 'currentColor',
      theme = 'outlined',
      size = '48',
      weight = '500',
      grade = '0',
      children,
      ...rest
    },
    ref,
  ) => {
    const fontVariationSettings = `'wght' ${weight}, 'FILL' ${
      filled ? 1 : 0
    }, 'GRAD' ${grade}, "opsz" ${size}`;

    return (
      <>
        {createElement(
          'span',
          {
            ref,
            style: {
              fontVariationSettings,
              color,
              fontSize: `${size}px`,
            },
            className: 'material-symbols-' + theme,

            ...rest,
          },
          [...(icon ? [icon] : [])],
        )}
      </>
    );
  },
);
