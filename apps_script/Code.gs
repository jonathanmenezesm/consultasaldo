// Apps Script backend para a planilha 'Vendas'
// Colunas esperadas na aba 'Vendas':
// data_compra, mes, celular, nome, produto, quantidade, valor_unitario, status_pagamento, comprovante_url, observacao

function respostaJson(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function parseValor(valor) {
  if (valor === null || valor === undefined || valor === "") return 0;
  if (typeof valor === 'number') return valor;
  var s = String(valor).replace(/R\$/g, '').replace(/\./g, '').replace(/,/g, '.').trim();
  var n = parseFloat(s);
  return isNaN(n) ? 0 : n;
}

function doGet(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Vendas');
    if (!sheet) return respostaJson({ erro: "Erro: Aba 'Vendas' não encontrada." });

    var data = sheet.getDataRange().getValues();
    if (!data || data.length < 2) return respostaJson({ erro: "Erro: Nenhum dado encontrado na planilha." });

    var celular = e.parameter && e.parameter.celular ? String(e.parameter.celular).trim() : '';
    var mes = e.parameter && e.parameter.mes ? String(e.parameter.mes).toLowerCase().trim() : '';

    if (!celular || !mes) return respostaJson({ erro: "Parâmetros 'celular' e 'mes' são obrigatórios." });

    var encontrou = false;
    var nomeCliente = '';
    var totalQuantidadeAberta = 0;
    var totalAberto = 0;

    for (var i = 1; i < data.length; i++) {
      var linhaMes = data[i][1] ? String(data[i][1]).toLowerCase().trim() : '';
      var linhaCelular = data[i][2] ? String(data[i][2]).trim() : '';
      var linhaNome = data[i][3] ? String(data[i][3]).trim() : '';
      var linhaQuantidade = parseFloat(data[i][5]) || 0; // atenção: índice da coluna quantidade
      var linhaValor = parseValor(data[i][6]); // índice de valor_unitario
      var statusPagamento = data[i][7] ? String(data[i][7]).toLowerCase().trim() : '';

      if (linhaCelular === celular && linhaMes === mes) {
        encontrou = true;
        if (!nomeCliente) nomeCliente = linhaNome;

        if (statusPagamento === '' || statusPagamento === 'pendente' || statusPagamento === 'em aberto' || statusPagamento === 'aberto') {
          totalQuantidadeAberta += linhaQuantidade;
          totalAberto += (linhaQuantidade * linhaValor);
        }
      }
    }

    if (!encontrou) return respostaJson({ erro: "Nenhum registro encontrado para o celular e mês fornecidos." });

    if (totalAberto > 0) {
      return respostaJson({ mensagem: 'Olá, ' + nomeCliente + '. No mês de ' + mes + ', você pegou ' + totalQuantidadeAberta + ' salgados(s) e tem um valor aberto de R$ ' + totalAberto.toFixed(2).replace('.', ',') + '.' });
    }

    return respostaJson({ mensagem: 'Olá, ' + nomeCliente + '. Encontramos seus registros para o mês de ' + mes + ', mas não há valores em aberto.' });

  } catch (error) {
    return respostaJson({ erro: 'Erro interno: ' + error.message });
  }
}

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Vendas');
    if (!sheet) return respostaJson({ erro: "Erro: Aba 'Vendas' não encontrada." });

    var payload = {};
    if (e.postData && e.postData.contents) {
      try { payload = JSON.parse(e.postData.contents); } catch (err) { payload = {}; }
    }

    function getField(name) {
      if (payload[name] !== undefined && payload[name] !== null && payload[name] !== '') return payload[name];
      if (e.parameter && e.parameter[name] !== undefined) return e.parameter[name];
      return null;
    }

    var data_compra_raw = getField('data_compra');
    var data_compra = data_compra_raw ? new Date(data_compra_raw) : new Date();
    if (isNaN(data_compra.getTime())) data_compra = new Date();

    var mes = getField('mes') ? String(getField('mes')).toLowerCase().trim() : '';
    if (!mes) {
      var meses = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
      mes = meses[data_compra.getMonth()];
    }

    var celular = String(getField('celular') || '').trim();
    var nome = String(getField('nome') || '').trim();
    var produto = String(getField('produto') || '').trim();
    var quantidade = parseFloat(getField('quantidade')) || 0;
    var valor_unitario = parseValor(getField('valor_unitario'));
    var status_pagamento = String(getField('status_pagamento') || '').trim();
    var comprovante_url = String(getField('comprovante_url') || '').trim();
    var observacao = String(getField('observacao') || '').trim();

    if (!celular || !mes || !nome || !produto || quantidade <= 0 || valor_unitario <= 0) {
      return respostaJson({ erro: "Campos obrigatórios ausentes ou inválidos. Campos obrigatórios: data_compra (opcional), mes (opcional), celular, nome, produto, quantidade (>0), valor_unitario (>0)." });
    }

    // Montar a linha conforme ordem informada pelo usuário
    var row = [data_compra, mes, celular, nome, produto, quantidade, valor_unitario, status_pagamento, comprovante_url, observacao];
    sheet.appendRow(row);

    return respostaJson({ ok: true, mensagem: 'Venda registrada com sucesso.' });

  } catch (error) {
    return respostaJson({ erro: 'Erro interno: ' + error.message });
  }
}
