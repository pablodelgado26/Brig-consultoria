import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Download, FileText, Users, DollarSign } from 'lucide-react';

export function Relatorios() {
  const relatoriosFiscais = [
    { nome: 'Livro Registro de Entradas', descricao: 'Todas as notas fiscais de entrada' },
    { nome: 'Livro Registro de Saídas', descricao: 'Todas as notas fiscais de saída' },
    { nome: 'Livro Registro de Inventário', descricao: 'Controle de estoque' },
    { nome: 'Relatório de Preços', descricao: 'Lista de preços de produtos' },
    { nome: 'Declaração de Faturamento', descricao: 'Faturamento mensal modelo sistema' },
    { nome: 'Receitas Brutas Mensais', descricao: 'Declaração modelo RFB' },
  ];

  const relatoriosTrabalhistas = [
    { nome: 'Holerite Mensal', descricao: 'Recibo de pagamento do funcionário' },
    { nome: 'Folha de Pagamento', descricao: 'Resumo da folha mensal' },
    { nome: 'Recibo de Férias', descricao: 'Comprovante de férias' },
    { nome: 'Escala de Férias', descricao: 'Programação anual de férias' },
    { nome: 'Relatório 13º Salário', descricao: 'Cálculo do décimo terceiro' },
    { nome: 'Histórico de Férias', descricao: 'Histórico completo' },
  ];

  const relatoriosFinanceiros = [
    { nome: 'Contas a Pagar', descricao: 'Todas as contas pendentes e pagas' },
    { nome: 'Contas a Receber', descricao: 'Recebimentos pendentes e realizados' },
    { nome: 'Fluxo de Caixa', descricao: 'Movimentação do caixa por período' },
    { nome: 'DRE Simplificado', descricao: 'Demonstração de Resultado' },
    { nome: 'Controle de Validade de Documentos', descricao: 'CNDs e documentos com validade' },
    { nome: 'Relatório de Contratos', descricao: 'Todos os contratos vigentes' },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl mb-2">Relatórios</h1>
        <p className="text-gray-600">Gere relatórios fiscais, trabalhistas e financeiros</p>
      </div>

      <Tabs defaultValue="fiscal" className="space-y-6">
        <TabsList>
          <TabsTrigger value="fiscal" className="gap-2">
            <FileText className="h-4 w-4" />
            Relatórios Fiscais
          </TabsTrigger>
          <TabsTrigger value="trabalhista" className="gap-2">
            <Users className="h-4 w-4" />
            Relatórios Trabalhistas
          </TabsTrigger>
          <TabsTrigger value="financeiro" className="gap-2">
            <DollarSign className="h-4 w-4" />
            Relatórios Financeiros
          </TabsTrigger>
        </TabsList>

        <TabsContent value="fiscal">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatoriosFiscais.map((relatorio) => (
              <Card key={relatorio.nome}>
                <CardHeader>
                  <CardTitle className="text-lg">{relatorio.nome}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{relatorio.descricao}</p>
                  <Button variant="outline" className="w-full gap-2">
                    <Download className="h-4 w-4" />
                    Gerar Relatório
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trabalhista">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatoriosTrabalhistas.map((relatorio) => (
              <Card key={relatorio.nome}>
                <CardHeader>
                  <CardTitle className="text-lg">{relatorio.nome}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{relatorio.descricao}</p>
                  <Button variant="outline" className="w-full gap-2">
                    <Download className="h-4 w-4" />
                    Gerar Relatório
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="financeiro">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatoriosFinanceiros.map((relatorio) => (
              <Card key={relatorio.nome}>
                <CardHeader>
                  <CardTitle className="text-lg">{relatorio.nome}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{relatorio.descricao}</p>
                  <Button variant="outline" className="w-full gap-2">
                    <Download className="h-4 w-4" />
                    Gerar Relatório
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
