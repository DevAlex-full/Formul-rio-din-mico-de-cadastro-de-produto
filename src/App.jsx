import React, { useState } from 'react';
import { ShoppingCart, Package, Trash2, CheckCircle } from 'lucide-react';

function App() {
  // ========== ESTADOS (useState) ==========
  const [formData, setFormData] = useState({
    nome: '',
    preco: '',
    categoria: '',
    descricao: '',
    // Campos dinâmicos
    marca: '',
    garantia: '',
    tamanho: '',
    cor: '',
    validade: '',
    peso: '',
    autor: '',
    isbn: '',
    material: '',
    dimensoes: ''
  });

  const [erros, setErros] = useState({});
  const [produtos, setProdutos] = useState([]);
  const [mostrarSucesso, setMostrarSucesso] = useState(false);

  // ========== MANIPULAÇÃO DE EVENTOS ==========
  
  // Atualiza campos do formulário (onChange)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Remove erro do campo quando usuário começa a digitar
    if (erros[name]) {
      setErros(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validação em tempo real (onBlur - quando sai do campo)
  const handleBlur = (e) => {
    const { name, value } = e.target;
    validarCampo(name, value);
  };

  // ========== VALIDAÇÕES ==========
  
  const validarCampo = (nome, valor) => {
    let erro = '';

    switch(nome) {
      case 'nome':
        if (!valor.trim()) {
          erro = 'Nome é obrigatório';
        } else if (valor.trim().length < 3) {
          erro = 'Nome deve ter no mínimo 3 caracteres';
        }
        break;
      
      case 'preco':
        if (!valor) {
          erro = 'Preço é obrigatório';
        } else if (parseFloat(valor) <= 0) {
          erro = 'Preço deve ser maior que zero';
        }
        break;
      
      case 'categoria':
        if (!valor) {
          erro = 'Selecione uma categoria';
        }
        break;
    }

    setErros(prev => ({
      ...prev,
      [nome]: erro
    }));

    return erro === '';
  };

  const validarFormulario = () => {
    const novosErros = {};

    if (!formData.nome.trim()) {
      novosErros.nome = 'Nome é obrigatório';
    } else if (formData.nome.trim().length < 3) {
      novosErros.nome = 'Nome deve ter no mínimo 3 caracteres';
    }

    if (!formData.preco) {
      novosErros.preco = 'Preço é obrigatório';
    } else if (parseFloat(formData.preco) <= 0) {
      novosErros.preco = 'Preço deve ser maior que zero';
    }

    if (!formData.categoria) {
      novosErros.categoria = 'Selecione uma categoria';
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  // ========== SUBMISSÃO ==========
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    // Criar objeto do produto
    const novoProduto = {
      id: Date.now(),
      nome: formData.nome,
      preco: parseFloat(formData.preco),
      categoria: formData.categoria,
      descricao: formData.descricao
    };

    // Adicionar campos específicos baseado na categoria
    switch(formData.categoria) {
      case 'eletronicos':
        if (formData.marca) novoProduto.marca = formData.marca;
        if (formData.garantia) novoProduto.garantia = formData.garantia;
        break;
      case 'roupas':
        if (formData.tamanho) novoProduto.tamanho = formData.tamanho;
        if (formData.cor) novoProduto.cor = formData.cor;
        break;
      case 'alimentos':
        if (formData.validade) novoProduto.validade = formData.validade;
        if (formData.peso) novoProduto.peso = formData.peso;
        break;
      case 'livros':
        if (formData.autor) novoProduto.autor = formData.autor;
        if (formData.isbn) novoProduto.isbn = formData.isbn;
        break;
      case 'moveis':
        if (formData.material) novoProduto.material = formData.material;
        if (formData.dimensoes) novoProduto.dimensoes = formData.dimensoes;
        break;
    }

    // Adicionar produto à lista
    setProdutos(prev => [...prev, novoProduto]);

    // Mostrar mensagem de sucesso
    setMostrarSucesso(true);
    setTimeout(() => setMostrarSucesso(false), 3000);

    // Limpar formulário
    limparFormulario();
  };

  // ========== FUNÇÕES AUXILIARES ==========
  
  const limparFormulario = () => {
    setFormData({
      nome: '',
      preco: '',
      categoria: '',
      descricao: '',
      marca: '',
      garantia: '',
      tamanho: '',
      cor: '',
      validade: '',
      peso: '',
      autor: '',
      isbn: '',
      material: '',
      dimensoes: ''
    });
    setErros({});
  };

  const removerProduto = (id) => {
    setProdutos(prev => prev.filter(p => p.id !== id));
  };

  const obterIconeCategoria = (categoria) => {
    const icones = {
      eletronicos: '📱',
      roupas: '👕',
      alimentos: '🍎',
      livros: '📚',
      moveis: '🪑'
    };
    return icones[categoria] || '📦';
  };

  // ========== RENDERIZAÇÃO CONDICIONAL - Campos Dinâmicos ==========
  
  const renderCamposDinamicos = () => {
    switch(formData.categoria) {
      case 'eletronicos':
        return (
          <div className="space-y-4 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 animate-fadeIn">
            <h3 className="font-semibold text-gray-700 flex items-center gap-2">
              📱 Informações Adicionais - Eletrônicos
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Marca
              </label>
              <input
                type="text"
                name="marca"
                value={formData.marca}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Ex: Samsung, Apple, LG"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Garantia (meses)
              </label>
              <input
                type="number"
                name="garantia"
                value={formData.garantia}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="12"
              />
            </div>
          </div>
        );

      case 'roupas':
        return (
          <div className="space-y-4 bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500 animate-fadeIn">
            <h3 className="font-semibold text-gray-700 flex items-center gap-2">
              👕 Informações Adicionais - Roupas
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tamanho
              </label>
              <select
                name="tamanho"
                value={formData.tamanho}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              >
                <option value="">Selecione</option>
                <option value="PP">PP</option>
                <option value="P">P</option>
                <option value="M">M</option>
                <option value="G">G</option>
                <option value="GG">GG</option>
                <option value="XG">XG</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cor
              </label>
              <input
                type="text"
                name="cor"
                value={formData.cor}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                placeholder="Ex: Azul, Vermelho, Preto"
              />
            </div>
          </div>
        );

      case 'alimentos':
        return (
          <div className="space-y-4 bg-green-50 p-4 rounded-lg border-l-4 border-green-500 animate-fadeIn">
            <h3 className="font-semibold text-gray-700 flex items-center gap-2">
              🍎 Informações Adicionais - Alimentos
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data de Validade
              </label>
              <input
                type="date"
                name="validade"
                value={formData.validade}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Peso (kg)
              </label>
              <input
                type="number"
                name="peso"
                value={formData.peso}
                onChange={handleChange}
                step="0.001"
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                placeholder="0.5"
              />
            </div>
          </div>
        );

      case 'livros':
        return (
          <div className="space-y-4 bg-amber-50 p-4 rounded-lg border-l-4 border-amber-500 animate-fadeIn">
            <h3 className="font-semibold text-gray-700 flex items-center gap-2">
              📚 Informações Adicionais - Livros
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Autor
              </label>
              <input
                type="text"
                name="autor"
                value={formData.autor}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                placeholder="Nome do autor"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ISBN
              </label>
              <input
                type="text"
                name="isbn"
                value={formData.isbn}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                placeholder="978-3-16-148410-0"
              />
            </div>
          </div>
        );

      case 'moveis':
        return (
          <div className="space-y-4 bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500 animate-fadeIn">
            <h3 className="font-semibold text-gray-700 flex items-center gap-2">
              🪑 Informações Adicionais - Móveis
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Material
              </label>
              <input
                type="text"
                name="material"
                value={formData.material}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                placeholder="Ex: Madeira, Metal, Plástico"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dimensões (cm)
              </label>
              <input
                type="text"
                name="dimensoes"
                value={formData.dimensoes}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                placeholder="Ex: 100x50x80"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // ========== RENDERIZAÇÃO PRINCIPAL ==========
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>

      <div className="max-w-3xl mx-auto">
        
        {/* Cabeçalho */}
        <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <ShoppingCart className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">Cadastro de Produto</h1>
          </div>
          <p className="text-gray-600">Exercício React: Manipulação de Estado, Eventos e Validação</p>
        </div>

        {/* Mensagem de Sucesso */}
        {mostrarSucesso && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg mb-6 flex items-center gap-2 animate-fadeIn">
            <CheckCircle className="w-5 h-5" />
            <span className="font-semibold">Produto cadastrado com sucesso!</span>
          </div>
        )}

        {/* Formulário */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="space-y-6">
            
            {/* Nome do Produto */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nome do Produto <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition ${
                  erros.nome ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
                placeholder="Digite o nome do produto"
              />
              {erros.nome && (
                <p className="mt-1 text-sm text-red-500">{erros.nome}</p>
              )}
            </div>

            {/* Preço */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Preço (R$) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="preco"
                value={formData.preco}
                onChange={handleChange}
                onBlur={handleBlur}
                step="0.01"
                min="0"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition ${
                  erros.preco ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
                placeholder="0,00"
              />
              {erros.preco && (
                <p className="mt-1 text-sm text-red-500">{erros.preco}</p>
              )}
            </div>

            {/* Categoria */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Categoria <span className="text-red-500">*</span>
              </label>
              <select
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition ${
                  erros.categoria ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
              >
                <option value="">Selecione uma categoria</option>
                <option value="eletronicos">Eletrônicos</option>
                <option value="roupas">Roupas</option>
                <option value="alimentos">Alimentos</option>
                <option value="livros">Livros</option>
                <option value="moveis">Móveis</option>
              </select>
              {erros.categoria && (
                <p className="mt-1 text-sm text-red-500">{erros.categoria}</p>
              )}
            </div>

            {/* Campos Dinâmicos */}
            {renderCamposDinamicos()}

            {/* Descrição */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Descrição
              </label>
              <textarea
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                placeholder="Descreva o produto..."
              />
            </div>

            {/* Botões */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={handleSubmit}
                className="flex-1 bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                <Package className="w-5 h-5" />
                Cadastrar Produto
              </button>
              
              <button
                type="button"
                onClick={limparFormulario}
                className="flex-1 bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-500 transition"
              >
                Limpar Formulário
              </button>
            </div>
          </div>
        </div>

        {/* Lista de Produtos */}
        {produtos.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Package className="w-6 h-6" />
              Produtos Cadastrados ({produtos.length})
            </h2>
            
            <div className="space-y-3">
              {produtos.map(produto => (
                <div
                  key={produto.id}
                  className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{obterIconeCategoria(produto.categoria)}</span>
                        <h3 className="font-bold text-lg text-gray-800">{produto.nome}</h3>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-1">
                        Categoria: <span className="font-medium">{produto.categoria}</span>
                        {produto.marca && ` | Marca: ${produto.marca}`}
                        {produto.garantia && ` | Garantia: ${produto.garantia} meses`}
                        {produto.tamanho && ` | Tamanho: ${produto.tamanho}`}
                        {produto.cor && ` | Cor: ${produto.cor}`}
                        {produto.autor && ` | Autor: ${produto.autor}`}
                        {produto.material && ` | Material: ${produto.material}`}
                      </p>
                      
                      <p className="text-blue-600 font-bold text-lg mt-2">
                        R$ {produto.preco.toFixed(2)}
                      </p>
                      
                      {produto.descricao && (
                        <p className="text-gray-500 text-sm mt-2 italic">{produto.descricao}</p>
                      )}
                    </div>
                    
                    <button
                      onClick={() => removerProduto(produto.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition"
                      title="Remover produto"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;