import { Field } from '@flowgram.ai/free-layout-editor';
import { Separator } from '@app/components/ui/separator';
import { FormItem } from '@editor/form-components';

interface CodeProps {
  isSidebar?: boolean;
  readonly?: boolean;
}

export function Code({ isSidebar, readonly }: CodeProps) {
  if (!isSidebar) {
    return null;
  }

  return (
    <>
      <Separator className="my-2" />
      <FormItem name="Code" vertical>
        <Field<string> name="script.content">
          {({ field }) => (
            <textarea
              className="w-full h-64 p-2 font-mono text-sm border rounded-md bg-gray-900 text-gray-100 resize-none"
              value={field.value || ''}
              onChange={(e) => field.onChange(e.target.value)}
              readOnly={readonly}
              placeholder="// Write your code here..."
            />
          )}
        </Field>
      </FormItem>
    </>
  );
}