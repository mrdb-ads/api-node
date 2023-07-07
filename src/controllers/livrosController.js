import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autores, livros } from "../models/index.js";

class LivroController {

  static getLivros = async (req, res, next) => {
    try {
      const buscaLivros = livros.find();

      req.resultado = buscaLivros;

      next();

    } catch (err) {
      console.log("asdf");
      next(err);
    }
  };

  static getLivroById = async (req, res, next) => {
    try{
      const livro = await livros
        .findById(req.params.id, {}, { autopopulate: false })
        .populate("autor");

      if (livro){
        res.send(livro);
      } else {
        //res.status(404).send({message: "Livro não encontrado"});
        next(new NaoEncontrado("Livro não encontrado"));
      }
    } catch (err) {
      next(err);
    }
  };

  static getLivroByFiltro = async (req, res, next) => {
    try {
      const { nomeAutor, editora, titulo, minPaginas, maxPaginas } = req.query;

      //const regex = new RegExp(titulo, "i");

      const busca = {};

      if (editora) busca.editora = { $regex: editora, $options: "i" };
      if (titulo) busca.titulo = { $regex: titulo, $options: "i" };
      
      if (minPaginas || maxPaginas) busca.numeroPaginas = {};
      if (minPaginas) busca.numeroPaginas.$gte = minPaginas;
      if (maxPaginas) busca.numeroPaginas.$lte = maxPaginas;

      if (nomeAutor) {
        const autor = await autores.findOne({ nome: nomeAutor });
        let autorId = null;

        if (autor) {
          autorId = autor._id;
        } else {
          next(new NaoEncontrado("Autor não encontrado"));
        }

        busca.autor = autorId;
      }

      const livrosByFiltro =  livros.find(busca);
      
      req.resultado = livrosByFiltro;

      if (livrosByFiltro.length){
        next();
      } else {
        //res.status(404).send({message: "Nenhum livro com essa editora"});
        next(new NaoEncontrado("Livro não encontrado"));
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body);

      let novoLivro = await livro.save();

      if(novoLivro) {
        res.status(201).send(novoLivro.toJSON());
      }
    } catch (err) {
      next(err);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    try{
      const id = req.params.id;
      const livroAtualizado = await livros.findByIdAndUpdate(id, {$set: req.body});
      
      if (livroAtualizado){
        res.status(200).send({message: "Livro atualizado com sucesso"});
      } else {
        //res.status(404).send({message: "Livro não encontrado"});
        next(new NaoEncontrado("Livro não encontrado"));
      }
    } catch (err) {
      next(err);
    }
  };

  static deletarLivro = async (req, res, next) => {
    try{
      const livroDeletado = await livros.findByIdAndDelete(req.params.id);
      
      if (livroDeletado){
        res.status(200).send({message: "Livro deletado com sucesso"});
      } else {
        //res.status(404).send({message: "Livro não encontrado"});
        next(new NaoEncontrado("Livro não encontrado"));
      }
    } catch (err) {
      next(err);
    }
  };
}

export default LivroController;
