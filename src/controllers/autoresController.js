import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autores } from "../models/index.js";

class AutorController {

  static getAutores = async (_, res, next) => {
    try {
      const autoresLista = await autores.find();

      if(autoresLista.length) {
        res.send(autoresLista);
      } else {
        res.status(200).send({message: "Sem autores"});
      }
    } catch (err) {
      next(err);
    }
  };

  static getAutorById = async (req, res, next) => {
    try{
      const autor = await autores.findById(req.params.id);

      if (autor) {
        res.send(autor);
      } else {
        next(new NaoEncontrado("Autor não encontrado"));
      }
    } catch (err) {
      next(err);
    }
  };

  static cadastrarAutor = async (req, res, next) => {
    try {
      let autor = new autores(req.body);

      let novoAutor = await autor.save();

      if(novoAutor) {
        res.status(201).send(novoAutor.toJSON());
      }
    } catch (err) {
      next(err);
    }
  };

  static atualizarAutor = async (req, res, next) => {
    try{
      const id = req.params.id;
      const autorAtualizado = await autores.findByIdAndUpdate(id, {$set: req.body});
      if (autorAtualizado){
        res.status(200).send({message: "Autor atualizado com sucesso"});
      } else {
        //res.status(404).send({message: "Autor não encontrado"});
        next(new NaoEncontrado("Autor não encontrado"));
      }
    } catch (err) {
      next(err);
    }
  };

  static deletarAutor = async (req, res, next) => {
    try{
      const autorDeletado = await autores.findByIdAndDelete(req.params.id);
      if (autorDeletado){
        res.status(200).send({message: "Autor deletado com sucesso"});
      } else {
        //res.status(404).send({message: "Autor não encontrado"});
        next(new NaoEncontrado("Autor não encontrado"));
      }
    } catch (err) {
      next(err);
    }
  };
}

export default AutorController;
