import 'server-only'

export default function StoreLayout({
  children, // will be a page or nested layout
  searchPage,
  listingPage,
}: {
  children: React.ReactNode
  searchPage: React.ReactNode
  listingPage: React.ReactNode
}) {
  return (
    <div className="flex">
      {/* <Sidebar /> */}
      <div className="w-full">
        {listingPage}
        {searchPage}
        {children}
      </div>
    </div>
  )
}
