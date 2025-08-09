# eSupplements Frontend (Português)

Uma aplicação web de e-commerce moderna (SPA) para suplementos nutricionais construída com **Vue 3**, **Vite**, **Vuetify 3** e **Pinia**. O app integra-se ao **Firebase** para autenticação e dados, oferecendo uma experiência de compra e checkout suave.

---

## Índice
1. [Stack Tecnológico](#stack-tecnológico)
2. [Estrutura do Projeto](#estrutura-do-projeto)
3. [Fluxo da Aplicação](#fluxo-da-aplicação)
4. [Variáveis de Ambiente](#variáveis-de-ambiente)
5. [Configuração do Projeto](#configuração-do-projeto)
6. [Compilação & Hot-Reload](#compilação-e-hot-reload-para-desenvolvimento)
7. [Build para Produção](#compila-e-minifica-para-produção)
8. [Licença](#licença)

## Stack Tecnológico
- **Vue 3** + **Vite** – servidor de desenvolvimento e bundle super-rápidos.
- **Vuetify 3** – componentes UI Material Design.
- **Pinia** – gerenciamento de estado.
- **Vue-Router 4** – roteamento no cliente.
- **Firebase** – serviços de autenticação e backend.
- **Sass** – estilização.

## Estrutura do Projeto
```text
├── public/                # Assets estáticos servidos como estão
├── src/
│   ├── assets/            # Imagens e outros assets usados pelos componentes
│   ├── auth/              # Helpers de autenticação (ex.: authRouteValidation.js)
│   ├── components/        # Widgets de UI reutilizáveis
│   ├── data/              # Fixtures JSON/dados estáticos
│   ├── firebase.js        # Inicialização do SDK Firebase
│   ├── layouts/           # Layouts de página (Default, Clean, Splitted)
│   ├── plugins/           # Registro de plugins Vue/Vuetify
│   ├── router/            # Definições de rotas
│   ├── services/          # Wrappers de lógica de negócio/API
│   ├── storage/           # Helpers de LocalStorage
│   ├── store/             # Stores Pinia (estado centralizado)
│   ├── styles/            # Folhas de estilo globais & variáveis
│   ├── utils/             # Funções utilitárias & helpers
│   └── views/             # Componentes de página renderizados pelo router
└── vite.config.js         # Configuração do Vite
```

## Fluxo da Aplicação
1. **Ponto de Entrada** – `src/main.js`
   * Cria a instância Vue, registra plugins globais (Vuetify, Pinia, router) via `registerPlugins` e monta em `#app`.
2. **Roteamento** – `src/router/index.js`
   * Organizado em três layouts de alto nível:
     * `CleanLayout` (`/c/*`) – Páginas de login/onboarding.
     * `DefaultLayout` (`/`) – Loja pública & área da conta autenticada.
     * `SplittedLayout` (`/checkout/*`) – Fluxo de checkout/pagamento em duas colunas.
   * `Navigation Guards` garantem autenticação via `authRouteValidation()` e a flag meta `requiresAuth`.
3. **Gerenciamento de Estado** – Stores Pinia em `src/store/` (ex.: `useSignInStore`, `useSearchStore`). Componentes despacham ações para buscar/atualizar estado reativo.
4. **Integração Firebase** – `src/firebase.js` inicializa o app Firebase e exporta serviços configurados usados por stores e serviços.
5. **Componentes UI** – Componentes Vue atômicos em `src/components/`, enquanto `src/views/` mapeia páginas renderizadas pelas rotas.

## Variáveis de Ambiente
Copie `.env copy` para `.env` e preencha suas credenciais:
```env
VITE_FIREBASE_API_KEY=<sua-chave>
VITE_FIREBASE_AUTH_DOMAIN=<seu-domínio>
# …outras variáveis do Firebase / app
```

## Configuração do Projeto
```bash
# yarn
yarn

# npm
npm install

# npm
npm run dev

# npm
npm run build
