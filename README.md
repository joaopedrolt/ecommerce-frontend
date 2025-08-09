<h2 align="center">Furvana E-commerce Template</h2>

## Índice

* [Descrição](#descrição)
* [Stack Tecnológico](#stack-tecnológico)
* [Estrutura do Projeto](#estrutura-do-projeto)
* [Fluxo da Aplicação](#fluxo-da-aplicação)
* [Variáveis de Ambiente](#variáveis-de-ambiente)
* [Como Executar o Projeto](#como-executar-o-projeto)
* [Autoria](#autoria)
* [Imagens do Projeto](#imagens-do-projeto)

## Descrição

Um **template** de aplicação web de e-commerce moderna (SPA), construída com **Vue 3**, **Vite**, **Vuetify 3** e **Pinia**.  
O app integra-se ao **Firebase** para autenticação e dados, oferecendo uma experiência de compra e checkout suave.

<h4><a href="https://joaopedrolt.github.io/whatsapp-clone-reactjs/">Você pode acessar esse projeto clicando aqui</a></h3>

## Stack Tecnológico

* Vue 3 + Vite – servidor de desenvolvimento e bundle super-rápidos.
* Vuetify 3 – componentes UI Material Design.
* Pinia – gerenciamento de estado.
* Vue-Router 4 – roteamento no cliente.
* Firebase – serviços de autenticação e backend.
* Sass – estilização.

## Estrutura do Projeto

```text
├── public/                # Assets estáticos servidos como estão
├── src/
│   ├── assets/            # Imagens e outros assets usados pelos componentes
│   ├── auth/              # Helpers de autenticação
│   ├── components/        # Widgets de UI reutilizáveis
│   ├── data/              # Fixtures JSON/dados estáticos
│   ├── firebase.js        # Inicialização do SDK Firebase
│   ├── layouts/           # Layouts de página
│   ├── plugins/           # Registro de plugins Vue/Vuetify
│   ├── router/            # Definições de rotas
│   ├── services/          # Wrappers de lógica de negócio/API
│   ├── storage/           # Helpers de LocalStorage
│   ├── store/             # Stores Pinia
│   ├── styles/            # Folhas de estilo globais & variáveis
│   ├── utils/             # Funções utilitárias
│   └── views/             # Páginas renderizadas pelo router
└── vite.config.js         # Configuração do Vite
```

## Fluxo da Aplicação

1. **Ponto de Entrada** – `src/main.js`  
   Cria a instância Vue, registra plugins globais e monta em `#app`.
2. **Roteamento** – `src/router/index.js`  
   Organizado em três layouts: `CleanLayout`, `DefaultLayout` e `SplittedLayout`, com `Navigation Guards` e `authRouteValidation()`.
3. **Gerenciamento de Estado** – Stores Pinia em `src/store/`.
4. **Integração Firebase** – `src/firebase.js` inicializa e exporta serviços Firebase.
5. **Componentes UI** – Componentes Vue atômicos em `src/components/` e páginas em `src/views/`.

## Variáveis de Ambiente

Copie `.env copy` para `.env` e preencha suas credenciais:

```env
VITE_FIREBASE_API_KEY=<sua-chave>
VITE_FIREBASE_AUTH_DOMAIN=<seu-domínio>
# …outras variáveis
```

## Como Executar o Projeto

#### Instalação Local

1. Clonar ou fazer download do projeto.
2. Instalar as dependências:

```bash
npm install
```

3. Executar em ambiente de desenvolvimento:

```bash
npm run dev
```

4. Gerar build de produção:

```bash
npm run build
```

## Autoria

Este projeto foi criado como base para aplicações de e-commerce modernas, permitindo fácil personalização e expansão.

## Imagens do Projeto

<div align="center"><img src="http://drive.google.com/uc?export=view&id=1S4OJjIsantdD5A-9bkKvpYTlzOUhSTA5" width=600 alt="Home" /></div> 
<div align="center"><img src="http://drive.google.com/uc?export=view&id=1Xo_luIUXzbKpbsG0-qLP2uTQGAIeuhQV" width=600 alt="Overview" /></div>
<div align="center"><img src="http://drive.google.com/uc?export=view&id=1lE-Ejfg6dfh_pl1O_e4MEpIgjWrT6k_c" width=300 alt="Checkout" /></div>
