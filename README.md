# Microserviço de JSON para XLSX

Um microserviço simples construído com Node.js e Express.js que converte dados JSON em arquivos de planilha XLSX.

## Funcionalidades

* Aceita um array de objetos JSON via requisição POST
* Converte os dados JSON em uma planilha XLSX
* Retorna o arquivo XLSX para download
* Lida com erros de entrada inválida

## Instalação

1. Clone este repositório
2. Instale as dependências:

```bash
npm install express xlsx
```

3. Inicie o servidor:

```bash
npm start
```

O servidor será executado na porta 3000 por padrão. Você pode alterar isso definindo a variável de ambiente `PORT`.

## Documentação da API

### Gerar Arquivo XLSX

Converte um array de objetos JSON em um arquivo XLSX.

* **URL**: `/generate-xlsx`
* **Método**: `POST`
* **Content-Type**: `application/json`
* **Corpo da Requisição**: Um array de objetos JSON onde cada objeto representa uma linha na planilha. As chaves do primeiro objeto serão usadas como cabeçalhos das colunas.

#### Exemplo de Requisição

```bash
curl -X POST http://localhost:3000/generate-xlsx \
  -H "Content-Type: application/json" \
  -d '[
    { "ID": 1, "Nome": "Produto A", "Preço": 19.99 },
    { "ID": 2, "Nome": "Produto B", "Preço": 25.50 },
    { "ID": 3, "Nome": "Produto C", "Preço": 12.00 }
  ]' \
  --output dados.xlsx
```

#### Resposta Bem-Sucedida

* **Código de Status**: 200 OK
* **Content-Type**: `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`
* **Content-Disposition**: `attachment; filename="dados.xlsx"`
* **Corpo**: Arquivo XLSX binário

#### Respostas de Erro

* **Código de Status**: 400 Bad Request

  * **Conteúdo**: `{ "error": "Invalid request body. Expected a non-empty array of objects." }`
  * **Causa**: O corpo da requisição está vazio, não é um array ou é um array vazio.

* **Código de Status**: 500 Internal Server Error

  * **Conteúdo**: `{ "error": "Internal server error" }`
  * **Causa**: Ocorreu um erro inesperado durante o processamento.

## Dependências

* [Express.js](https://expressjs.com/) - Framework web para Node.js
* [SheetJS (xlsx)](https://github.com/SheetJS/sheetjs) - Biblioteca para análise e escrita de arquivos Excel

## Testes

Um script de teste está incluído para verificar a funcionalidade do microserviço:

1. Inicie o servidor:

```bash
npm start
```

2. Em um terminal separado, execute o script de teste:

```bash
node test.js
```

3. Se for bem-sucedido, você verá uma mensagem indicando que o arquivo XLSX foi salvo como `test-output.xlsx`.

O script de teste envia um array JSON de exemplo para o microserviço e salva o arquivo XLSX resultante no disco.
