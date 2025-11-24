import { db } from '@/lib/db'
import { LOJA_SLUG } from '@/lib/constants'
import { Prisma } from '@prisma/client'

export type PedidosFilter = {
    status?: string
    search?: string
    page?: number
    limit?: number
}

export async function getPedidos({ status, search, page = 1, limit = 10 }: PedidosFilter) {
    try {
        const loja = await db.loja.findUnique({
            where: { slug: LOJA_SLUG },
        })

        if (!loja) return { pedidos: [], total: 0, pages: 0 }

        const where: Prisma.PedidoWhereInput = {
            lojaId: loja.id,
        }

        // Filtro de Status
        if (status && status !== 'todos') {
            where.status = status
        }

        // Busca (Nome do cliente ou ID do pedido)
        if (search) {
            where.OR = [
                { numero: { contains: search, mode: 'insensitive' } },
                { cliente: { nome: { contains: search, mode: 'insensitive' } } },
            ]
        }

        const total = await db.pedido.count({ where })
        const pages = Math.ceil(total / limit)
        const skip = (page - 1) * limit

        const pedidos = await db.pedido.findMany({
            where,
            include: {
                cliente: true,
                items: {
                    include: {
                        produto: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
            skip,
            take: limit,
        })

        return { pedidos, total, pages }
    } catch (error) {
        console.error('Erro ao buscar pedidos:', error)
        return { pedidos: [], total: 0, pages: 0 }
    }
}
