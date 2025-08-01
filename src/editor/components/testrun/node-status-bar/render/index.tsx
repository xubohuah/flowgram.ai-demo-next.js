/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { FC, useMemo, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@app/lib/utils';
import { NodeReport, WorkflowStatus } from '@flowgram.ai/runtime-interface';
import { Badge } from '@app/components/ui/badge';
import { Button } from '@app/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@app/components/ui/select';

import { NodeStatusHeader } from '../header';
import { NodeStatusGroup } from '../group';
import { IconWarningFill } from '../../../../assets/icon-warning';
import { IconSuccessFill } from '../../../../assets/icon-success';

interface NodeStatusRenderProps {
  report: NodeReport;
}

const msToSeconds = (ms: number): string => (ms / 1000).toFixed(2) + 's';
const displayCount = 6;

export const NodeStatusRender: FC<NodeStatusRenderProps> = ({ report }) => {
  const { status: nodeStatus } = report;
  const [currentSnapshotIndex, setCurrentSnapshotIndex] = useState(0);

  const snapshots = report.snapshots || [];
  const currentSnapshot = snapshots[currentSnapshotIndex] || snapshots[0];

  // 节点 5 个状态
  const isNodePending = nodeStatus === WorkflowStatus.Pending;
  const isNodeProcessing = nodeStatus === WorkflowStatus.Processing;
  const isNodeFailed = nodeStatus === WorkflowStatus.Failed;
  const isNodeSucceed = nodeStatus === WorkflowStatus.Succeeded;
  const isNodeCanceled = nodeStatus === WorkflowStatus.Canceled;

  const tagVariant = useMemo(() => {
    if (isNodeSucceed) return 'default';
    if (isNodeFailed) return 'destructive';
    if (isNodeProcessing) return 'secondary';
    return 'outline';
  }, [isNodeSucceed, isNodeFailed, isNodeProcessing]);

  const renderIcon = () => {
    if (isNodeProcessing) {
      return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />;
    }
    if (isNodeSucceed) {
      return <IconSuccessFill className="text-green-500" />;
    }
    return <IconWarningFill className="text-red-500" />;
  };

  const renderDesc = () => {
    const getDesc = () => {
      if (isNodeProcessing) {
        return 'Running';
      } else if (isNodePending) {
        return 'Run terminated';
      } else if (isNodeSucceed) {
        return 'Succeed';
      } else if (isNodeFailed) {
        return 'Failed';
      } else if (isNodeCanceled) {
        return 'Canceled';
      }
    };

    const desc = getDesc();

    return desc ? <span className="text-sm font-medium">{desc}</span> : null;
  };

  const renderCost = () => (
    <Badge variant={tagVariant} className="text-xs">
      {msToSeconds(report.timeCost)}
    </Badge>
  );

  const renderSnapshotNavigation = () => {
    if (snapshots.length <= 1) {
      return null;
    }

    const count = <p className="text-sm text-gray-600 mb-2">Total: {snapshots.length}</p>;

    if (snapshots.length <= displayCount) {
      return (
        <>
          {count}
          <div className="flex flex-wrap gap-1 mb-3">
            {snapshots.map((_, index) => (
              <Button
                key={index}
                size="sm"
                variant={currentSnapshotIndex === index ? 'default' : 'outline'}
                onClick={() => setCurrentSnapshotIndex(index)}
                className={cn(
                  "w-8 h-8 p-0 text-xs",
                  currentSnapshotIndex === index ? "bg-blue-500 hover:bg-blue-600" : ""
                )}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </>
      );
    }

    // 超过6个时，前6个显示为按钮，剩余的放在下拉选择中
    return (
      <>
        {count}
        <div className="flex flex-wrap gap-1 mb-3">
          {snapshots.slice(0, displayCount).map((_, index) => (
            <Button
              key={index}
              size="sm"
              variant={currentSnapshotIndex === index ? 'default' : 'outline'}
              onClick={() => setCurrentSnapshotIndex(index)}
              className={cn(
                "w-8 h-8 p-0 text-xs",
                currentSnapshotIndex === index ? "bg-blue-500 hover:bg-blue-600" : ""
              )}
            >
              {index + 1}
            </Button>
          ))}
          <Select
            value={currentSnapshotIndex >= displayCount ? String(currentSnapshotIndex) : undefined}
            onValueChange={(value) => setCurrentSnapshotIndex(Number(value))}
          >
            <SelectTrigger className="w-20 h-8">
              <SelectValue placeholder="More" />
            </SelectTrigger>
            <SelectContent>
              {snapshots.slice(displayCount).map((_, index) => {
                const actualIndex = index + displayCount;
                return (
                  <SelectItem key={actualIndex} value={String(actualIndex)}>
                    {actualIndex + 1}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </>
    );
  };

  if (!report) {
    return null;
  }

  return (
    <NodeStatusHeader
      header={
        <>
          {renderIcon()}
          {renderDesc()}
          {renderCost()}
        </>
      }
    >
      <div className="space-y-3">
        {isNodeFailed && currentSnapshot?.error && (
          <div className="p-2 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
            {currentSnapshot.error}
          </div>
        )}
        {renderSnapshotNavigation()}
        <NodeStatusGroup title="Inputs" data={currentSnapshot?.inputs} />
        <NodeStatusGroup title="Outputs" data={currentSnapshot?.outputs} />
        <NodeStatusGroup title="Branch" data={currentSnapshot?.branch} optional />
        <NodeStatusGroup title="Data" data={currentSnapshot?.data} optional />
      </div>
    </NodeStatusHeader>
  );
};