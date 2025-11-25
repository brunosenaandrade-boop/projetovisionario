'use client'

import { useState, useEffect } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { CircleDot, Plus, Minus, Settings2 } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import {
    type BalanceamentoConfig,
    calcularPrecoBalanceamento,
    gerarDescricaoBalanceamento,
} from '@/lib/store/carrinho-store'

interface BalanceamentoConfigDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onConfirm: (config: BalanceamentoConfig, preco: number, descricao: string) => void
    initialConfig?: BalanceamentoConfig
}

export function BalanceamentoConfigDialog({
    open,
    onOpenChange,
    onConfirm,
    initialConfig,
}: BalanceamentoConfigDialogProps) {
    const [config, setConfig] = useState<BalanceamentoConfig>(
        initialConfig || {
            tipoAro: 'ferro',
            rodas: 4,
        }
    )

    const preco = calcularPrecoBalanceamento(config)
    const descricao = gerarDescricaoBalanceamento(config)
    const precoPorRoda = config.tipoAro === 'ferro' ? 15 : 20

    useEffect(() => {
        if (initialConfig) {
            setConfig(initialConfig)
        }
    }, [initialConfig])

    const handleConfirm = () => {
        onConfirm(config, preco, descricao)
        onOpenChange(false)
    }

    const adjustRodas = (delta: number) => {
        const novoValor = config.rodas + delta
        if (novoValor >= 1 && novoValor <= 4) {
            setConfig({ ...config, rodas: novoValor })
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <div className="flex items-center gap-2">
                        <Settings2 className="h-5 w-5 text-primary" />
                        <DialogTitle>Configurar Balanceamento</DialogTitle>
                    </div>
                    <DialogDescription>
                        Personalize o serviço de balanceamento de acordo com suas rodas
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Tipo de Aro */}
                    <div className="space-y-3">
                        <Label className="text-base font-semibold flex items-center gap-2">
                            <CircleDot className="h-4 w-4" />
                            Tipo de Aro
                        </Label>
                        <RadioGroup
                            value={config.tipoAro}
                            onValueChange={(value: 'ferro' | 'liga') =>
                                setConfig({ ...config, tipoAro: value })
                            }
                        >
                            <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-accent cursor-pointer transition-colors">
                                <RadioGroupItem value="ferro" id="ferro" />
                                <Label
                                    htmlFor="ferro"
                                    className="flex-1 cursor-pointer"
                                >
                                    <div className="font-medium">Aro de Ferro</div>
                                    <div className="text-sm text-muted-foreground">
                                        Rodas de aço estampado
                                    </div>
                                </Label>
                                <span className="font-bold text-primary">
                                    {formatPrice(15)}/roda
                                </span>
                            </div>

                            <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-accent cursor-pointer transition-colors">
                                <RadioGroupItem value="liga" id="liga" />
                                <Label
                                    htmlFor="liga"
                                    className="flex-1 cursor-pointer"
                                >
                                    <div className="font-medium">Aro de Liga Leve</div>
                                    <div className="text-sm text-muted-foreground">
                                        Rodas de alumínio
                                    </div>
                                </Label>
                                <span className="font-bold text-primary">
                                    {formatPrice(20)}/roda
                                </span>
                            </div>
                        </RadioGroup>
                    </div>

                    {/* Quantidade de Rodas */}
                    <div className="space-y-3">
                        <Label className="text-base font-semibold">
                            Quantidade de Rodas
                        </Label>

                        <div className="border rounded-lg p-6 bg-muted/30">
                            <div className="flex items-center justify-center gap-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className="h-12 w-12"
                                    onClick={() => adjustRodas(-1)}
                                    disabled={config.rodas <= 1}
                                >
                                    <Minus className="h-5 w-5" />
                                </Button>
                                <div className="text-center">
                                    <div className="text-4xl font-bold">
                                        {config.rodas}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        {config.rodas === 1 ? 'roda' : 'rodas'}
                                    </div>
                                </div>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className="h-12 w-12"
                                    onClick={() => adjustRodas(1)}
                                    disabled={config.rodas >= 4}
                                >
                                    <Plus className="h-5 w-5" />
                                </Button>
                            </div>

                            <div className="mt-4 text-center text-sm text-muted-foreground">
                                {formatPrice(precoPorRoda)} × {config.rodas} ={' '}
                                <span className="font-semibold text-foreground">
                                    {formatPrice(config.rodas * precoPorRoda)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Resumo */}
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">Serviço Configurado:</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                            {descricao}
                        </p>
                        <div className="flex justify-between items-center pt-3 border-t">
                            <span className="text-lg font-bold">Total:</span>
                            <span className="text-2xl font-bold text-primary">
                                {formatPrice(preco)}
                            </span>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancelar
                    </Button>
                    <Button onClick={handleConfirm}>Confirmar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
