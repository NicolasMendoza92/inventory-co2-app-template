'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Table } from '@tanstack/react-table'
import Link from 'next/link'
import { useRef } from 'react'
import * as XLSX from 'xlsx'
import CustomInput from '../CustomInput'

type TableHeaderActionsProps<TData> = {
  table: Table<TData>
  tableData: TData[]
  handleTableDataChange: (newData: TData[]) => void
  globalFilter: string
  setGlobalFilter: (value: string) => void
  origin?: string
}

const getButtonAction = (origin?: string) => {
  switch (origin) {
    case 'inventory':
      return {
        text: 'New Project',
        link: '/inventory/new'
      }
    case 'reserves':
      return {
        text: 'New Reservation',
        link: '/reserves/new'
      }
    case 'operations':
      return {
        text: 'New Operation',
        link: '/operations/new'
      }
    case 'clients':
      return {
        text: 'New Client',
        link: '/clients/new'
      }
    default:
      return {
        text: '',
        link: ''
      }
  }
}

export default function TableHeaderActions<TData>({
  table,
  tableData,
  handleTableDataChange,
  globalFilter,
  setGlobalFilter,
  origin
}: TableHeaderActionsProps<TData>) {
  const fileInputRef = useRef<HTMLInputElement>(null)

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
        const jsonData = XLSX.utils.sheet_to_json(worksheet) as TData[]
        handleTableDataChange(jsonData)
      }
      reader.readAsArrayBuffer(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }
  return (
    <div className="flex items-center py-4 w-full justify-around flex-col-reverse md:flex-row lg:flex-row gap-2 bg-transparent mt-2">
      <div className="w-full justify-center">
        <CustomInput
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </div>
      <div className="flex flex-row justify-evenly lg:justify-end w-full mt-2 md:mt-0 lg:mt-0">
        <Link href={getButtonAction(origin)?.link} passHref legacyBehavior>
          <Button variant="outline" icon="plus" className="ml-2" hidden={true}>
            {getButtonAction(origin)?.text}
          </Button>
        </Link>
        <Button
          variant="outline"
          className="ml-2"
          onClick={triggerFileInput}
          icon="upload"
          hidden={true}
        >
          Import Excel
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          className="hidden"
        />
        <Button
          variant="outline"
          icon="download"
          className="ml-2 "
          onClick={downloadExcel}
          hidden={true}
        >
          Export Excel
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="ml-2 flex flex-row justify-around items-center"
              icon="chevronDown"
              hidden={true}
            >
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                const isVisible = table.getState().columnVisibility[column.id]
                return (
                  <DropdownMenuCheckboxItem
                    key={`${column.id}-${isVisible}`}
                    className="capitalize"
                    checked={isVisible}
                    onCheckedChange={(value) => {
                      table.setColumnVisibility((prev) => ({
                        ...prev,
                        [column.id]: value
                      }))
                    }}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
