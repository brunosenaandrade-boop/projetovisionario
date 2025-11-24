import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string | number
  description?: string
  icon: LucideIcon
  trend?: {
    value: number
    positive: boolean
  }
}

export function StatsCard({ title, value, description, icon: Icon, trend }: StatsCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-none shadow-sm bg-card/50 backdrop-blur-sm group overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{title}</CardTitle>
        <div className="p-2.5 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-sm">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="text-3xl font-bold text-foreground mt-2 tracking-tight">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1.5 font-medium flex items-center gap-1.5">
            {description}
          </p>
        )}
        {trend && (
          <div className="flex items-center mt-3 bg-background/50 w-fit px-2 py-1 rounded-md border border-border/50">
            <span className={`text-xs font-bold ${trend.positive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'} flex items-center`}>
              {trend.positive ? '↑' : '↓'} {trend.value}%
            </span>
            <span className="text-[10px] text-muted-foreground ml-1.5 uppercase tracking-wide">vs mês anterior</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
