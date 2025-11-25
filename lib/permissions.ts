/**
 * Sistema de Permissões
 *
 * Este arquivo contém helpers para verificar permissões de usuários
 */

export type Permission =
  | 'dashboard'
  | 'produtos'
  | 'pedidos'
  | 'agendamentos'
  | 'whatsapp'
  | 'configuracoes'
  | 'usuarios'

export type Permissoes = Record<Permission, boolean>

/**
 * Verifica se o usuário tem uma permissão específica
 */
export function hasPermission(
  permissoes: Record<string, boolean>,
  permission: Permission
): boolean {
  return permissoes[permission] === true
}

/**
 * Verifica se o usuário tem TODAS as permissões especificadas
 */
export function hasAllPermissions(
  permissoes: Record<string, boolean>,
  permissions: Permission[]
): boolean {
  return permissions.every(p => permissoes[p] === true)
}

/**
 * Verifica se o usuário tem ALGUMA das permissões especificadas
 */
export function hasAnyPermission(
  permissoes: Record<string, boolean>,
  permissions: Permission[]
): boolean {
  return permissions.some(p => permissoes[p] === true)
}

/**
 * Permissões padrão para diferentes roles
 */
export const DEFAULT_PERMISSIONS: Record<string, Permissoes> = {
  supremo: {
    dashboard: true,
    produtos: true,
    pedidos: true,
    agendamentos: true,
    whatsapp: true,
    configuracoes: true,
    usuarios: true,
  },
  admin: {
    dashboard: true,
    produtos: true,
    pedidos: true,
    agendamentos: true,
    whatsapp: true,
    configuracoes: true,
    usuarios: true,
  },
  funcionario: {
    dashboard: true,
    produtos: true,
    pedidos: true,
    agendamentos: true,
    whatsapp: true,
    configuracoes: false,
    usuarios: false,
  },
}
