import { useLayoutEffect } from 'react';
import { nanoid } from 'nanoid';
import { Field, FieldArray, WorkflowNodePortsData } from '@flowgram.ai/free-layout-editor';
import { Button } from '@app/components/ui/button';
import { Input } from '@app/components/ui/input';
import { Plus, X } from 'lucide-react';
import { FormItem, Feedback } from '@editor/form-components';

interface ConditionValue {
  key: string;
  value?: {
    type: 'expression';
    content: string;
  };
}

interface ConditionInputsProps {
  readonly?: boolean;
  node?: any;
}

export function ConditionInputs({ readonly, node }: ConditionInputsProps) {
  useLayoutEffect(() => {
    if (node) {
      window.requestAnimationFrame(() => {
        node.getData<WorkflowNodePortsData>(WorkflowNodePortsData).updateDynamicPorts();
      });
    }
  }, [node]);

  return (
    <FieldArray name="conditions">
      {({ field }) => (
        <>
          {field.map((child, index) => (
            <Field<ConditionValue> key={child.name} name={child.name}>
              {({ field: childField, fieldState: childState }) => (
                <FormItem 
                  name="if" 
                  type="boolean" 
                  required={true} 
                  labelWidth={40}
                  className="relative"
                >
                  <div className="flex items-center gap-2">
                    <Input
                      value={childField.value.value?.content || ''}
                      onChange={(e) => childField.onChange({ 
                        value: { type: 'expression', content: e.target.value }, 
                        key: childField.value.key 
                      })}
                      placeholder="Enter condition expression"
                      disabled={readonly}
                      className="flex-1"
                    />

                    {!readonly && (
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={readonly}
                        onClick={() => field.delete(index)}
                        className="h-8 w-8 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <Feedback errors={childState?.errors} />
                  
                  {/* Port marker for visual flow editor */}
                  <div 
                    data-port-id={childField.value.key} 
                    data-port-type="output"
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full"
                    style={{ right: '-20px' }}
                  />
                </FormItem>
              )}
            </Field>
          ))}
          
          {!readonly && (
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                field.append({
                  key: `if_${nanoid(6)}`,
                  value: { type: 'expression', content: '' },
                })
              }
              className="w-full mt-2"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Condition
            </Button>
          )}
        </>
      )}
    </FieldArray>
  );
}