## Clients-api

> Uma API para gerenciamento de clientes.

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

- Você instalou a versão 18 ou superior do \`NodeJS\`.
- Você instalou a versão 2.39 ou superior do \`Git\`.
- Você tem uma máquina \`Windows / Linux / Mac\`.

## 🚀 Instalando

Para instalar o projeto, siga estes passos:

Linux, macOS e Windows:

## 1. Clone o projeto do GitHub:

```
git clone https://github.com/eduoop/clients-api.git
```

## 2. Entre na pasta do projeto:

```
cd clients-api
```

## 3. Instale as dependências usando o npm:

```
npm i
```

## 4. Configure o Prisma:

```
npx prisma generate
```

## 5. Crie um arquivo \`.env\` na raiz do projeto e adicione a seguinte variável:

```
DATABASE_URL="postgresql://postgres:password@localhost:5432"
```

## 6. Rode o Docker Compose para configurar os serviços:

```
docker compose up -d
```

## 7. Execute as migrações do Prisma:

```
npx prisma migrate dev --name "add_initial_tables"
```

## ☕ Usando

Para rodar o projeto, use o comando:

```
npm run dev
```

A API estará disponível em \`http://localhost:3000\`.

## Rotas da Aplicação

- `POST /client`: Cria um novo cliente.
  Exemplo de JSON para requisição POST:

  ```json
  {
    "cpf": "053.360.662-49",
    "email": "fulano@example.com",
    "maritalStatus": "SINGLE",
    "name": "Fulano de Tdl",
    "address": {
      "country": "Brasil",
      "state": "São Paulo",
      "city": "São Paulo",
      "district": "Centro",
      "street": "Rua Teste",
      "number": "123"
    },
    "phones": ["(65) 2065-1574"]
  }
  ```

- `PUT /client/cpfdocliente`: Edita um cliente.
  Exemplo de JSON para requisição PUT:

  ```json
  {
    "name": "Novo Name",
    "email": "novoemail@examdple.com",
    "maritalStatus": "MARRIED",
    "address": {
      "country": "Brasil",
      "state": "Rio",
      "city": "Rio",
      "district": "Legios",
      "street": "Rua Nova",
      "number": "128"
    },
    "phones": ["(81) 3458-1720", "(74) 2492-6536"]
  }
  ```

- `GET /client`: Lista todos os clientes podendo filtra-los.
  Exemplo de queries aceitas:

  ```
  GET /client: Retorna todos os clientes.
  GET /client?name=John: Retorna os clientes com o nome "John".
  GET /client?email=example.com: Retorna os clientes com email contendo "example.com".
  ```

## Tecnologias Utilizadas

- **Express** (v4.19.2)
- **Prisma** (v5.15.0)
- **TypeScript** (v5)
- **Zod** (v3.23.8)

## 🤝 Criador

Feito por:

<table>
  <tr>
    <td align="center">
      <a href="#" title="defina o titulo do link">
        <img src="https://avatars.githubusercontent.com/u/85969484?s=400&u=b0e89e575a7cb91fc9f8a69e126a9d7587aa9478&v=4" width="100px;" alt="Foto do Eduardo Meneses no GitHub"/><br>
        <sub>
          <b>Eduardo Meneses</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

## 📝 Licença

Esse projeto está sob licença. Veja o arquivo [LICENÇA](LICENSE.md) para mais detalhes."
