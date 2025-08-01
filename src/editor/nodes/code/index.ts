/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { FlowNodeRegistry } from '../../typings';
import { WorkflowNodeType } from '../constants';
import { defaultFormMeta } from '../default-form-meta';

export const CodeNodeRegistry: FlowNodeRegistry = {
  type: WorkflowNodeType.Code,
  meta: {
    defaultPorts: [
      { type: 'input' },
      { type: 'output' },
    ],
    size: {
      width: 360,
      height: 200,
    },
  },
  info: {
    icon: '/icons/code.svg',
    description: 'Code execution node for custom logic.',
  },
  formMeta: defaultFormMeta,
  canAdd() {
    return true;
  },
};