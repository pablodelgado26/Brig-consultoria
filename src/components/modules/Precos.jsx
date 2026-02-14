import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Plus, Search, TrendingUp, TrendingDown } from 'lucide-react';
import { Badge } from '../ui/badge';

export function Precos() {
  const [produtos] = useState([
    { id: '1', codigo: 'P001', nome: 'Produto A', custo: 25.00, margemLucro: 60, precoVenda: 40.00, variacao: 5 },
    { id: '2', codigo: 'P002', nome: 'Produto B', custo: 18.50, margemLucro: 45, precoVenda: 26.83, variacao: -3 },
    { id: '3', codigo: 'P003', nome: 'Produto C', custo: 12.00, margemLucro: 70, precoVenda: 20.40, variacao: 8 },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const filteredProdutos = produtos.filter(prod =>
    prod.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prod.codigo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl mb-2">Controle de Preços</h1>
          <p className="text-gray-600">Gestão de custos, margens e preços de venda</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Atualizar Preços
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar produtos..."
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
                  <th className="text-left p-4">Código</th>
                  <th className="text-left p-4">Produto</th>
                  <th className="text-right p-4">Custo</th>
                  <th className="text-right p-4">Margem (%)</th>
                  <th className="text-right p-4">Preço Venda</th>
                  <th className="text-center p-4">Variação</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredProdutos.map((prod) => (
                  <tr key={prod.id} className="hover:bg-gray-50">
                    <td className="p-4">
                      <Badge variant="outline">{prod.codigo}</Badge>
                    </td>
                    <td className="p-4">{prod.nome}</td>
                    <td className="text-right p-4">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(prod.custo)}
                    </td>
                    <td className="text-right p-4 text-blue-600">{prod.margemLucro}%</td>
                    <td className="text-right p-4 text-green-600">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(prod.precoVenda)}
                    </td>
                    <td className="text-center p-4">
                      <div className={`flex items-center justify-center gap-1 ${prod.variacao >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {prod.variacao >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                        {Math.abs(prod.variacao)}%
                      </div>
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
