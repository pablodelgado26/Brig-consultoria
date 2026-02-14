import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { DollarSign, Calendar, FileText, Wallet } from 'lucide-react';

export function LancamentosTrabalhista() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl mb-2">Lançamentos Trabalhistas</h1>
        <p className="text-gray-600">Folha de pagamento, férias e eventos</p>
      </div>

      <Tabs defaultValue="folha" className="space-y-6">
        <TabsList>
          <TabsTrigger value="folha" className="gap-2">
            <DollarSign className="h-4 w-4" />
            Folha Mensal
          </TabsTrigger>
          <TabsTrigger value="eventos" className="gap-2">
            <FileText className="h-4 w-4" />
            Eventos
          </TabsTrigger>
          <TabsTrigger value="ferias" className="gap-2">
            <Calendar className="h-4 w-4" />
            Férias
          </TabsTrigger>
          <TabsTrigger value="adiantamento" className="gap-2">
            <Wallet className="h-4 w-4" />
            Adiantamento
          </TabsTrigger>
        </TabsList>

        <TabsContent value="folha">
          <Card>
            <CardHeader>
              <CardTitle>Cálculo da Folha de Pagamento - Novembro/2025</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="mb-3">João da Silva - Auxiliar Administrativo</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Vencimentos</p>
                      <div className="space-y-1 mt-2">
                        <div className="flex justify-between text-sm">
                          <span>Salário Base</span>
                          <span>R$ 1.500,00</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Descontos</p>
                      <div className="space-y-1 mt-2">
                        <div className="flex justify-between text-sm">
                          <span>INSS (8%)</span>
                          <span className="text-red-600">R$ 120,00</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Vale Transporte (6%)</span>
                          <span className="text-red-600">R$ 90,00</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between">
                      <span>Salário Líquido</span>
                      <span className="text-xl text-green-600">R$ 1.290,00</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button>Processar Folha</Button>
                  <Button variant="outline">Gerar Holerite</Button>
                  <Button variant="outline">Relatório Mensal</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="eventos">
          <Card>
            <CardHeader>
              <CardTitle>Digitação de Eventos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { codigo: '001', descricao: 'Horas Extras 50%' },
                    { codigo: '002', descricao: 'Horas Extras 100%' },
                    { codigo: '003', descricao: 'Adicional Noturno' },
                    { codigo: '004', descricao: 'Faltas' },
                    { codigo: '005', descricao: 'DSR' },
                    { codigo: '006', descricao: 'Adicional Insalubridade' },
                  ].map((evento) => (
                    <div key={evento.codigo} className="p-3 border rounded-lg hover:bg-gray-50">
                      <p><strong>{evento.codigo}</strong> - {evento.descricao}</p>
                    </div>
                  ))}
                </div>
                <Button>Adicionar Evento ao Funcionário</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ferias">
          <Card>
            <CardHeader>
              <CardTitle>Controle de Férias</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="mb-2">Período aquisitivo atual:</p>
                  <p className="text-lg">15/01/2025 a 14/01/2026</p>
                </div>
                <div className="flex gap-2">
                  <Button>Calcular Férias</Button>
                  <Button variant="outline">Aviso de Férias</Button>
                  <Button variant="outline">Recibo de Férias</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="adiantamento">
          <Card>
            <CardHeader>
              <CardTitle>Adiantamento Salarial</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Funcionário: João da Silva</p>
                  <p className="mb-1">Salário Base: R$ 1.500,00</p>
                  <p className="text-sm text-gray-600">Adiantamento permitido (40%): R$ 600,00</p>
                </div>
                <Button>Processar Adiantamento</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
