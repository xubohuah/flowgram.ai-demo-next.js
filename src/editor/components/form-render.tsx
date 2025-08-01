/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { Field } from '@flowgram.ai/free-layout-editor';
import { Input } from '@app/components/ui/input';

export const FormRender = () => (
  <>
    <div className="w-full cursor-move">
      <Field<string> name="title">
        {({ field }) => <h1 className="text-xl font-bold">{field.value}</h1>}
      </Field>
    </div>
    <div className="content flex flex-col gap-3">
      <Field<string> name="input">
        {({ field }) => (
          <div className="flex justify-between items-center w-full">
            <h2 className="text-lg">Input</h2>
            <Input
              value={field.value}
              onChange={field.onChange}
              className="max-w-[200px]"
            />
          </div>
        )}
      </Field>
      <Field<string> name="output">
        {({ field }) => (
          <div className="flex justify-between items-center w-full">
            <h2 className="text-lg">Output</h2>
            <Input
              value={field.value}
              onChange={field.onChange}
              className="max-w-[200px]"
            />
          </div>
        )}
      </Field>
    </div>
  </>
);
