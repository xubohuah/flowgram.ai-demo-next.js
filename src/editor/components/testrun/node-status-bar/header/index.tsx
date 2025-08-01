/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@app/lib/utils';

import { useNodeRenderContext } from '../../../../hooks';

interface NodeStatusBarProps {
  header?: React.ReactNode;
  defaultShowDetail?: boolean;
  extraBtns?: React.ReactNode[];
}

export const NodeStatusHeader: React.FC<React.PropsWithChildren<NodeStatusBarProps>> = ({
  header,
  defaultShowDetail,
  children,
  extraBtns = [],
}) => {
  const [showDetail, setShowDetail] = useState(defaultShowDetail);
  const { selectNode } = useNodeRenderContext();

  const handleToggleShowDetail = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectNode(e);
    setShowDetail(!showDetail);
  };

  return (
    <div
      className="absolute -top-8 left-0 right-0 bg-white border border-gray-200 rounded-t-lg shadow-sm z-10"
      // 必须要禁止 down 冒泡，防止判定圈选和 node hover（不支持多边形）
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div
        className={cn(
          "flex items-center justify-between p-2 cursor-pointer hover:bg-gray-50 rounded-t-lg transition-colors",
          showDetail && "border-b border-gray-200"
        )}
        // 必须要禁止 down 冒泡，防止判定圈选和 node hover（不支持多边形）
        onMouseDown={(e) => e.stopPropagation()}
        // 其他事件统一走点击事件，且也需要阻止冒泡
        onClick={handleToggleShowDetail}
      >
        <div className="flex items-center gap-2">
          {header}
          {extraBtns.length > 0 && (
            <div className="flex items-center gap-1 ml-2">
              {extraBtns}
            </div>
          )}
        </div>
        <div className="flex items-center">
          <ChevronDown
            className={cn(
              "w-4 h-4 text-gray-400 transition-transform",
              showDetail ? "rotate-180" : ""
            )}
          />
        </div>
      </div>
      {showDetail && (
        <div className="p-2 space-y-2 max-h-64 overflow-y-auto">
          {children}
        </div>
      )}
    </div>
  );
};