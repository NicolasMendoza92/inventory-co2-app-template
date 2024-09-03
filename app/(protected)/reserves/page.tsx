'use client'
import Table from '@/components/table'
import data from '@/json-data/reservations.json'
import { getColumns, operationKeys } from '@/utils/table'
type InventoryProps = {
  searchParams: { reserve: string }
}

export default function Inventory({ searchParams }: InventoryProps) {
  const { reserve } = searchParams
  const columns = getColumns(data, operationKeys)
  return (
    <Table initialValue={reserve} initialKey="" data={data} columns={columns} origin='reserves'/>
  )
}
