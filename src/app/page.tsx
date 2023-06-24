import NavbarWithCTAButton from '@/components/Navbar'
import Product, { ProductProps } from '@/components/Product'

const mock: ProductProps[] = [
  {
    imgSrc: "/ada",
    title: "1",
    price: "1231",
    description: "dfsdfs",
  },
  {
    imgSrc: "/ada",
    title: "2",
    price: "1231",
    description: "dfsdfs",
  },
  {
    imgSrc: "/ada",
    title: "3",
    price: "1231",
    description: "dfsdfs",
  },
  {
    imgSrc: "/ada",
    title: "4",
    price: "1231",
    description: "dfsdfs",
  },
]

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <NavbarWithCTAButton />
      <section className="md:mx-auto w-full">
        <div className="flex flex-row justify-evenly">
          {
            mock.map((product, index) => {
              return <Product
                key={index}
                imgSrc={product.imgSrc}
                title={product.title}
                price={product.price}
                description={product.description}
              />
            })
          }
        </div>
      </section>
    </main>
  )
}
