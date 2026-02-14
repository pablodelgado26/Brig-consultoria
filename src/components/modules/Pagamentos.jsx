import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Plus, Search, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { Badge } from '../ui/badge';

export function Pagamentos() {
  const [pagamentos] = useState([
    { id: '1', descricao: 'Aluguel do estabelecimento', fornecedor: 'Imobiliária ABC', vencimento: '2025-11-20', valor: 1500, status: 'Pendente', categoria: 'Fixo' },
    { id: '2', descricao: 'Energia elétrica', fornecedor: 'Companhia de Energia', vencimento: '2025-11-18', valor: 350, status: 'Pendente', categoria: 'Fixo' },
    { id: '3', descricao: 'Fornecedor de materiais', fornecedor: 'Distribuidora XYZ', vencimento: '2025-11-16', valor: 2800, status: 'Pendente', categoria: 'Variável' },
    { id: '4', descricao: 'DAS MEI', fornecedor: 'Receita Federal', vencimento: '2025-11-20', valor: 67, status: 'Pendente', categoria: 'Imposto' },
    { id: '5', descricao: 'Internet', fornecedor: 'Provedor Internet', vencimento: '2025-10-15', valor: 120, status: 'Pago', categoria: 'Fixo' },
    { id: '6', descricao: 'Fornecedor antigo', fornecedor: 'Fornecedor 123', vencimento: '2025-11-01', valor: 850, status: 'Vencido', categoria: 'Variável' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredPagamentos = pagamentos.filter(pag =>
    pag.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pag.fornecedor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPendente = pagamentos.filter(p => p.status === 'Pendente').reduce((sum, p) => sum + p.valor, 0);
  const totalVencido = pagamentos.filter(p => p.status === 'Vencido').reduce((sum, p) => sum + p.valor, 0);
  const totalPago = pagamentos.filter(p => p.status === 'Pago').reduce((sum, p) => sum + p.valor, 0);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pago':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100"><CheckCircle2 className="h-3 w-3 mr-1" />Pago</Badge>;
      case 'Pendente':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"><Clock className="h-3 w-3 mr-1" />Pendente</Badge>;
      case 'Vencido':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100"><AlertCircle className="h-3 w-3 mr-1" />Vencido</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl mb-2">Controle de Pagamentos</h1>
          <p className="text-gray-600">Gerencie contas a pagar e despesas</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Pagamento
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-600">Total Pendente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-yellow-600">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPendente)}
            </div>
            <p className="text-sm text-gray-600 mt-1">{pagamentos.filter(p => p.status === 'Pendente').length} pagamentos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-600">Total Vencido</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-red-600">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalVencido)}
            </div>
            <p className="text-sm text-gray-600 mt-1">{pagamentos.filter(p => p.status === 'Vencido').length} pagamentos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-600">Total Pago</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-green-600">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPago)}
            </div>
            <p className="text-sm text-gray-600 mt-1">{pagamentos.filter(p => p.status === 'Pago').length} pagamentos</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar pagamentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Pagamentos Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4">Descrição</th>
                  <th className="text-left p-4">Fornecedor</th>
                  <th className="text-left p-4">Vencimento</th>
                  <th className="text-left p-4">Categoria</th>
                  <th className="text-right p-4">Valor</th>
                  <th className="text-center p-4">Status</th>
                  <th className="text-center p-4">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredPagamentos.map((pag) => {
                  const hoje = new Date();
                  const vencimento = new Date(pag.vencimento);
                  const diasAteVencimento = Math.ceil((vencimento.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));
                  
                  return (
                    <tr key={pag.id} className="hover:bg-gray-50">
                      <td className="p-4">{pag.descricao}</td>
                      <td className="p-4">{pag.fornecedor}</td>
                      <td className="p-4">
                        <div>
                          <div>{new Date(pag.vencimento).toLocaleDateString('pt-BR')}</div>
                          {pag.status === 'Pendente' && diasAteVencimento <= 7 && diasAteVencimento > 0 && (
                            <div className="text-xs text-orange-600">Vence em {diasAteVencimento} dias</div>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline">{pag.categoria}</Badge>
                      </td>
                      <td className="text-right p-4">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(pag.valor)}
                      </td>
                      <td className="text-center p-4">
                        {getStatusBadge(pag.status)}
                      </td>
                      <td className="text-center p-4">
                        {pag.status === 'Pendente' && (
                          <Button variant="outline" size="sm">
                            Pagar
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
