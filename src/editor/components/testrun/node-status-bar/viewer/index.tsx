/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, { useState } from 'react';
import { toast } from 'sonner';
import { cn } from '@app/lib/utils';

interface DataStructureViewerProps {
  data: any;
  level?: number;
}

interface TreeNodeProps {
  label: string;
  value: any;
  level: number;
  isLast?: boolean;
}

const TreeNode: React.FC<TreeNodeProps> = ({ label, value, level, isLast = false }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied');
  };

  const isExpandable = (val: any) =>
    val !== null &&
    typeof val === 'object' &&
    ((Array.isArray(val) && val.length > 0) ||
      (!Array.isArray(val) && Object.keys(val).length > 0));

  const renderPrimitiveValue = (val: any) => {
    if (val === null)
      return <span className="text-gray-500 italic">null</span>;
    if (val === undefined)
      return <span className="text-gray-500 italic">undefined</span>;

    switch (typeof val) {
      case 'string':
        return (
          <span>
            <span className="text-gray-400">{'"'}</span>
            <span
              className="text-green-600 cursor-pointer hover:bg-green-50"
              onDoubleClick={() => handleCopy(val)}
            >
              {val}
            </span>
            <span className="text-gray-400">{'"'}</span>
          </span>
        );
      case 'number':
        return (
          <span
            className="text-blue-600 cursor-pointer hover:bg-blue-50"
            onDoubleClick={() => handleCopy(String(val))}
          >
            {val}
          </span>
        );
      case 'boolean':
        return (
          <span
            className="text-purple-600 cursor-pointer hover:bg-purple-50"
            onDoubleClick={() => handleCopy(val.toString())}
          >
            {val.toString()}
          </span>
        );
      case 'object':
        // Handle empty objects and arrays
        if (Array.isArray(val)) {
          return (
            <span className="text-gray-600 cursor-pointer hover:bg-gray-50" onDoubleClick={() => handleCopy('[]')}>
              []
            </span>
          );
        } else {
          return (
            <span className="text-gray-600 cursor-pointer hover:bg-gray-50" onDoubleClick={() => handleCopy('{}')}>
              {'{}'}
            </span>
          );
        }
      default:
        return (
          <span className="text-gray-600 cursor-pointer hover:bg-gray-50" onDoubleClick={() => handleCopy(String(val))}>
            {String(val)}
          </span>
        );
    }
  };

  const renderChildren = () => {
    if (Array.isArray(value)) {
      return value.map((item, index) => (
        <TreeNode
          key={index}
          label={`${index + 1}.`}
          value={item}
          level={level + 1}
          isLast={index === value.length - 1}
        />
      ));
    } else {
      const entries = Object.entries(value);
      return entries.map(([key, val], index) => (
        <TreeNode
          key={key}
          label={`${key}:`}
          value={val}
          level={level + 1}
          isLast={index === entries.length - 1}
        />
      ));
    }
  };

  return (
    <div className="text-sm">
      <div className="flex items-start gap-1">
        {isExpandable(value) ? (
          <button
            className={cn(
              "w-4 h-4 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-transform",
              isExpanded ? "rotate-90" : ""
            )}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            ▶
          </button>
        ) : (
          <span className="w-4"></span>
        )}
        <span
          className="font-medium text-gray-700 cursor-pointer hover:bg-gray-100 px-1 rounded"
          onClick={() =>
            handleCopy(
              JSON.stringify({
                [label]: value,
              })
            )
          }
        >
          {label}
        </span>
        {!isExpandable(value) && (
          <span className="ml-1">{renderPrimitiveValue(value)}</span>
        )}
      </div>
      {isExpandable(value) && isExpanded && (
        <div className="ml-4 border-l border-gray-200 pl-2 mt-1">{renderChildren()}</div>
      )}
    </div>
  );
};

export const DataStructureViewer: React.FC<DataStructureViewerProps> = ({ data, level = 0 }) => {
  if (data === null || data === undefined || typeof data !== 'object') {
    return (
      <div className="p-2 bg-gray-50 rounded border">
        <TreeNode label="value" value={data} level={0} />
      </div>
    );
  }

  const entries = Object.entries(data);

  return (
    <div className="p-2 bg-gray-50 rounded border">
      {entries.map(([key, value], index) => (
        <TreeNode
          key={key}
          label={`${key}:`}
          value={value}
          level={0}
          isLast={index === entries.length - 1}
        />
      ))}
    </div>
  );
};