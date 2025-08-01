import React from 'react'
import { getIcon, type IconName } from '@app/lib/icons'
import { cn } from '@app/lib/utils'

interface IconProps {
  name: IconName
  className?: string
  size?: number
}

export const Icon: React.FC<IconProps> = ({ name, className, size = 16 }) => {
  const IconComponent = getIcon(name)
  
  return (
    <IconComponent 
      className={cn("shrink-0", className)} 
      size={size}
    />
  )
}

// 导出一些常用的图标组件，保持与原项目的兼容性
export const IconAutoLayout = () => <Icon name="auto-layout" />
export const IconSwitchLine = () => <Icon name="switch-line" />  
export const IconComment = ({ style, className }: { style?: React.CSSProperties, className?: string }) => (
  <Icon name="comment" className={className} />
)
export const IconCancel = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
  <Icon name="cancel" className={className} />
)