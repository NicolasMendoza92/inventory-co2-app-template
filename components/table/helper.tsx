'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ColumnDef, Table as TableType } from '@tanstack/react-table'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export interface Project {
  source: string
  type: string
  supplier: string
  minimumSellingPrice: number
  name: string
  standard: string
  id: number
  vintage: number
  tech: string
  country: string
  corsia: string
  volume: number
  tradingPrice: number
  corpPrice: number
  purchPrice: number
  ccp: string
  icroa: string
  availability: string
}

export const data: Project[] = [
  {
    source: 'Commercial',
    type: 'Contrato',
    supplier: 'Supplier 1',
    minimumSellingPrice: 1,
    name: 'Name other',
    standard: 'GS',
    id: 676,
    vintage: 2020,
    tech: 'Landfill gas',
    country: 'Cameroon',
    corsia: 'NO',
    volume: 800000,
    tradingPrice: 1.6,
    corpPrice: 3,
    purchPrice: 1,
    ccp: '',
    icroa: '',
    availability: '2025'
  },
  {
    source: 'TD',
    type: 'Contrato',
    supplier: 'daasd',
    minimumSellingPrice: 1,
    name: 'Name',
    standard: 'GS CCB',
    id: 7895,
    vintage: 2021,
    tech: 'Hydro',
    country: 'Malaysia',
    corsia: 'NO',
    volume: 800000,
    tradingPrice: 1.6,
    corpPrice: 3,
    purchPrice: 0,
    ccp: 'Approved',
    icroa: '',
    availability: ''
  },
  {
    source: 'Commercial',
    type: 'Contrato',
    supplier: 'OTHER',
    minimumSellingPrice: 1,
    name: 'Project Name 2',
    standard: 'VCS',
    id: 78954,
    vintage: 2020,
    tech: 'Cookstove',
    country: 'Bangladesh',
    corsia: '',
    volume: 6000,
    tradingPrice: 2,
    corpPrice: 3,
    purchPrice: 0,
    ccp: '',
    icroa: '',
    availability: 'November 2024'
  },
  {
    source: 'Commercial',
    type: 'Contrato',
    supplier: 'KARBON',
    minimumSellingPrice: 1.2,
    name: 'Project test 1',
    standard: 'VCS CCB CCP - Eligible',
    id: 1111,
    vintage: 2022,
    tech: 'ARR',
    country: 'Mexico',
    corsia: 'NO',
    volume: 30000,
    tradingPrice: 1.6,
    corpPrice: 2,
    purchPrice: 0,
    ccp: 'Eligible',
    icroa: 'NO',
    availability: 'Spot'
  }
]

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: 'source',
    header: 'SOURCE',
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('source')}</div>
    )
  },
  {
    accessorKey: 'type',
    header: 'TYPE',
    cell: ({ row }) => <div className="capitalize">{row.getValue('type')}</div>
  },
  {
    accessorKey: 'supplier',
    header: 'SUPPLIER',
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('supplier')}</div>
    )
  },
  {
    accessorKey: 'minimumSellingPrice',
    header: 'MINIMUM SELLING PRICE(USD)'
  },
  {
    accessorKey: 'name',
    header: 'NAME'
  },
  {
    accessorKey: 'standard',
    header: 'STANDARD'
  },
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'vintage',
    header: 'VINTAGE'
  },
  {
    accessorKey: 'tech',
    header: 'TECH'
  },
  {
    accessorKey: 'country',
    header: 'COUNTRY'
  },
  {
    accessorKey: 'corsia',
    header: 'CORSIA'
  },
  {
    accessorKey: 'volume',
    header: 'VOLUME'
  },
  {
    accessorKey: 'tradingPrice',
    header: 'TRADING PRICE(USD)'
    /*  cell: ({ row }) => (
      <div className="text-center">{row.getValue('tradingPrice')}</div>
    ) */
  },
  {
    accessorKey: 'corpPrice',
    header: 'CORP. PRICE(USD)'
  },
  {
    accessorKey: 'purchPrice',
    header: 'PURCH. PRICE(USD)'
  },
  {
    accessorKey: 'ccp',
    header: 'CCP'
  },
  {
    accessorKey: 'icroa',
    header: 'ICROA'
  },
  {
    accessorKey: 'availability',
    header: 'AVAILABILITY'
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" icon="plus"></Button>
          <Button variant="ghost" size="icon" icon="penSquare"></Button>
          <Button variant="ghost" size="icon" icon="calendar"></Button>
        </div>
      )
    }
  }
]

export const CustomInput = ({ table }: { table: TableType<Project> }) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  function updateSearchParam({
    key,
    value
  }: {
    key: string
    value: string
  }): string {
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    return `${pathname}?${params.toString()}`
  }

  function updateSearchParamForCurrentPage({
    key,
    value
  }: {
    key: string
    value: string
  }) {
    const newUrl = updateSearchParam({ key, value })
    replace(newUrl)
  }
  return (
    <Input
      placeholder="Filter projects..."
      value={(table.getColumn('standard')?.getFilterValue() as string) ?? ''}
      onChange={(event) => {
        table.getColumn('standard')?.setFilterValue(event.target.value)
        updateSearchParamForCurrentPage({
          key: 'standard',
          value: event.target.value
        })
      }}
      className="w-full mx-auto"
    />
  )
}
