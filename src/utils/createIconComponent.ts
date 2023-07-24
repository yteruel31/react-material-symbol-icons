import { ComponentPropsWithoutRef, createElement, forwardRef } from 'react';
import PropTypes from 'prop-types';

export default (iconNodes: any) => {
  interface IconBaseProps extends ComponentPropsWithoutRef<'svg'> {
    color?: string;
    size?: string | number;
  }

  const Component = forwardRef<SVGElement, IconBaseProps>(
    ({ color = 'currentColor', size = 100, children, ...rest }, ref) =>
      createElement(
        'svg',
        {
          ref,
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 24 24',
          width: size,
          height: size,
          fill: 'none',
          ...rest,
        },
        [
          ...iconNodes.map(([tag, attrs]) => createElement(tag, attrs)),
          ...(children ? [children] : []),
        ],
      ),
  );

  Component.propTypes = {
    color: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  Component.displayName = 'Icon';

  return Component;
};
