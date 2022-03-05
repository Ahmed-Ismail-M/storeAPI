import Client from '../db'
export type User = {
  id: number
  first_name: string
  last_name: string
  password: string
}

export class UserStore {
  async index(): Promise<User> {
    try {
      const conn = await Client.connect()
      const sql = 'select * from Users'
      const result = await conn.query(sql)
      conn.release()
      // @ts-ignore
      return result.rows
    } catch (error) {
      throw new Error(`Coudnt get Users. Error:${error}`)
    }
  }

  async show(id: number): Promise<User> {
    try {
      const sql = 'SELECT * FROM Users WHERE id=($1)'

      const conn = await Client.connect()

      const result = await conn.query(sql, [id])

      conn.release()

      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not find book ${id}. Error: ${err}`)
    }
  }

  async create(u: User): Promise<User> {
    try {
      const sql =
        'INSERT INTO Users (first_name, last_name, password) VALUES($1, $2, $3) RETURNING *'
      const conn = await Client.connect()

      const result = await conn.query(sql, [
        u.first_name,
        u.last_name,
        u.password
      ])

      const User = result.rows[0]

      conn.release()

      return User
    } catch (err) {
      throw new Error(`Could not add new User ${u.first_name}. Error: ${err}`)
    }
  }

  async delete(id: string): Promise<User> {
    try {
      const sql = 'DELETE FROM Users WHERE id=($1)'
      const conn = await Client.connect()

      const result = await conn.query(sql, [id])

      const User = result.rows

      conn.release()
      // @ts-ignore
      return User
    } catch (err) {
      throw new Error(`Could not delete User ${id}. Error: ${err}`)
    }
  }
}
