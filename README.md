# 💰 Coin-Verse

Aplicação mobile desenvolvida com **Ionic + Angular**, focada em conversão/consulta de moedas e criptomoedas.

---

## 🧰 Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) `v18` ou superior
- [npm](https://www.npmjs.com/) `v9` ou superior
- [Angular CLI](https://angular.io/cli) `v20`
- [Ionic CLI](https://ionicframework.com/docs/cli)

### Instalando as CLIs globalmente

```bash
npm install -g @angular/cli
npm install -g @ionic/cli
```

---

## 🚀 Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/gabriel-7g/Coin-Verse.git
cd Coin-Verse
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Rode no navegador (desenvolvimento)

```bash
ionic serve
```

ou com o Angular CLI diretamente:

```bash
ng serve
```

A aplicação estará disponível em `http://localhost:8100` (Ionic) ou `http://localhost:4200` (Angular CLI).

---

Os arquivos gerados estarão na pasta `www/`.

---

## 🧪 Testes

```bash
# Testes unitários
ng test

# Lint
ng lint
```

---

## 📦 Principais tecnologias

| Tecnologia | Versão |
|---|---|
| Angular | ^20.0.0 |
| Ionic Angular | ^8.0.0 |
| Capacitor | 8.3.4 |
| TypeScript | ~5.9.0 |
| RxJS | ~7.8.0 |

---

## 📁 Estrutura do projeto

```
Coin-Verse/
├── src/
│   ├── app/          # Módulos, páginas e componentes
│   ├── assets/       # Imagens e recursos estáticos
│   ├── environments/ # Configurações de ambiente
│   └── theme/        # Variáveis de estilo global (SCSS)
├── angular.json
├── capacitor.config.ts
├── ionic.config.json
└── package.json
```

---

## ❓ Problemas comuns

**Erro ao rodar `ionic serve`:** verifique se o Ionic CLI está instalado globalmente com `ionic --version`.

**Dependências desatualizadas:** rode `npm install` novamente após atualizar a branch.


## 📄 Licença

Este projeto é de uso privado (`"private": true`).
