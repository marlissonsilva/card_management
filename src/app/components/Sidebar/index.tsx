import { Power } from 'lucide-react'
import { logout } from '@/src/backend/User/logout'
import NavLinks from '../NavLinks'
import { Logo } from '../Logo'

export const experimental_ppr = true

export function Sidebar() {
  return (
    <div className="flex flex-col border border-gray-300 h-full w-80 pb-4">
      <Logo />
      <div className="flex grow justify-between gap-2 flex-col ">
        <div className='flex flex-col gap-2 mt-8 m-4 items-center'>
          <NavLinks />
        </div>
        <form
          action={async () => {
            'use server'
            await logout()
          }}
        >
          <button className="flex w-full grow items-center gap-2 rounded-md p-3 
          text-sm font-medium hover:bg-sky-100 hover:text-violet-600  justify-start md:p-2 md:px-3 cursor-pointer">
            <Power className="w-6" />
            <span>Sair</span>
          </button>
        </form>
      </div>
    </div>
  )
}
