import pkg from 'pg';
const { Pool } = pkg; //mit pool lassen sich mehrere datenbanken abfragen, im gegensatz zum client

const connectionString = process.env.PG_CONNECTIONSTRING;  //zugriff auf diese speziellen daten

const pool = new Pool({
  connectionString,
})

export default pool