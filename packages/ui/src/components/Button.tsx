import { cva, type VariantProps } from 'class-variance-authority'
import clsx from 'clsx'
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../utils'

export function Template(props: { children: ReactNode }) {
  const { children } = props

  return (
    <button
      // ...
      className={clsx('')}
      type="button"
    >
      {children}
    </button>
  )
}

export const buttonVariants2 = cva('')

export const buttonVariants = cva(
  'type-button border bg-clip-padding px-7 py-3 transition-colors disabled:border-action-disabledBg disabled:bg-action-disabledBg disabled:text-action-disabled',
  {
    variants: {
      color: {
        default: '',
        primary: '',
      },
      variant: {
        contained: '',
        outlined: '',
        plain: '',
      },
    },
    compoundVariants: [
      {
        color: 'default',
        variant: 'contained',
        class:
          'border-default bg-default text-default-contrast hover:border-default-light hover:bg-default-light',
      },
      {
        color: 'primary',
        variant: 'contained',
        class:
          'border border-primary bg-primary text-primary-contrast hover:border-primary-dark hover:bg-primary-dark',
      },
      {
        color: 'default',
        variant: 'outlined',
        class:
          'border border-default text-default hover:border-default-light hover:bg-default-light hover:text-default-contrast',
      },
      {
        color: 'primary',
        variant: 'outlined',
        class:
          'border-primary text-primary hover:border-primary-dark hover:bg-primary-dark hover:text-primary-contrast',
      },
      {
        color: 'default',
        variant: 'plain',
        class: 'border-transparent text-default',
      },
      {
        color: 'primary',
        variant: 'plain',
        class: 'border-transparent text-primary',
      },
    ],
    defaultVariants: {
      color: 'default',
      variant: 'contained',
    },
  },
)

export type ButtonVariantProps = VariantProps<typeof buttonVariants>

export interface ButtonProps
  extends ButtonVariantProps,
  Omit<HTMLAttributes<HTMLButtonElement>, keyof ButtonVariantProps> {
  disabled?: boolean
}

/**
 * Buttons let users take actions and make choices with a single tap.
 *
 * @example
 *   ;<Button variant="contained" color="primary">
 *     Hello World
 *   </Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(props, ref) {
  const { children, className, color, variant, ...other } = props

  return (
    <button
      className={cn(buttonVariants({ className, color, variant }))}
      ref={ref}
      type="button"
      {...other}
    >
      {children}
    </button>
  )
})

// TODO: Figure out why `displayName` is not being set correctly.
Button.displayName = 'Button'
