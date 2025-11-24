'use client'

import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function DashboardHeader() {
    const [date, setDate] = useState<string>('')

    useEffect(() => {
        setDate(format(new Date(), "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR }))
    }, [])

    return (
        <div className="flex flex-col gap-1 mb-6">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Bom dia, Admin! 👋
            </h1>
            <p className="text-muted-foreground capitalize">
                {date}
            </p>
        </div>
    )
}
