import 'server-only'

const filtersMock = [
  {
    label: 'Red',
    value: 'red',
  },
  {
    label: 'Black',
    value: 'black',
  },
  {
    label: 'Green',
    value: 'green',
  },
  {
    label: 'Blue',
    value: 'blue',
  },
  {
    label: 'Purple',
    value: 'purple',
  },
]

const getFilters = async () => {
  // const res = await fetch()
  const res = await new Promise<typeof filtersMock>((resolve) =>
    setTimeout(() => resolve(filtersMock), 50)
  )
  return res
}

export default async function StorePage({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
