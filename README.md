# [EventLog](https://nextjs.org/)

## Sobre o Projeto
EventLog foi desenvolvido como teste para a vaga de estágio da empresa EnterScience. Foi feito para facilitar a busca e contratação de artistas. Com uma interface intuitiva e responsiva, o sistema permite que os usuários realizem buscas, preencham formulários validados e acompanhem artistas agendados.

## Tecnologias Utilizadas
- **[Next.js](https://nextjs.org/)**
- **[TypeScript](https://www.typescriptlang.org/)**
- **[Tailwind CSS](https://tailwindcss.com/)**
- **[Prisma](https://www.prisma.io/)**
- **[Shadcn UI](https://ui.shadcn.com/)**
- **[Spotify SDK](https://developer.spotify.com/documentation/web-sdk)**
- **[Zod](https://zod.dev/)**
- **[SQLite](https://www.sqlite.org/)**
- **[ViaCEP](https://viacep.com.br/)**

## Como Executar o Projeto

### Configuração do Ambiente
Antes de iniciar, certifique-se de ter o Node.js ou Bun instalado. Configure o arquivo `.env` seguindo o formato do `.env.example`. As chaves da API estão presentes no [Dashboard do Spotify for Developers](https://developer.spotify.com/dashboard), onde se deve criar uma aplicação e utilizar o Client ID e o Client Secret.

### Instalação de Dependências
Para instalar as dependências, execute:

#### Com Node.js:
```sh
npm install
```

#### Com Bun:
```sh
bun install
```

### Configuração do Banco de Dados
Para preparar o banco de dados, execute:

#### Com Node.js:
```sh
npx prisma db push
```

#### Com Bun:
```sh
bunx prisma db push
```

### Execução do Projeto

#### Build
Para compilar e iniciar o projeto execute os seguintes comandos:

#### Com Node.js:
```sh
npm run build
npm run start
```

#### Com Bun:
```sh
bun run build
bun run start
```


A aplicação estará disponível em `http://localhost:3000/`.

## Requisitos
- Página com **barra de pesquisa** para buscar artistas.
- **Resultados paginados** para facilitar a navegação.
- **Formulários de contratação validados**, com suporte ao **ViaCEP** para preenchimento automático de endereço.
- **Página de artistas agendados**, com redirecionamento para detalhes do contrato.
- **Layout responsivo**



