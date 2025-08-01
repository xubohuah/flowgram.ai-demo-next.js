import { FormMeta, FormRenderProps } from '@flowgram.ai/free-layout-editor';
import { FormHeader, FormContent } from '@editor/form-components';
import { useNodeRenderContext, useIsSidebar } from '@editor/hooks';
import { CodeNodeJSON } from './types';
import { Outputs } from './components/outputs';
import { Inputs } from './components/inputs';
import { Code } from './components/code';
import { defaultFormMeta } from '../default-form-meta';

export const FormRender = ({ form }: FormRenderProps<CodeNodeJSON>) => {
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
        <Inputs isSidebar={isSidebar} readonly={readonly} />
        <Code isSidebar={isSidebar} readonly={readonly} />
        <Outputs isSidebar={isSidebar} readonly={readonly} />
      </FormContent>
    </>
  );
};

export const formMeta: FormMeta = {
  render: (props) => <FormRender {...props} />,
  effect: defaultFormMeta.effect,
};