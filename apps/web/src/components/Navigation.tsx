import { ChevronRightIcon, CloseIcon, MenuIcon } from '../icons'
import { Dialog } from './Dialog'
import { NextLink } from './NextLink'

interface NavigationProps {
  open?: boolean
}

export function Navigation(props: NavigationProps) {
  const { open } = props

  return (
    <Dialog
      className="inset-0 ml-0 h-full max-h-none w-[700px] max-w-full bg-surface-paper text-text-primary"
      open={open}
    >
      <div className="flex min-h-header-height items-center px-grid-margin">
        <NextLink href={`?nav=${open ? 'false' : 'true'}`} replace role="button">
          {open ? <CloseIcon /> : <MenuIcon />}
        </NextLink>
      </div>

      <nav aria-label="Main navigation">
        {Array.from({ length: 10 }).map((_, index) => (
          <NextLink
            className="text-h3 flex h-14 items-center border-t border-divider px-grid-margin last:border-b"
            href="#0"
            key={index}
          >
            Link {index + 1}
            <ChevronRightIcon className="ml-auto h-6 w-6" />
          </NextLink>
        ))}
      </nav>
    </Dialog>
  )
}
