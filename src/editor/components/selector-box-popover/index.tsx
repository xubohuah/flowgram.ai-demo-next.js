/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { FunctionComponent } from 'react';
import { 
  Copy, 
  Trash2, 
  Expand, 
  Shrink,
  Group as GroupIcon 
} from 'lucide-react';

import { SelectorBoxPopoverProps } from '@flowgram.ai/free-layout-editor';
import { WorkflowGroupCommand } from '@flowgram.ai/free-group-plugin';
import { Button } from '@app/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@app/components/ui/tooltip';

import { FlowCommandId } from '../../shortcuts/constants';

// const BUTTON_HEIGHT = 24; 

export const SelectorBoxPopover: FunctionComponent<SelectorBoxPopoverProps> = ({
  bounds,
  children,
  flowSelectConfig,
  commandRegistry,
}) => (
  <>
    <div
      style={{
        position: 'absolute',
        left: bounds.right,
        top: bounds.top,
        transform: 'translate(-100%, -100%)',
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="flex gap-0 h-6 bg-blue-500 rounded">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-white hover:bg-blue-600 rounded-l"
              onMouseDown={(e) => {
                commandRegistry.executeCommand(FlowCommandId.COLLAPSE);
              }}
            >
              <Shrink className="h-3 w-3" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Collapse</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-white hover:bg-blue-600 rounded-none"
              onMouseDown={(e) => {
                commandRegistry.executeCommand(FlowCommandId.EXPAND);
              }}
            >
              <Expand className="h-3 w-3" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Expand</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-white hover:bg-blue-600 rounded-none"
              onClick={() => {
                commandRegistry.executeCommand(WorkflowGroupCommand.Group);
              }}
            >
              <GroupIcon className="h-3 w-3" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Create Group</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-white hover:bg-blue-600 rounded-none"
              onClick={() => {
                commandRegistry.executeCommand(FlowCommandId.COPY);
              }}
            >
              <Copy className="h-3 w-3" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Copy</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-white hover:bg-blue-600 rounded-r"
              onClick={() => {
                commandRegistry.executeCommand(FlowCommandId.DELETE);
              }}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Delete</TooltipContent>
        </Tooltip>
      </div>
    </div>
    <div>{children}</div>
  </>
);