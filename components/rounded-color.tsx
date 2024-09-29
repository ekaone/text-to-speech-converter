import React from 'react'
import { cn } from '@/lib/utils'

function RoundedColor({ bgColor }: { bgColor: string }) {
  return <span className={cn('mr-2 size-2 rounded-full', bgColor)} />
}

export default RoundedColor
