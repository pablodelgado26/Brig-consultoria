import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { 
  FileText, 
  Book, 
  CreditCard, 
  ArrowDownCircle, 
  Package,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Loader2,
  Wifi,
  WifiOff
} from 'lucide-react';
import { useDashboardData, useConnectionTest } from '../hooks/useApi';
import { ResumoMensalWidget } from './widgets/ResumoMensalWidget';

export function Dashboard({ onNavigate }) {
  const { stats: apiStats, loading, error, refetch } = useDashboardData();
  const { connected, testing, retry } = useConnectionTest();

  // Dados de fallback enquanto carrega ou em caso de erro
  const defaultStats = [
    { 
      title: 'Faturamento Mensal', 
      value: 'R$ 0,00', 
      icon: DollarSign, 
      change: '0%',
      trend: 'neutral',
      onClick: () => onNavigate('faturamento')
    },
    { 
      title: 'Contas a Receber', 
      value: 'R$ 0,00', 
      icon: ArrowDownCircle, 
      change: '0 pendentes',
      trend: 'neutral',
      onClick: () => onNavigate('recebimentos')
    },
    { 
      title: 'Contas a Pagar', 
      value: 'R$ 0,00', 
      icon: CreditCard, 
      change: '0 vencendo',
      trend: 'neutral',
      onClick: () => onNavigate('pagamentos')
    },
    { 
      title: 'Produtos em Estoque', 
      value: '0', 
      icon: Package, 
      change: '0 itens baixos',
      trend: 'neutral',
      onClick: () => onNavigate('estoque')
    },
  ];

  // Combina dados da API com configurações visuais
  const stats = apiStats?.stats ? apiStats.stats.map((apiStat, index) => ({
    ...apiStat,
    icon: defaultStats[index]?.icon || DollarSign,
    onClick: defaultStats[index]?.onClick
  })) : defaultStats;

  const quickAccess = [
    { 
      title: 'Livro Caixa', 
      icon: Book, 
      description: 'Registre entradas e saídas',
      onClick: () => onNavigate('livro-caixa')
    },
    { 
      title: 'Notas Fiscais', 
      icon: FileText, 
      description: 'Gerencie NF-e de entrada e saída',
      onClick: () => onNavigate('lancamentos-fiscal')
    },
    { 
      title: 'Folha de Pagamento', 
      icon: CreditCard, 
      description: 'Controle de pessoal e E-social',
      onClick: () => onNavigate('pessoal')
    },
  ];

  // Usa atividades da API ou dados de fallback
  const recentActivity = apiStats?.recentActivities?.length > 0 
    ? apiStats.recentActivities 
    : [
        { 
          type: connected ? 'Sistema' : 'Conexão', 
          description: connected ? 'Sistema conectado ao backend' : 'Tentando conectar ao servidor...', 
          value: connected ? '✓' : '⚠', 
          date: new Date().toLocaleDateString('pt-BR') 
        }
      ];

  return (
    <div className="p-6">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl mb-2">Dashboard</h1>
          <p className="text-gray-600">Visão geral do seu negócio MEI</p>
        </div>
        <div className="flex items-center gap-4">
          {/* Status da conexão */}
          <div className="flex items-center gap-2">
            {connected ? (
              <Wifi className="h-4 w-4 text-green-500" />
            ) : (
              <WifiOff className="h-4 w-4 text-red-500" />
            )}
            <span className={`text-sm ${connected ? 'text-green-600' : 'text-red-500'}`}>
              {testing ? 'Verificando...' : connected ? 'Conectado' : 'Desconectado'}
            </span>
          </div>

          {/* Botões de ação */}
          {loading && (
            <div className="flex items-center gap-2 text-blue-600">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">Carregando...</span>
            </div>
          )}
          
          {error && !connected && (
            <button 
              onClick={() => {
                retry();
                refetch();
              }}
              className="px-3 py-1 bg-red-100 text-red-600 rounded text-sm hover:bg-red-200 transition-colors"
            >
              Reconectar
            </button>
          )}
          
          {connected && (
            <button 
              onClick={refetch}
              className="px-3 py-1 bg-blue-100 text-blue-600 rounded text-sm hover:bg-blue-200 transition-colors"
            >
              Atualizar
            </button>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card 
              key={index} 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={stat.onClick}
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm text-gray-600">{stat.title}</CardTitle>
                <Icon className="h-5 w-5 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl mb-1">{stat.value}</div>
                <div className="flex items-center gap-1 text-sm">
                  {stat.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-600" />}
                  {stat.trend === 'down' && <TrendingDown className="h-4 w-4 text-red-600" />}
                  <span className={
                    stat.trend === 'up' ? 'text-green-600' : 
                    stat.trend === 'down' ? 'text-red-600' : 
                    'text-gray-600'
                  }>
                    {stat.change}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Quick Access */}
        <div className="lg:col-span-2">
          <h2 className="text-xl mb-4">Acesso Rápido</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickAccess.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card 
                  key={index}
                  className="cursor-pointer hover:shadow-lg transition-shadow hover:border-blue-600"
                  onClick={item.onClick}
                >
                  <CardContent className="p-6">
                    <Icon className="h-8 w-8 text-blue-600 mb-3" />
                    <h3 className="mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Alerts */}
        <div>
          <h2 className="text-xl mb-4">Alertas</h2>
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm">
                    <strong>3 contas</strong> vencendo esta semana
                  </p>
                </div>
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm">
                    <strong>12 produtos</strong> com estoque baixo
                  </p>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm">
                    <strong>DAS MEI</strong> vence em 5 dias
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Resumo Mensal Widget */}
      <div className="mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ResumoMensalWidget />
          </div>
          <div className="lg:col-span-2">
            {/* Espaço para futuros widgets */}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl mb-4">Atividades Recentes</h2>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {recentActivity.map((activity, index) => (
                <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">{activity.type}</div>
                      <div className="mb-1">{activity.description}</div>
                      <div className="text-sm text-gray-500">{activity.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-600">{activity.value}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
