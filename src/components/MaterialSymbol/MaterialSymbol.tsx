import React, { createElement, forwardRef } from 'react';
import { IconKey } from '../Icons/generated/generated-icon-keys';
import 'material-symbols/index.css';

export interface MaterialSymbolProps {
  /** The icon to display */
  icon: IconKey;

  /** Whether the icon should be filled or not */
  filled?: boolean;

  /** The theme of the icon. Defaults to 'outlined' */
  theme?: 'outlined' | 'rounded' | 'sharp';

  /** The font weight of the icon. Defaults to '500' */
  weight?: '100' | '200' | '300' | '400' | '500' | '600' | '700';

  /** The size of the icon in px. Defaults to '48' */
  size?: '20' | '24' | '40' | '48' | number;

  /** The color of the icon. Defaults to 'currentColor' */
  color?: React.CSSProperties['color'];

  /** The grade of the icon. Defaults to '0' */
  grade?: '-25' | '0' | '200';

  /** The children of the icon */
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
