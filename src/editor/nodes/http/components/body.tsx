import { Field } from '@flowgram.ai/free-layout-editor';
import { FormItem } from '@editor/form-components';

interface BodyProps {
  readonly?: boolean;
}

const bodyTypes = ['JSON', 'RAW', 'FORM'];

export function Body({ readonly }: BodyProps) {
  return (
    <>
      <FormItem name="Body Type">
        <Field<string> name="body.bodyType">
          {({ field }) => (
            <select
              value={field.value || 'JSON'}
              onChange={(e) => field.onChange(e.target.value)}
              disabled={readonly}
              className="h-9 px-3 py-1 text-sm border rounded-md w-full"
            >
              {bodyTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          )}
        </Field>
      </FormItem>

      <Field<string> name="body.bodyType">
        {({ field: bodyTypeField }) => (
          <FormItem name="Body Content" vertical>
            <Field<any> name="body.content">
              {({ field }) => {
                if (bodyTypeField.value === 'JSON') {
                  return (
                    <textarea
                      className="w-full h-32 p-2 font-mono text-sm border rounded-md resize-none"
                      value={typeof field.value === 'object' ? JSON.stringify(field.value, null, 2) : field.value || '{}'}
                      onChange={(e) => {
                        try {
                          const parsed = JSON.parse(e.target.value);
                          field.onChange(parsed);
                        } catch {
                          field.onChange(e.target.value);
                        }
                      }}
                      readOnly={readonly}
                      placeholder='{"key": "value"}'
                    />
                  );
                }
                
                return (
                  <textarea
                    className="w-full h-32 p-2 font-mono text-sm border rounded-md resize-none"
                    value={field.value || ''}
                    onChange={(e) => field.onChange(e.target.value)}
                    readOnly={readonly}
                    placeholder={bodyTypeField.value === 'FORM' ? 'key1=value1&key2=value2' : 'Raw body content'}
                  />
                );
              }}
            </Field>
          </FormItem>
        )}
      </Field>
    </>
  );
}