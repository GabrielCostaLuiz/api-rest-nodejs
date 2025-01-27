import fastify from 'fastify'

import { transactionsRoutes } from './routes/transactions'
import cookie from '@fastify/cookie'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastifySwagger from '@fastify/swagger'
import { knex } from './database'

export const app = fastify()

app.register(cookie)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'API REST NODEJS',
      description:
        'API REST NODEJS TRANSACTIONS, FIRST CREATE A TRANSACTION TO USE THE OTHER OPTIONS',
      version: '1.0.0',
    },
    components: {
      // securitySchemes: {
      //   bearerAuth: {
      //     type: 'http',
      //     scheme: 'bearer',
      //     bearerFormat: 'JWT',
      //   },
      // },
    },
  },
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.get('/', async () => {
  await knex('transactions').delete()
})

app.register(transactionsRoutes, {
  prefix: 'transactions',
})
