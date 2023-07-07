import express from "express";
import LivroController from "../controllers/livrosController.js";
import paginar from "../middlewares/paginar.js";

const router = express.Router();

router
  .get("/livros", LivroController.getLivros, paginar)
  .get("/livros/busca", LivroController.getLivroByFiltro, paginar)
  .get("/livros/:id", LivroController.getLivroById)
  .post("/livros", LivroController.cadastrarLivro)
  .put("/livros/:id", LivroController.atualizarLivro)
  .delete("/livros/:id", LivroController.deletarLivro);

export default router;