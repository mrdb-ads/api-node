import RequisicaoIncorreta from "./RequisicaoIncorreta.js";

class ErroValidacao extends RequisicaoIncorreta {
  constructor(err) {
    const erros = Object.values(err.errors)
      .map(erro => erro.message)
      .join("; ");

    super(`Erro(s): ${erros}`);
  }
}

export default ErroValidacao;