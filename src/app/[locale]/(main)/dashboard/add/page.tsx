import AddProduct from '@/components/forms/product/AddProduct'
import { Modal } from '@/components/modals/Modal'
import { Button } from '@/components/ui/button'

type Props = {
  children: React.ReactNode
}
const initialValues = {
  name: '',
  price: 0,
  category: '',
  success: false,
}
export default function Page({ children }: Props) {
  return <AddProduct initialValues={initialValues} />
}
