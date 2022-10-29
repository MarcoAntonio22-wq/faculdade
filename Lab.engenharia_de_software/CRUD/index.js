const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const repository = require('./repository')

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
  )
  
  
  app.listen(port, () => {
    console.log(`Servidor rodando na porta de conexão ${port}.`)
  })
  
  app.get('/', (request, response) => {
    response.json({ aplicacao: 'CRUD PESSOAS' })
  })
  
  app.get('/pessoas', repository.getPessoas)
  app.get('/pessoas/:id', repository.getPessoaById)
  app.post('/pessoas', repository.createPessoa)
  app.put('/pessoas/:id', repository.updatePessoa)
  app.delete('/pessoas/:id', repository.deletePessoa)
  app.get('/pessoas/nome/:nome', repository.getPessoaByNome)
  app.get('/pessoas/email/:email', repository.getPessoaByEmail)
  //---------------------------------------------------------
  app.post('/jogos', repository.createJogo)
  app.get('/jogos', repository.getJogos)
  app.put('/jogos/:id', repository.updateJogos)
  app.delete('/jogos/:id', repository.deleteJogos)
  //---------------------------------------------------------
  app.post('/favoritos', repository.createFav)
  app.get('/favoritos', repository.getFav)
  app.put('/favoritos/:id_favorito', repository.updateFav)
  app.delete('/favoritos/:id_favorito', repository.deleteFav)
  app.get('/favoritos/pessoa/:id_pessoa', repository.getFavByIdPessoa)
  app.get('/favoritos/jogo/:id_jogo', repository.getFavByIdjogo)
  //---------------------------------------------------------
  app.post('/notas', repository.createNota)
  app.get('/notas', repository.getNota)
  app.put('/notas/:id_nota', repository.updateNota)
  app.delete('/notas/:id_nota', repository.deleteNota)
  app.get('/notas/pessoa/:id_pessoa', repository.getNotaByIdPessoa)
  app.get('/notas/jogo/:id_jogo', repository.getNotaByIdjogo)
  app.get('/notas/media', repository.getMediaNota)