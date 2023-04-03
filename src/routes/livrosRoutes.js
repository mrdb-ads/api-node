import express from "express";
import LivroController from "../controllers/livrosController.js";

const router = express.Router();

router
    .get("/livros", LivroController.getLivros)
    .get("/livros/busca", LivroController.getLivroByEditora)
    .get("/livros/:id", LivroController.getLivroById)
    .post("/livros", LivroController.cadastrarLivro)
    .put("/livros/:id", LivroController.atualizarLivro)
    .delete("/livros/:id", LivroController.deletarLivro)

export default router;