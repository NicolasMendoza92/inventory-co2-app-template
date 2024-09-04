'use client'
import Table from '@/components/table'
import data from '@/json-data/clients.json'
import { getColumns, operationKeys } from '@/utils/table'
type InventoryProps = {
  searchParams: { client: string }
}

export default function Inventory({ searchParams }: InventoryProps) {
  const { client } = searchParams
 const columns = getColumns(data, operationKeys, 'clients')
  return (
    <Table
      initialValue={client}
      initialKey=""
      data={data}
      columns={columns}
      origin='clients'
    />
  )
}
