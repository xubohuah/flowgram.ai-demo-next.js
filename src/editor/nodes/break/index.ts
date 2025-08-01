/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { FlowNodeRegistry } from '../../typings';
import { WorkflowNodeType } from '../constants';
import { defaultFormMeta } from '../default-form-meta';

export const BreakNodeRegistry: FlowNodeRegistry = {
  type: WorkflowNodeType.Break,
  meta: {
    onlyInContainer: WorkflowNodeType.Loop,
    defaultPorts: [{ type: 'input' }],
    size: {
      width: 200,
      height: 100,
    },
  },
  info: {
    icon: '/icons/break.svg',
    description: 'Break loop execution.',
  },
  formMeta: defaultFormMeta,
  canAdd() {
    return true;
  },
};