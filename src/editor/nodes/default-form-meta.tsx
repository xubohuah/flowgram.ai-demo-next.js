/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {
  FormRenderProps,
  FormMeta,
  ValidateTrigger,
  FeedbackLevel,
} from '@flowgram.ai/free-layout-editor';
import { Separator } from '@app/components/ui/separator';

import { FormRender } from '../components/form-render';

export const renderForm = ({ form }: FormRenderProps<any>) => (
  <div className="p-4 space-y-4">
    <FormRender />
  </div>
);

export const defaultFormMeta: FormMeta<any> = {
  render: renderForm,
  validateTrigger: ValidateTrigger.onChange,
  /**
   * Validation rules
   */
  validate: {
    title: ({ value }) => (value ? undefined : 'Title is required'),
  },
  /**
   * Initialize (fromJSON) data transformation
   */
  formatOnInit: (value, ctx) => value,
  /**
   * Save (toJSON) data transformation
   */
  formatOnSubmit: (value, ctx) => value,
  effect: {
    // 简化版的effect，暂时为空对象
  },
};