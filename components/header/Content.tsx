'use client'
import { Leaf } from 'lucide-react'
import HeaderLoggedActions from './Actions'
import HeaderNavigation from './Navigation'

export default function Content() {
  const username = 'John Doe'

  return (
    <div className="container mx-auto w-full flex items-center justify-between py-4 px-4">
      <div className="flex items-center space-x-2 flex-start">
        <div className='hidden md:flex lg:flex items-center'>
          <Leaf className="h-6 w-6 text-green-600" />
          <span className="text-xl font-semibold">EcoBonos</span>
        </div>
        <HeaderNavigation />
      </div>
      <HeaderLoggedActions username={username} onLogout={() => {}} />
    </div>
  )
}
