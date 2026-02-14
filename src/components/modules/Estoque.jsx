import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Plus, Search, Package, AlertTriangle } from 'lucide-react';
import { Badge } from '../ui/badge';

export function Estoque() {
  const [produtos] = useState([
    { id: '1', codigo: 'P001', nome: 'Produto A', categoria: 'Revenda', quantidade: 150, estoqueMinimo: 50, unidade: 'UN', valorUnitario: 25.00, valorTotal: 3750 },
    { id: '2', codigo: 'P002', nome: 'Produto B', categoria: 'Revenda', quantidade: 35, estoqueMinimo: 40, unidade: 'UN', valorUnitario: 18.50, valorTotal: 647.50 },
    { id: '3', codigo: 'P003', nome: 'Produto C', categoria: 'Insumo', quantidade: 200, estoqueMinimo: 100, unidade: 'KG', valorUnitario: 12.00, valorTotal: 2400 },
    { id: '4', codigo: 'P004', nome: 'Produto D', categoria: 'Revenda', quantidade: 8, estoqueMinimo: 20, unidade: 'UN', valorUnitario: 45.00, valorTotal: 360 },
    { id: '5', codigo: 'P005', nome: 'Produto E', categoria: 'Insumo', quantidade: 85, estoqueMinimo: 30, unidade: 'LT', valorUnitario: 8.75, valorTotal: 743.75 },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredProdutos = produtos.filter(prod =>
    prod.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prod.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prod.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItens = produtos.reduce((sum, p) => sum + p.quantidade, 0);
  const totalValor = produtos.reduce((sum, p) => sum + p.valorTotal, 0);
  const produtosBaixos = produtos.filter(p => p.quantidade < p.estoqueMinimo).length;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl mb-2">Controle de Estoque</h1>
          <p className="text-gray-600">Gerencie produtos para revenda</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Package className="h-4 w-4" />
            Entrada de Mercadorias
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Produto
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-600">Total de Itens</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-blue-600">{totalItens}</div>
            <p className="text-sm text-gray-600 mt-1">{produtos.length} produtos cadastrados</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-600">Valor Total do Estoque</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-green-600">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalValor)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-600 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              Estoque Baixo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-red-600">{produtosBaixos}</div>
            <p className="text-sm text-gray-600 mt-1">produtos abaixo do mínimo</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
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

      {/* Produtos Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4">Código</th>
                  <th className="text-left p-4">Nome</th>
                  <th className="text-left p-4">Categoria</th>
                  <th className="text-center p-4">Quantidade</th>
                  <th className="text-center p-4">Est. Mínimo</th>
                  <th className="text-center p-4">Unidade</th>
                  <th className="text-right p-4">Valor Unit.</th>
                  <th className="text-right p-4">Valor Total</th>
                  <th className="text-center p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredProdutos.map((prod) => {
                  const estoqueBaixo = prod.quantidade < prod.estoqueMinimo;
                  const percentual = (prod.quantidade / prod.estoqueMinimo) * 100;
                  
                  return (
                    <tr key={prod.id} className="hover:bg-gray-50">
                      <td className="p-4">
                        <Badge variant="outline">{prod.codigo}</Badge>
                      </td>
                      <td className="p-4">{prod.nome}</td>
                      <td className="p-4">{prod.categoria}</td>
                      <td className="text-center p-4">
                        <span className={estoqueBaixo ? 'text-red-600' : ''}>
                          {prod.quantidade}
                        </span>
                      </td>
                      <td className="text-center p-4 text-gray-600">{prod.estoqueMinimo}</td>
                      <td className="text-center p-4">{prod.unidade}</td>
                      <td className="text-right p-4">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(prod.valorUnitario)}
                      </td>
                      <td className="text-right p-4 text-green-600">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(prod.valorTotal)}
                      </td>
                      <td className="text-center p-4">
                        {estoqueBaixo ? (
                          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Baixo
                          </Badge>
                        ) : percentual < 150 ? (
                          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                            Normal
                          </Badge>
                        ) : (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            Bom
                          </Badge>
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
