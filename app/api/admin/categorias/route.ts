import { NextRequest, NextResponse } from 'next/server'
import { getCategorias } from '@/lib/admin/produtos'

export async function GET() {
  try {
    const categorias = await getCategorias()
    return NextResponse.json({ categorias })
  } catch (error: any) {
    console.error('Erro ao buscar categorias:', error)
    return NextResponse.json(
      { error: error.message || 'Erro ao buscar categorias' },
      { status: 500 }
    )
  }
}
