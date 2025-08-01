/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { FC, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@app/lib/utils';
import { Badge } from '@app/components/ui/badge';

import { DataStructureViewer } from '../viewer';

interface NodeStatusGroupProps {
  title: string;
  data: unknown;
  optional?: boolean;
  disableCollapse?: boolean;
}

const isObjectHasContent = (obj: any = {}): boolean => obj && Object.keys(obj).length > 0;

export const NodeStatusGroup: FC<NodeStatusGroupProps> = ({
  title,
  data,
  optional = false,
  disableCollapse = false,
}) => {
  const hasContent = isObjectHasContent(data);
  const [isExpanded, setIsExpanded] = useState(true);

  if (optional && !hasContent) {
    return null;
  }

  return (
    <>
      <div
        className={cn(
          "flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-50 rounded transition-colors",
          !hasContent && "cursor-default"
        )}
        onClick={() => hasContent && !disableCollapse && setIsExpanded(!isExpanded)}
      >
        {!disableCollapse && (
          <ChevronDown
            className={cn(
              "w-4 h-4 text-gray-400 transition-transform",
              isExpanded && hasContent ? "rotate-0" : "-rotate-90"
            )}
          />
        )}
        <span className="font-medium text-gray-700">{title}:</span>
        {!hasContent && (
          <Badge variant="secondary" className="text-xs">
            null
          </Badge>
        )}
      </div>
      {hasContent && isExpanded ? <DataStructureViewer data={data} /> : null}
    </>
  );
};