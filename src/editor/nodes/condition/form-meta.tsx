import { FormRenderProps, FormMeta, ValidateTrigger } from '@flowgram.ai/free-layout-editor';
import { FormHeader, FormContent } from '@editor/form-components';
import { useNodeRenderContext, useIsSidebar } from '@editor/hooks';
import { ConditionInputs } from './condition-inputs';

interface ConditionNodeJSON {
  title: string;
  conditions: Array<{
    key: string;
    value?: {
      type: 'expression';
      content: string;
    };
  }>;
}

export const renderForm = ({ form }: FormRenderProps<ConditionNodeJSON>) => {
  const { node, expanded, toggleExpand, readonly } = useNodeRenderContext();
  const isSidebar = useIsSidebar();

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
        <ConditionInputs readonly={readonly} node={node} />
      </FormContent>
    </>
  );
};

export const formMeta: FormMeta<ConditionNodeJSON> = {
  render: renderForm,
  validateTrigger: ValidateTrigger.onChange,
  validate: {
    title: ({ value }: { value: string }) => (value ? undefined : 'Title is required'),
    'conditions.*': ({ value }) => {
      if (!value?.value || !value?.value?.content) return 'Condition is required';
      return undefined;
    },
  },
};