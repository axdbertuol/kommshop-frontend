'use server'
import { Message } from 'kommshop-types'
import { rabbitService, initRabbitService } from './_rabbitmq'

export default async function fetchProducts(
  requestData: Omit<Message.ProductContent, 'data'>
) {
  return await initRabbitService().then(() => {
    return rabbitService.createAMQPRequest(
      'product_outer_exchange',
      'direct',
      'product.fetch.request',
      requestData
    )
  })
}
