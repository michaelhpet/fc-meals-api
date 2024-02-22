import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('meals').del();
  await knex('meals').insert([
    { name: 'Rice', summary: 'Very expensive nowadays', price: 1000 },
    { name: 'Beans', summary: 'Only goes well with soft bread', price: 1200 },
    { name: 'Yam', summary: "Few slices and I'm okay", price: 800 },
  ]);
}
