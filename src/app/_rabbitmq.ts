import { RabbitService } from './service/RabbitMQService'

export const rabbitService: RabbitService = new RabbitService()
export const initRabbitService = async (force?: boolean) => {
  if (!rabbitService.isConnected() || force) {
    await rabbitService.initiate()
  }
}
