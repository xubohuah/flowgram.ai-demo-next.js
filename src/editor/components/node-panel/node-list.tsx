/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, { FC } from 'react';

import { NodePanelRenderProps } from '@flowgram.ai/free-node-panel-plugin';
import { useClientContext, WorkflowNodeEntity } from '@flowgram.ai/free-layout-editor';
import { Button } from '@app/components/ui/button';

import { nodeRegistries } from '../../data/node-registries';

interface NodeListProps {
  onSelect: NodePanelRenderProps['onSelect'];
  containerNode?: WorkflowNodeEntity;
}

export const NodeList: FC<NodeListProps> = (props) => {
  const { onSelect, containerNode } = props;
  const context = useClientContext();
  
  const handleClick = (e: React.MouseEvent, registry: any) => {
    const json = registry.onAdd?.(context);
    onSelect({
      nodeType: registry.type as string,
      selectEvent: e,
      nodeJSON: json,
    });
  };

  return (
    <div className="max-h-96 overflow-auto w-40 p-2">
      <div className="grid gap-1">
        {nodeRegistries
          .filter((register) => register.meta?.nodePanelVisible !== false)
          .filter((register) => {
            if (register.meta?.onlyInContainer) {
              return register.meta.onlyInContainer === containerNode?.flowNodeType;
            }
            return true;
          })
          .map((registry) => (
            <Button
              key={registry.type}
              variant="ghost"
              size="sm"
              disabled={!(registry.canAdd?.(context) ?? true)}
              onClick={(e) => handleClick(e, registry)}
              className="justify-start h-8 px-3 text-xs hover:bg-blue-50 hover:text-blue-700"
              data-testid={`demo-free-node-list-${registry.type}`}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded" />
                <span>{registry.type as string}</span>
              </div>
            </Button>
          ))}
      </div>
    </div>
  );
};