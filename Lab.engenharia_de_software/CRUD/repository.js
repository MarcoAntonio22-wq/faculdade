const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sistema_pessoas',
  password: 'postgres',
  port: 5432,
})

const getPessoas = (request, response) => {
    pool.query('SELECT * FROM pessoas ORDER BY id DESC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  const getPessoaById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM pessoas WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  const createPessoa = (request, response) => {
    const { nome, email, senha } = request.body
  
    pool.query('INSERT INTO pessoas (nome, email, senha) VALUES ($1, $2, $3)', [nome, email, senha], (error, result) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Pessoa criada com sucesso.`)
    })
  }
  
  const updatePessoa = (request, response) => {
    const id = parseInt(request.params.id)
    const { nome, email, senha } = request.body
  
    pool.query(
      'UPDATE pessoas SET nome = $1, email = $2, senha = $3 WHERE id = $4',
      [nome, email, senha, id],
      (error, result) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Pessoa ${id} atualizada com sucesso.`)
      }
    )
  }
  
  const deletePessoa = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM pessoas WHERE id = $1', [id], (error, result) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Pessoa removida com sucesso com o identificador: ${id}`)
    })
  }
  
  module.exports = {
    getPessoas,
    getPessoaById,
    createPessoa,
    updatePessoa,
    deletePessoa,
  
}
