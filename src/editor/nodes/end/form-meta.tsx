/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {
  FormRenderProps,
  FormMeta,
  ValidateTrigger,
} from '@flowgram.ai/free-layout-editor';

import { FormRender } from '../../components/form-render';

export const renderForm = ({ form }: FormRenderProps<any>) => {
  return (
    <div className="p-4">
      <FormRender />
    </div>
  );
};

export const formMeta: FormMeta<any> = {
  render: renderForm,
  validateTrigger: ValidateTrigger.onChange,
  validate: {
    title: ({ value }: { value: string }) => (value ? undefined : 'Title is required'),
  },
  effect: {},
};