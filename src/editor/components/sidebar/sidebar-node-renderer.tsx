/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useNodeRender, FlowNodeEntity } from '@flowgram.ai/free-layout-editor';

import { NodeRenderContext } from '../../context';

export function SidebarNodeRenderer(props: { node: FlowNodeEntity }) {
  const { node } = props;
  const nodeRender = useNodeRender(node);

  return (
    <NodeRenderContext.Provider value={nodeRender}>
      <div
        className="bg-gray-50 border border-gray-200 rounded-lg mr-2 my-2"
        style={{
          height: 'calc(100vh - 40px)',
        }}
      >
        {nodeRender.form?.render()}
      </div>
    </NodeRenderContext.Provider>
  );
}