import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { 
  FileText, 
  Book, 
  CreditCard, 
  ArrowDownCircle, 
  Package,
  TrendingUp,
  TrendingDown,
  DollarSign
} from 'lucide-react';

export function Dashboard({ onNavigate }) {
  const stats = [
    { 
      title: 'Faturamento Mensal', 
      value: 'R$ 25.480,00', 
      icon: DollarSign, 
      change: '+12.5%',
      trend: 'up',
      onClick: () => onNavigate('faturamento')
    },
    { 
      title: 'Contas a Receber', 
      value: 'R$ 8.500,00', 
      icon: ArrowDownCircle, 
      change: '5 pendentes',
      trend: 'neutral',
      onClick: () => onNavigate('recebimentos')
    },
    { 
      title: 'Contas a Pagar', 
      value: 'R$ 3.200,00', 
      icon: CreditCard, 
      change: '3 vencendo',
      trend: 'down',
      onClick: () => onNavigate('pagamentos')
    },
    { 
      title: 'Produtos em Estoque', 
      value: '248', 
      icon: Package, 
      change: '12 itens baixos',
      trend: 'neutral',
      onClick: () => onNavigate('estoque')
    },
  ];

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

  const recentActivity = [
    { type: 'Recebimento', description: 'Cliente ABC Ltda - NF 1234', value: 'R$ 1.500,00', date: '15/11/2025' },
    { type: 'Pagamento', description: 'Fornecedor XYZ - Fatura 567', value: 'R$ 850,00', date: '14/11/2025' },
    { type: 'Nota Fiscal', description: 'NF-e 8901 emitida', value: 'R$ 2.300,00', date: '14/11/2025' },
    { type: 'Estoque', description: 'Entrada de mercadoria - NF 4567', value: '45 itens', date: '13/11/2025' },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Dashboard</h1>
        <p className="text-gray-600">Visão geral do seu negócio MEI</p>
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
