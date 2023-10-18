## Boleto Processor

O `BoletoProcessor` é uma classe que auxilia na validação e extração de informações de códigos de barras tipo "boleto" no formato brasileiro. 

### Características

- Validação de linhas digitáveis de boletos bancários e de arrecadação.
- Extração de informações como código do banco, valor e data de vencimento.
- Remoção de caracteres não numéricos.

### Utilização

1. Instancie a classe:

   ```javascript
   const processor = new BoletoProcessor();
   ```

2. Para obter as informações do boleto:

   ```javascript
   const info = processor.getBoletoInfo("CÓDIGO_AQUI");
   console.log(info);
   ```

   O resultado será algo do tipo:

   ```javascript
   {
     isValid: true|false,
     bankCode?: "XXX",
     value?: 1234.56,
     dueDate?: "YYYY-MM-DD",
     cleanedCode: "CÓDIGO_LIMPO"
   }
   ```

### Métodos

- **removeNonDigits(input: string): string**
  
  Remove caracteres não numéricos de uma string.

- **validateTypeableLine(code: string, validateBlocks = false): boolean**
  
  Valida se a linha digitável é válida. Se `validateBlocks` for `true`, também valida os blocos individuais do código.

- **validateBankLine(cleanedCode: string, validateBlocks = false): boolean**
  
  Valida a linha digitável para boletos bancários.

- **validateArrecadacaoLine(code: string): boolean**
  
  Valida a linha digitável para boletos de arrecadação.

- **getBoletoInfo(code: string): BoletoInfo**
  
  Retorna informações extraídas da linha digitável, incluindo validade, código do banco, valor, data de vencimento e o código limpo.

### Dependências

- A classe utiliza a biblioteca `dayjs` para manipulação de datas. Certifique-se de tê-la instalada em seu projeto.

### Contribuições

Se você encontrar algum problema ou tiver sugestões de melhorias, por favor, abra uma issue ou um pull request.

---
