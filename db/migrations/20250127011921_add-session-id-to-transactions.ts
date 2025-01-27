import type { Knex } from "knex";

//o index() serve para dizer que esse campo vai ser muito utilizado nas buscas

export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('transactions', (table) => {
        table.uuid('session_id').after('id').index()
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('transactions', (table) => {
        table.dropColumn('session_id')
    })
}

