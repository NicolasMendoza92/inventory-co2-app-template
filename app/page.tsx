'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Leaf } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCurrentUser } from '@/hooks/use-current-user'

export default function Component() {
  const router = useRouter()
  const user = useCurrentUser();

  const handleSubmit = async (formData: FormData) => {
    console.log('Intento de inicio de sesión con:')
    router.push('/dashboard')
  }

  return (
    <div className="flex items-center justify-center h-[80vh]">
      <Card className="w-96 min-h-[50vh] flex flex-col justify-around">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center flex items-center justify-center">
            <Leaf className="mr-2 h-6 w-6 text-green-600" />
            EcoBonos
          </CardTitle>
          <CardDescription className="text-center">
            Inicia sesión en tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form action={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="mail@ejemplo.com"
                // required
              />
            </div>
            <div className="grid gap-2 mt-4">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                //required
              />
            </div>
            <Button
              className="w-full mt-4 bg-green-600 hover:bg-green-700 text-green-50"
              type="submit"
            >
              Iniciar sesión
            </Button>
          </form>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  )
}
