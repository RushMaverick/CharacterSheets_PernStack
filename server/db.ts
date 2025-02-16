import pg from 'pg'
const { Pool } = pg

const pool = new Pool({
    user: "postgres",
    password: "UJ5AmoDHsmPhzC8",
    host: "localhost",
    port: 5432,
    database: "pernsheets"
})

export default pool 