import { FormRenderProps, Field } from '@flowgram.ai/free-layout-editor';
import { FormHeader, FormContent, FormItem, Feedback } from '@editor/form-components';
import { useNodeRenderContext, useIsSidebar } from '@editor/hooks';
import { Input } from '@app/components/ui/input';

interface LoopNodeJSON {
  title: string;
  loopFor?: {
    type: 'ref' | 'constant';
    content: string;
  };
  loopOutputs?: Record<string, any>;
}

export const LoopFormRender = ({ form }: FormRenderProps<LoopNodeJSON>) => {
  const { node, expanded, toggleExpand, readonly } = useNodeRenderContext();
  const isSidebar = useIsSidebar();

  const loopFor = (
    <Field<any> name="loopFor">
      {({ field, fieldState }) => (
        <FormItem name="Loop Array" type="array" required>
          <Input
            value={field.value?.content || ''}
            onChange={(e) => field.onChange({ type: 'ref', content: e.target.value })}
            disabled={readonly}
            placeholder="Enter array variable name"
            className={fieldState?.errors ? 'border-red-500' : ''}
          />
          <Feedback errors={fieldState?.errors} />
        </FormItem>
      )}
    </Field>
  );

  const loopOutputs = (
    <Field<Record<string, any> | undefined> name="loopOutputs">
      {({ field, fieldState }) => (
        <FormItem name="Loop Outputs" type="object" vertical>
          <div className="p-2 border rounded-md bg-gray-50">
            <div className="text-xs text-gray-600">
              Loop outputs will be collected into an array after all iterations complete.
            </div>
          </div>
          <Feedback errors={fieldState?.errors} />
        </FormItem>
      )}
    </Field>
  );

  if (isSidebar) {
    return (
      <>
        <FormHeader 
          node={node}
          expanded={expanded}
          toggleExpand={toggleExpand}
          readonly={readonly}
          isSidebar={isSidebar}
        />
        <FormContent node={node} expanded={expanded} isSidebar={isSidebar}>
          {loopFor}
          {loopOutputs}
        </FormContent>
      </>
    );
  }

  return (
    <>
      <FormHeader 
        node={node}
        expanded={expanded}
        toggleExpand={toggleExpand}
        readonly={readonly}
        isSidebar={isSidebar}
      />
      <FormContent node={node} expanded={expanded} isSidebar={isSidebar}>
        {loopFor}
        <div className="p-4 border-2 border-dashed border-gray-300 rounded-md min-h-[100px] text-center text-gray-500 text-sm">
          Loop container - Drag nodes here
        </div>
        <div className="text-xs text-gray-600">
          <div className="font-medium">Outputs:</div>
          <div>Loop results will be collected as an array</div>
        </div>
      </FormContent>
    </>
  );
};