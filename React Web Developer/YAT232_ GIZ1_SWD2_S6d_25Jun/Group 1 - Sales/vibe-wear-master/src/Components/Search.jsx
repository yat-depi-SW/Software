import React from 'react'
import { Input } from './ui/input'
import { Icons } from './ui/icons'

const SearchInput = () => {
  return (
    <div className="relative w-96">
      <Icons.search className="absolute left-3 top-1/2 size-[18px] -translate-y-1/2 transform text-muted-foreground" />
      <Input
        className="w-full pl-10 h-10  rounded-xl border-gray-800/10"
        placeholder="Quick Search"
      />
    </div>
  )
}

export default SearchInput