import { useMemo } from 'react'

export default function useCurrency(price: number) {
  const formattedPrice = useMemo(
    () =>
      new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price),
    [price]
  )
  return formattedPrice
}
