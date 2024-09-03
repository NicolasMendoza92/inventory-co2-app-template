'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ColumnDef, flexRender, Row, Table } from '@tanstack/react-table'

type CustomCardProps<TData> = {
  table: Table<TData>
  columns: ColumnDef<TData>[]
}

export default function CustomCard<TData>({ table, columns }: CustomCardProps<TData>) {
    
  const renderActionButtons = (row: Row<TData>) => {
    const actionsColumn = columns.find((col) => col.id === 'actions')
    if (actionsColumn && 'cell' in actionsColumn) {
      // @ts-ignore
      return flexRender(actionsColumn.cell, { row })
    }
    return null
  }
  const renderHeader = (row: Row<TData>, columnId: string) => {
    const header = table
      .getHeaderGroups()[0]
      .headers.find((h) => h.id === columnId)
    if (header) {
      return flexRender(header.column.columnDef.header, header.getContext())
    }
    return columnId
  }
  return (
    <div className="space-y-4">
      {table.getRowModel().rows.map((row) => (
        <Card key={row.id}>
          <CardHeader className="bg-green-500  dark:bg-green-950 rounded-t-lg">
            <CardTitle className="flex flex-row justify-between items-center">
              <div className="w-3/4">{row.getValue('headquarters')}</div>
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
                      <span className="text-sm font-medium text-muted-foreground dark:text-green-50 min-h-12 border-green-200 dark:border-green-800 truncate">
                        {renderHeader(row, cell.column.id)}
                      </span>
                      <span className="text-sm font-semibold text-green-950 dark:text-green-500 truncate">
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
  )
}
