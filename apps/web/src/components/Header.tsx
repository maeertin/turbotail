import { CloseIcon, MenuIcon, SearchIcon } from '../icons'
import { Navigation } from './Navigation'
import { NextLink } from './NextLink'

interface HeaderProps {
  searchParams: {
    nav?: string
    search?: string
  }
}

export function Header(props: HeaderProps) {
  const { searchParams } = props

  const isNavOpen = searchParams.nav === 'true'
  const isSearchOpen = searchParams.search === 'true'

  return (
    <>
      <header className="flex min-h-header-height items-center justify-between gap-grid-gap bg-surface-paper px-grid-margin">
        <NextLink
          aria-expanded={isNavOpen}
          aria-haspopup="true"
          aria-label="Toggle main menu"
          href={`?nav=${isNavOpen ? 'false' : 'true'}`}
          replace
          role="button"
        >
          {isNavOpen ? <CloseIcon /> : <MenuIcon />}
        </NextLink>

        <NextLink
          aria-expanded={isSearchOpen}
          aria-haspopup="true"
          aria-label="Toggle search"
          href={`?search=${isSearchOpen ? 'false' : 'true'}`}
          replace
          role="button"
        >
          {isSearchOpen ? <CloseIcon /> : <SearchIcon />}
        </NextLink>
      </header>

      <Navigation open={isNavOpen} />
    </>
  )
}
