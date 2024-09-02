import { Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-green-50 to-green-100 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-950 dark:text-green-50 border-t">
      <div className="container mx-auto py-4 px-4 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} EcoBonos. Todos los derechos reservados.
        </p>
        <p className="text-sm text-gray-600 flex items-center mt-2 sm:mt-0">
          Hecho con <Heart className="h-4 w-4 text-red-500 mx-1" /> en España
        </p>
      </div>
    </footer>
  )
}
