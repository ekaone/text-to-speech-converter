import * as React from 'react'
import Link from 'next/link'

import { NavItem } from '@/types/nav'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className='flex md:gap-6'>
      <Link href='/' className='flex items-center space-x-2'>
        <span className='hidden font-bold md:inline-block'>
          {siteConfig.name}
        </span>
      </Link>
      {items?.length ? (
        <nav className='flex gap-4'>
          {items?.map(
            (item, index) =>
              item.isActive && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    'flex items-center text-sm font-medium text-muted-foreground',
                    item.disabled && 'cursor-not-allowed opacity-80'
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}
    </div>
  )
}
