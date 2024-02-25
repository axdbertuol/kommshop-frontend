import React, { ReactNode, Suspense } from 'react'
import { AspectRatio } from './ui/aspect-ratio'

type Props = {
  children: ReactNode
  imageRatio: number
}

async function HoverableImage({ children, imageRatio = 1 }: Props) {
  const separatedChildren = React.Children.toArray(children)
  return (
    <div className="relative group">
      <Suspense fallback={<>Loading...</>}>
        <AspectRatio
          ratio={imageRatio}
          className="transition-colors hover:opacity-90 hover:blur-[2px]"
        >
          {separatedChildren?.[0]}
        </AspectRatio>
      </Suspense>
      <div className="absolute top-[45%] left-[30%]  transition-transform transform ease-in-out scale-0 group-hover:scale-100 ">
        {separatedChildren?.[1]}
      </div>
    </div>
  )
}

export default HoverableImage
