'use client'

import { deleteProduct } from '@/app/lib/actions/posters/delete-product'
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useRouter } from '@/navigation'

export default function DeleteProduct({
  productId,
  revalidate,
  slug,
}: {
  productId: number
  revalidate: (slug?: string, id?: number) => Promise<void>
  slug: string
}) {
  const router = useRouter()
  const handleDelete = async () => {
    await deleteProduct(productId)
    await revalidate(slug, productId)
    router.push('/dashboard?rv=true')
  }
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure you wish to delete?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your product.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={() => router.back()}>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}
