import express from "express"
import AutorController from "../controllers/autoresController.js"

const router = express.Router();

router
    .get("/autores", AutorController.getAutores)
    .get("/autores/:id", AutorController.getAutorById)
    .post("/autores", AutorController.cadastrarAutor)
    .put("/autores/:id", AutorController.atualizarAutor)
    .delete("/autores/:id", AutorController.deletarAutor)

export default router;