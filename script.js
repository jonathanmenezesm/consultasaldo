const API_URL = 'https://script.google.com/macros/s/AKfycbwUOmeymHX-iqc4mdSswUeY1kRzlHDBQUsKMBqFMouTWgON96NEflMebjaJ-VGyBM4G/exec';

async function consultar() {
    document.getElementById('result').innerHTML = "";
    document.getElementById('error').innerHTML = "";

    const celular = document.getElementById('celular').value.trim();
    const mes = document.getElementById('mes').value.trim().toLowerCase();

    if (!celular || !mes) {
        document.getElementById('error').innerHTML = "Por favor, preencha todos os campos.";
        return;
    }

    document.getElementById('result').innerHTML = "Consultando...";

    const url = `${API_URL}?celular=${encodeURIComponent(celular)}&mes=${encodeURIComponent(mes)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.mensagem) {
            document.getElementById('result').innerHTML = data.mensagem;
        } else if (data.erro) {
            document.getElementById('error').innerHTML = data.erro;
            document.getElementById('result').innerHTML = "";
        }
    } catch (error) {
        document.getElementById('error').innerHTML = "Erro ao consultar, tente novamente mais tarde.";
        document.getElementById('result').innerHTML = "";
    }
}

async function registrarVenda() {
    document.getElementById('resultReg').innerHTML = '';
    document.getElementById('errorReg').innerHTML = '';

    const data_compra = document.getElementById('data_compra').value; // YYYY-MM-DD
    const celular = document.getElementById('reg_celular').value.trim();
    const nome = document.getElementById('reg_nome').value.trim();
    const produto = document.getElementById('produto').value.trim();
    const quantidade = parseFloat(document.getElementById('quantidade').value) || 0;
    const valor_unitario = parseFloat(document.getElementById('valor_unitario').value) || 0;
    const status_pagamento = document.getElementById('status_pagamento').value;
    const comprovante_url = document.getElementById('comprovante_url').value.trim();
    const observacao = document.getElementById('observacao').value.trim();

    if (!celular || !nome || !produto || quantidade <= 0 || valor_unitario <= 0) {
        document.getElementById('errorReg').innerHTML = 'Preencha os campos obrigatórios corretamente.';
        return;
    }

    const payload = {
        data_compra: data_compra, // Apps Script aceitará essa data
        celular: celular,
        nome: nome,
        produto: produto,
        quantidade: quantidade,
        valor_unitario: valor_unitario,
        status_pagamento: status_pagamento,
        comprovante_url: comprovante_url,
        observacao: observacao
    };

    document.getElementById('resultReg').innerHTML = 'Enviando...';
    try {
        const resp = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await resp.json();
        if (data.ok) {
            document.getElementById('resultReg').innerHTML = data.mensagem || 'Registro salvo com sucesso.';
            // limpar formulário mínimo
            document.getElementById('produto').value = '';
            document.getElementById('quantidade').value = '1';
            document.getElementById('valor_unitario').value = '';
        } else if (data.erro) {
            document.getElementById('errorReg').innerHTML = data.erro;
            document.getElementById('resultReg').innerHTML = '';
        }
    } catch (err) {
        document.getElementById('errorReg').innerHTML = 'Erro ao enviar registro, tente novamente.';
        document.getElementById('resultReg').innerHTML = '';
    }
}