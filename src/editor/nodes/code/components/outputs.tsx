import { Field } from '@flowgram.ai/free-layout-editor';
import { Separator } from '@app/components/ui/separator';
import { FormItem } from '@editor/form-components';
import { Button } from '@app/components/ui/button';
import { Input } from '@app/components/ui/input';
import { Plus, Trash2 } from 'lucide-react';

interface OutputsProps {
  readonly?: boolean;
  isSidebar?: boolean;
}

interface JsonSchema {
  type: string;
  properties?: Record<string, any>;
}

export function Outputs({ readonly, isSidebar }: OutputsProps) {
  if (!isSidebar) {
    return (
      <>
        <Separator className="my-2" />
        <Field<JsonSchema> name="outputs">
          {({ field }) => {
            const properties = field.value?.properties || {};
            return (
              <div className="space-y-1">
                <div className="text-xs font-medium">Outputs:</div>
                {Object.entries(properties).map(([key, prop]) => (
                  <div key={key} className="text-xs pl-2">
                    <span className="font-medium">{key}</span>: {prop.type}
                  </div>
                ))}
              </div>
            );
          }}
        </Field>
      </>
    );
  }

  return (
    <>
      <Separator className="my-2" />
      <FormItem name="Outputs" type="object" vertical>
        <Field<JsonSchema> name="outputs">
          {({ field }) => {
            const value = field.value || { type: 'object', properties: {} };
            const properties = value.properties || {};
            const entries = Object.entries(properties);

            const addOutput = () => {
              const newKey = `output${entries.length + 1}`;
              field.onChange({
                ...value,
                properties: {
                  ...properties,
                  [newKey]: { type: 'string' }
                }
              });
            };

            const removeOutput = (key: string) => {
              const newProperties = { ...properties };
              delete newProperties[key];
              field.onChange({
                ...value,
                properties: newProperties
              });
            };

            const updateKey = (oldKey: string, newKey: string) => {
              if (oldKey === newKey) return;
              const newProperties = { ...properties };
              newProperties[newKey] = newProperties[oldKey];
              delete newProperties[oldKey];
              field.onChange({
                ...value,
                properties: newProperties
              });
            };

            const updateType = (key: string, type: string) => {
              field.onChange({
                ...value,
                properties: {
                  ...properties,
                  [key]: { ...properties[key], type }
                }
              });
            };

            return (
              <div className="space-y-2">
                {entries.map(([key, prop]) => (
                  <div key={key} className="flex gap-2 items-center">
                    <Input
                      value={key}
                      onChange={(e) => updateKey(key, e.target.value)}
                      disabled={readonly}
                      placeholder="Key"
                      className="w-24"
                    />
                    <select
                      value={prop.type}
                      onChange={(e) => updateType(key, e.target.value)}
                      disabled={readonly}
                      className="flex-1 h-9 px-3 py-1 text-sm border rounded-md"
                    >
                      <option value="string">string</option>
                      <option value="number">number</option>
                      <option value="boolean">boolean</option>
                      <option value="object">object</option>
                      <option value="array">array</option>
                    </select>
                    {!readonly && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeOutput(key)}
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
                    onClick={addOutput}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Output
                  </Button>
                )}
              </div>
            );
          }}
        </Field>
      </FormItem>
    </>
  );
}