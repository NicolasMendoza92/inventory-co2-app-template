'use client'
import Table from '@/components/table'
import data from '@/json-data/projects.json'
import { getColumns, projectKeys } from '@/utils/table'

type InventoryProps = {
  searchParams: { standard: string }
}

const hiddenColumns: string[] = [
  'sdg',
  'sdgSelected',
  'sdgImages',
  'projectLink',
  'notes',
  'files',
  'createdAt',
  'updatedAt',
  'extraNotes',
  'rpEndDate',
  'rpStartDate',
  'sectorTD',
]

export default function Inventory({ searchParams }: InventoryProps) {
  const origin = 'inventory'
  const hasCreationAction = true
  const hasEditAction = true
  const columns = getColumns(data, projectKeys, origin, hasCreationAction, hasEditAction)
  const { standard } = searchParams
  return (
    <Table
      initialValue={standard}
      initialKey="standard"
      data={data}
      columns={columns}
      hiddenColumns={hiddenColumns}
      origin={origin}
    />
  )
}
