'use client'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'
import { navigation } from '@/contants/navigation'
import { useLanguage } from '@/hooks/LanguageProvider'
import { cn } from '@/lib/utils'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const MobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useLanguage()
  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <Menu className="h-[1.2rem] w-[1.2rem]" />
      </Button>
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 w-1/2  border-b shadow-sm bg-gradient-to-br from-green-50 to-green-100 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-950 dark:text-green-50">
          <nav className="container mx-auto py-2">
            <ul className="space-y-2">
              {Object.entries(navigation)?.map(([key, value], index) => (
                <li key={index}>
                  <Link
                    href={value}
                    className="block px-4 py-2 hover:text-green-500"
                  >
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  )
}

export default function Navigation() {
  const { t } = useLanguage()
  const pathname = usePathname()

  return (
    <>
      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList>
          {Object.entries(navigation)?.map(([key, value], index) => (
            <NavigationMenuItem key={index} >
              <Link href={value} legacyBehavior passHref >
                <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), pathname.startsWith(value) ? 'bg-green-300 dark:bg-green-800 text-green-950 dark:text-green-50' : '')}>
                  {t(key)}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <MobileMenu />
    </>
  )
}
