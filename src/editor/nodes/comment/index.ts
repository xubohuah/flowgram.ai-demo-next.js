/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { FlowNodeRegistry } from '../../typings';
import { WorkflowNodeType } from '../constants';
import { defaultFormMeta } from '../default-form-meta';

export const CommentNodeRegistry: FlowNodeRegistry = {
  type: WorkflowNodeType.Comment,
  meta: {
    defaultPorts: [],
    size: {
      width: 200,
      height: 100,
    },
  },
  info: {
    icon: '/icons/comment.svg',
    description: 'Comment node for documentation.',
  },
  formMeta: defaultFormMeta,
  canAdd() {
    return true;
  },
};