import React, { Suspense, use } from 'react'
import Image from 'next/image'
import { Product } from '@/types'
import { Button } from '../ui/button'
import useCurrency from '@/hooks/useCurrency'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'

type ProductDetailProps = Product
const defaultImg = process.env.DEFAULT_PRODUCT_IMG_URL ?? ''
const ProductDetail = ({ name, description, imageUrl, price }: ProductDetailProps) => {
  const formattedPrice = useCurrency(price)

  return (
    <div className="container grid grid-cols-2 w-[80vw] min-h-screen justify-items-center">
      <div className="w-[30vw]">
        <Suspense fallback={<>Loading...</>}>
          <Image
            src={imageUrl ?? defaultImg}
            alt={name}
            width={300}
            height={300}
            className="w-full border-t-2 border-l-2 md:max-h-[calc(100vh-72px)] sm:object-center object-cover rounded-t-lg"
          />
        </Suspense>
        <>more images...</>
      </div>
      <div className="container flex flex-col gap-4 w-[40vw]">
        <div className="flex flex-col gap-2">
          <span className="text-3xl max-h-[72px] text-clip-ellipsis overflow-hidden">
            {name}
          </span>
          <span className="text-clip-ellipsis overflow-hidden">{description}</span>
        </div>
        <div className="flex justify-evenly">
          <div className="flex flex-col">
            <span>Attr1</span>
            <span>content1</span>
          </div>
          <div className="flex flex-col">
            <span>Attr2</span>
            <span>content2</span>
          </div>
        </div>
        <div className="flex justify-center items-center min-h-[16vh]">
          <span className="text-orange-600 text-xl">{formattedPrice}</span>
        </div>
        <div className="flex">
          <Button className="w-full">Add to Cart</Button>
        </div>
        <div>
          <Tabs defaultValue={'details'}>
            <TabsList>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="spec">Specification</TabsTrigger>
            </TabsList>
            <TabsContent
              className="pl-2"
              value="details"
            >
              {description}
            </TabsContent>
            <TabsContent value="spec">
              Proin faucibus arcu quis ante. Maecenas nec odio et ante tincidunt tempus.
              Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet,
              leo. Praesent turpis. Maecenas vestibulum mollis diam. In ut quam vitae odio
              lacinia tincidunt. Praesent adipiscing. Praesent adipiscing. In dui magna,
              posuere eget, vestibulum et, tempor auctor, justo. Ut a nisl id ante tempus
              hendrerit. Maecenas nec odio et ante tincidunt tempus. Curabitur ligula
              sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Praesent
              turpis. Maecenas vestibulum mollis diam. Proin faucibus Curabitur ligula
              sapien Maecenas vestibulum Praesent adipiscing Vitae odio lacinia tincidunt.
              Praesent adipiscing. Praesent adipiscing. In dui magna, posuere eget,
              vestibulum et, tempor auctor, justo. Ut a nisl id ante tempus hendrerit.
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
