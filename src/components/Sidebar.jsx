import { 
  LayoutDashboard, 
  FileText, 
  Book, 
  CreditCard, 
  ArrowDownCircle, 
  ArrowUpCircle,
  Package,
  FileCheck,
  Users,
  Briefcase,
  DollarSign,
  FileSignature,
  UserPlus,
  ClipboardList,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Settings
} from 'lucide-react';
import { Button } from './ui/button';

export function Sidebar({ activeModule, onNavigate, isOpen, onToggle }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { 
      label: 'Controles',
      items: [
        { id: 'faturamento', label: 'Faturamento', icon: FileText },
        { id: 'livro-caixa', label: 'Livro Caixa', icon: Book },
        { id: 'pagamentos', label: 'Pagamentos', icon: CreditCard },
        { id: 'recebimentos', label: 'Recebimentos', icon: ArrowDownCircle },
        { id: 'estoque', label: 'Estoque', icon: Package },
        { id: 'licitacao', label: 'Licitação', icon: FileCheck },
        { id: 'pessoal', label: 'Pessoal', icon: Users },
        { id: 'bens', label: 'Bens', icon: Briefcase },
        { id: 'precos', label: 'Preços', icon: DollarSign },
        { id: 'contratos', label: 'Contratos', icon: FileSignature },
      ]
    },
    {
      label: 'Cadastros',
      items: [
        { id: 'cadastro-geral', label: 'Cadastro Geral', icon: UserPlus },
        { id: 'cadastro-trabalhista', label: 'Cadastro Trabalhista', icon: Users },
        { id: 'cadastro-fiscal', label: 'Cadastro Fiscal', icon: FileText },
        { id: 'cadastro-administrativo', label: 'Cadastro Admin.', icon: Settings },
      ]
    },
    {
      label: 'Lançamentos',
      items: [
        { id: 'lancamentos-fiscal', label: 'Fiscal', icon: ClipboardList },
        { id: 'lancamentos-trabalhista', label: 'Trabalhista', icon: Users },
      ]
    },
    { id: 'relatorios', label: 'Relatórios', icon: BarChart3 },
  ];

  return (
    <aside className={`fixed left-0 top-0 h-full bg-blue-900 text-white transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'} z-50`}>
      <div className="flex items-center justify-between p-4 border-b border-blue-800">
        {isOpen && <h1 className="text-xl">Brig</h1>}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="text-white hover:bg-blue-800"
        >
          {isOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </Button>
      </div>

      <nav className="p-2 overflow-y-auto h-[calc(100vh-80px)]">
        {menuItems.map((item, index) => {
          if ('items' in item) {
            return (
              <div key={index} className="mb-4">
                {isOpen && (
                  <div className="px-3 py-2 text-xs text-blue-300 uppercase tracking-wider">
                    {item.label}
                  </div>
                )}
                {item.items.map((subItem) => {
                  const Icon = subItem.icon;
                  return (
                    <button
                      key={subItem.id}
                      onClick={() => onNavigate(subItem.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                        activeModule === subItem.id
                          ? 'bg-blue-700 text-white'
                          : 'text-blue-100 hover:bg-blue-800'
                      }`}
                      title={!isOpen ? subItem.label : undefined}
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      {isOpen && <span className="text-sm truncate">{subItem.label}</span>}
                    </button>
                  );
                })}
              </div>
            );
          } else {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors ${
                  activeModule === item.id
                    ? 'bg-blue-700 text-white'
                    : 'text-blue-100 hover:bg-blue-800'
                }`}
                title={!isOpen ? item.label : undefined}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {isOpen && <span className="text-sm">{item.label}</span>}
              </button>
            );
          }
        })}
      </nav>
    </aside>
  );
}
