/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useState, useEffect } from 'react';
import { 
  LayoutGrid, 
  Undo, 
  Redo, 
  Plus, 
  GitBranch,
  Maximize,
  Map,
  Play,
  Lock,
  Unlock,
  MessageSquare,
  Loader2
} from 'lucide-react';

import { useRefresh, useClientContext, usePlaygroundTools, useService, WorkflowDocument } from '@flowgram.ai/free-layout-editor';
import { Button } from '@app/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@app/components/ui/tooltip';
import { Separator } from '@app/components/ui/separator';

// 工具按钮组件
const ToolButton = ({ 
  icon: Icon, 
  tooltip, 
  onClick, 
  disabled = false 
}: {
  icon: any;
  tooltip: string;
  onClick?: () => void;
  disabled?: boolean;
}) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Button
        variant="ghost"
        size="icon"
        onClick={onClick}
        disabled={disabled}
        className="h-8 w-8"
      >
        <Icon className="h-4 w-4" />
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>{tooltip}</p>
    </TooltipContent>
  </Tooltip>
);

export const Toolbar = () => {
  const { history, playground } = useClientContext();
  const tools = usePlaygroundTools();
  const document = useService(WorkflowDocument);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [minimapVisible, setMinimapVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const refresh = useRefresh();

  useEffect(() => {
    const disposable = history.undoRedoService.onChange(() => {
      setCanUndo(history.canUndo());
      setCanRedo(history.canRedo());
    });
    return () => disposable.dispose();
  }, [history]);

  useEffect(() => {
    const disposable = playground.config.onReadonlyOrDisabledChange(() => refresh());
    return () => disposable.dispose();
  }, [playground]);

  const handleRun = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/runtime', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          json: document.toJSON(),
        }),
      });
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'process failed');
      }

      console.log('run success', data.data);
    } catch (error) {
      console.error(error instanceof Error ? error.message : 'run failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TooltipProvider>
      <div className="demo-free-layout-tools bg-white border border-gray-200 rounded-[10px] shadow-[0_2px_6px_0_rgba(0,0,0,0.04),0_4px_12px_0_rgba(0,0,0,0.02)] px-1 py-0 flex items-center gap-0.5 h-10 pointer-events-auto">
        {/* 交互工具 */}
        <ToolButton 
          icon={LayoutGrid} 
          tooltip="Auto Layout" 
          onClick={() => tools.autoLayout()}
          disabled={playground.config.readonly}
        />
        <ToolButton 
          icon={GitBranch} 
          tooltip="Switch Line" 
          disabled={playground.config.readonly}
        />
        <ToolButton 
          icon={Maximize} 
          tooltip="Fit View" 
          onClick={() => tools.fitView()}
        />
        <ToolButton 
          icon={Map} 
          tooltip="Minimap" 
          onClick={() => setMinimapVisible(!minimapVisible)}
        />
        <ToolButton 
          icon={playground.config.readonly ? Lock : Unlock} 
          tooltip={playground.config.readonly ? "Readonly" : "Editable"}
        />
        <ToolButton 
          icon={MessageSquare} 
          tooltip="Comment" 
          disabled={playground.config.readonly}
        />
        
        <Separator orientation="vertical" className="h-4 mx-1" />
        
        {/* 历史操作 */}
        <ToolButton 
          icon={Undo} 
          tooltip="Undo" 
          onClick={() => history.undo()}
          disabled={!canUndo || playground.config.readonly}
        />
        <ToolButton 
          icon={Redo} 
          tooltip="Redo" 
          onClick={() => history.redo()}
          disabled={!canRedo || playground.config.readonly}
        />
        
        <Separator orientation="vertical" className="h-4 mx-1" />
        
        {/* 节点操作 */}
        <ToolButton 
          icon={Plus} 
          tooltip="Add Node" 
          disabled={playground.config.readonly}
        />
        
        <Separator orientation="vertical" className="h-4 mx-1" />
        
        {/* 测试运行按钮 */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="default"
              size="sm"
              onClick={handleRun}
              disabled={playground.config.readonly || isLoading}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 mr-1 animate-spin" />
              ) : (
                <Play className="h-4 w-4 mr-1" />
              )}
              TEST RUN
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isLoading ? 'Running workflow...' : 'Run workflow test'}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};