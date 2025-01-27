import { randomUUID } from 'node:crypto'
import { knex } from '../database'
import type { FastifyInstance } from 'fastify'
import { z, type ZodIssue } from 'zod'
import { checkSessionIdExists } from '../middlewares/check-session-id-exist'

export async function transactionsRoutes(app: FastifyInstance) {
  //   app.addHook('preHandler', async (request, reply) => {})

  app.get(
    '/',
    {
      preHandler: [checkSessionIdExists],
      schema: {
        tags: ['Transactions'],
        summary: 'List all transactions',
      },
    },
    async (request) => {
      const { sessionId } = request.cookies

      const transactions = await knex('transactions')
        .where('session_id', sessionId)
        .select()

      return {
        transactions,
      }
    },
  )

  app.get(
    '/:id',
    {
      preHandler: [checkSessionIdExists],
      schema: {
        tags: ['Transactions'],
        summary: 'View a transaction',
        params: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
            },
          },
        },
      },
    },
    async (request) => {
      const getTransactionParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const query = getTransactionParamsSchema.safeParse(request.params)

      if (!query.success) {
        return {
          message: 'Invalid id',
          error: query.error.flatten((issue: ZodIssue) => ({
            message: issue.message,
            errorCode: issue.code,
          })),
        }
      }

      const { id } = query.data

      const { sessionId } = request.cookies

      const transaction = await knex('transactions')
        .where({
          id,
          session_id: sessionId,
        })
        .first()

      return {
        transaction,
      }
    },
  )

  app.get(
    '/summary',
    { preHandler: [checkSessionIdExists], schema: { tags: ['Transactions'] } },
    async (request) => {
      const { sessionId } = request.cookies

      const summary = await knex('transactions')
        .where('session_id', sessionId)
        .sum('amount', { as: 'amount' })
        .first()

      return {
        summary,
      }
    },
  )

  app.post(
    '/',
    {
      schema: {
        tags: ['Transactions'],
        summary: 'Create a transaction',
        body: {
          type: 'object',
          required: ['title', 'amount', 'type'],
          properties: {
            title: {
              type: 'string',
            },
            amount: {
              type: 'number',
            },
            type: {
              type: 'string',
              enum: ['credit', 'debit'],
            },
          },
        },
      },
    },
    async (request, reply) => {
      const createTransactionBodyScrema = z.object({
        title: z.string(),
        amount: z.number(),
        type: z.enum(['credit', 'debit']),
      })

      const body = createTransactionBodyScrema.safeParse(request.body)

      if (!body.success) {
        return reply.status(400).send({
          message: 'Invalid body',
          error: body.error.flatten((issue: ZodIssue) => ({
            message: issue.message,
            errorCode: issue.code,
          })),
        })
      }

      const { title, amount, type } = body.data

      let sessionId = request.cookies.sessionId

      if (!sessionId) {
        sessionId = randomUUID()

        reply.cookie('sessionId', sessionId, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7, // 7 days
        })
      }

      await knex('transactions').insert({
        id: randomUUID(),
        title,
        amount: type === 'credit' ? amount : amount * -1,
        session_id: sessionId,
      })

      return reply.status(201).send()
    },
  )
}
