import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Plus, ArrowDownCircle, ArrowUpCircle, Truck } from 'lucide-react';
import { Badge } from '../ui/badge';

export function LancamentosFiscal() {
  const [notasEntrada] = useState([
    { id: '1', numero: 'NF-5678', fornecedor: 'Distribuidora XYZ', data: '2025-11-10', valor: 2800, status: 'Escriturada' },
    { id: '2', numero: 'NF-5679', fornecedor: 'Fornecedor ABC', data: '2025-11-08', valor: 1500, status: 'Escriturada' },
  ]);

  const [notasSaida] = useState([
    { id: '1', numero: 'NF-1234', cliente: 'Cliente ABC Ltda', data: '2025-11-14', valor: 3500, status: 'Emitida' },
    { id: '2', numero: 'NF-1235', cliente: 'Empresa XYZ', data: '2025-11-13', valor: 2300, status: 'Emitida' },
  ]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl mb-2">Lançamentos Fiscais</h1>
        <p className="text-gray-600">Notas de entrada, saída e conhecimentos de transporte</p>
      </div>

      <Tabs defaultValue="entrada" className="space-y-6">
        <TabsList>
          <TabsTrigger value="entrada" className="gap-2">
            <ArrowDownCircle className="h-4 w-4" />
            Notas de Entrada
          </TabsTrigger>
          <TabsTrigger value="saida" className="gap-2">
            <ArrowUpCircle className="h-4 w-4" />
            Notas de Saída
          </TabsTrigger>
          <TabsTrigger value="transporte" className="gap-2">
            <Truck className="h-4 w-4" />
            Conhecimento Transporte
          </TabsTrigger>
        </TabsList>

        <TabsContent value="entrada">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Notas Fiscais de Entrada</CardTitle>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Lançar NF Entrada
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left p-4">Número NF</th>
                      <th className="text-left p-4">Fornecedor</th>
                      <th className="text-left p-4">Data</th>
                      <th className="text-right p-4">Valor</th>
                      <th className="text-center p-4">Status</th>
                      <th className="text-center p-4">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {notasEntrada.map((nota) => (
                      <tr key={nota.id} className="hover:bg-gray-50">
                        <td className="p-4">
                          <Badge variant="outline">{nota.numero}</Badge>
                        </td>
                        <td className="p-4">{nota.fornecedor}</td>
                        <td className="p-4">{new Date(nota.data).toLocaleDateString('pt-BR')}</td>
                        <td className="text-right p-4 text-green-600">
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(nota.valor)}
                        </td>
                        <td className="text-center p-4">
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{nota.status}</Badge>
                        </td>
                        <td className="text-center p-4">
                          <Button variant="outline" size="sm">Ver Detalhes</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="saida">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Notas Fiscais de Saída</CardTitle>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Emitir NF Saída
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left p-4">Número NF</th>
                      <th className="text-left p-4">Cliente</th>
                      <th className="text-left p-4">Data</th>
                      <th className="text-right p-4">Valor</th>
                      <th className="text-center p-4">Status</th>
                      <th className="text-center p-4">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {notasSaida.map((nota) => (
                      <tr key={nota.id} className="hover:bg-gray-50">
                        <td className="p-4">
                          <Badge variant="outline">{nota.numero}</Badge>
                        </td>
                        <td className="p-4">{nota.cliente}</td>
                        <td className="p-4">{new Date(nota.data).toLocaleDateString('pt-BR')}</td>
                        <td className="text-right p-4 text-green-600">
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(nota.valor)}
                        </td>
                        <td className="text-center p-4">
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{nota.status}</Badge>
                        </td>
                        <td className="text-center p-4">
                          <Button variant="outline" size="sm">Ver Detalhes</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transporte">
          <Card>
            <CardHeader>
              <CardTitle>Conhecimento de Transporte</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <Truck className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                <p>Nenhum conhecimento de transporte registrado</p>
                <Button className="mt-4 gap-2">
                  <Plus className="h-4 w-4" />
                  Adicionar CT-e
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
