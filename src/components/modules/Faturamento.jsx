import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Plus, Search, FileText, Download } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export function Faturamento() {
  const [faturamentos, setFaturamentos] = useState([
    { id: '1', mes: 'Outubro', ano: '2025', receitaBruta: 28500, despesas: 5200, receitaLiquida: 23300, status: 'Declarado' },
    { id: '2', mes: 'Setembro', ano: '2025', receitaBruta: 25480, despesas: 4800, receitaLiquida: 20680, status: 'Declarado' },
    { id: '3', mes: 'Agosto', ano: '2025', receitaBruta: 22100, despesas: 4500, receitaLiquida: 17600, status: 'Declarado' },
    { id: '4', mes: 'Julho', ano: '2025', receitaBruta: 26800, despesas: 5100, receitaLiquida: 21700, status: 'Declarado' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredFaturamentos = faturamentos.filter(fat =>
    fat.mes.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fat.ano.includes(searchTerm)
  );

  const totalReceitaBruta = faturamentos.reduce((sum, fat) => sum + fat.receitaBruta, 0);
  const totalDespesas = faturamentos.reduce((sum, fat) => sum + fat.despesas, 0);
  const totalReceitaLiquida = faturamentos.reduce((sum, fat) => sum + fat.receitaLiquida, 0);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl mb-2">Controle de Faturamento</h1>
          <p className="text-gray-600">Gerencie as declarações mensais de faturamento</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nova Declaração
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Nova Declaração de Faturamento</DialogTitle>
            </DialogHeader>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mes">Mês</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o mês" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="janeiro">Janeiro</SelectItem>
                      <SelectItem value="fevereiro">Fevereiro</SelectItem>
                      <SelectItem value="marco">Março</SelectItem>
                      <SelectItem value="abril">Abril</SelectItem>
                      <SelectItem value="maio">Maio</SelectItem>
                      <SelectItem value="junho">Junho</SelectItem>
                      <SelectItem value="julho">Julho</SelectItem>
                      <SelectItem value="agosto">Agosto</SelectItem>
                      <SelectItem value="setembro">Setembro</SelectItem>
                      <SelectItem value="outubro">Outubro</SelectItem>
                      <SelectItem value="novembro">Novembro</SelectItem>
                      <SelectItem value="dezembro">Dezembro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ano">Ano</Label>
                  <Input id="ano" type="number" defaultValue="2025" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="receita-bruta">Receita Bruta (R$)</Label>
                <Input id="receita-bruta" type="number" step="0.01" placeholder="0,00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="despesas">Despesas (R$)</Label>
                <Input id="despesas" type="number" step="0.01" placeholder="0,00" />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">Salvar</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-600">Receita Bruta Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-green-600">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalReceitaBruta)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-600">Despesas Totais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-red-600">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalDespesas)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-600">Receita Líquida Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-blue-600">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalReceitaLiquida)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por mês ou ano..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Exportar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Faturamentos Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4">Período</th>
                  <th className="text-right p-4">Receita Bruta</th>
                  <th className="text-right p-4">Despesas</th>
                  <th className="text-right p-4">Receita Líquida</th>
                  <th className="text-center p-4">Status</th>
                  <th className="text-center p-4">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredFaturamentos.map((fat) => (
                  <tr key={fat.id} className="hover:bg-gray-50">
                    <td className="p-4">
                      <div>
                        <div>{fat.mes}</div>
                        <div className="text-sm text-gray-600">{fat.ano}</div>
                      </div>
                    </td>
                    <td className="text-right p-4 text-green-600">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(fat.receitaBruta)}
                    </td>
                    <td className="text-right p-4 text-red-600">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(fat.despesas)}
                    </td>
                    <td className="text-right p-4 text-blue-600">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(fat.receitaLiquida)}
                    </td>
                    <td className="text-center p-4">
                      <span className={`inline-flex px-2 py-1 rounded text-xs ${
                        fat.status === 'Declarado' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {fat.status}
                      </span>
                    </td>
                    <td className="text-center p-4">
                      <Button variant="ghost" size="sm" className="gap-2">
                        <FileText className="h-4 w-4" />
                        Ver Detalhes
                      </Button>
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
