import { auth } from '@/auth'
import HeaderContent from './Content'

export default async function Header() {
  const session = await auth()
  const userName = session?.user?.name

  return (
    <header className="fixed top-0 left-0 right-0 z-50 shadow-sm bg-gradient-to-br from-green-50 to-green-100 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-950 dark:text-green-50">
      <HeaderContent userName={userName}/>
    </header>
  )
}