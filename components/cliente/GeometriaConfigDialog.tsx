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
import { Checkbox } from '@/components/ui/checkbox'
import { Car, Plus, Minus, Settings2 } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import {
    type GeometriaConfig,
    calcularPrecoGeometria,
    gerarDescricaoGeometria,
} from '@/lib/store/carrinho-store'

interface GeometriaConfigDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onConfirm: (config: GeometriaConfig, preco: number, descricao: string) => void
    initialConfig?: GeometriaConfig
}

export function GeometriaConfigDialog({
    open,
    onOpenChange,
    onConfirm,
    initialConfig,
}: GeometriaConfigDialogProps) {
    const [config, setConfig] = useState<GeometriaConfig>(
        initialConfig || {
            tipoVeiculo: 'popular',
            incluirCambagem: false,
            rodas: 4,
        }
    )

    const preco = calcularPrecoGeometria(config)
    const descricao = gerarDescricaoGeometria(config)

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
                        <DialogTitle>Configurar Geometria</DialogTitle>
                    </div>
                    <DialogDescription>
                        Personalize o serviço de geometria de acordo com seu veículo
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Tipo de Veículo */}
                    <div className="space-y-3">
                        <Label className="text-base font-semibold flex items-center gap-2">
                            <Car className="h-4 w-4" />
                            Tipo de Veículo
                        </Label>
                        <RadioGroup
                            value={config.tipoVeiculo}
                            onValueChange={(value: 'popular' | 'moderno') =>
                                setConfig({ ...config, tipoVeiculo: value })
                            }
                        >
                            <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-accent cursor-pointer transition-colors">
                                <RadioGroupItem value="popular" id="popular" />
                                <Label
                                    htmlFor="popular"
                                    className="flex-1 cursor-pointer"
                                >
                                    <div className="font-medium">Carro Popular</div>
                                    <div className="text-sm text-muted-foreground">
                                        Modelos básicos e econômicos
                                    </div>
                                </Label>
                                <span className="font-bold text-primary">
                                    {formatPrice(60)}
                                </span>
                            </div>

                            <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-accent cursor-pointer transition-colors">
                                <RadioGroupItem value="moderno" id="moderno" />
                                <Label
                                    htmlFor="moderno"
                                    className="flex-1 cursor-pointer"
                                >
                                    <div className="font-medium">Carro Moderno</div>
                                    <div className="text-sm text-muted-foreground">
                                        Modelos recentes e premium
                                    </div>
                                </Label>
                                <span className="font-bold text-primary">
                                    {formatPrice(80)}
                                </span>
                            </div>
                        </RadioGroup>
                    </div>

                    {/* Cambagem */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <Label className="text-base font-semibold">
                                Serviços Adicionais
                            </Label>
                        </div>

                        <div className="border rounded-lg p-4 space-y-3">
                            <div className="flex items-start space-x-3">
                                <Checkbox
                                    id="cambagem"
                                    checked={config.incluirCambagem}
                                    onCheckedChange={(checked) =>
                                        setConfig({
                                            ...config,
                                            incluirCambagem: checked as boolean,
                                        })
                                    }
                                />
                                <div className="flex-1">
                                    <Label
                                        htmlFor="cambagem"
                                        className="font-medium cursor-pointer"
                                    >
                                        Incluir Cambagem
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                        Ajuste do ângulo de inclinação das rodas
                                    </p>
                                    <p className="text-sm font-semibold text-primary mt-1">
                                        {formatPrice(50)} por roda
                                    </p>
                                </div>
                            </div>

                            {config.incluirCambagem && (
                                <div className="ml-7 pt-2 border-t">
                                    <Label className="text-sm mb-2 block">
                                        Quantidade de rodas
                                    </Label>
                                    <div className="flex items-center gap-3">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="icon"
                                            onClick={() => adjustRodas(-1)}
                                            disabled={config.rodas <= 1}
                                        >
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                        <span className="text-2xl font-bold w-12 text-center">
                                            {config.rodas}
                                        </span>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="icon"
                                            onClick={() => adjustRodas(1)}
                                            disabled={config.rodas >= 4}
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                        <span className="text-sm text-muted-foreground ml-2">
                                            {formatPrice(config.rodas * 50)}
                                        </span>
                                    </div>
                                </div>
                            )}
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
