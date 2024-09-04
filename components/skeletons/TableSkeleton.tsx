import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

export function TableSkeleton() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader className="bg-green-500 dark:bg-green-950">
          {Array.from({ length: 5 }).map((_, i) => (
            <TableHead key={i} className="h-10">
              <div className="h-4 w-3/4 bg-green-400 dark:bg-green-800 rounded animate-pulse" />
            </TableHead>
          ))}
        </TableHeader>
        <TableBody>
          {Array.from({ length: 10 }).map((_, i) => (
            <TableRow key={i}>
              {Array.from({ length: 5 }).map((_, j) => (
                <TableCell key={j} className="h-16">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
