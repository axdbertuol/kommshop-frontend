import useCurrency from '@/hooks/useCurrency'
import { Suspense } from 'react'
import Image from 'next/image'
import { ArrowRightIcon } from '@radix-ui/react-icons'

export default function ProductSmallDetail({
  name,
  imageUrl,
  price,
}: {
  name: string
  imageUrl?: string
  price: number
}) {
  const formattedPrice = useCurrency(price)
  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="font-bold p-4">Most Valuable Product</h2>
      <div className="bg-secondary md:max-h-[calc(100vh-72px)] w-full">
        {imageUrl && (
          <Suspense fallback={<>Loading...</>}>
            <Image
              src={imageUrl}
              alt={'img'}
              width={300}
              height={300}
              className="w-full border-t-2 border-l-2 h-[80vh] sm:object-center object-cover rounded-t-lg"
            />
          </Suspense>
        )}
      </div>
      <div className="bg-red-500 shadow-md rounded-lg p-6 w-40">
        <h2 className="text-lg font-bold mb-2">{name}</h2>
        <p className="text-gray-600">{formattedPrice}</p>
      </div>
    </div>
  )
}
