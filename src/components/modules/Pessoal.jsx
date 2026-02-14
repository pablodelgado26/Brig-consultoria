import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Users, FileText, Calendar, DollarSign } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';

export function Pessoal() {
  const funcionario = {
    nome: 'João da Silva',
    cpf: '123.456.789-00',
    cargo: 'Auxiliar Administrativo',
    admissao: '2024-01-15',
    salario: 1500,
    status: 'Ativo'
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl mb-2">Controle de Pessoal</h1>
        <p className="text-gray-600">E-social e gestão de funcionário</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-600">Funcionários Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-blue-600">1</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-600">Folha de Pagamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-green-600">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(funcionario.salario)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-600">Férias Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-yellow-600">0</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-600">13º Salário</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-purple-600">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(funcionario.salario)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="funcionario" className="space-y-6">
        <TabsList>
          <TabsTrigger value="funcionario">Funcionário</TabsTrigger>
          <TabsTrigger value="folha">Folha de Pagamento</TabsTrigger>
          <TabsTrigger value="ferias">Férias</TabsTrigger>
          <TabsTrigger value="esocial">E-social</TabsTrigger>
        </TabsList>

        <TabsContent value="funcionario">
          <Card>
            <CardHeader>
              <CardTitle>Dados do Funcionário</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600">Nome Completo</label>
                    <p className="text-lg">{funcionario.nome}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">CPF</label>
                    <p className="text-lg">{funcionario.cpf}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Cargo</label>
                    <p className="text-lg">{funcionario.cargo}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Data de Admissão</label>
                    <p className="text-lg">{new Date(funcionario.admissao).toLocaleDateString('pt-BR')}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Salário</label>
                    <p className="text-lg text-green-600">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(funcionario.salario)}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Status</label>
                    <div>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{funcionario.status}</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button variant="outline">Editar Dados</Button>
                  <Button variant="outline">Ver Documentos</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="folha">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Folha de Pagamento - Novembro/2025
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Salário Base</p>
                    <p className="text-lg">R$ 1.500,00</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">INSS (8%)</p>
                    <p className="text-lg text-red-600">- R$ 120,00</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Vale Transporte</p>
                    <p className="text-lg text-red-600">- R$ 90,00</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      Salário Líquido
                    </p>
                    <p className="text-xl text-green-600">R$ 1.290,00</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button className="gap-2">
                    <FileText className="h-4 w-4" />
                    Gerar Holerite
                  </Button>
                  <Button variant="outline">Histórico de Pagamentos</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ferias">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Controle de Férias
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="mb-2">Próximo período aquisitivo:</p>
                  <p className="text-lg">15/01/2025 a 14/01/2026</p>
                </div>
                <Button className="gap-2">
                  <Calendar className="h-4 w-4" />
                  Agendar Férias
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="esocial">
          <Card>
            <CardHeader>
              <CardTitle>E-social</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="flex items-center gap-2 text-green-800">
                    <Users className="h-5 w-5" />
                    Funcionário cadastrado no E-social
                  </p>
                  <p className="text-sm text-gray-600 mt-2">Última atualização: 15/01/2024</p>
                </div>
                <Button variant="outline">Ver Eventos E-social</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
