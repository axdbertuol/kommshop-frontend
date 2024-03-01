import { TabsComp } from './tabs-comp'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <small className="">View as</small>
      <TabsComp />
      <div className="w-full">{children}</div>
    </div>
  )
}
