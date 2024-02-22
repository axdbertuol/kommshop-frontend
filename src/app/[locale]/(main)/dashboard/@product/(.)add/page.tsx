import AddProduct from '@/app/components/forms/product/AddProduct'
import { Modal } from '@/app/components/modals/Modal'
import { Button } from '@/app/components/ui/button'

type Props = {
  children: React.ReactNode
}
const initialValues = {
  name: '',
  price: 0,
  category: '',
  success: false,
}
export default function Add({ children }: Props) {
  return (
    <Modal>
      <AddProduct initialValues={initialValues} />
    </Modal>
  )
}
