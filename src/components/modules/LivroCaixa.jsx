import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Plus, Search, ArrowUpCircle, ArrowDownCircle, Calendar, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { useLivroCaixa } from '../../hooks/useApi';

export function LivroCaixa() {
  const { 
    items: lancamentos, 
    loading, 
    error, 
    create, 
    update, 
    delete: deleteItem, 
    totals,
    resumoCategoria 
  } = useLivroCaixa();

  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    tipo: 'Entrada',
    descricao: '',
    categoria: '',
    valor: '',
    formaPagamento: '',
    data: new Date().toISOString().split('T')[0]
  });

  const filteredLancamentos = lancamentos.filter(lanc =>
    lanc.descricao?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lanc.categoria?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Usa dados da API ou calcula localmente como fallback
  const totalEntradas = totals?.entradas || lancamentos
    .filter(l => l.tipo === 'Entrada')
    .reduce((sum, l) => sum + (parseFloat(l.valor) || 0), 0);
  
  const totalSaidas = totals?.saidas || lancamentos
    .filter(l => l.tipo === 'Saída')
    .reduce((sum, l) => sum + (parseFloat(l.valor) || 0), 0);
  
  const saldo = totals?.saldo || (totalEntradas - totalSaidas);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        valor: parseFloat(formData.valor) || 0
      };
      
      await create(data);
      setIsDialogOpen(false);
      setFormData({
        tipo: 'Entrada',
        descricao: '',
        categoria: '',
        valor: '',
        formaPagamento: '',
        data: new Date().toISOString().split('T')[0]
      });
    } catch (error) {
      console.error('Erro ao criar lançamento:', error);
      alert('Erro ao salvar lançamento. Verifique os dados e tente novamente.');
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDelete = async (id) => {
    if (confirm('Tem certeza que deseja excluir este lançamento?')) {
      try {
        await deleteItem(id);
      } catch (error) {
        console.error('Erro ao excluir lançamento:', error);
        alert('Erro ao excluir lançamento.');
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl mb-2">Livro Caixa MEI</h1>
          <p className="text-gray-600">Controle de entradas e saídas do caixa</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Novo Lançamento
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Novo Lançamento no Caixa</DialogTitle>
            </DialogHeader>
            <form className="space-y-4">
              <Tabs value={tipoLancamento} onValueChange={(v) => setTipoLancamento(v)}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="Entrada">Entrada</TabsTrigger>
                  <TabsTrigger value="Saída">Saída</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="space-y-2">
                <Label htmlFor="data">Data</Label>
                <Input id="data" type="date" defaultValue="2025-11-15" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Input id="descricao" placeholder="Ex: Venda de produto X" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="categoria">Categoria</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {tipoLancamento === 'Entrada' ? (
                        <>
                          <SelectItem value="receita">Receita de Venda</SelectItem>
                          <SelectItem value="servico">Receita de Serviço</SelectItem>
                          <SelectItem value="outros">Outras Receitas</SelectItem>
                        </>
                      ) : (
                        <>
                          <SelectItem value="operacional">Despesa Operacional</SelectItem>
                          <SelectItem value="fornecedor">Pagamento Fornecedor</SelectItem>
                          <SelectItem value="impostos">Impostos e Taxas</SelectItem>
                          <SelectItem value="salario">Folha de Pagamento</SelectItem>
                          <SelectItem value="outros">Outras Despesas</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="forma-pagamento">Forma de Pagamento</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dinheiro">Dinheiro</SelectItem>
                      <SelectItem value="pix">PIX</SelectItem>
                      <SelectItem value="debito">Débito</SelectItem>
                      <SelectItem value="credito">Crédito</SelectItem>
                      <SelectItem value="transferencia">Transferência</SelectItem>
                      <SelectItem value="boleto">Boleto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="valor">Valor (R$)</Label>
                <Input id="valor" type="number" step="0.01" placeholder="0,00" />
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">Salvar</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-600 flex items-center gap-2">
              <ArrowDownCircle className="h-4 w-4 text-green-600" />
              Total de Entradas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-green-600">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalEntradas)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-600 flex items-center gap-2">
              <ArrowUpCircle className="h-4 w-4 text-red-600" />
              Total de Saídas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-red-600">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalSaidas)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-600 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-600" />
              Saldo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl ${saldo >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(saldo)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar lançamentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Lancamentos Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4">Data</th>
                  <th className="text-left p-4">Tipo</th>
                  <th className="text-left p-4">Descrição</th>
                  <th className="text-left p-4">Categoria</th>
                  <th className="text-left p-4">Forma Pagamento</th>
                  <th className="text-right p-4">Valor</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredLancamentos.map((lanc) => (
                  <tr key={lanc.id} className="hover:bg-gray-50">
                    <td className="p-4">
                      {new Date(lanc.data).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {lanc.tipo === 'Entrada' ? (
                          <ArrowDownCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <ArrowUpCircle className="h-4 w-4 text-red-600" />
                        )}
                        <span className={lanc.tipo === 'Entrada' ? 'text-green-600' : 'text-red-600'}>
                          {lanc.tipo}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">{lanc.descricao}</td>
                    <td className="p-4">{lanc.categoria}</td>
                    <td className="p-4">{lanc.formaPagamento}</td>
                    <td className={`text-right p-4 ${lanc.tipo === 'Entrada' ? 'text-green-600' : 'text-red-600'}`}>
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(lanc.valor)}
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
