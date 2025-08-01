/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { Plus } from 'lucide-react';
import { Button } from '@app/components/ui/button';
import { useAddNode } from './use-add-node';

export const AddNode = (props: { disabled: boolean }) => {
  const addNode = useAddNode();
  
  return (
    <Button
      data-testid="demo.free-layout.add-node"
      variant="secondary"
      size="sm"
      disabled={props.disabled}
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        addNode(rect);
      }}
      className="bg-blue-100 hover:bg-blue-200 text-blue-700 border-blue-300 rounded-lg"
    >
      <Plus className="h-4 w-4 mr-1" />
      Add Node
    </Button>
  );
};