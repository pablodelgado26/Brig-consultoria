import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Users, Clock, Briefcase, Calendar } from 'lucide-react';

export function CadastroTrabalhista() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl mb-2">Cadastro Trabalhista</h1>
        <p className="text-gray-600">Funcionário, horários, funções e calendário</p>
      </div>

      <Tabs defaultValue="funcionario" className="space-y-6">
        <TabsList>
          <TabsTrigger value="funcionario" className="gap-2">
            <Users className="h-4 w-4" />
            Funcionário
          </TabsTrigger>
          <TabsTrigger value="horarios" className="gap-2">
            <Clock className="h-4 w-4" />
            Horários
          </TabsTrigger>
          <TabsTrigger value="funcoes" className="gap-2">
            <Briefcase className="h-4 w-4" />
            Funções
          </TabsTrigger>
          <TabsTrigger value="calendario" className="gap-2">
            <Calendar className="h-4 w-4" />
            Calendário/Feriados
          </TabsTrigger>
        </TabsList>

        <TabsContent value="funcionario">
          <Card>
            <CardHeader>
              <CardTitle>Cadastro de Funcionário (1 permitido no MEI)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm">O MEI pode contratar apenas 1 (um) funcionário.</p>
                <p className="text-sm mt-2">Funcionário atual: <strong>João da Silva</strong></p>
              </div>
              <Button className="mt-4">Ver/Editar Dados do Funcionário</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="horarios">
          <Card>
            <CardHeader>
              <CardTitle>Horário de Trabalho</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira'].map((dia) => (
                  <div key={dia} className="flex items-center justify-between p-3 border rounded-lg">
                    <span>{dia}</span>
                    <span className="text-gray-600">08:00 - 17:00 (1h intervalo)</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="funcoes">
          <Card>
            <CardHeader>
              <CardTitle>Funções/Cargos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {['Auxiliar Administrativo', 'Assistente de Vendas', 'Auxiliar Geral'].map((cargo) => (
                  <div key={cargo} className="p-3 border rounded-lg">
                    {cargo}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendario">
          <Card>
            <CardHeader>
              <CardTitle>Feriados e Calendário</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { data: '01/01/2025', nome: 'Confraternização Universal' },
                  { data: '21/04/2025', nome: 'Tiradentes' },
                  { data: '01/05/2025', nome: 'Dia do Trabalho' },
                  { data: '07/09/2025', nome: 'Independência do Brasil' },
                  { data: '12/10/2025', nome: 'Nossa Senhora Aparecida' },
                ].map((feriado, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                    <span>{feriado.data}</span>
                    <span className="text-gray-600">{feriado.nome}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
