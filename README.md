https://jonathanmenezesm.github.io/consultasaldo/

### Resumo do Projeto e Status Atual

#### **Sistema de Controle de Vendas**

##### **Planilha Google Sheets**
- **Aba `vendas`**:
  - Registra as vendas realizadas, com as seguintes colunas:
    - Data
    - Mês
    - Celular
    - Nome do cliente
    - Quantidade
    - Valor
    - Checkbox para indicar se o pagamento foi realizado.
  
- **Aba `pagamentos-recebidos`**:
  - Atualizada automaticamente via fórmula `FILTER` com as vendas marcadas como pagas.
  - Estruturada para manter uma visão consolidada dos pagamentos realizados.

##### **Automação**
- A automação do fluxo foi feita sem scripts adicionais, utilizando fórmulas para transferir dados pagos da aba `vendas` para `pagamentos-recebidos`.
- Checkbox na aba `vendas` facilita o controle manual dos pagamentos.

---

#### **Site de Consulta para Clientes**
- Desenvolvido para permitir que clientes consultem valores pendentes.
- Funcionalidades:
  - Formulário no site (HTML/CSS/JavaScript) para entrada de número de celular e mês.
  - Comunicação com uma API criada no Google Apps Script para buscar dados no Google Sheets.
  - Retorno de mensagens personalizadas para o cliente:
    - **Valores pendentes**: "Olá, [nome]. No mês de [mês], você pegou [quantidade] salgados e tem um valor aberto de R$ [valor]."
    - **Pagamentos quitados**: "Olá, [nome]. Aqui não consta valores em aberto para você. Verifique o mês de referência e tente novamente. Caso continue tendo problemas, nos envie uma mensagem."

##### **Tecnologias Usadas**
1. **Google Sheets**: Serviu como banco de dados.
2. **Google Apps Script**:
   - Função que:
     - Busca dados na aba `vendas`.
     - Verifica a aba `pagamentos-recebidos` para confirmar se o cliente já quitou os débitos.
   - Retorna dados via JSON para o front-end.
3. **Netlify**: Hospedagem do site de consulta.
4. **HTML/CSS/JavaScript**:
   - Formulário de entrada.
   - Uso do `fetch` API para realizar requisições à API do Apps Script.

---

### **Status Atual**
- A integração entre o site e o Google Sheets está funcional.
- Foi implementada uma lógica no script para verificar pagamentos quitados antes de retornar valores pendentes.
- Checkbox na aba `vendas` atualiza automaticamente a aba `pagamentos-recebidos` com os pagamentos realizados.
- Site está estilizado e funcional para os clientes.

---

### **Próximos Passos Sugeridos**
1. **Melhorias na Automação:**
   - Validar a fórmula do Google Sheets para garantir que a formatação de tabela em `pagamentos-recebidos` seja preservada para todos os dados.
2. **Envio de Mensagens no WhatsApp:**
   - Explorar integrações com APIs gratuitas ou pagas para envio automático de mensagens para clientes com valores pendentes.
3. **Segurança e Escalabilidade:**
   - Adicionar controle de acesso ao site de consulta para evitar consultas não autorizadas.
4. **Design do Site:**
   - Melhorar a interface do usuário para tornar o site mais atraente e responsivo.
5. **Alternativas de Banco de Dados:**
   - Considerar a migração para um banco de dados mais robusto (ex.: Firebase ou MongoDB) caso o volume de dados cresça.

---

### Histórico 

#### **Etapas Construídas:**
1. Iniciamos com a criação de uma planilha no Google Sheets para gerenciar vendas e pagamentos.
2. Implementamos um sistema manual com checkbox para indicar pagamentos realizados, usando a fórmula `FILTER` para alimentar automaticamente uma aba com pagamentos recebidos.
3. Desenvolvemos um site simples hospedado no Netlify com HTML/CSS/JavaScript para consultas de clientes.
4. Criamos uma API utilizando Google Apps Script que integra o site ao Google Sheets, retornando valores pendentes ou indicando pagamentos quitados.
5. Atualizamos a lógica do script para verificar múltiplos registros de um cliente no mesmo mês e considerar pagamentos já realizados.
6. Estilizamos o site e adicionamos mensagens personalizadas para melhorar a experiência do usuário.

Se precisar de mais detalhes ou um foco maior em algum ponto específico, avise-me!

