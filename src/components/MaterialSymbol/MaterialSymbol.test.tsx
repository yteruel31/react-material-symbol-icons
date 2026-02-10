import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { MaterialSymbol } from './MaterialSymbol';

describe('MaterialSymbol', () => {
  it('renders the icon name as text content', () => {
    render(<MaterialSymbol icon="check_circle" data-testid="icon" />);
    expect(screen.getByTestId('icon')).toHaveTextContent('check_circle');
  });

  it('applies the outlined theme class by default', () => {
    render(<MaterialSymbol icon="home" data-testid="icon" />);
    expect(screen.getByTestId('icon')).toHaveClass('material-symbols-outlined');
  });

  it('applies the rounded theme class', () => {
    render(<MaterialSymbol icon="home" theme="rounded" data-testid="icon" />);
    expect(screen.getByTestId('icon')).toHaveClass('material-symbols-rounded');
  });

  it('applies the sharp theme class', () => {
    render(<MaterialSymbol icon="home" theme="sharp" data-testid="icon" />);
    expect(screen.getByTestId('icon')).toHaveClass('material-symbols-sharp');
  });

  it('sets font-variation-settings with default values', () => {
    render(<MaterialSymbol icon="home" data-testid="icon" />);
    const el = screen.getByTestId('icon');
    expect(el.style.fontVariationSettings).toContain("'wght' 500");
    expect(el.style.fontVariationSettings).toContain("'FILL' 0");
    expect(el.style.fontVariationSettings).toContain("'GRAD' 0");
  });

  it('sets FILL to 1 when filled is true', () => {
    render(<MaterialSymbol icon="home" filled data-testid="icon" />);
    const el = screen.getByTestId('icon');
    expect(el.style.fontVariationSettings).toContain("'FILL' 1");
  });

  it('applies custom color', () => {
    render(<MaterialSymbol icon="home" color="red" data-testid="icon" />);
    expect(screen.getByTestId('icon').style.color).toBe('red');
  });

  it('defaults color to currentColor', () => {
    render(<MaterialSymbol icon="home" data-testid="icon" />);
    expect(screen.getByTestId('icon').style.color).toBe('currentcolor');
  });

  it('applies size as fontSize', () => {
    render(<MaterialSymbol icon="home" size={24} data-testid="icon" />);
    expect(screen.getByTestId('icon').style.fontSize).toBe('24px');
  });

  it('merges custom className with theme class', () => {
    render(
      <MaterialSymbol icon="home" className="my-class" data-testid="icon" />,
    );
    const el = screen.getByTestId('icon');
    expect(el).toHaveClass('material-symbols-outlined');
    expect(el).toHaveClass('my-class');
  });

  it('merges custom style with internal styles', () => {
    render(
      <MaterialSymbol
        icon="home"
        style={{ marginTop: '10px' }}
        data-testid="icon"
      />,
    );
    const el = screen.getByTestId('icon');
    expect(el.style.marginTop).toBe('10px');
    expect(el.style.fontVariationSettings).toBeTruthy();
  });

  it('forwards ref to the span element', () => {
    const ref = createRef<HTMLSpanElement>();
    render(<MaterialSymbol icon="home" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it('passes through additional HTML attributes', () => {
    render(
      <MaterialSymbol icon="home" aria-label="Home icon" data-testid="icon" />,
    );
    expect(screen.getByTestId('icon')).toHaveAttribute(
      'aria-label',
      'Home icon',
    );
  });
});
