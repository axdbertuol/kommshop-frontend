import { Channel, Connection, ConsumeMessage, Replies, connect } from 'amqplib'
import { randomUUID } from 'crypto'
import { Observable, Observer, lastValueFrom } from 'rxjs'

export class RabbitService {
  private amqpConnection: Connection | undefined

  private queueByCorrelIdMap = new Map<string, string>()
  private tempQueues = []
  IDLE_THRESHOLD = 5000

  async initiate() {
    return connect(process.env.RABBITMQ_URL ?? '')
      .then(async (connection) => {
        this.amqpConnection = connection
        console.log('Connected', connection)
        return connection
      })
      .catch((error) => {
        console.error(error)
      })
  }

  async createChannel() {
    return this.amqpConnection?.createChannel()
  }

  isConnected() {
    return Boolean(this.amqpConnection)
  }

  async cleanUpQueues(channel: Channel) {
    for (const queue in this.queueByCorrelIdMap) {
      const queueInfo = await channel.checkQueue(queue)
      if (queueInfo?.messageCount === 0) {
        await channel?.deleteQueue(queue)
        this.tempQueues.pop()
        console.log(`Random queue '${queue}' deleted`)
      } else {
        console.log(`Random queue '${queue}' has messages, not deleting`)
      }
    }
  }

  async createAMQPRequest(
    exchangeName: string,
    exchangeType: string,
    exchangeRoutingKey: string,
    requestData: any
  ) {
    try {
      // Connect to the AMQP broker
      if (!this.amqpConnection) {
        connect(process.env.RABBITMQ_URL ?? '').then(async (connection) => {
          this.amqpConnection = connection
          // this.channel = await connection.createChannel()
          console.log('Connected', connection)
        })
      }
      const channel = await this.createChannel()
      if (!channel) return Promise.reject()
      // Generate a unique correlation ID for this request
      const correlationId = randomUUID()
      const responseQueue = await channel.assertQueue('', {
        exclusive: true,
        durable: false,
        expires: this.IDLE_THRESHOLD,
        autoDelete: true,
      })

      await channel.assertExchange(exchangeName, exchangeType)

      channel.publish(
        exchangeName,
        exchangeRoutingKey,
        Buffer.from(JSON.stringify(requestData), 'utf-8'),
        {
          correlationId,
          replyTo: responseQueue?.queue,
          contentType: 'application/json',
          contentEncoding: 'utf-8',
        }
      )
      return lastValueFrom(
        this.consumeAndProcess(responseQueue, correlationId, channel) as Observable<
          | {
              success: false
              errors?: any
            }
          | { success: true }
        >
      )
    } catch (error) {
      console.error('Error processing AMQP request:', error)
      return { errors: 'Internal server error ' + error, success: false }
    }
  }

  consumeAndProcess(
    responseQueue: Replies.AssertQueue | undefined,
    correlationId: string,
    channel: Channel
  ): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      if (!responseQueue || !correlationId) {
        observer.error('Invalid responseQueue or correlationId')
        observer.complete()
        return
      }
      console.log('oi')
      const onMessage = (msg: ConsumeMessage | null) => {
        try {
          if (!msg) {
            observer.next(null)
          } else if (msg.properties.correlationId === correlationId) {
            console.log('content bef parse: ', msg, msg.content)
            const content = JSON.parse(msg.content.toString())
            console.log('content: ', content)
            observer.next(content)
            // observer.complete()
          } else {
            observer.error(new Error('Invalid correlationId'))
            // observer.complete()
          }
        } catch (error) {
          // console.log(error)
          observer.next(null)
          // observer.complete()
        }
      }
      let id: string | number | NodeJS.Timeout | undefined
      channel
        .consume(responseQueue.queue, onMessage, { noAck: true })
        .then(({ consumerTag }) => {
          id = setTimeout(async () => {
            await channel.cancel(consumerTag)
            observer.complete()
          }, 1000)
        })
      return () => {
        clearTimeout(id)
      }
    })
  }
}
