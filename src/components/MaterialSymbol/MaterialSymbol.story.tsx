import React from 'react';
import { StoryObj } from '@storybook/react';
import { MaterialSymbol as Component } from '@/components/MaterialSymbol/MaterialSymbol';
import { iconKeys } from '@/components/Icons/generated/generated-icon-keys';

export default {
  title: 'Components/MaterialSymbol',
  component: Component,
};

type Story = StoryObj<typeof Component>;

export const MaterialSymbol: Story = {
  args: {
    filled: true,
    theme: 'outlined',
    weight: '500',
  },
  argTypes: {
    icon: {
      control: {
        disable: true,
      },
    },
    children: {
      control: {
        disable: true,
      },
    },
    color: {
      control: {
        type: 'color',
      },
    },
  },
  render: (args) => {
    return (
      <div>
        {iconKeys.map((iconKey) => (
          <div
            key={iconKey}
            style={{
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              margin: '1em',
            }}
          >
            <Component {...args} icon={iconKey} />
            <span>{iconKey}</span>
          </div>
        ))}
      </div>
    );
  },
};
