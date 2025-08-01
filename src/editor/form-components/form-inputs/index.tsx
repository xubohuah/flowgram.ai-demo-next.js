/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { Field } from '@flowgram.ai/free-layout-editor';
import { Input } from '@app/components/ui/input';
import { Textarea } from '@app/components/ui/textarea';

import { FormItem } from '../form-item';
import { Feedback } from '../feedback';
import { JsonSchema } from '../../typings';
import { useNodeRenderContext } from '../../hooks';

export function FormInputs() {
  const { readonly } = useNodeRenderContext();

  return (
    <Field<JsonSchema> name="inputs">
      {({ field: inputsField }) => {
        const required = inputsField.value?.required || [];
        const properties = inputsField.value?.properties;
        
        if (!properties) {
          return <></>;
        }
        
        const content = Object.keys(properties).map((key) => {
          const property = properties[key];
          const formComponent = property.extra?.formComponent;
          const vertical = ['prompt-editor'].includes(formComponent || '');
          
          return (
            <Field key={key} name={`inputsValues.${key}`} defaultValue={property.default}>
              {({ field, fieldState }) => (
                <FormItem
                  name={key}
                  vertical={vertical}
                  type={property.type as string}
                  required={required.includes(key)}
                  description={property.description}
                >
                  {formComponent === 'prompt-editor' ? (
                    <Textarea
                      value={field.value || ''}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => field.onChange(e.target.value)}
                      disabled={readonly}
                      className={`min-h-[100px] ${fieldState?.errors ? 'border-red-500' : ''}`}
                      placeholder={property.placeholder || `Enter ${key}`}
                    />
                  ) : (
                    <Input
                      value={field.value || ''}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => field.onChange(e.target.value)}
                      disabled={readonly}
                      className={fieldState?.errors ? 'border-red-500' : ''}
                      placeholder={property.placeholder || `Enter ${key}`}
                    />
                  )}
                  <Feedback errors={fieldState?.errors} warnings={fieldState?.warnings} />
                </FormItem>
              )}
            </Field>
          );
        });
        
        return <>{content}</>;
      }}
    </Field>
  );
}