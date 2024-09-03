'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Input } from './ui/input'


export default function CustomInput  ({
    globalFilter,
    setGlobalFilter
  }: {
    globalFilter: string
    setGlobalFilter: (value: string) => void
  })  {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const { replace } = useRouter()
  
    function updateSearchParam({
      key,
      value
    }: {
      key: string
      value: string
    }): string {
      const params = new URLSearchParams(searchParams)
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      return `${pathname}?${params.toString()}`
    }
  
    function updateSearchParamForCurrentPage({
      key,
      value
    }: {
      key: string
      value: string
    }) {
      const newUrl = updateSearchParam({ key, value })
      replace(newUrl)
    }
    return (
      <Input
        placeholder="Filter projects..."
        value={globalFilter ?? ''}
        onChange={(event) => {
          setGlobalFilter(event.target.value)
          updateSearchParamForCurrentPage({
            key: 'standard',
            value: event.target.value
          })
        }}
        className="w-full mx-auto"
      />
    )
  }
  