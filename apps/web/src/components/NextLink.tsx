'use client'

import type { LinkProps } from 'next/link'
import Link from 'next/link'

interface NextLinkProps extends React.HTMLAttributes<HTMLAnchorElement>, LinkProps { }

export function NextLink(props: NextLinkProps) {
  const { href, role, ...other } = props

  function handleKeyUp(event: React.KeyboardEvent<HTMLAnchorElement>) {
    if (
      event.code === 'Space' &&
      role === 'button' &&
      'click' in event.target &&
      typeof event.target.click === 'function'
    ) {
      event.target.click()
    }
  }

  return <Link href={href} onKeyUp={handleKeyUp} role={role} {...other} />
}
