import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Plus, Search } from 'lucide-react';
import { Badge } from '../ui/badge';

export function Bens() {
  const [bens] = useState([
    { id: '1', descricao: 'Computador Dell', categoria: 'Equipamento', dataAquisicao: '2024-01-15', valor: 3500, depreciacaoAnual: 20 },
    { id: '2', descricao: 'Mesa de escritório', categoria: 'Móvel', dataAquisicao: '2024-02-20', valor: 800, depreciacaoAnual: 10 },
    { id: '3', descricao: 'Impressora HP', categoria: 'Equipamento', dataAquisicao: '2024-03-10', valor: 1200, depreciacaoAnual: 20 },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const filteredBens = bens.filter(bem =>
    bem.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalBens = bens.reduce((sum, bem) => sum + bem.valor, 0);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl mb-2">Controle de Bens</h1>
          <p className="text-gray-600">Patrimônio e ativos da empresa</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Adicionar Bem
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <p className="text-sm text-gray-600 mb-1">Valor Total do Patrimônio</p>
          <p className="text-2xl text-green-600">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalBens)}
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar bens..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4">Descrição</th>
                  <th className="text-left p-4">Categoria</th>
                  <th className="text-left p-4">Data Aquisição</th>
                  <th className="text-right p-4">Valor</th>
                  <th className="text-right p-4">Depreciação/Ano</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredBens.map((bem) => (
                  <tr key={bem.id} className="hover:bg-gray-50">
                    <td className="p-4">{bem.descricao}</td>
                    <td className="p-4">
                      <Badge variant="outline">{bem.categoria}</Badge>
                    </td>
                    <td className="p-4">{new Date(bem.dataAquisicao).toLocaleDateString('pt-BR')}</td>
                    <td className="text-right p-4 text-green-600">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(bem.valor)}
                    </td>
                    <td className="text-right p-4">{bem.depreciacaoAnual}%</td>
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
