const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sistema_pessoas',
  password: '1234',
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

  const getPessoaByNome = (request, response) => {
    const nome = request.params.nome
  
    pool.query('SELECT * FROM pessoas WHERE nome = $1', [nome], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const getPessoaByEmail = (request, response) => {
    const email = request.params.email
  
    pool.query('SELECT * FROM pessoas WHERE email = $1', [email], (error, results) => {
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
  //----------------------
  
  const createJogo = (request, response) => {
    const { nome, descricao, instrucoes } = request.body
    
    pool.query('INSERT INTO jogos (nome, descricao, instrucoes) VALUES ($1, $2, $3)', [nome, descricao, instrucoes], (error, result) => {
      if (error) {
        throw error
      }
      response.status(201).send(`jogo criado com sucesso.`)
    })
  }

  const getJogos = (request, response) => {
    pool.query('SELECT * FROM jogos ORDER BY id DESC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const updateJogos = (request, response) => {
    const id = parseInt(request.params.id)
    const { nome, descricao, instrucoes } = request.body
  
    pool.query(
      'UPDATE jogos SET nome = $1, descricao = $2, instrucoes = $3 WHERE id = $4',
      [nome, descricao, instrucoes,  id],
      (error, result) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Jogo ${id} atualizado com sucesso.`)
      }
    )
  }
  
  const deleteJogos = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM jogos WHERE id = $1', [id], (error, result) => {
      if (error) {
        throw error
      }
      response.status(200).send(`jogo removido com sucesso com o identificador: ${id}`)
    })
  }

  const getJogoById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM jogos WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  //----------------------------------------------------------

  const createFav = (request, response) => {
    const { id_jogo, id_pessoa, favorito } = request.body
    
    pool.query('INSERT INTO favoritos (id_jogo, id_pessoa, favorito) VALUES ($1, $2, $3)', [id_jogo, id_pessoa, favorito], (error, result) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Favorito criado com sucesso.`)
    })
  }

  const getFav = (request, response) => {
    pool.query('SELECT * FROM favoritos ORDER BY id_pessoa DESC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const updateFav = (request, response) => {
    const id_favorito = parseInt(request.params.id_favorito)
    const { id_jogo, favorito, id_pessoa } = request.body
  
    pool.query(
      'UPDATE favoritos SET id_jogo = $1, favorito = $2, id_pessoa = $3 WHERE id_favorito = $4',
      [id_jogo, favorito, id_pessoa, id_favorito],
      (error, result) => {
        if (error) {
          throw error
        }
        response.status(200).send(`favorito ${id_favorito} atualizada com sucesso.`)
      }
    )
  }
  
  const deleteFav = (request, response) => {
    const id_favorito = parseInt(request.params.id_favorito)
  
    pool.query('DELETE FROM favoritos WHERE id_favorito = $1', [id_favorito], (error, result) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Favorito removido com sucesso com o identificador: ${id_favorito}`)
    })
  }

  const getFavByIdPessoa = (request, response) => {
    const id_pessoa = parseInt(request.params.id_pessoa)
  
    pool.query('SELECT * FROM favoritos WHERE id_pessoa = $1', [id_pessoa], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  const getFavByIdjogo = (request, response) => {
    const id_jogo = parseInt(request.params.id_jogo)
  
    pool.query('SELECT * FROM favoritos WHERE id_jogo = $1', [id_jogo], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  //----------------------------------------------------------
  
  const createNota = (request, response) => {
    const { id_jogo, id_pessoa, nota } = request.body
    
    pool.query('INSERT INTO notas (id_jogo, id_pessoa, nota) VALUES ($1, $2, $3)', [id_jogo, id_pessoa, nota], (error, result) => {
      if (error) {
        throw error
      }
      response.status(201).send(`nota criada com sucesso.`)
    })
  }

  const getNota = (request, response) => {
    pool.query('SELECT * FROM notas ORDER BY id_pessoa DESC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const updateNota = (request, response) => {
    const id_nota = parseInt(request.params.id_nota)
    const { id_jogo, nota, id_pessoa } = request.body
  
    pool.query(
      'UPDATE notas SET id_jogo = $1, nota = $2, id_pessoa = $3 WHERE id_nota = $4',
      [id_jogo, nota, id_pessoa, id_nota],
      (error, result) => {
        if (error) {
          throw error
        }
        response.status(200).send(`nota ${id_nota} atualizada com sucesso.`)
      }
    )
  }
  
  const deleteNota = (request, response) => {
    const id_nota = parseInt(request.params.id_nota)
  
    pool.query('DELETE FROM notas WHERE id_nota = $1', [id_nota], (error, result) => {
      if (error) {
        throw error
      }
      response.status(200).send(`nota removida com sucesso com o identificador: ${id_nota}`)
    })
  }

  const getNotaByIdPessoa = (request, response) => {
    const id_pessoa = parseInt(request.params.id_pessoa)
  
    pool.query('SELECT * FROM notas WHERE id_pessoa = $1', [id_pessoa], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  const getNotaByIdjogo = (request, response) => {
    const id_jogo = parseInt(request.params.id_jogo)
  
    pool.query('SELECT * FROM notas WHERE id_jogo = $1', [id_jogo], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const getMediaNota = (request, response) => {
    pool.query('Select id_jogo, Avg(nota) From notas Group By id_jogo', (error, results) => { 
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  //----------------------------------------------------------
  module.exports = {
    getPessoas,
    getPessoaById,
    createPessoa,
    updatePessoa,
    deletePessoa,
    createJogo,
    getJogos,
    updateJogos,
    deleteJogos,
    createFav,
    getFav,
    updateFav,
    deleteFav,
    createNota,
    getNota,
    updateNota,
    deleteNota,
    getNotaByIdPessoa,
    getNotaByIdjogo,
    getFavByIdPessoa,
    getFavByIdjogo,
    getPessoaByNome,
    getPessoaByEmail,
    getMediaNota,
    getJogoById,
  
}
