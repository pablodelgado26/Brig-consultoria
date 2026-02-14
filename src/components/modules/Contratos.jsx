import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Plus, Search, FileSignature } from 'lucide-react';
import { Badge } from '../ui/badge';

export function Contratos() {
  const [contratos] = useState([
    { id: '1', tipo: 'Fornecedor', parte: 'Distribuidora XYZ', objeto: 'Fornecimento de materiais', inicio: '2024-01-15', termino: '2025-01-15', valor: 50000, status: 'Ativo' },
    { id: '2', tipo: 'Funcionário', parte: 'João da Silva', objeto: 'Contrato de trabalho', inicio: '2024-01-15', termino: '2025-01-15', valor: 18000, status: 'Ativo' },
    { id: '3', tipo: 'Prestador', parte: 'Contador ABC', objeto: 'Serviços contábeis', inicio: '2024-06-01', termino: '2025-06-01', valor: 3600, status: 'Ativo' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const filteredContratos = contratos.filter(cont =>
    cont.parte.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cont.objeto.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl mb-2">Controle de Contratos</h1>
          <p className="text-gray-600">Fornecedores, funcionários e prestadores</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Contrato
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar contratos..."
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
                  <th className="text-left p-4">Tipo</th>
                  <th className="text-left p-4">Parte</th>
                  <th className="text-left p-4">Objeto</th>
                  <th className="text-left p-4">Início</th>
                  <th className="text-left p-4">Término</th>
                  <th className="text-right p-4">Valor</th>
                  <th className="text-center p-4">Status</th>
                  <th className="text-center p-4">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredContratos.map((cont) => (
                  <tr key={cont.id} className="hover:bg-gray-50">
                    <td className="p-4">
                      <Badge variant="outline">{cont.tipo}</Badge>
                    </td>
                    <td className="p-4">{cont.parte}</td>
                    <td className="p-4">{cont.objeto}</td>
                    <td className="p-4">{new Date(cont.inicio).toLocaleDateString('pt-BR')}</td>
                    <td className="p-4">{new Date(cont.termino).toLocaleDateString('pt-BR')}</td>
                    <td className="text-right p-4 text-green-600">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cont.valor)}
                    </td>
                    <td className="text-center p-4">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{cont.status}</Badge>
                    </td>
                    <td className="text-center p-4">
                      <Button variant="ghost" size="sm" className="gap-2">
                        <FileSignature className="h-4 w-4" />
                        Ver
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
