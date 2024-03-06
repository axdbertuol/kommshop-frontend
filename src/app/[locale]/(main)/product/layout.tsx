import 'server-only'

export default function Layout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex">
      <div className="flex flex-col gap-y-16 items-center py-4">{children}</div>
    </div>
  )
}
