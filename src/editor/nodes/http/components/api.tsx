import { Field } from '@flowgram.ai/free-layout-editor';
import { FormItem } from '@editor/form-components';
import { Input } from '@app/components/ui/input';

interface ApiProps {
  readonly?: boolean;
}

const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

export function Api({ readonly }: ApiProps) {
  return (
    <>
      <FormItem name="Method" required>
        <Field<string> name="api.method">
          {({ field }) => (
            <select
              value={field.value || 'GET'}
              onChange={(e) => field.onChange(e.target.value)}
              disabled={readonly}
              className="h-9 px-3 py-1 text-sm border rounded-md w-full"
            >
              {methods.map((method) => (
                <option key={method} value={method}>{method}</option>
              ))}
            </select>
          )}
        </Field>
      </FormItem>
      
      <FormItem name="URL" required>
        <Field<string> name="api.url">
          {({ field }) => (
            <Input
              value={field.value || ''}
              onChange={(e) => field.onChange(e.target.value)}
              disabled={readonly}
              placeholder="https://api.example.com/endpoint"
            />
          )}
        </Field>
      </FormItem>
    </>
  );
}