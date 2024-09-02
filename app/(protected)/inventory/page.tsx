import Table from '@/components/table'
import MobileTable from '@/components/table/mobileTable'

type InventoryProps = {
  searchParams: { standard: string }
}

export default function Inventory({ searchParams }: InventoryProps) {
  const { standard } = searchParams
  return (
    <div>
      <div className='hidden md:flex lg:flex'>
        <Table standard={standard} />
      </div>
      <div className='flex md:hidden lg:hidden'>
        <MobileTable standard={standard} />
      </div>
    </div>
  )
}
