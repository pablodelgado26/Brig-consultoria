import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Plus, Search, CheckCircle2, Clock } from 'lucide-react';
import { Badge } from '../ui/badge';

export function Recebimentos() {
  const [recebimentos] = useState([
    { id: '1', descricao: 'Venda de produtos', cliente: 'Cliente ABC Ltda', vencimento: '2025-11-20', valor: 3500, status: 'Pendente', notaFiscal: 'NF-1234' },
    { id: '2', descricao: 'Prestação de serviços', cliente: 'Empresa XYZ', vencimento: '2025-11-18', valor: 2800, status: 'Pendente', notaFiscal: 'NF-1235' },
    { id: '3', descricao: 'Venda de produtos', cliente: 'Comércio 123', vencimento: '2025-11-16', valor: 1500, status: 'Pendente', notaFiscal: 'NF-1236' },
    { id: '4', descricao: 'Prestação de serviços', cliente: 'Cliente DEF', vencimento: '2025-11-15', valor: 4200, status: 'Recebido', notaFiscal: 'NF-1230' },
    { id: '5', descricao: 'Venda de produtos', cliente: 'Loja Popular', vencimento: '2025-11-10', valor: 2100, status: 'Recebido', notaFiscal: 'NF-1228' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredRecebimentos = recebimentos.filter(rec =>
    rec.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rec.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (rec.notaFiscal && rec.notaFiscal.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalPendente = recebimentos.filter(r => r.status === 'Pendente').reduce((sum, r) => sum + r.valor, 0);
  const totalRecebido = recebimentos.filter(r => r.status === 'Recebido').reduce((sum, r) => sum + r.valor, 0);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Recebido':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100"><CheckCircle2 className="h-3 w-3 mr-1" />Recebido</Badge>;
      case 'Pendente':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"><Clock className="h-3 w-3 mr-1" />Pendente</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl mb-2">Controle de Recebimentos</h1>
          <p className="text-gray-600">Gerencie contas a receber</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Recebimento
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-600">Total a Receber</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-yellow-600">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPendente)}
            </div>
            <p className="text-sm text-gray-600 mt-1">{recebimentos.filter(r => r.status === 'Pendente').length} pendentes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-600">Total Recebido</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-green-600">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalRecebido)}
            </div>
            <p className="text-sm text-gray-600 mt-1">{recebimentos.filter(r => r.status === 'Recebido').length} recebidos</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar recebimentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Recebimentos Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4">Descrição</th>
                  <th className="text-left p-4">Cliente</th>
                  <th className="text-left p-4">Nota Fiscal</th>
                  <th className="text-left p-4">Vencimento</th>
                  <th className="text-right p-4">Valor</th>
                  <th className="text-center p-4">Status</th>
                  <th className="text-center p-4">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredRecebimentos.map((rec) => (
                  <tr key={rec.id} className="hover:bg-gray-50">
                    <td className="p-4">{rec.descricao}</td>
                    <td className="p-4">{rec.cliente}</td>
                    <td className="p-4">
                      {rec.notaFiscal && (
                        <Badge variant="outline">{rec.notaFiscal}</Badge>
                      )}
                    </td>
                    <td className="p-4">
                      {new Date(rec.vencimento).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="text-right p-4 text-green-600">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(rec.valor)}
                    </td>
                    <td className="text-center p-4">
                      {getStatusBadge(rec.status)}
                    </td>
                    <td className="text-center p-4">
                      {rec.status === 'Pendente' && (
                        <Button variant="outline" size="sm">
                          Confirmar Recebimento
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
