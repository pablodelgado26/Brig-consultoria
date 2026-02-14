import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Package, Ruler, ArrowRightLeft, FileText, Plus } from 'lucide-react';

export function CadastroFiscal() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl mb-2">Cadastro Fiscal</h1>
        <p className="text-gray-600">Produtos, unidades de medida e configurações fiscais</p>
      </div>

      <Tabs defaultValue="produtos" className="space-y-6">
        <TabsList>
          <TabsTrigger value="produtos" className="gap-2">
            <Package className="h-4 w-4" />
            Produtos
          </TabsTrigger>
          <TabsTrigger value="unidades" className="gap-2">
            <Ruler className="h-4 w-4" />
            Unid. Medida
          </TabsTrigger>
          <TabsTrigger value="natureza" className="gap-2">
            <ArrowRightLeft className="h-4 w-4" />
            Natureza Operação
          </TabsTrigger>
          <TabsTrigger value="faturamento" className="gap-2">
            <FileText className="h-4 w-4" />
            Base Faturamento
          </TabsTrigger>
        </TabsList>

        <TabsContent value="produtos">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Produtos/Serviços</CardTitle>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Novo Produto
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { codigo: 'P001', nome: 'Produto A', ncm: '1234.56.78' },
                  { codigo: 'P002', nome: 'Produto B', ncm: '8765.43.21' },
                  { codigo: 'S001', nome: 'Serviço de Consultoria', ncm: 'N/A' },
                ].map((item, i) => (
                  <div key={i} className="p-3 border rounded-lg flex justify-between items-center hover:bg-gray-50">
                    <div>
                      <p><strong>{item.codigo}</strong> - {item.nome}</p>
                      <p className="text-sm text-gray-600">NCM: {item.ncm}</p>
                    </div>
                    <Button variant="outline" size="sm">Editar</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unidades">
          <Card>
            <CardHeader>
              <CardTitle>Unidades de Medida</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {['UN - Unidade', 'KG - Quilograma', 'LT - Litro', 'MT - Metro', 'CX - Caixa', 'PC - Peça'].map((unidade) => (
                  <div key={unidade} className="p-3 border rounded-lg text-center">
                    {unidade}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="natureza">
          <Card>
            <CardHeader>
              <CardTitle>Natureza de Operação (Entrada X Saída)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="mb-2">Saída</h3>
                  <div className="space-y-2">
                    {['5.101 - Venda de mercadoria', '5.102 - Venda fora do estabelecimento', '5.949 - Outra saída'].map((nat) => (
                      <div key={nat} className="p-2 border rounded">
                        {nat}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="mb-2">Entrada</h3>
                  <div className="space-y-2">
                    {['1.101 - Compra para comercialização', '1.102 - Compra para industrialização', '1.949 - Outra entrada'].map((nat) => (
                      <div key={nat} className="p-2 border rounded">
                        {nat}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faturamento">
          <Card>
            <CardHeader>
              <CardTitle>Base de Faturamento (Tabela Manual)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-gray-50 border rounded-lg">
                <p className="text-sm text-gray-600 mb-4">
                  Configure as bases de cálculo para faturamento conforme atividade do MEI.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between p-2 border bg-white rounded">
                    <span>Comércio</span>
                    <span>ICMS - Até R$ 81.000,00/ano</span>
                  </div>
                  <div className="flex justify-between p-2 border bg-white rounded">
                    <span>Prestação de Serviços</span>
                    <span>ISS - Até R$ 81.000,00/ano</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
