'use client'

import { Button } from '@/components/ui/button'
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState
} from '@tanstack/react-table'
import { useState, useMemo } from 'react'
import CustomCard from './Card'
import TableContent from './Table'
import TableHeaderActions from './TableHeaderActions'

type TableProps<TData> = {
  initialKey: string
  initialValue: string
  data: TData[]
  columns: ColumnDef<TData>[]
  hiddenColumns?: string[]
  origin?: string
}

export default function ImprovedTable<TData>({
  initialValue,
  data,
  initialKey,
  columns,
  origin,
  hiddenColumns
}: TableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
    { id: initialKey, value: initialValue || '' }
  ])

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(() => {
    const visibility: VisibilityState = {}
    columns.forEach(column => {
      if (typeof column.id === 'string') {
        visibility[column.id] = !hiddenColumns?.includes(column.id)
      }
    })
    return visibility
  })

  const [rowSelection, setRowSelection] = useState({})
  const [tableData, setTableData] = useState(data)
  const [globalFilter, setGlobalFilter] = useState(initialValue || '')

  

  const table = useReactTable({
    data: tableData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: 'includesString',
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter
    },
    initialState: {
      columnFilters: [
        {
          id: initialKey,
          value: initialValue || ''
        }
      ],
      columnVisibility
    }
  })

  const handleTableDataChange = (newData: TData[]) => {
    setTableData(newData)
  }

  return (
    <div className="w-full px-4 overflow-hidden bg-green-100 dark:bg-gray-950">
      <TableHeaderActions
        table={table}
        tableData={tableData}
        handleTableDataChange={handleTableDataChange}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        origin={origin}
      />
      <div className="hidden md:flex lg:flex overflow-x-auto">
        <TableContent table={table} columns={columns} />
      </div>
      <div className="flex md:hidden lg:hidden overflow-y-auto">
        <CustomCard table={table} columns={columns} />
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
