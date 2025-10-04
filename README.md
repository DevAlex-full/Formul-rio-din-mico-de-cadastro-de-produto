# 📦 Formulário Dinâmico de Cadastro de Produto

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

> Projeto desenvolvido durante o curso **DevQuest 2.0** para praticar conceitos fundamentais de React, manipulação de estado, eventos e validação de formulários.

## 🎯 Sobre o Projeto

Este é um formulário inteligente de cadastro de produtos que ajusta dinamicamente seus campos baseado na categoria selecionada. O projeto foi desenvolvido com foco em boas práticas de desenvolvimento React e experiência do usuário.

### ✨ Funcionalidades

- ✅ **Campos Dinâmicos**: Campos específicos aparecem baseado na categoria selecionada
- ✅ **Validação em Tempo Real**: Feedback instantâneo durante o preenchimento
- ✅ **Validação Completa**: Validação robusta antes do envio
- ✅ **Gerenciamento de Estado**: Uso eficiente do useState
- ✅ **Lista de Produtos**: Visualização dos produtos cadastrados
- ✅ **Remoção de Produtos**: Possibilidade de remover produtos da lista
- ✅ **Feedback Visual**: Mensagens de sucesso e erro
- ✅ **Design Responsivo**: Interface adaptável a diferentes tamanhos de tela

## 🎨 Categorias e Campos Dinâmicos

Cada categoria possui campos específicos:

| Categoria | Campos Adicionais |
|-----------|-------------------|
| 📱 Eletrônicos | Marca, Garantia (meses) |
| 👕 Roupas | Tamanho, Cor |
| 🍎 Alimentos | Data de Validade, Peso (kg) |
| 📚 Livros | Autor, ISBN |
| 🪑 Móveis | Material, Dimensões (cm) |

## 🚀 Tecnologias Utilizadas

- **React 18** - Biblioteca JavaScript para construção de interfaces
- **Vite** - Build tool e dev server ultrarrápido
- **TailwindCSS** - Framework CSS utility-first
- **Lucide React** - Biblioteca de ícones moderna e customizável

## 📚 Conceitos React Praticados

### 1. Gerenciamento de Estado (useState)
```javascript
const [formData, setFormData] = useState({...});
const [erros, setErros] = useState({});
const [produtos, setProdutos] = useState([]);
```

### 2. Manipulação de Eventos
```javascript
const handleChange = (e) => {...}    // onChange
const handleBlur = (e) => {...}      // onBlur
const handleSubmit = (e) => {...}    // onSubmit
```

### 3. Renderização Condicional
```javascript
{formData.categoria === 'eletronicos' && (
  <div>Campos específicos...</div>
)}
```

### 4. Validação de Formulários
- Validação em tempo real (onBlur)
- Validação completa no submit
- Feedback visual com mensagens de erro

### 5. Manipulação de Arrays
```javascript
setProdutos(prev => [...prev, novoProduto]);  // Adicionar
setProdutos(prev => prev.filter(p => p.id !== id));  // Remover
```

## 🛠️ Como Executar o Projeto

### Pré-requisitos
- Node.js instalado (versão 16 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório
```bash
git clone https://github.com/DevAlex-full/formulario-dinamico-cadastro-produto.git
```

2. Entre na pasta do projeto
```bash
cd formulario-dinamico-cadastro-produto
```

3. Instale as dependências
```bash
npm install
```

4. Execute o projeto
```bash
npm run dev
```

5. Acesse no navegador
```
http://localhost:5173
```

## 📁 Estrutura do Projeto

```
formulario-dinamico-cadastro-produto/
├── public/
├── src/
│   ├── App.jsx          # Componente principal com toda a lógica
│   ├── main.jsx         # Ponto de entrada da aplicação
│   └── index.css        # Estilos globais
├── index.html           # HTML principal (com Tailwind CDN)
├── package.json
├── vite.config.js
└── README.md
```

## 🎓 Aprendizados

Durante o desenvolvimento deste projeto, pratiquei:

- ✅ Gerenciamento de estado complexo com múltiplos campos
- ✅ Validação de formulários em tempo real
- ✅ Renderização condicional de componentes
- ✅ Manipulação de eventos do usuário
- ✅ Imutabilidade no React (spread operator)
- ✅ Estilização moderna com TailwindCSS
- ✅ Componentização e organização de código
- ✅ Boas práticas de UX/UI

## 🔍 Validações Implementadas

- **Nome**: Obrigatório, mínimo 3 caracteres
- **Preço**: Obrigatório, deve ser maior que zero
- **Categoria**: Obrigatória
- **Campos Dinâmicos**: Opcionais, mas validados quando preenchidos

## 💡 Melhorias Futuras

- [ ] Persistência de dados no LocalStorage
- [ ] Edição de produtos cadastrados
- [ ] Filtros e busca na lista de produtos
- [ ] Exportação de dados (JSON/CSV)
- [ ] Testes unitários com Jest/Vitest
- [ ] Modo escuro
- [ ] Paginação da lista de produtos
- [ ] Upload de imagens dos produtos

## 👨‍💻 Autor

**Alexander Bueno**

- LinkedIn: [Alexander Bueno](https://www.linkedin.com/in/alexander-bueno-43823a358/)
- GitHub: [DevAlex-full](https://github.com/DevAlex-full)

## 📝 Licença

Este projeto foi desenvolvido como parte do curso **DevQuest 2.0** e está disponível para fins educacionais.

---

⭐ Se este projeto te ajudou de alguma forma, considere dar uma estrela no repositório!

**#DevQuest #React #JavaScript #FrontEnd #WebDevelopment**