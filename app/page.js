'use client'

import { useState } from 'react';
import { Dashboard } from '../src/components/Dashboard';
import { Sidebar } from '../src/components/Sidebar';
import { Faturamento } from '../src/components/modules/Faturamento';
import { LivroCaixa } from '../src/components/modules/LivroCaixa';
import { Pagamentos } from '../src/components/modules/Pagamentos';
import { Recebimentos } from '../src/components/modules/Recebimentos';
import { Estoque } from '../src/components/modules/Estoque';
import { Licitacao } from '../src/components/modules/Licitacao';
import { Pessoal } from '../src/components/modules/Pessoal';
import { Bens } from '../src/components/modules/Bens';
import { Precos } from '../src/components/modules/Precos';
import { Contratos } from '../src/components/modules/Contratos';
import { CadastroGeral } from '../src/components/cadastros/CadastroGeral';
import { CadastroTrabalhista } from '../src/components/cadastros/CadastroTrabalhista';
import { CadastroFiscal } from '../src/components/cadastros/CadastroFiscal';
import { CadastroAdministrativo } from '../src/components/cadastros/CadastroAdministrativo';
import { LancamentosFiscal } from '../src/components/lancamentos/LancamentosFiscal';
import { LancamentosTrabalhista } from '../src/components/lancamentos/LancamentosTrabalhista';
import { Relatorios } from '../src/components/Relatorios';

export default function Home() {
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
