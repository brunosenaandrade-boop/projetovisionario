import { config } from 'dotenv'
import { PrismaClient } from '@prisma/client'

// Forçar carregar .env.local com override para sobrescrever variáveis do sistema
config({ path: '.env.local', override: true })
config({ path: '.env', override: true })

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

export const db = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
