import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';

// Hook genérico para chamadas de API
export function useApi(apiCall, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall(...args);
      setData(result);
      return result;
    } catch (err) {
      setError(err.message);
      console.error('useApi Error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    execute();
  }, [execute]);

  return {
    data,
    loading,
    error,
    refetch: execute,
  };
}

// Hook específico para dados do Dashboard
export function useDashboardData() {
  const [stats, setStats] = useState(null);
  const [resumoMensal, setResumoMensal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Busca apenas as stats que não precisam de parâmetros
      const statsData = await api.getDashboardStats();
      setStats(statsData);
      
      // Não busca resumo mensal por padrão (precisa de parâmetros mes e ano)
      setResumoMensal(null);
      
      return { stats: statsData, resumo: null };
    } catch (err) {
      setError(err.message);
      // Dados de fallback
      setStats({
        stats: [
          { title: 'Faturamento Mensal', value: 'R$ 0,00', change: '0%', trend: 'neutral' },
          { title: 'Contas a Receber', value: 'R$ 0,00', change: '0 pendentes', trend: 'neutral' },
          { title: 'Contas a Pagar', value: 'R$ 0,00', change: '0 vencendo', trend: 'neutral' },
          { title: 'Produtos em Estoque', value: '0', change: '0 itens baixos', trend: 'neutral' }
        ],
        recentActivities: []
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // Função separada para buscar resumo mensal com parâmetros
  const fetchResumoMensal = useCallback(async (mes, ano) => {
    try {
      const resumoData = await api.getDashboardResumoMensal(mes, ano);
      setResumoMensal(resumoData);
      return resumoData;
    } catch (err) {
      console.error('Erro ao buscar resumo mensal:', err.message);
      setResumoMensal(null);
      return null;
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    stats,
    resumoMensal,
    loading,
    error,
    refetch: fetchDashboard,
    fetchResumoMensal
  };
}

// Hook para operações CRUD genéricas
export function useCRUD(resourceName) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mapeia nomes de recursos para métodos da API
  const apiMethods = {
    faturamento: {
      getAll: api.getFaturamentos,
      get: api.getFaturamento,
      create: api.createFaturamento,
      update: api.updateFaturamento,
      delete: api.deleteFaturamento
    },
    caixa: {
      getAll: api.getLancamentosCaixa,
      get: api.getLancamentoCaixa,
      create: api.createLancamentoCaixa,
      update: api.updateLancamentoCaixa,
      delete: api.deleteLancamentoCaixa
    },
    pagamentos: {
      getAll: api.getPagamentos,
      get: api.getPagamento,
      create: api.createPagamento,
      update: api.updatePagamento,
      delete: api.deletePagamento
    },
    recebimentos: {
      getAll: api.getRecebimentos,
      get: api.getRecebimento,
      create: api.createRecebimento,
      update: api.updateRecebimento,
      delete: api.deleteRecebimento
    },
    produtos: {
      getAll: api.getProdutos,
      get: api.getProduto,
      create: api.createProduto,
      update: api.updateProduto,
      delete: api.deleteProduto
    },
    funcionarios: {
      getAll: api.getFuncionarios,
      get: api.getFuncionario,
      create: api.createFuncionario,
      update: api.updateFuncionario,
      delete: api.deleteFuncionario
    },
    bens: {
      getAll: api.getBens,
      get: api.getBem,
      create: api.createBem,
      update: api.updateBem,
      delete: api.deleteBem
    },
    contratos: {
      getAll: api.getContratos,
      get: api.getContrato,
      create: api.createContrato,
      update: api.updateContrato,
      delete: api.deleteContrato
    },
    documentosLicitacao: {
      getAll: api.getDocumentosLicitacao,
      get: api.getDocumentoLicitacao,
      create: api.createDocumentoLicitacao,
      update: api.updateDocumentoLicitacao,
      delete: api.deleteDocumentoLicitacao
    }
  };

  const methods = apiMethods[resourceName];
  
  if (!methods) {
    throw new Error(`Resource '${resourceName}' não encontrado`);
  }

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await methods.getAll();
      setItems(Array.isArray(result) ? result : result.data || []);
    } catch (err) {
      setError(err.message);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [methods]);

  const getItem = useCallback(async (id) => {
    try {
      setError(null);
      return await methods.get(id);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [methods]);

  const createItem = useCallback(async (data) => {
    try {
      setError(null);
      const result = await methods.create(data);
      await fetchItems(); // Recarrega lista
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [methods, fetchItems]);

  const updateItem = useCallback(async (id, data) => {
    try {
      setError(null);
      const result = await methods.update(id, data);
      await fetchItems(); // Recarrega lista
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [methods, fetchItems]);

  const deleteItem = useCallback(async (id) => {
    try {
      setError(null);
      const result = await methods.delete(id);
      await fetchItems(); // Recarrega lista
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [methods, fetchItems]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return {
    items,
    loading,
    error,
    refetch: fetchItems,
    get: getItem,
    create: createItem,
    update: updateItem,
    delete: deleteItem
  };
}

// Hook específico para Faturamento
export function useFaturamento() {
  const crud = useCRUD('faturamento');
  const [statistics, setStatistics] = useState(null);

  const fetchStatistics = useCallback(async () => {
    try {
      const stats = await api.getFaturamentoStats();
      setStatistics(stats);
      return stats;
    } catch (error) {
      console.error('Erro ao buscar estatísticas de faturamento:', error);
    }
  }, []);

  useEffect(() => {
    fetchStatistics();
  }, [fetchStatistics]);

  return {
    ...crud,
    statistics,
    refreshStatistics: fetchStatistics
  };
}

// Hook específico para Livro Caixa
export function useLivroCaixa() {
  const crud = useCRUD('caixa');
  const [totals, setTotals] = useState(null);
  const [resumoCategoria, setResumoCategoria] = useState(null);

  const fetchTotals = useCallback(async () => {
    try {
      const totalsData = await api.getCaixaTotals();
      setTotals(totalsData);
      return totalsData;
    } catch (error) {
      console.error('Erro ao buscar totais do caixa:', error);
    }
  }, []);

  const fetchResumoCategoria = useCallback(async () => {
    try {
      const resumo = await api.getCaixaResumoCategoria();
      setResumoCategoria(resumo);
      return resumo;
    } catch (error) {
      console.error('Erro ao buscar resumo por categoria:', error);
    }
  }, []);

  useEffect(() => {
    fetchTotals();
    fetchResumoCategoria();
  }, [fetchTotals, fetchResumoCategoria]);

  return {
    ...crud,
    totals,
    resumoCategoria,
    refreshTotals: fetchTotals,
    refreshResumoCategoria: fetchResumoCategoria
  };
}

// Hook para testar conexão
export function useConnectionTest() {
  const [connected, setConnected] = useState(false);
  const [testing, setTesting] = useState(true);

  const testConnection = useCallback(async () => {
    setTesting(true);
    try {
      const result = await api.testConnection();
      setConnected(result);
    } catch (error) {
      setConnected(false);
    } finally {
      setTesting(false);
    }
  }, []);

  useEffect(() => {
    testConnection();
  }, [testConnection]);

  return {
    connected,
    testing,
    retry: testConnection
  };
}

// Hook específico para Resumo Mensal (opcional, com parâmetros)
export function useResumoMensal(mes, ano) {
  const [resumo, setResumo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchResumo = useCallback(async (mesParam, anoParam) => {
    const mesUsado = mesParam || mes;
    const anoUsado = anoParam || ano;
    
    if (!mesUsado || !anoUsado) {
      setError('Mês e ano são obrigatórios');
      return null;
    }

    try {
      setLoading(true);
      setError(null);
      const result = await api.getDashboardResumoMensal(mesUsado, anoUsado);
      setResumo(result);
      return result;
    } catch (err) {
      setError(err.message);
      console.error('Erro ao buscar resumo mensal:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [mes, ano]);

  useEffect(() => {
    if (mes && ano) {
      fetchResumo();
    }
  }, [fetchResumo, mes, ano]);

  return {
    resumo,
    loading,
    error,
    fetchResumo
  };
}