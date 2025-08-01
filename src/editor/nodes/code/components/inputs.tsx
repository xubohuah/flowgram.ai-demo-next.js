import { Field } from '@flowgram.ai/free-layout-editor';
import { Button } from '@app/components/ui/button';
import { Input } from '@app/components/ui/input';
import { FormItem } from '@editor/form-components';
import { Plus, Trash2 } from 'lucide-react';

interface InputsProps {
  isSidebar?: boolean;
  readonly?: boolean;
}

export function Inputs({ isSidebar, readonly }: InputsProps) {
  if (!isSidebar) {
    return (
      <Field<Record<string, any> | undefined> name="inputsValues">
        {({ field }) => {
          const value = field.value || {};
          return (
            <div className="space-y-1">
              {Object.entries(value).map(([key, val]) => (
                <div key={key} className="text-xs">
                  <span className="font-medium">{key}:</span> {JSON.stringify(val)}
                </div>
              ))}
            </div>
          );
        }}
      </Field>
    );
  }

  return (
    <FormItem name="Inputs" type="object" vertical>
      <Field<Record<string, any> | undefined> name="inputsValues">
        {({ field }) => {
          const value = field.value || {};
          const entries = Object.entries(value);

          const addInput = () => {
            const newKey = `input${entries.length + 1}`;
            field.onChange({ ...value, [newKey]: '' });
          };

          const removeInput = (key: string) => {
            const newValue = { ...value };
            delete newValue[key];
            field.onChange(newValue);
          };

          const updateKey = (oldKey: string, newKey: string) => {
            if (oldKey === newKey) return;
            const newValue = { ...value };
            newValue[newKey] = newValue[oldKey];
            delete newValue[oldKey];
            field.onChange(newValue);
          };

          const updateValue = (key: string, newVal: any) => {
            field.onChange({ ...value, [key]: newVal });
          };

          return (
            <div className="space-y-2">
              {entries.map(([key, val]) => (
                <div key={key} className="flex gap-2 items-center">
                  <Input
                    value={key}
                    onChange={(e) => updateKey(key, e.target.value)}
                    disabled={readonly}
                    placeholder="Key"
                    className="w-24"
                  />
                  <Input
                    value={typeof val === 'object' ? JSON.stringify(val) : val}
                    onChange={(e) => updateValue(key, e.target.value)}
                    disabled={readonly}
                    placeholder="Value"
                    className="flex-1"
                  />
                  {!readonly && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeInput(key)}
                      className="h-8 w-8 p-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              {!readonly && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addInput}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Input
                </Button>
              )}
            </div>
          );
        }}
      </Field>
    </FormItem>
  );
}