const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001';

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API Error: ${error.message}`, { endpoint, options });
      throw error;
    }
  }

  // Métodos do Dashboard
  async getDashboardStats() {
    return this.request('/dashboard/stats');
  }

  // Métodos de Faturamento
  async getFaturamento() {
    return this.request('/faturamento');
  }

  async createFaturamento(data) {
    return this.request('/faturamento', {
      method: 'POST',
      body: data,
    });
  }

  async updateFaturamento(id, data) {
    return this.request(`/faturamento/${id}`, {
      method: 'PUT',
      body: data,
    });
  }

  async deleteFaturamento(id) {
    return this.request(`/faturamento/${id}`, {
      method: 'DELETE',
    });
  }

  // Métodos de Caixa
  async getCaixa() {
    return this.request('/caixa');
  }

  async getCaixaTotals() {
    return this.request('/caixa/totals');
  }

  async createLancamentoCaixa(data) {
    return this.request('/caixa', {
      method: 'POST',
      body: data,
    });
  }

  async updateLancamentoCaixa(id, data) {
    return this.request(`/caixa/${id}`, {
      method: 'PUT',
      body: data,
    });
  }

  async deleteLancamentoCaixa(id) {
    return this.request(`/caixa/${id}`, {
      method: 'DELETE',
    });
  }

  // Métodos de Pagamentos
  async getPagamentos() {
    return this.request('/pagamentos');
  }

  async createPagamento(data) {
    return this.request('/pagamentos', {
      method: 'POST',
      body: data,
    });
  }

  async updatePagamento(id, data) {
    return this.request(`/pagamentos/${id}`, {
      method: 'PUT',
      body: data,
    });
  }

  async deletePagamento(id) {
    return this.request(`/pagamentos/${id}`, {
      method: 'DELETE',
    });
  }

  // Métodos de Recebimentos
  async getRecebimentos() {
    return this.request('/recebimentos');
  }

  async createRecebimento(data) {
    return this.request('/recebimentos', {
      method: 'POST',
      body: data,
    });
  }

  async updateRecebimento(id, data) {
    return this.request(`/recebimentos/${id}`, {
      method: 'PUT',
      body: data,
    });
  }

  async deleteRecebimento(id) {
    return this.request(`/recebimentos/${id}`, {
      method: 'DELETE',
    });
  }

  // Métodos de Produtos
  async getProdutos() {
    return this.request('/produtos');
  }

  async createProduto(data) {
    return this.request('/produtos', {
      method: 'POST',
      body: data,
    });
  }

  async updateProduto(id, data) {
    return this.request(`/produtos/${id}`, {
      method: 'PUT',
      body: data,
    });
  }

  async deleteProduto(id) {
    return this.request(`/produtos/${id}`, {
      method: 'DELETE',
    });
  }

  // Métodos de Funcionários
  async getFuncionarios() {
    return this.request('/funcionarios');
  }

  async createFuncionario(data) {
    return this.request('/funcionarios', {
      method: 'POST',
      body: data,
    });
  }

  async updateFuncionario(id, data) {
    return this.request(`/funcionarios/${id}`, {
      method: 'PUT',
      body: data,
    });
  }

  async deleteFuncionario(id) {
    return this.request(`/funcionarios/${id}`, {
      method: 'DELETE',
    });
  }

  // Métodos de Bens
  async getBens() {
    return this.request('/bens');
  }

  async createBem(data) {
    return this.request('/bens', {
      method: 'POST',
      body: data,
    });
  }

  async updateBem(id, data) {
    return this.request(`/bens/${id}`, {
      method: 'PUT',
      body: data,
    });
  }

  async deleteBem(id) {
    return this.request(`/bens/${id}`, {
      method: 'DELETE',
    });
  }

  // Métodos de Contratos
  async getContratos() {
    return this.request('/contratos');
  }

  async createContrato(data) {
    return this.request('/contratos', {
      method: 'POST',
      body: data,
    });
  }

  async updateContrato(id, data) {
    return this.request(`/contratos/${id}`, {
      method: 'PUT',
      body: data,
    });
  }

  async deleteContrato(id) {
    return this.request(`/contratos/${id}`, {
      method: 'DELETE',
    });
  }

  // Métodos de Documentos de Licitação
  async getDocumentosLicitacao() {
    return this.request('/documentos-licitacao');
  }

  async createDocumentoLicitacao(data) {
    return this.request('/documentos-licitacao', {
      method: 'POST',
      body: data,
    });
  }

  async updateDocumentoLicitacao(id, data) {
    return this.request(`/documentos-licitacao/${id}`, {
      method: 'PUT',
      body: data,
    });
  }

  async deleteDocumentoLicitacao(id) {
    return this.request(`/documentos-licitacao/${id}`, {
      method: 'DELETE',
    });
  }

  // Métodos de Relatórios
  async getRelatorios() {
    return this.request('/relatorios');
  }

  async getRelatorioFaturamento(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/relatorios/faturamento?${queryString}`);
  }

  async getRelatorioCaixa(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/relatorios/caixa?${queryString}`);
  }

  async getRelatorioFinanceiro(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/relatorios/financeiro?${queryString}`);
  }
}

// Instância singleton da API
const api = new ApiClient();

export default api;