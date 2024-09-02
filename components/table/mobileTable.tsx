'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  ColumnFiltersState,
  Row,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import Link from 'next/link'
import { useRef, useState } from 'react'
import * as XLSX from 'xlsx'
import { columns, CustomInput, data, Project } from './helper'

type TableProps = {
  standard: string
}
export default function ImprovedTable({ standard }: TableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
    { id: 'standard', value: standard || '' }
  ])

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [tableData, setTableData] = useState(data)
  const fileInputRef = useRef<HTMLInputElement>(null)

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
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    },
    initialState: {
      columnFilters: [
        {
          id: 'standard',
          value: standard || ''
        }
      ]
    }
  })

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(tableData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Projects')
    XLSX.writeFile(workbook, 'projects.xlsx')
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer)
        const workbook = XLSX.read(data, { type: 'array' })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const jsonData = XLSX.utils.sheet_to_json(worksheet) as Project[]
        setTableData(jsonData)
      }
      reader.readAsArrayBuffer(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const renderActionButtons = (row: Row<Project>) => {
    const actionsColumn = columns.find((col) => col.id === 'actions')
    if (actionsColumn && 'cell' in actionsColumn) {
      // @ts-ignore
      return flexRender(actionsColumn.cell, { row })
    }
    return null
  }

  return (
    <div className="w-full px-4">
      <div className="flex flex-col items-center py-4 w-full gap-2">
        <div className="w-full">
          <CustomInput table={table} />
        </div>
        <div className="flex flex-row justify-between w-full mt-2">
          <Link href="/inventory/new" passHref>
            <Button variant="outline" size="icon" icon="plus"></Button>
          </Link>
          <Button
            variant="outline"
            size="icon"
            icon="upload"
            onClick={triggerFileInput}
          ></Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            className="hidden"
          />
          <Button
            variant="outline"
            size="icon"
            icon="download"
            onClick={downloadExcel}
          ></Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" icon="chevronDown"></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="space-y-4">
        {table.getRowModel().rows.map((row) => (
          <Card key={row.id}>
            <CardHeader className="bg-green-500  dark:bg-green-950">
              <CardTitle className="flex flex-row justify-between items-center">
                <div className='w-3/4'>{row.getValue('name')}</div>
                <div className="flex justify-end w-full">
                  {renderActionButtons(row)}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="mt-2">
              <div className="grid grid-cols-2 gap-2">
                {row.getVisibleCells().map(
                  (cell) =>
                    cell.column.id !== 'actions' && (
                      <div key={cell.id} className="flex flex-col">
                        <span className="text-sm font-medium text-muted-foreground min-h-12 border-green-200 dark:border-green-800">
                          {cell.column.columnDef.header as string}
                        </span>
                        <span className="text-sm font-semibold text-green-950 dark:text-green-500">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </span>
                      </div>
                    )
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </span>
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
  )
}
