import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatPrice, formatDate } from '@/lib/utils'
import { ArrowRight, Eye, ShoppingCart } from 'lucide-react'
import Link from 'next/link'

interface RecentOrdersProps {
  pedidos: any[]
}

export function RecentOrders({ pedidos }: RecentOrdersProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pago':
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30'
      case 'pendente':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 border-amber-200 dark:border-amber-500/30'
      case 'cancelado':
        return 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400 border-rose-200 dark:border-rose-500/30'
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700'
    }
  }

  return (
    <Card className="col-span-4 hover:shadow-md transition-all duration-300 border-none shadow-sm bg-card/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between px-6 py-5">
        <div className="space-y-1">
          <CardTitle className="text-lg font-semibold tracking-tight">Pedidos Recentes</CardTitle>
          <p className="text-sm text-muted-foreground">Últimas transações realizadas na loja.</p>
        </div>
        <Button variant="outline" size="sm" className="text-xs font-medium h-8" asChild>
          <Link href="/dashboard/pedidos">
            Ver todos <ArrowRight className="ml-2 h-3 w-3" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-4">
          {pedidos.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-muted/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="h-8 w-8 text-muted-foreground/50" />
              </div>
              <p className="text-muted-foreground font-medium">Nenhum pedido recente encontrado.</p>
            </div>
          ) : (
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b bg-muted/30">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-10 px-6 text-left align-middle font-medium text-muted-foreground text-xs uppercase tracking-wider">Cliente</th>
                    <th className="h-10 px-6 text-left align-middle font-medium text-muted-foreground text-xs uppercase tracking-wider">Status</th>
                    <th className="h-10 px-6 text-left align-middle font-medium text-muted-foreground text-xs uppercase tracking-wider">Data</th>
                    <th className="h-10 px-6 text-right align-middle font-medium text-muted-foreground text-xs uppercase tracking-wider">Total</th>
                    <th className="h-10 px-6 text-right align-middle font-medium text-muted-foreground text-xs uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {pedidos.map((pedido) => (
                    <tr
                      key={pedido.id}
                      className="border-b border-border/50 transition-colors hover:bg-muted/30 data-[state=selected]:bg-muted group"
                    >
                      <td className="p-4 px-6 align-middle font-medium">
                        <div className="flex flex-col">
                          <span className="font-semibold text-foreground">{pedido.cliente.nome}</span>
                          <span className="text-xs text-muted-foreground font-normal mt-0.5">#{pedido.numero}</span>
                        </div>
                      </td>
                      <td className="p-4 px-6 align-middle">
                        <Badge variant="outline" className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${getStatusColor(pedido.status)}`}>
                          {pedido.status}
                        </Badge>
                      </td>
                      <td className="p-4 px-6 align-middle text-muted-foreground text-xs font-medium">
                        {formatDate(pedido.createdAt)}
                      </td>
                      <td className="p-4 px-6 align-middle text-right font-bold text-foreground">
                        {formatPrice(Number(pedido.total))}
                      </td>
                      <td className="p-4 px-6 align-middle text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-primary/10 hover:text-primary">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
