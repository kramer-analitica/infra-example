const { readFileSync } = require('fs')
const pg = require('pg')
const { Client } = pg

const run = async () => {

    const client = new Client({
        host: 'localhost',
        user: 'postgres',
        password: '123456'
    })
    
    await client.connect()

    const json = readFileSync(`${__dirname}/seeds/${process.argv[2]}.json`, 'utf8')

    const data = JSON.parse(json)

    for (const tableData of data) {
        process.stdout.write(`Seeding ${tableData.table}`)

        const {table, data} = tableData
        
        try {
            // Truncate table
            await client.query(`TRUNCATE ${table} RESTART IDENTITY`)
        }catch (error) {
            console.log(`Failed to truncate ${table}`)
            console.log(error)
        }
        
        const keys = Object.keys(data[0])

        let query = `INSERT INTO ${table} (${keys.join(',')}) VALUES `

        for (const row of data) {
            const values = keys.map(key => {
                if (typeof row[key] === 'string') {
                    return `'${row[key]}'`
                }
                return row[key]
            })

            query += `(${values.join(',')}),`
        }

        query = query.slice(0, -1)

        try {
            await client.query(query)
            console.log(' - Done!')
        } catch (error) {
            console.log(`Failed to run query: ${query}`)
            console.log(error)
        }

        await client.end()
    }
}

if(!process.argv[2]) {
    console.log('Please provide a seed file name')
    process.exit(1)
}

run()
