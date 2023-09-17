'use client'

import { useEffect, useRef } from 'react'

interface DialogProps extends React.HTMLAttributes<HTMLDialogElement> {
  open?: boolean
}

export function Dialog(props: DialogProps) {
  const { children, open, ...other } = props

  const rootRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (open) {
      rootRef.current?.showModal()
    } else {
      rootRef.current?.close()
    }
  }, [open])

  return (
    <dialog ref={rootRef} {...other}>
      {children}
    </dialog>
  )
}
