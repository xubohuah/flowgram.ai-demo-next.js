import React from 'react';
import { FlowNodeEntity } from '@flowgram.ai/free-layout-editor';
import { cn } from '@app/lib/utils';

interface FormContentProps {
  children?: React.ReactNode;
  node: FlowNodeEntity;
  expanded?: boolean;
  isSidebar?: boolean;
  className?: string;
}

export function FormContent({ children, node, expanded, isSidebar, className }: FormContentProps) {
  const registry = node.getNodeRegistry();
  
  return (
    <div className={cn(
      "box-border w-full flex flex-col gap-1.5 bg-gray-50 rounded-b-lg p-3 pt-0",
      className
    )}>
      {isSidebar && registry.info?.description && (
        <div className="text-xs text-gray-600 leading-5 px-1 break-words whitespace-pre-wrap">
          {registry.info.description}
        </div>
      )}
      {(expanded || isSidebar) && children}
    </div>
  );
}