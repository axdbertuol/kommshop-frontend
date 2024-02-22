'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useRouter, usePathname } from '@/navigation'
import { Product } from '@/types'
import Image from 'next/image'
import HoverableImage from '../HoverableImage'
import LikeButton from '../buttons/LikeButton'
import { Button } from '../ui/button'

export type ProductProps = {
  imgSrc?: string
} & Omit<Product, 'category'>
export default function ProductCard(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  { name, price, description, id, slug }: ProductProps
) {
  const router = useRouter()
  const pathname = usePathname()

  const urlPath = pathname + '/product/' + slug
  return (
    <Card className="w-[300px]">
      <CardHeader
        className="p-0 m-0 overflow-hidden"
        onClick={() => router.push(urlPath)}
      >
        <HoverableImage imageRatio={1}>
          <Image
            src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=300&dpr=2&q=80"
            alt="Image"
            width={300}
            height={150}
            className="rounded-md object-cover"
          />
          <Button
            className="w-[125px] "
            onClick={() => console.log('click')}
          >
            Add to Cart
          </Button>
        </HoverableImage>
      </CardHeader>
      <CardContent
        className="flex flex-1 flex-col justify-between pt-2 m-0 overflow-hidden"
        onClick={() => router.push(urlPath)}
      >
        <span className="w-full  ">
          <CardTitle className="text-sm font-thin truncate">{name}</CardTitle>
        </span>
        <div className="flex justify-between items-center">
          <CardDescription className="text-primary-light text-lg">
            R${price}
          </CardDescription>
          <LikeButton />
        </div>
      </CardContent>
      {/* <CardFooter>
        <p>Card Footer</p>
      </CardFooter> */}
    </Card>
  )
}
