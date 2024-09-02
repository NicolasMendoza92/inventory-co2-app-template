export type Language = 'en' | 'es'

export type Translations = {
  [key in Language]: {
    [key: string]: string
  }
}

export const translations: Translations = {
  en: {
    dashboard: 'Dashboard',
    inventory: 'Inventory',
    operations: 'Operations',
    reserves: 'Reserves',
    clients: 'Clients',
    settings: 'Settings'
  },
  es: {
    dashboard: 'Tablero',
    inventory: 'Inventario',
    operations: 'Operaciones',
    reserves: 'Reservas',
    clients: 'Clientes',
    settings: 'Configuración'
  }
}
