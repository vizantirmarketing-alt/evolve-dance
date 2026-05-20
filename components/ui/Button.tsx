import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { buttonVariants, type ButtonSize, type ButtonSurface, type ButtonVariant } from './button-styles'
import { cn } from '@/lib/utils'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  surface?: ButtonSurface
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'default', surface = 'light', className, type = 'button', ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(buttonVariants({ variant, size, surface }), className)}
        {...props}
      />
    )
  },
)

Button.displayName = 'Button'

export default Button
