import { ServicoDePagamento } from '../src/servicoDePagamento.js';
import assert from 'node:assert';


describe('Testando Funções de Serviço de Pagamento', () => {

  let servicoDePagamento;

  beforeEach(() => {
    servicoDePagamento = new ServicoDePagamento();
  });

  // Registrar pagamentos
  it('deve registrar um pagamento com as propriedades corretas', () => {
      servicoDePagamento.pagar('0987-7656-3475', 'Samar', 156.87);
      const pagamento = servicoDePagamento.consultarUltimoPagamento();

      assert.strictEqual(pagamento.codigoBarras, '0987-7656-3475');
      assert.strictEqual(pagamento.empresa, 'Samar');
      assert.strictEqual(pagamento.valor, 156.87);
    });

    it('deve atribuir categoria "cara" quando o valor for maior que 100.00', () => {
      servicoDePagamento.pagar('1111-2222-3333', 'EmpresaA', 100.01);
      const pagamento = servicoDePagamento.consultarUltimoPagamento();

      assert.strictEqual(pagamento.categoria, 'cara');
    });

    it('deve atribuir categoria "padrão" quando o valor for menor que 100.00', () => {
      servicoDePagamento.pagar('4444-5555-6666', 'EmpresaB', 99.99);
      const pagamento = servicoDePagamento.consultarUltimoPagamento();

      assert.strictEqual(pagamento.categoria, 'padrão');
    });

    it('deve atribuir categoria "padrão" quando o valor for exatamente 100.00', () => {
      servicoDePagamento.pagar('7777-8888-9999', 'EmpresaC', 100.00);
      const pagamento = servicoDePagamento.consultarUltimoPagamento();

      assert.strictEqual(pagamento.categoria, 'padrão');
    });

    it('deve registrar múltiplos pagamentos corretamente', () => {
      servicoDePagamento.pagar('0001-0001-0001', 'EmpresaD', 50.00);
      servicoDePagamento.pagar('0002-0002-0002', 'EmpresaE', 200.00);
      servicoDePagamento.pagar('0003-0003-0003', 'EmpresaF', 75.00);

      const ultimo = servicoDePagamento.consultarUltimoPagamento();
      assert.strictEqual(ultimo.codigoBarras, '0003-0003-0003');
    });


    it('deve atribuir categoria "padrão" para valor zero', () => {
      servicoDePagamento.pagar('0000-0000-0000', 'EmpresaH', 0);
      const pagamento = servicoDePagamento.consultarUltimoPagamento();

      assert.strictEqual(pagamento.categoria, 'padrão');
    });

    //Consultar pagamentos
    it('deve retornar null quando não houver pagamentos registrados', () => {
      const resultado = servicoDePagamento.consultarUltimoPagamento();

      assert.strictEqual(resultado, null);
    });

    it('deve retornar o único pagamento quando houver apenas um registro', () => {
      servicoDePagamento.pagar('1234-5678-9012', 'Netflix', 55.90);
      const pagamento = servicoDePagamento.consultarUltimoPagamento();

      assert.strictEqual(pagamento.empresa, 'Netflix');
      assert.strictEqual(pagamento.valor, 55.90);
    });

    it('deve retornar sempre o último pagamento inserido', () => {
      servicoDePagamento.pagar('0001-0001-0001', 'Spotify', 39.90);
      servicoDePagamento.pagar('0002-0002-0002', 'Amazon', 119.90);
      servicoDePagamento.pagar('0003-0003-0003', 'Disney+', 45.90);

      const ultimo = servicoDePagamento.consultarUltimoPagamento();
      assert.strictEqual(ultimo.empresa, 'Disney+');
      assert.strictEqual(ultimo.codigoBarras, '0003-0003-0003');
    });

    it('deve atualizar o último pagamento após novo registro', () => {
      servicoDePagamento.pagar('0001-0001-0001', 'Spotify', 39.90);
      assert.strictEqual(servicoDePagamento.consultarUltimoPagamento().empresa, 'Spotify');

      servicoDePagamento.pagar('0002-0002-0002', 'Amazon', 119.90);
      assert.strictEqual(servicoDePagamento.consultarUltimoPagamento().empresa, 'Amazon');
    });

    it('deve retornar um objeto com todas as propriedades esperadas', () => {
      servicoDePagamento.pagar('5555-6666-7777', 'Samar', 156.87);
      const pagamento = servicoDePagamento.consultarUltimoPagamento();

      assert.ok(Object.prototype.hasOwnProperty.call(pagamento, 'codigoBarras'));
      assert.ok(Object.prototype.hasOwnProperty.call(pagamento, 'empresa'));
      assert.ok(Object.prototype.hasOwnProperty.call(pagamento, 'valor'));
      assert.ok(Object.prototype.hasOwnProperty.call(pagamento, 'categoria'));
    });

    it('não deve expor a lista completa de pagamentos — apenas o último', () => {
      servicoDePagamento.pagar('0001-0001-0001', 'EmpresaX', 80.00);
      servicoDePagamento.pagar('0002-0002-0002', 'EmpresaY', 120.00);

      const resultado = servicoDePagamento.consultarUltimoPagamento();
      assert.ok(!Array.isArray(resultado), 'Não deve retornar um array');
    });
  });