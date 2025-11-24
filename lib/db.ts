import { PrismaClient } from '@prisma/client'

// Em desenvolvimento, forçar carregar .env.local para sobrescrever variáveis do sistema
if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { config } = require('dotenv')
    config({ path: '.env.local', override: true })
    config({ path: '.env', override: true })
}

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

export const db = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
