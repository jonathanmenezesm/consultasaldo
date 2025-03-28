# Consulta Saldo

Projeto de CRM desenvolvido para facilitar o controle de vendas e pagamentos utilizando Google Sheets como banco de dados e um site para consultas de clientes.

## 📌 Descrição
Este projeto tem como objetivo fornecer um sistema simples de controle de vendas e pagamentos, permitindo que os clientes consultem seus saldos pendentes através de um site interativo.

O sistema utiliza:
- **Google Sheets** para armazenar os dados das vendas.
- **Google Apps Script** para processar as consultas de saldo.
- **HTML, CSS e JavaScript** para criar a interface do site.
- **Netlify** para hospedagem do site.

## 🏗️ Estrutura do Projeto

### **Planilha Google Sheets**
- **Aba `vendas`**:
  - Registra as vendas realizadas com as seguintes colunas:
    - Data
    - Mês
    - Celular
    - Nome do cliente
    - Quantidade
    - Valor
    - Checkbox para indicar se o pagamento foi realizado.

- **Aba `pagamentos-recebidos`**:
  - Atualizada automaticamente via fórmula `FILTER`, exibindo apenas os pagamentos confirmados.
  - Estruturada para manter uma visão consolidada dos pagamentos realizados.

### **Site de Consulta para Clientes**
- Permite que os clientes consultem valores pendentes digitando seu número de celular e o mês desejado.
- Retorna mensagens personalizadas:
  - **Valores pendentes**: "Olá, [nome]. No mês de [mês], você pegou [quantidade] salgados e tem um valor aberto de R$ [valor]."
  - **Pagamentos quitados**: "Olá, [nome]. Aqui não consta valores em aberto para você. Verifique o mês de referência e tente novamente. Caso continue tendo problemas, nos envie uma mensagem."

## 🚀 Como Executar o Projeto

1. **Clonar o repositório**
   ```sh
   git clone https://github.com/jonathanmenezesm/consultasaldo.git
   ```

2. **Configurar a planilha no Google Sheets**
   - Criar uma cópia do modelo de planilha e atualizar os dados conforme necessário.
   - Garantir que a aba `vendas` esteja preenchida corretamente.

3. **Publicar o script no Google Apps Script**
   - Criar um novo projeto no Google Apps Script e colar o código da API.
   - Implementar as funções para buscar os dados do Google Sheets e retornar um JSON para o site.
   - Obter a URL da API e configurá-la no `script.js`.

4. **Rodar o site localmente**
   - Abrir o arquivo `index.html` no navegador.

5. **Hospedar no Netlify** (Opcional)
   - Criar uma conta no [Netlify](https://www.netlify.com/).
   - Fazer o deploy do repositório.

## 🛠️ Tecnologias Utilizadas
- Google Sheets (Banco de Dados)
- Google Apps Script (Backend da API)
- Netlify (Hospedagem do site)
- HTML, CSS e JavaScript (Interface e funcionalidade do site)

## 📌 Melhorias Futuras
1. **Melhorias na Automação:**
   - Validar a fórmula do Google Sheets para garantir que a formatação da aba `pagamentos-recebidos` seja preservada.
2. **Envio de Mensagens no WhatsApp:**
   - Explorar APIs gratuitas ou pagas para envio automático de mensagens para clientes com valores pendentes.
3. **Segurança e Escalabilidade:**
   - Adicionar controle de acesso ao site para evitar consultas não autorizadas.
4. **Design do Site:**
   - Melhorar a interface do usuário para torná-lo mais atraente e responsivo.
5. **Alternativas de Banco de Dados:**
   - Considerar a migração para Firebase ou MongoDB para maior escalabilidade.

---
📌 *Projeto desenvolvido para fins de aprendizado.*

