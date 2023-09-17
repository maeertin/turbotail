import type { Meta, StoryObj } from '@storybook/react'
import clsx from 'clsx'

type TypographyProps = {
  children: React.ReactNode
  variant:
    | 'h1'
    | 'h1-xs'
    | 'h1-sm'
    | 'h1-md'
    | 'h1-lg'
    | 'h1-xl'
    | 'h2'
    | 'h2-xs'
    | 'h2-md'
    | 'h2-xl'
    | 'button'
}

function Typography(props: TypographyProps) {
  const { children, variant } = props

  return (
    <p
      className={clsx({
        'type-h1': variant === 'h1',
        'type-h1-xs': variant === 'h1-xs',
        'type-h1-sm': variant === 'h1-sm',
        'type-h1-md': variant === 'h1-md',
        'type-h1-lg': variant === 'h1-lg',
        'type-h1-xl': variant === 'h1-xl',
        'type-h2': variant === 'h2',
        'type-h2-xs': variant === 'h2-xs',
        'type-h2-md': variant === 'h2-md',
        'type-h2-xl': variant === 'h2-xl',
        'type-button': variant === 'button',
      })}
    >
      {children}
    </p>
  )
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Core/Typography',
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // Use `render` and not `component` to show rendered HTML in the Storybook Docs.
  render: Typography,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'h1',
        'h1-xs',
        'h1-sm',
        'h1-md',
        'h1-lg',
        'h1-xl',
        'h2',
        'h2-xs',
        'h2-md',
        'h2-xl',
        'button',
      ],
    },
  },
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Typography',
    variant: 'h1',
  },
}
