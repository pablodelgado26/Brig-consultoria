# Brig - Sistema de Gestão MEI

Sistema completo de gestão para Microempreendedor Individual (MEI) desenvolvido em React + JavaScript + Vite.

## 🚀 Funcionalidades

### Controles
- **Faturamento** - Controle de faturamento mensal com declarações
- **Livro Caixa** - Controle de entradas e saídas
- **Pagamentos** - Gestão de contas a pagar
- **Recebimentos** - Gestão de contas a receber
- **Estoque** - Controle de produtos e estoque
- **Licitação** - Gestão de documentos para licitação
- **Pessoal** - Controle de funcionários e E-social
- **Bens** - Controle de patrimônio
- **Preços** - Gestão de preços e margens
- **Contratos** - Controle de contratos

### Cadastros
- **Cadastro Geral** - Dados da empresa, responsável, fornecedores e clientes
- **Cadastro Trabalhista** - Funcionários, horários e calendário
- **Cadastro Fiscal** - Produtos, unidades e natureza de operação
- **Cadastro Administrativo** - Documentos e categorias financeiras

### Lançamentos
- **Lançamentos Fiscal** - Notas fiscais de entrada e saída
- **Lançamentos Trabalhista** - Folha de pagamento, férias e eventos

### Relatórios
- Relatórios Fiscais
- Relatórios Trabalhistas
- Relatórios Financeiros

## 🛠️ Tecnologias

- React 18.3
- Vite 6.3
- Tailwind CSS
- Radix UI Components
- Lucide React Icons
- React Hook Form
- Recharts

## 📋 Pré-requisitos

- **Node.js** (versão 18.x ou superior)
- **npm** (gerenciador de pacotes)

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/pablodelgado26/Brig-consultoria.git
cd brig
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Execute em modo de desenvolvimento

```bash
npm run dev
```

### 4. Build para produção

```bash
npm run build
```

### 5. Acesse a aplicação

Abra seu navegador e acesse:
```
http://localhost:3000
```

## ⚠️ LEMBRETE IMPORTANTE

**Antes de começar a desenvolver, lembre-se de atualizar:**

- 📝 **`package.json`** - Altere o nome do projeto, versão, descrição e outras informações específicas do seu projeto
- 🎨 **`src/app/layout.jsx`** - Atualize os metadados (title, description, etc.) conforme seu projeto

## 📁 Estrutura do Projeto

```
template-react/
├── public/                  
│   ├── fonts/              
│   ├── icons/              
│   ├── images/             
│   ├── media/              
│   └── sounds/             
├── src/                    
│   ├── app/                
│   │   ├── globals.css     
│   │   ├── layout.jsx      
│   │   └── page.jsx        
│   └── components/         
├── eslint.config.mjs       
├── jsconfig.json           
├── next.config.mjs         
├── package.json            
└── README.md               
```

## 🛠️ Tecnologias Utilizadas

- **[Next.js 16.0.0](https://nextjs.org/)** - Framework React para produção
- **[React 19.2.0](https://react.dev/)** - Biblioteca JavaScript para interfaces
- **[Ant Design 5.27.6](https://ant.design/)** - Biblioteca de componentes UI
- **[Axios 1.12.2](https://axios-http.com/)** - Cliente HTTP para requisições
- **[React Toastify 11.0.5](https://fkhadra.github.io/react-toastify/)** - Notificações toast
- **[ESLint](https://eslint.org/)** - Linter para qualidade de código

## 📜 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a versão de produção otimizada
- `npm start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter para verificar o código

## 🔧 Configuração

### Next.js Config

O projeto utiliza o React Compiler ativado no arquivo `next.config.mjs`:

```javascript
const nextConfig = {
  reactCompiler: true,
};
```

### Compatibilidade

O projeto utiliza o patch `@ant-design/v5-patch-for-react-19` para garantir compatibilidade total entre Ant Design v5 e React 19.

## 📝 Próximos Passos

Após a instalação, você pode:

1. Começar a desenvolver novos componentes em `src/components/`
2. Criar novas páginas em `src/app/`
3. Adicionar estilos globais em `src/app/globals.css`
4. Configurar rotas e layouts conforme necessário

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## 👨‍💻 Autor

**Pablo Delgado** - [@pablodelgado26](https://github.com/pablodelgado26)

---

Desenvolvido com Pablo Delgado usando Next.js e React
