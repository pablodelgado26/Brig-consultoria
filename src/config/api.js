// Configurações da API do Sistema MEI
export const API_CONFIG = {
  // URL base do backend
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001',
  
  // Timeout padrão para requisições (em ms)
  TIMEOUT: 10000,
  
  // Headers padrão
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
  },
  
  // Endpoints da API
  ENDPOINTS: {
    // Dashboard
    DASHBOARD_STATS: '/dashboard/stats',
    DASHBOARD_RESUMO: '/dashboard/resumo-mensal',
    
    // Faturamento
    FATURAMENTO: '/faturamento',
    FATURAMENTO_STATS: '/faturamento/statistics',
    
    // Livro Caixa
    CAIXA: '/caixa',
    CAIXA_TOTALS: '/caixa/totals',
    CAIXA_RESUMO_CATEGORIA: '/caixa/resumo-categoria',
    
    // Pagamentos
    PAGAMENTOS: '/pagamentos',
    
    // Recebimentos
    RECEBIMENTOS: '/recebimentos',
    
    // Produtos
    PRODUTOS: '/produtos',
    
    // Funcionários
    FUNCIONARIOS: '/funcionarios',
    
    // Bens
    BENS: '/bens',
    
    // Contratos
    CONTRATOS: '/contratos',
    
    // Documentos de Licitação
    DOCUMENTOS_LICITACAO: '/documentos-licitacao',
    
    // Relatórios
    RELATORIOS: '/relatorios'
  }
};

// Configurações de desenvolvimento
export const DEV_CONFIG = {
  // Mostrar logs de API em desenvolvimento
  ENABLE_LOGS: process.env.NODE_ENV === 'development',
  
  // Dados mock para desenvolvimento offline
  USE_MOCK_DATA: false,
  
  // Intervalo para retry de conexão (em ms)
  RETRY_INTERVAL: 3000,
  
  // Número máximo de tentativas de reconexão
  MAX_RETRIES: 3
};

// Mensagens de erro padrão
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Erro de conexão. Verifique sua internet e tente novamente.',
  SERVER_ERROR: 'Erro interno do servidor. Tente novamente em alguns minutos.',
  NOT_FOUND: 'Recurso não encontrado.',
  UNAUTHORIZED: 'Você não tem permissão para acessar este recurso.',
  VALIDATION_ERROR: 'Dados inválidos. Verifique as informações e tente novamente.',
  GENERIC_ERROR: 'Ocorreu um erro inesperado. Tente novamente.'
};