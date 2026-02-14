import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Plus, FileText } from 'lucide-react';

export function CadastroAdministrativo() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl mb-2">Cadastro Administrativo</h1>
        <p className="text-gray-600">Documentos financeiros e categorias</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Documentos Financeiros</CardTitle>
              <Button className="gap-2" size="sm">
                <Plus className="h-4 w-4" />
                Novo
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                'Boleto Bancário',
                'Recibo de Pagamento',
                'Nota Promissória',
                'Duplicata',
                'Transferência Bancária',
                'PIX',
              ].map((doc) => (
                <div key={doc} className="p-3 border rounded-lg flex items-center gap-2 hover:bg-gray-50">
                  <FileText className="h-4 w-4 text-blue-600" />
                  {doc}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Categorias de Lançamento</CardTitle>
              <Button className="gap-2" size="sm">
                <Plus className="h-4 w-4" />
                Nova
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm mb-2 text-green-600">Receitas</h3>
                <div className="space-y-1">
                  {['Venda de Produtos', 'Prestação de Serviços', 'Outras Receitas'].map((cat) => (
                    <div key={cat} className="p-2 border rounded text-sm">
                      {cat}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm mb-2 text-red-600">Despesas</h3>
                <div className="space-y-1">
                  {['Despesas Operacionais', 'Fornecedores', 'Impostos e Taxas', 'Folha de Pagamento', 'Outras Despesas'].map((cat) => (
                    <div key={cat} className="p-2 border rounded text-sm">
                      {cat}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
