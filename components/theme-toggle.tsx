'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import RoundedColor from './rounded-color'
import { capitalize } from '@/lib/utils'

const colorClasses = [
  { color: 'light', cls: 'bg-gray-200' },
  { color: 'dark', cls: 'bg-gray-800' },
  { color: 'orange', cls: 'bg-orange-800' },
  { color: 'rose', cls: 'bg-rose-800' },
  { color: 'green', cls: 'bg-green-800' },
  { color: 'blue', cls: 'bg-blue-800' }
]

const classSelected = (color: string) => {
  const selectedColor = colorClasses.find(c => c.color === color)
  return selectedColor ? selectedColor.cls : 'bg-indigo-700'
}

export function ThemeToggle() {
  const { setTheme, themes } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon'>
          <Sun className='h-[1.5rem] w-[1.3rem] dark:hidden' />
          <Moon className='hidden h-5 w-5 dark:block' />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {themes.map(theme => (
          <DropdownMenuItem key={theme} onClick={() => setTheme(theme)}>
            <RoundedColor bgColor={classSelected(theme)} />
            {capitalize(theme)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
