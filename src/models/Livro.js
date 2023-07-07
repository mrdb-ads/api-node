import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const livroSchema = new mongoose.Schema(
  {
    id: {type: String},
    titulo: {
      type: String,
      required: [true, "O título do livro é obrigatório"]
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "autores",
      required: [true, "Autor do livro é obrigatório"],
      autopopulate: { select: "nome" }
    },
    editora: {
      type: String,
      required: [true, "Editora do livro é obrigatório"],
      enum: {
        values: ["Casa do Código", "Alura"],
        message: "A editora {VALUE} não é permitida"
      }
    },
    numeroPaginas: {
      type: Number,
      validate: {
        validator: (valor) => {
          return valor >= 10 && valor <= 5000;
        },
        message: "O número de páginas deve estar entre 5 e 5000. Valor fornecido: {VALUE}"
      }
    }
  }
);

livroSchema.plugin(autopopulate);

const livros = mongoose.model("livros", livroSchema);

export default livros;