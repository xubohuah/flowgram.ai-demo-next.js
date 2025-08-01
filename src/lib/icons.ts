/**
 * 图标映射表 - 将原有的自定义图标映射到 lucide-react 图标
 */
import {
  LayoutGrid,
  MessageSquare,
  Square,
  Play,
  Undo,
  Redo,
  Plus,
  MoreHorizontal,
  Info,
  Copy,
  Trash2,
  Expand,
  Shrink,
  ChevronDown,
  Spin,
//   Zap,
  Eye,
  EyeOff,
  GitBranch,
  MousePointer,
  Map,
  Lock,
  Unlock,
  Maximize,
  X,
  type LucideIcon
} from 'lucide-react'

// 图标映射表
export const iconMap = {
  // 布局和工具类图标
  'auto-layout': LayoutGrid,
  'switch-line': GitBranch,
  'comment': MessageSquare,
  'cancel': Square,
  'success': Play,
  
  // 操作类图标
  'undo': Undo,
  'redo': Redo,
  'plus': Plus,
  'more': MoreHorizontal,
  'info': Info,
  'copy': Copy,
  'delete': Trash2,
  'expand': Expand,
  'shrink': Shrink,
  'chevron-down': ChevronDown,
  'spin': Spin,
  
  // 状态类图标
  'warning': Info,
  'play': Play,
  'close': X,
  
  // 视图类图标
  'minimap': Map,
  'mouse': MousePointer,
  'pad': MousePointer,
  'eye': Eye,
  'eye-off': EyeOff,
  'lock': Lock,
  'unlock': Unlock,
  'fit-view': Maximize
} as const

export type IconName = keyof typeof iconMap
export type IconComponent = LucideIcon

// 获取图标组件的辅助函数
export function getIcon(name: IconName): IconComponent {
  return iconMap[name]
}