'use client'
import Table from '@/components/table'
import data from '@/json-data/operations.json'
import { getColumns, operationKeys } from '@/utils/table'
type InventoryProps = {
  searchParams: { operation: string }
}

export default function Inventory({ searchParams }: InventoryProps) {
  const { operation } = searchParams
  const columns = getColumns(data, operationKeys, 'operations')
  return (
    <Table
      initialValue={operation}
      initialKey=""
      data={data}
      columns={columns}
      origin='operations'
    />
  )
}
