import type { Meta, StoryObj } from '@storybook/react'
import clsx from 'clsx'
import { Button, buttonVariants } from 'ui'

type TemplateProps = {
  children: React.ReactNode
  color: 'default' | 'primary'
  variant: 'contained' | 'outlined' | 'plain'
  disabled: boolean
}

function Template(props: TemplateProps) {
  const { children, color, disabled, variant } = props

  return (
    <button
      className={clsx(
        'text-button border px-7 py-3 transition-colors disabled:bg-action-disabledBg disabled:text-action-disabled',
        {
          // Default Contained
          'border-default bg-default text-default-contrast hover:border-default-light hover:bg-default-light':
            color === 'default' && variant === 'contained',
          // Primary Contained
          'border border-primary bg-primary text-primary-contrast hover:border-primary-dark hover:bg-primary-dark':
            color === 'primary' && variant === 'contained',
          // Default Outlined
          'border border-default text-default hover:border-default-light hover:bg-default-light hover:text-default-contrast':
            color === 'default' && variant === 'outlined',
          // Primary Outlined
          'border-primary text-primary hover:border-primary-dark hover:bg-primary-dark hover:text-primary-contrast':
            color === 'primary' && variant === 'outlined',
        },
      )}
      disabled={disabled}
      type="button"
    >
      {children}
    </button>
  )
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Core/Button',
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // Use `render` and not `component` to show rendered HTML in the Storybook Docs.
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    color: {
      control: 'select',
      options: ['default', 'primary'],
    },
    variant: {
      control: 'select',
      options: ['contained', 'outlined', 'plain'],
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Button',
    color: 'default',
    disabled: false,
    variant: 'contained',
  },
}

export const CustomElement: Story = {
  args: {
    ...Default.args,
  },
  render: (args) => {
    const { color, variant, ...other } = args

    return <button className={buttonVariants({ color, variant })} {...other} />
  },
}
