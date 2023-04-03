import autores from "../models/Autor.js";

class AutorController {

    static getAutores = async (_, res) => {
        try {
            const autoresLista = await autores.find();

            if(autoresLista.length) {
                res.send(autoresLista);
            } else {
                res.status(200).send({message: "Sem autores"});
            }
        } catch (err) {
            console.log(err);
        }
    }

    static getAutorById = async (req, res) => {
        try{
            const autor = await autores.findById(req.params.id)
            res.send(autor)
        } catch (err) {
            res.status(404).send({message: "autor não encontrado"})
        }
    }

    static cadastrarAutor = async (req, res) => {
        try {
            let autor = new autores(req.body);

            let novoAutor = await autor.save();

            if(novoAutor) {
                res.status(201).send(novoAutor.toJSON())
            }
        } catch (error) {
            console.log(error)
        }
    }

    static atualizarAutor = async (req, res) => {
        try{
            const id = req.params.id;
            const autorAtualizado = await autores.findByIdAndUpdate(id, {$set: req.body});
            if (autorAtualizado){
                res.status(200).send({message: "autor atualizado com sucesso"});
            } else {
                res.status(404).send({message: "autor não encontrado"})
            }
        } catch (err) {
            res.status(500).send({message: err.message});
        }
    }

    static deletarAutor = async (req, res) => {
        try{
            const autorDeletado = await autores.findByIdAndDelete(req.params.id)
            if (autorDeletado){
                res.status(200).send({message: "autor deletado com sucesso"})
            } else {
                res.status(404).send({message: "autor não encontrado"})
            }
        } catch (err) {
            res.status(404).send({message: "Erro ao deletar o autor"})
        }
    }
}

export default AutorController