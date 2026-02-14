import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useResumoMensal } from '../hooks/useApi';
import { Calendar, Loader2 } from 'lucide-react';

export function ResumoMensalWidget() {
  const currentDate = new Date();
  const [mes, setMes] = useState(currentDate.getMonth() + 1);
  const [ano, setAno] = useState(currentDate.getFullYear());
  const [shouldFetch, setShouldFetch] = useState(false);
  
  const { resumo, loading, error, fetchResumo } = useResumoMensal(
    shouldFetch ? mes : null, 
    shouldFetch ? ano : null
  );

  const meses = [
    { value: 1, label: 'Janeiro' },
    { value: 2, label: 'Fevereiro' },
    { value: 3, label: 'Março' },
    { value: 4, label: 'Abril' },
    { value: 5, label: 'Maio' },
    { value: 6, label: 'Junho' },
    { value: 7, label: 'Julho' },
    { value: 8, label: 'Agosto' },
    { value: 9, label: 'Setembro' },
    { value: 10, label: 'Outubro' },
    { value: 11, label: 'Novembro' },
    { value: 12, label: 'Dezembro' }
  ];

  const anos = Array.from({ length: 5 }, (_, i) => currentDate.getFullYear() - 2 + i);

  const handleBuscarResumo = () => {
    setShouldFetch(true);
    fetchResumo(mes, ano);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Resumo Mensal
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Select value={mes.toString()} onValueChange={(value) => setMes(parseInt(value))}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Mês" />
            </SelectTrigger>
            <SelectContent>
              {meses.map(m => (
                <SelectItem key={m.value} value={m.value.toString()}>
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={ano.toString()} onValueChange={(value) => setAno(parseInt(value))}>
            <SelectTrigger className="w-24">
              <SelectValue placeholder="Ano" />
            </SelectTrigger>
            <SelectContent>
              {anos.map(a => (
                <SelectItem key={a} value={a.toString()}>
                  {a}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button onClick={handleBuscarResumo} disabled={loading}>
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              'Buscar'
            )}
          </Button>
        </div>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
            {error}
          </div>
        )}

        {resumo && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Total de Lançamentos:</span>
                <div className="text-lg">{resumo.totalLancamentos}</div>
              </div>
              <div>
                <span className="font-medium">Entradas:</span>
                <div className="text-lg text-green-600">
                  {new Intl.NumberFormat('pt-BR', { 
                    style: 'currency', 
                    currency: 'BRL' 
                  }).format(resumo.entradas)}
                </div>
              </div>
              <div>
                <span className="font-medium">Saídas:</span>
                <div className="text-lg text-red-600">
                  {new Intl.NumberFormat('pt-BR', { 
                    style: 'currency', 
                    currency: 'BRL' 
                  }).format(resumo.saidas)}
                </div>
              </div>
              <div>
                <span className="font-medium">Saldo:</span>
                <div className={`text-lg ${(resumo.entradas - resumo.saidas) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {new Intl.NumberFormat('pt-BR', { 
                    style: 'currency', 
                    currency: 'BRL' 
                  }).format(resumo.entradas - resumo.saidas)}
                </div>
              </div>
            </div>

            {resumo.faturamento && (
              <div className="border-t pt-3">
                <span className="font-medium text-sm">Faturamento Declarado:</span>
                <div className="text-lg">
                  {new Intl.NumberFormat('pt-BR', { 
                    style: 'currency', 
                    currency: 'BRL' 
                  }).format(resumo.faturamento.receitaLiquida || 0)}
                </div>
              </div>
            )}
          </div>
        )}

        {!resumo && !loading && shouldFetch && (
          <div className="text-sm text-gray-500 text-center p-4">
            Nenhum dado encontrado para o período selecionado
          </div>
        )}
      </CardContent>
    </Card>
  );
}