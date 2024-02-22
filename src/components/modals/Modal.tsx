'use client'

import { useRouter } from '@/navigation'

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  return (
    <div className="fixed z-100 inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="p-8 border w-2/3 shadow-lg rounded-md bg-secondary">
        <button
          onClick={router.back}
          className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          Close
        </button>
        {children}
      </div>
    </div>
  )
}
