'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useRouter } from '@/navigation'
import { Product } from '@/types'
import Image from 'next/image'
import HoverableImage from '../HoverableImage'
import LikeButton from '../buttons/LikeButton'
import { Button } from '../ui/button'
import { cn } from '@/app/lib/utils'
import useCurrency from '@/hooks/useCurrency'

export type ProductProps = {
  omit?: string[]
  width?: number
  height?: number
} & Omit<Product, 'category' | 'categoryId'>
export default function ProductCard(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  {
    name,
    price,
    ownerUsername,
    omit = [],
    width = 300,
    height = 150,
    slug,
    imageUrl,
  }: ProductProps
) {
  const router = useRouter()
  const showImage = omit && !omit.includes('image')
  const showAddCart = omit && !omit.includes('addCart')
  const showContent = omit && !omit.includes('content')
  const showFooter = omit && !omit.includes('footer')
  const urlPath = '/product/' + slug
  const formattedPrice = useCurrency(price)

  return (
    <Card className={cn(`bg-card w-[${width}px] h-[${height}px] `)}>
      {showImage && (
        <CardHeader
          className={cn('overflow-hidden')}
          onClick={() => router.push(urlPath)}
        >
          <HoverableImage imageRatio={1}>
            <Image
              src={imageUrl ?? '/product-placeholder.webp'}
              priority={true}
              alt="Image"
              width={width}
              height={height}
              className="rounded-md object-cover"
            />
            {showAddCart && (
              <Button
                className="w-[125px] "
                onClick={() => console.log('click')}
              >
                Add to Cart
              </Button>
            )}
          </HoverableImage>
        </CardHeader>
      )}
      {showContent && (
        <CardContent
          className="flex flex-1 flex-col justify-between pt-2 m-0 overflow-hidden bg-card"
          onClick={() => router.push(urlPath)}
        >
          <span className="w-full  ">
            <CardTitle className="text-sm font-thin truncate">{name}</CardTitle>
          </span>
          <div className="flex justify-between items-center">
            <CardDescription className="text-primary-light text-lg">
              {formattedPrice}
            </CardDescription>
            <LikeButton />
          </div>
        </CardContent>
      )}
      {showFooter && (
        <CardFooter className="gap-2 justify-end">
          <small className="text-[0.3em]">from</small>
          <p className="text-xs">{ownerUsername}</p>
        </CardFooter>
      )}
    </Card>
  )
}
