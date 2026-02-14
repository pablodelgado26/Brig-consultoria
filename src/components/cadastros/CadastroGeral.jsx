import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Plus, Building2, User, Users } from 'lucide-react';

export function CadastroGeral() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl mb-2">Cadastro Geral</h1>
        <p className="text-gray-600">Empresa, responsável, fornecedores e clientes</p>
      </div>

      <Tabs defaultValue="empresa" className="space-y-6">
        <TabsList>
          <TabsTrigger value="empresa" className="gap-2">
            <Building2 className="h-4 w-4" />
            Dados Empresa
          </TabsTrigger>
          <TabsTrigger value="responsavel" className="gap-2">
            <User className="h-4 w-4" />
            Responsável
          </TabsTrigger>
          <TabsTrigger value="fornecedores" className="gap-2">
            <Users className="h-4 w-4" />
            Fornecedores
          </TabsTrigger>
          <TabsTrigger value="clientes" className="gap-2">
            <Users className="h-4 w-4" />
            Clientes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="empresa">
          <Card>
            <CardHeader>
              <CardTitle>Dados da Empresa MEI</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cnpj">CNPJ</Label>
                    <Input id="cnpj" defaultValue="12.345.678/0001-90" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="razao-social">Razão Social</Label>
                    <Input id="razao-social" defaultValue="JOÃO DA SILVA 12345678900" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nome-fantasia">Nome Fantasia</Label>
                  <Input id="nome-fantasia" defaultValue="Super MEI Serviços" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="inscricao-municipal">Inscrição Municipal</Label>
                    <Input id="inscricao-municipal" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="inscricao-estadual">Inscrição Estadual</Label>
                    <Input id="inscricao-estadual" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endereco">Endereço Completo</Label>
                  <Input id="endereco" placeholder="Rua, número, complemento" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cidade">Cidade</Label>
                    <Input id="cidade" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estado">Estado</Label>
                    <Input id="estado" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cep">CEP</Label>
                    <Input id="cep" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input id="telefone" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" type="email" />
                  </div>
                </div>
                <Button type="submit">Salvar Dados</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="responsavel">
          <Card>
            <CardHeader>
              <CardTitle>Dados do Responsável</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input id="nome" defaultValue="João da Silva" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cpf">CPF</Label>
                    <Input id="cpf" defaultValue="123.456.789-00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rg">RG</Label>
                    <Input id="rg" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tel-resp">Telefone</Label>
                    <Input id="tel-resp" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-resp">E-mail</Label>
                    <Input id="email-resp" type="email" />
                  </div>
                </div>
                <Button type="submit">Salvar Dados</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fornecedores">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Fornecedores / Prestadores</CardTitle>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Novo Fornecedor
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {['Distribuidora XYZ', 'Fornecedor ABC', 'Prestador 123'].map((nome, i) => (
                  <div key={i} className="p-3 border rounded-lg flex justify-between items-center hover:bg-gray-50">
                    <div>
                      <p>{nome}</p>
                      <p className="text-sm text-gray-600">CNPJ: XX.XXX.XXX/0001-XX</p>
                    </div>
                    <Button variant="outline" size="sm">Editar</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clientes">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Clientes</CardTitle>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Novo Cliente
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {['Cliente ABC Ltda', 'Empresa XYZ', 'Comércio 123'].map((nome, i) => (
                  <div key={i} className="p-3 border rounded-lg flex justify-between items-center hover:bg-gray-50">
                    <div>
                      <p>{nome}</p>
                      <p className="text-sm text-gray-600">CNPJ: XX.XXX.XXX/0001-XX</p>
                    </div>
                    <Button variant="outline" size="sm">Editar</Button>
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
