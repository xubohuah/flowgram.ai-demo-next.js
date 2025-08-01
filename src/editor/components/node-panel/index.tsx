/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { FC } from 'react';

import { NodePanelRenderProps } from '@flowgram.ai/free-node-panel-plugin';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@app/components/ui/popover';

import { NodeList } from './node-list';

export const NodePanel: FC<NodePanelRenderProps> = (props) => {
  const { onSelect, position, onClose, containerNode, panelProps = {} } = props;
  const { enableNodePlaceholder } = panelProps;

  return (
    <Popover 
      open={true} 
      onOpenChange={(open) => !open && onClose()}
    >
      <PopoverTrigger asChild>
        <div
          style={
            enableNodePlaceholder
              ? {
                  position: 'absolute',
                  top: position.y - 61.5,
                  left: position.x,
                  width: 360,
                  height: 100,
                }
              : {
                  position: 'absolute',
                  top: position.y,
                  left: position.x,
                  width: 0,
                  height: 0,
                }
          }
        >
          {/* Placeholder for node */}
        </div>
      </PopoverTrigger>
      <PopoverContent 
        side="right" 
        align="start"
        className="p-0"
        style={{ marginLeft: 30 }}
      >
        <NodeList onSelect={onSelect} containerNode={containerNode} />
      </PopoverContent>
    </Popover>
  );
};