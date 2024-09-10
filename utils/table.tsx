import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Column, ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'

export interface Project {
  id: string
  projectId: string
  standard: string
  name: string
  vintage: string
  volume: number | null
  technology: string
  country: string
  corsia: string
  sdg: string
  sdgSelected: string[]
  sdgImages: string[]
  headquarters: string
  contract: string
  marketDate: null | string
  supplier: string
  salePrice: number | null
  projectLink: string
  availability: string
  notes: string
  files: any[]
  createdAt: string
  updatedAt: string
  version: string
  corporatePrice: number | null
  ccb: string
  floorPrice: number
  extraNotes: string
  firstCreditPeriodDate: string
  misha: string
  ccp: string
  continent: string
  projectType: string
  regulatedMarket: string
  stockStatus: string
  purchasePrice: null | number
  team: string
  mailingList: string
  rpEndDate: string
  rpStartDate: string
  sectorTD: string
  stage: string
  status: string
}

export interface Operation {
  id: string
  transaction: string
  team: string
  client: string
  projectID: string
  projectData: ProjectData
  price: number
  quantity: number
  deliveryStatus: string
  deliveryDate: Date
  paymentStatus: string
  paymentDate: Date
  details: string
  files: any[]
  createdAt: Date
  updatedAt: Date
  version: string
  versusPrice: null
}

export interface ProjectData {
  projectID: string
  standard: string
  projectName: string
  vintage: string
  country: string
  technology: string
}

export const projectKeys = {
  minimumSellingPrice: 'MINIMUM SELLING PRICE(USD)',
  tradingPrice: 'TRADING PRICE(USD)',
  corpPrice: 'CORP. PRICE(USD)',
  purchPrice: 'PURCH. PRICE(USD)',
  projectId: 'ID',
  team: 'SOURCE',
  contract: 'TYPE',
  headquarters: 'SUPPLIER'
}

export const operationKeys = {}

export interface IProject {
  id: string
  [key: string]: unknown
}

export type TranslatedKeys = {
  [key: string]: string
}

const getAddHref = (origin: string, row: { original: IProject }) => {
  switch (origin) {
    case 'inventory':
      return `/operations/new?projectId=${row.original.id}`
    case 'reserves':
      return `/reserves/new?projectId=${row.original.id}`
    case 'operations':
      return `/operations/${row.original.id}`
    case 'clients':
      return `/clients/${row.original.id}`
    default:
      return ''
  }
}
const getEditHref = (origin: string, row: { original: IProject }) => {
  switch (origin) {
    case 'inventory':
      return `/inventory/${row.original.id}`
    case 'reserves':
      return `/reserves/${row.original.id}`
    case 'operations':
      return `/operations/${row.original.id}`
    case 'clients':
      return `/clients/${row.original.id}`
    default:
      return ''
  }
}

export const getColumns = <TData extends IProject>(
  data: TData[],
  translatedKeys: TranslatedKeys,
  origin: string,
  hasCreationAction?: boolean,
  hasReserveAction?: boolean
): ColumnDef<TData>[] => {
  const columnValues = Object.keys(data?.[0])
    .filter((e) => e !== 'id')
    .map((key) => {
      return {
        id: key,
        accessorKey: key,
        header: ({ column }: { column: Column<TData> }) => {
          return (
            <>
              <div className="hidden md:flex lg:flex">
                <Button
                  variant="ghost"
                  onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                  }
                  icon="arrowUpDown"
                >
                  {translatedKeys[key as keyof typeof translatedKeys] ||
                    key.toUpperCase()}
                </Button>
              </div>
              <p className="flex md:hidden lg:hidden">
                {translatedKeys[key as keyof typeof translatedKeys] ||
                  key.toUpperCase()}
              </p>
            </>
          )
        }
      } as ColumnDef<TData>
    })

  return [
    ...columnValues,
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            {hasCreationAction && (
              <Link href={getAddHref(origin, row)} passHref legacyBehavior>
                <Button variant="ghost" size="icon" icon="plus" />
              </Link>
            )}
            <Link href={getEditHref(origin, row)}>
              <Button variant="ghost" size="icon" icon="penSquare" />
            </Link>
            {hasReserveAction && (
              <Link href={`/reserves/new?projectId=${row.original.id}`}>
                <Button variant="ghost" size="icon" icon="calendar"></Button>
              </Link>
            )}
          </div>
        )
      }
    }
  ]
}
