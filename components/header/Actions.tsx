'use client'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useLanguage } from '@/hooks/LanguageProvider'
import { useTheme } from '@/hooks/ThemeProvider'
import { Globe, LogOut, Moon, Sun } from 'lucide-react'

type ActionsProps = {
  username: string
  onLogout: () => void
}

export default function Actions({ username, onLogout }: ActionsProps) {
  const { theme, toggleTheme } = useTheme()
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center space-x-4">
      {username && (
        <>
          <span className="mr-2">{username}</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" icon='logOut'>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onLogout}>
                Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" icon='globe'>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setLanguage('en')}>
            English
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setLanguage('es')}>
            Español
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button onClick={toggleTheme} variant="ghost" size="icon" icon={theme === 'light' ? 'moon': 'sun'}>
      </Button>
    </div>
  )
}
