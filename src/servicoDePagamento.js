export class ServicoDePagamento {
  #pagamentos = [];

  pagar(codigoBarras, empresa, valor) {
    const pagamento = {
      codigoBarras,
      empresa,
      valor,
      categoria: valor > 100.00 ? 'cara' : 'padrão',
    };

    this.#pagamentos.push(pagamento);
    console.log(`✅ Pagamento realizado com sucesso! Categoria: "${pagamento.categoria}"`);
  }

  consultarUltimoPagamento() {
    if (this.#pagamentos.length === 0) {
      console.log('⚠️ Nenhum pagamento encontrado.');
      return null;
    }

    return this.#pagamentos[this.#pagamentos.length - 1];
  }
}