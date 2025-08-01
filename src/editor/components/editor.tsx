/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { EditorRenderer, FreeLayoutEditorProvider } from '@flowgram.ai/free-layout-editor';

import '@flowgram.ai/free-layout-editor/index.css';
import { useEditorProps } from '../hooks/use-editor-props';
import { Toolbar } from './toolbar';

export const Editor = () => {
  const editorProps = useEditorProps();
  return (
    <div className="doc-free-feature-overview">
      <FreeLayoutEditorProvider {...editorProps}>
        <div className="demo-container">
          <EditorRenderer className="demo-editor" />
        </div>
        {/* 使用新的shadcn/ui工具栏替换原来的工具栏 */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center z-50 pointer-events-none">
          <Toolbar />
        </div>
      </FreeLayoutEditorProvider>
    </div>
  );
};
