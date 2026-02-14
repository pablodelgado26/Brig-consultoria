import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { Sidebar } from './components/Sidebar';
import { Faturamento } from './components/modules/Faturamento';
import { LivroCaixa } from './components/modules/LivroCaixa';
import { Pagamentos } from './components/modules/Pagamentos';
import { Recebimentos } from './components/modules/Recebimentos';
import { Estoque } from './components/modules/Estoque';
import { Licitacao } from './components/modules/Licitacao';
import { Pessoal } from './components/modules/Pessoal';
import { Bens } from './components/modules/Bens';
import { Precos } from './components/modules/Precos';
import { Contratos } from './components/modules/Contratos';
import { CadastroGeral } from './components/cadastros/CadastroGeral';
import { CadastroTrabalhista } from './components/cadastros/CadastroTrabalhista';
import { CadastroFiscal } from './components/cadastros/CadastroFiscal';
import { CadastroAdministrativo } from './components/cadastros/CadastroAdministrativo';
import { LancamentosFiscal } from './components/lancamentos/LancamentosFiscal';
import { LancamentosTrabalhista } from './components/lancamentos/LancamentosTrabalhista';
import { Relatorios } from './components/Relatorios';

export default function App() {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard onNavigate={setActiveModule} />;
      case 'faturamento':
        return <Faturamento />;
      case 'livro-caixa':
        return <LivroCaixa />;
      case 'pagamentos':
        return <Pagamentos />;
      case 'recebimentos':
        return <Recebimentos />;
      case 'estoque':
        return <Estoque />;
      case 'licitacao':
        return <Licitacao />;
      case 'pessoal':
        return <Pessoal />;
      case 'bens':
        return <Bens />;
      case 'precos':
        return <Precos />;
      case 'contratos':
        return <Contratos />;
      case 'cadastro-geral':
        return <CadastroGeral />;
      case 'cadastro-trabalhista':
        return <CadastroTrabalhista />;
      case 'cadastro-fiscal':
        return <CadastroFiscal />;
      case 'cadastro-administrativo':
        return <CadastroAdministrativo />;
      case 'lancamentos-fiscal':
        return <LancamentosFiscal />;
      case 'lancamentos-trabalhista':
        return <LancamentosTrabalhista />;
      case 'relatorios':
        return <Relatorios />;
      default:
        return <Dashboard onNavigate={setActiveModule} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        activeModule={activeModule}
        onNavigate={setActiveModule}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <main className={`flex-1 overflow-auto transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        {renderModule()}
      </main>
    </div>
  );
}
