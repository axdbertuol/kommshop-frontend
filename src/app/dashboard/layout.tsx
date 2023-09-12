import KommSidebar from '@/components/KommSidebar'
import NavbarWithCTAButton from '@/components/Navbar'

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <NavbarWithCTAButton />
      <section className="w-full px-24 py-16">
        <KommSidebar />
        {children}
      </section>
    </div>
  )
}
