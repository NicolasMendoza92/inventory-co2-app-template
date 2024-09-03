import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import {
  ArrowUpDown,
  Calendar,
  ChevronDown,
  ChevronRight,
  CirclePlus,
  Download,
  Globe,
  LogOut,
  Moon,
  PenSquare,
  Sun,
  Upload
} from 'lucide-react'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input dark:border-green-950 bg-green-200 dark:bg-green-950 hover:bg-accent dark:hover:bg-green-700/50 hover:text-accent-foreground text-black',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-green-700/50',
        link: 'text-primary underline-offset-4 hover:underline'
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  icon?: string
  hidden?: boolean
}

const iconsClassName = 'h-4 w-4 text-green-950 dark:text-green-50'

const Icon = ({ type }: { type: string }) => {
  const icons: { [key: string]: JSX.Element } = {
    download: <Download className={iconsClassName} />,
    chevronDown: <ChevronDown className={iconsClassName} />,
    plus: <CirclePlus className={iconsClassName} />,
    ChevronRight: <ChevronRight className={iconsClassName} />,
    upload: <Upload className={iconsClassName} />,
    penSquare: <PenSquare className={iconsClassName} />,
    calendar: <Calendar className={iconsClassName} />,
    globe: <Globe className={iconsClassName} />,
    moon: <Moon className={iconsClassName} />,
    sun: <Sun className={iconsClassName} />,
    logOut: <LogOut className={iconsClassName} />,
    arrowUpDown: <ArrowUpDown className={iconsClassName} />
  }
  return icons[type] || null
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {props.icon && <Icon type={props.icon} />}
        <p
          className={`${props.hidden && 'hidden'} md:inline-flex ${
            props.children && 'md:ml-2 lg:ml-2'
          } lg:inline-flex  md:text-sm lg:text-ml text-green-950 dark:text-green-50`}
        >
          {props.children}
        </p>
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
