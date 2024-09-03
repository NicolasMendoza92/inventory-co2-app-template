import { logout } from '@/actions/logout'

export default function Logout() {
  return <form action={logout}>Cerrar sesión</form>
}
