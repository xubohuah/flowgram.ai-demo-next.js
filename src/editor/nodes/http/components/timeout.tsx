import { Field } from '@flowgram.ai/free-layout-editor';
import { FormItem } from '@editor/form-components';
import { Input } from '@app/components/ui/input';

interface TimeoutProps {
  readonly?: boolean;
}

export function Timeout({ readonly }: TimeoutProps) {
  return (
    <>
      <FormItem name="Timeout (ms)" type="number">
        <Field<number> name="timeout.timeout">
          {({ field }) => (
            <Input
              type="number"
              value={field.value || 30000}
              onChange={(e) => field.onChange(parseInt(e.target.value) || 30000)}
              disabled={readonly}
              placeholder="30000"
              min={0}
            />
          )}
        </Field>
      </FormItem>

      <FormItem name="Retries" type="number">
        <Field<number> name="timeout.retries">
          {({ field }) => (
            <Input
              type="number"
              value={field.value || 0}
              onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
              disabled={readonly}
              placeholder="0"
              min={0}
              max={10}
            />
          )}
        </Field>
      </FormItem>
    </>
  );
}