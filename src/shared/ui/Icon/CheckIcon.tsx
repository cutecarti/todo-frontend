import type { IconProps } from './Icon.types'

export const CheckIcon = ({ size = 16, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden
    {...props}
  >
    <path
      d="M13.3334 4L6.00002 11.3333L2.66669 8"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
