import { Field } from '@flowgram.ai/free-layout-editor';
import { FormItem } from '@editor/form-components';
import { Button } from '@app/components/ui/button';
import { Input } from '@app/components/ui/input';
import { Plus, Trash2 } from 'lucide-react';

interface ParamsProps {
  readonly?: boolean;
}

export function Params({ readonly }: ParamsProps) {
  return (
    <FormItem name="Query Parameters" type="object" vertical>
      <Field<Record<string, any> | undefined> name="paramsValues">
        {({ field }) => {
          const value = field.value || {};
          const entries = Object.entries(value);

          const addParam = () => {
            const newKey = 'param';
            let key = newKey;
            let index = 1;
            while (value[key]) {
              key = `${newKey}${index++}`;
            }
            field.onChange({ ...value, [key]: '' });
          };

          const removeParam = (key: string) => {
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
              <div className="grid grid-cols-2 gap-2 text-xs font-medium text-gray-600">
                <div>Parameter Name</div>
                <div>Value</div>
              </div>
              {entries.map(([key, val]) => (
                <div key={key} className="flex gap-2 items-center">
                  <Input
                    value={key}
                    onChange={(e) => updateKey(key, e.target.value)}
                    disabled={readonly}
                    placeholder="Parameter name"
                    className="flex-1"
                  />
                  <Input
                    value={val}
                    onChange={(e) => updateValue(key, e.target.value)}
                    disabled={readonly}
                    placeholder="Parameter value"
                    className="flex-1"
                  />
                  {!readonly && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeParam(key)}
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
                  onClick={addParam}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Parameter
                </Button>
              )}
            </div>
          );
        }}
      </Field>
    </FormItem>
  );
}