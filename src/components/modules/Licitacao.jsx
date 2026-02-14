import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Plus, Search, FileCheck, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Badge } from '../ui/badge';

export function Licitacao() {
  const [documentos] = useState([
    { id: '1', tipo: 'CND Federal', numero: 'CND-2024-001', emissao: '2025-10-15', validade: '2026-04-15', status: 'Válido' },
    { id: '2', tipo: 'CND Estadual', numero: 'CND-EST-2024-002', emissao: '2025-09-20', validade: '2026-03-20', status: 'Válido' },
    { id: '3', tipo: 'CND Municipal', numero: 'CND-MUN-2024-003', emissao: '2025-08-10', validade: '2025-11-25', status: 'Vencendo' },
    { id: '4', tipo: 'Procuração', numero: 'PROC-2024-001', emissao: '2025-01-15', validade: '2025-07-15', status: 'Vencido' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredDocumentos = documentos.filter(doc =>
    doc.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.numero.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const validosCount = documentos.filter(d => d.status === 'Válido').length;
  const vencendoCount = documentos.filter(d => d.status === 'Vencendo').length;
  const vencidosCount = documentos.filter(d => d.status === 'Vencido').length;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Válido':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100"><CheckCircle2 className="h-3 w-3 mr-1" />Válido</Badge>;
      case 'Vencendo':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"><AlertCircle className="h-3 w-3 mr-1" />Vencendo</Badge>;
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
          <h1 className="text-3xl mb-2">Controle de Licitação</h1>
          <p className="text-gray-600">Gerencie CND, Procurações e outros documentos</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Adicionar Documento
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-600 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              Documentos Válidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-green-600">{validosCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-600 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              Vencendo em Breve
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-yellow-600">{vencendoCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-600 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-600" />
              Documentos Vencidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-red-600">{vencidosCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar documentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Documentos Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4">Tipo de Documento</th>
                  <th className="text-left p-4">Número</th>
                  <th className="text-left p-4">Data de Emissão</th>
                  <th className="text-left p-4">Validade</th>
                  <th className="text-center p-4">Status</th>
                  <th className="text-center p-4">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredDocumentos.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50">
                    <td className="p-4 flex items-center gap-2">
                      <FileCheck className="h-4 w-4 text-blue-600" />
                      {doc.tipo}
                    </td>
                    <td className="p-4">
                      <Badge variant="outline">{doc.numero}</Badge>
                    </td>
                    <td className="p-4">
                      {new Date(doc.emissao).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="p-4">
                      {new Date(doc.validade).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="text-center p-4">
                      {getStatusBadge(doc.status)}
                    </td>
                    <td className="text-center p-4">
                      <div className="flex gap-2 justify-center">
                        <Button variant="outline" size="sm">Ver</Button>
                        <Button variant="outline" size="sm">Renovar</Button>
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
