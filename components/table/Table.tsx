'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  ColumnDef,
  flexRender,
  Table as TableType
} from '@tanstack/react-table'
import { Input } from '../ui/input'

type TableContentProps<TData> = {
  table: TableType<TData>
  columns: ColumnDef<TData>[]
}

export default function TableContent<TData>({
  table,
  columns
}: TableContentProps<TData>) {
  return (
    <div className="rounded-md">
      <Table>
        <TableHeader className="bg-green-500 dark:bg-green-950">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className={`text-green-50 w-[${header.getSize()}] min-w-20 max-w-40`}
                  >
                    {header.isPlaceholder ? null : (
                      <span className="flex flex-col justify-center items-center">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}

                        {header.column.getCanFilter() ? (
                          <span>
                            <Input
                              value={
                                (header.column.getFilterValue() ?? '') as string
                              }
                              onChange={(e) =>
                                header.column.setFilterValue(e.target.value)
                              }
                              placeholder={`Filter ${header.column.id}...`}
                              className="max-w-sm my-2 bg-transparent border-green-50 dark:border-green-800/50 text-green-950 dark:text-green-50"
                            />
                          </span>
                        ) : null}
                      </span>
                    )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="relative max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap"
                  >
                    <div className="truncate">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full bg-green-400 dark:bg-green-950 text-green-50 text-xs p-2 rounded-md shadow-lg whitespace-normal opacity-0 transition-opacity duration-300 ease-in-out flex items-center justify-center hover:opacity-100">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
