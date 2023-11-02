'use client'
import Image from 'next/image'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '../ui/button'
import LikeButton from '../buttons/LikeButton'
import HoverableImage from '../HoverableImage'
import { Product } from '@/types/common'
import { useRouter } from 'next/navigation'
import { slug } from '@/utils/slug'

export type ProductProps = {
  imgSrc?: string
} & Omit<Product, 'category'>
export default function ProductCard(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  { name, price, description, _id, favouritedBy }: ProductProps
) {
  const router = useRouter()
  const slugUrl = slug(name, String(_id))
  return (
    <Card className="w-[300px]">
      <CardHeader
        className="p-0 m-0 overflow-hidden"
        onClick={() => router.push(slugUrl)}
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
        onClick={() => router.push(slugUrl)}
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
