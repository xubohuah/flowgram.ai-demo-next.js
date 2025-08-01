/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { FC, useCallback, useState, type MouseEvent } from 'react';

import {
  delay,
  useClientContext,
  useService,
  WorkflowDragService,
  WorkflowNodeEntity,
  WorkflowSelectService,
} from '@flowgram.ai/free-layout-editor';
import { NodeIntoContainerService } from '@flowgram.ai/free-container-plugin';
import { MoreHorizontal } from 'lucide-react';

import { Button } from '@app/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@app/components/ui/dropdown-menu';
import { CopyShortcut } from '../../shortcuts/copy';
import { PasteShortcut } from '../../shortcuts/paste';

import { FlowNodeRegistry } from '../../typings';

interface NodeMenuProps {
  node: WorkflowNodeEntity;
  updateTitleEdit: (setEditing: boolean) => void;
  deleteNode: () => void;
}

export const NodeMenu: FC<NodeMenuProps> = ({ node, deleteNode, updateTitleEdit }) => {
  const [visible, setVisible] = useState(true);
  const clientContext = useClientContext();
  const registry = node.getNodeRegistry<FlowNodeRegistry>();
  const nodeIntoContainerService = useService(NodeIntoContainerService);
  const selectService = useService(WorkflowSelectService);
  const dragService = useService(WorkflowDragService);
  const canMoveOut = nodeIntoContainerService.canMoveOutContainer(node);

  const rerenderMenu = useCallback(() => {
    // force destroy component - 强制销毁组件触发重新渲染
    setVisible(false);
    requestAnimationFrame(() => {
      setVisible(true);
    });
  }, []);

  const handleMoveOut = useCallback(
    async (e: MouseEvent) => {
      e.stopPropagation();
      const sourceParent = node.parent;
      // move out of container - 移出容器
      nodeIntoContainerService.moveOutContainer({ node });
      // clear invalid lines - 清除非法线条
      await nodeIntoContainerService.clearInvalidLines({
        dragNode: node,
        sourceParent,
      });
      rerenderMenu();
      await delay(16);
      // select node - 选中节点
      selectService.selectNode(node);
      // start drag node - 开始拖拽
      dragService.startDragSelectedNodes(e);
    },
    [nodeIntoContainerService, node, rerenderMenu]
  );

  const handleCopy = useCallback(
    (e: React.MouseEvent) => {
      const copyShortcut = new CopyShortcut(clientContext);
      const pasteShortcut = new PasteShortcut(clientContext);
      const data = copyShortcut.toClipboardData([node]);
      pasteShortcut.apply(data);
      e.stopPropagation(); // Disable clicking prevents the sidebar from opening
    },
    [clientContext, node]
  );

  const handleDelete = useCallback(
    (e: React.MouseEvent) => {
      deleteNode();
      e.stopPropagation();
    },
    [deleteNode]
  );

  const handleEditTitle = useCallback(() => {
    updateTitleEdit(true);
  }, [updateTitleEdit]);

  if (!visible) {
    return <></>;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleEditTitle}>
          Edit Title
        </DropdownMenuItem>
        {canMoveOut && (
          <DropdownMenuItem onClick={handleMoveOut}>
            Move out
          </DropdownMenuItem>
        )}
        <DropdownMenuItem 
          onClick={handleCopy} 
          disabled={registry.meta!.copyDisable === true}
        >
          Create Copy
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleDelete}
          disabled={!!(registry.canDelete?.(clientContext, node) || registry.meta!.deleteDisable)}
          className="text-red-600 focus:text-red-600"
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};