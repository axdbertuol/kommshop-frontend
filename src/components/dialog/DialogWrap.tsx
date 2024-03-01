'use client'
import { ReactNode } from 'react'
import { AlertDialog } from '../ui/alert-dialog'

export default function DialogWrap({
  children,
  open = true,
}: {
  children: ReactNode
  open: boolean
}) {
  return <AlertDialog open={open}>{children}</AlertDialog>
}
