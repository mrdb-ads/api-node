import livros from "../models/Livro.js";

class LivroController {

    static getLivros = async (_, res) => {
        try {
            res.json(await livros.find()
                                 .select('titulo editora')
                                 .populate('autor', ('nome nacionalidade'))
                                 .exec());
        } catch (err) {
            console.log(err);
        }
    }

    static getLivroById = async (req, res) => {
        try{
            const livro = await livros.findById(req.params.id)
            if (livro){
                res.send(livro)
            } else {
                res.status(404).send({message: "Livro não encontrado"})
            }
        } catch (err) {
            res.status(500).send({message: "Erro"})
        }
    }

    static getLivroByEditora = async (req, res) => {
        try {
            const editora = req.query.editora

            const livrosByEditora = await livros.find({'editora': editora}).populate('autor')
            if (livrosByEditora.length){
                res.send(livrosByEditora)
            } else {
                res.status(404).send({message: "Nenhum livro com essa editora"})
            }
        } catch (err) {
            res.send({message: err})
        }
    }

    static cadastrarLivro = async (req, res) => {
        try {
            let livro = new livros(req.body);

            let novoLivro = await livro.save();

            if(novoLivro) {
                res.status(201).send(novoLivro.toJSON())
            }
        } catch (error) {
            console.log(error)
        }
    }

    static atualizarLivro = async (req, res) => {
        try{
            const id = req.params.id;
            const livroAtualizado = await livros.findByIdAndUpdate(id, {$set: req.body});
            if (livroAtualizado){
                res.status(200).send({message: "Livro atualizado com sucesso"});
            } else {
                res.status(404).send({message: "Livro não encontrado"})
            }
        } catch (err) {
            res.status(500).send({message: err.message});
        }
    }

    static deletarLivro = async (req, res) => {
        try{
            const livroDeletado = await livros.findByIdAndDelete(req.params.id)
            if (livroDeletado){
                res.status(200).send({message: "Livro deletado com sucesso"})
            } else {
                res.status(404).send({message: "Livro não encontrado"})
            }
        } catch (err) {
            res.status(404).send({message: "Erro ao deletar o livro"})
        }
    }
}

export default LivroController;