import React, { createElement, forwardRef } from 'react';
import { ICONS } from '../Icons/generated/generated-icon-children';
import { IconKey } from '../Icons/generated/generated-icon-keys';

interface MaterialSymbolProps {
  icon: IconKey;
  filled?: boolean;
  theme?: 'outlined' | 'rounded' | 'sharp';
  weight?: '100' | '200' | '300' | '400' | '500' | '600' | '700';
  size?: number;
  color?: string;
  stroke?: string;
  children?: React.ReactNode;
}

export const MaterialSymbol = forwardRef<SVGElement, MaterialSymbolProps>(
  (
    {
      icon,
      filled,
      color = 'currentColor',
      theme = 'outlined',
      size = 24,
      weight = '500',
      children,
      ...rest
    },
    ref,
  ) => {
    const key = `${icon}${filled ? '-fill' : ''}_${theme}_${weight}`;
    const iconNodes = ICONS[key];

    return (
      <>
        {createElement(
          'svg',
          {
            ref,
            xmlns: 'http://www.w3.org/2000/svg',
            viewBox: '0 -960 960 960',
            width: size,
            height: size,
            fill: color,
            ...rest,
          },
          [
            ...iconNodes.map(([tag, attrs]) => createElement(tag, attrs)),
            ...(children ? [children] : []),
          ],
        )}
      </>
    );
  },
);
