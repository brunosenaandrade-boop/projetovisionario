'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Clock, AlertCircle, Copy } from 'lucide-react'
import { toast } from 'sonner'

export default function PedidoPendentePage() {
    const copiarPix = () => {
        // Aqui seria o código PIX real
        navigator.clipboard.writeText('00020126330014BR.GOV.BCB.PIX...')
        toast.success('Código PIX copiado!')
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full mb-4">
                        <Clock className="h-10 w-10 text-yellow-600" />
                    </div>
                    <h1 className="text-4xl font-bold mb-2">Pagamento Pendente</h1>
                    <p className="text-muted-foreground text-lg">
                        Aguardando confirmação do pagamento
                    </p>
                </div>

                <Card className="mb-6 border-yellow-500/50 bg-yellow-50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-yellow-900">
                            <AlertCircle className="h-5 w-5" />
                            Pagamento via PIX
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-yellow-800 mb-4">
                            Para concluir sua compra, realize o pagamento via PIX usando o QR Code ou copiando o código abaixo.
                        </p>
                        <div className="bg-white p-4 rounded-lg border border-yellow-200">
                            <p className="text-xs text-muted-foreground mb-2">Código PIX:</p>
                            <div className="flex gap-2">
                                <code className="flex-1 text-sm bg-gray-50 p-2 rounded border overflow-x-auto">
                                    00020126330014BR.GOV.BCB.PIX...
                                </code>
                                <Button size="sm" onClick={copiarPix}>
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <p className="text-xs text-yellow-700 mt-4">
                            Após a confirmação do pagamento, você receberá um e-mail e WhatsApp com os detalhes do seu pedido.
                        </p>
                    </CardContent>
                </Card>

                <div className="flex flex-col gap-4">
                    <Button asChild>
                        <Link href="/minha-conta/pedidos">Ver Meus Pedidos</Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href="/">Voltar ao Início</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
