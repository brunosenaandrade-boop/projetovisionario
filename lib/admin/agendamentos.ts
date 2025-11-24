import { db } from '@/lib/db'
import { LOJA_SLUG } from '@/lib/constants'
import { Prisma } from '@prisma/client'

export type AgendamentosFilter = {
    status?: string
    dataInicio?: string
    dataFim?: string
}

export async function getAgendamentos({ status, dataInicio, dataFim }: AgendamentosFilter) {
    try {
        const loja = await db.loja.findUnique({
            where: { slug: LOJA_SLUG },
        })

        if (!loja) return []

        const where: Prisma.AgendamentoWhereInput = {
            lojaId: loja.id,
        }

        if (status && status !== 'todos') {
            where.status = status
        }

        if (dataInicio && dataFim) {
            where.data = {
                gte: new Date(dataInicio),
                lte: new Date(dataFim),
            }
        } else {
            // Se não filtrar por data, pega os próximos 30 dias por padrão
            const hoje = new Date()
            const trintaDias = new Date()
            trintaDias.setDate(hoje.getDate() + 30)

            where.data = {
                gte: hoje,
                lte: trintaDias
            }
        }

        const agendamentos = await db.agendamento.findMany({
            where,
            include: {
                cliente: true,
                pedido: {
                    include: {
                        items: {
                            include: {
                                produto: true
                            }
                        }
                    }
                }
            },
            orderBy: [
                { data: 'asc' },
                { hora: 'asc' }
            ]
        })

        return agendamentos
    } catch (error) {
        console.error('Erro ao buscar agendamentos:', error)
        return []
    }
}
