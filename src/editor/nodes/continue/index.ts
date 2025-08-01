/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { FlowNodeRegistry } from '../../typings';
import { WorkflowNodeType } from '../constants';
import { defaultFormMeta } from '../default-form-meta';

export const ContinueNodeRegistry: FlowNodeRegistry = {
  type: WorkflowNodeType.Continue,
  meta: {
    onlyInContainer: WorkflowNodeType.Loop,
    defaultPorts: [{ type: 'input' }],
    size: {
      width: 200,
      height: 100,
    },
  },
  info: {
    icon: '/icons/continue.svg',
    description: 'Continue loop execution.',
  },
  formMeta: defaultFormMeta,
  canAdd() {
    return true;
  },
};