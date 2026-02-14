// Client API para conexão com o backend MEI
const API_BASE_URL = 'http://localhost:4001';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Método base para fazer requisições
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
      console.error(`API Error [${endpoint}]:`, error.message);
      throw error;
    }
  }

  // ==================== DASHBOARD ====================
  async getDashboardStats() {
    return this.request('/dashboard/stats');
  }

  async getDashboardResumoMensal(mes, ano) {
    if (!mes || !ano) {
      throw new Error('Mês e ano são obrigatórios para resumo mensal');
    }
    return this.request(`/dashboard/resumo-mensal?mes=${mes}&ano=${ano}`);
  }

  // ==================== FATURAMENTO ====================
  async getFaturamentos() {
    return this.request('/faturamento');
  }

  async getFaturamentoStats() {
    return this.request('/faturamento/statistics');
  }

  async getFaturamento(id) {
    return this.request(`/faturamento/${id}`);
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

  // ==================== LIVRO CAIXA ====================
  async getLancamentosCaixa() {
    return this.request('/caixa');
  }

  async getCaixaTotals() {
    return this.request('/caixa/totals');
  }

  async getCaixaResumoCategoria() {
    return this.request('/caixa/resumo-categoria');
  }

  async getLancamentoCaixa(id) {
    return this.request(`/caixa/${id}`);
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

  // ==================== PAGAMENTOS ====================
  async getPagamentos() {
    return this.request('/pagamentos');
  }

  async getPagamento(id) {
    return this.request(`/pagamentos/${id}`);
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

  // ==================== RECEBIMENTOS ====================
  async getRecebimentos() {
    return this.request('/recebimentos');
  }

  async getRecebimento(id) {
    return this.request(`/recebimentos/${id}`);
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

  // ==================== PRODUTOS ====================
  async getProdutos() {
    return this.request('/produtos');
  }

  async getProduto(id) {
    return this.request(`/produtos/${id}`);
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

  // ==================== FUNCIONÁRIOS ====================
  async getFuncionarios() {
    return this.request('/funcionarios');
  }

  async getFuncionario(id) {
    return this.request(`/funcionarios/${id}`);
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

  // ==================== BENS ====================
  async getBens() {
    return this.request('/bens');
  }

  async getBem(id) {
    return this.request(`/bens/${id}`);
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

  // ==================== CONTRATOS ====================
  async getContratos() {
    return this.request('/contratos');
  }

  async getContrato(id) {
    return this.request(`/contratos/${id}`);
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

  // ==================== DOCUMENTOS LICITAÇÃO ====================
  async getDocumentosLicitacao() {
    return this.request('/documentos-licitacao');
  }

  async getDocumentoLicitacao(id) {
    return this.request(`/documentos-licitacao/${id}`);
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

  // ==================== RELATÓRIOS ====================
  async getRelatorios() {
    return this.request('/relatorios');
  }

  // Método para testar a conexão com o backend
  async testConnection() {
    try {
      const response = await this.request('/');
      console.log('✅ Conexão com backend estabelecida:', response.message);
      return true;
    } catch (error) {
      console.error('❌ Erro ao conectar com backend:', error.message);
      return false;
    }
  }
}

// Exporta instância singleton
export default new ApiService();