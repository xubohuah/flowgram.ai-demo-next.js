import { Field, FormMeta, FormRenderProps } from '@flowgram.ai/free-layout-editor';
import { FormHeader, FormContent } from '@editor/form-components';
import { useNodeRenderContext, useIsSidebar } from '@editor/hooks';
import { Separator } from '@app/components/ui/separator';
import { HTTPNodeJSON } from './types';
import { Timeout } from './components/timeout';
import { Params } from './components/params';
import { Headers } from './components/headers';
import { Body } from './components/body';
import { Api } from './components/api';
import { defaultFormMeta } from '../default-form-meta';

export const FormRender = ({ form }: FormRenderProps<HTTPNodeJSON>) => {
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
        <Api readonly={readonly} />
        <Separator />
        <Headers readonly={readonly} />
        <Separator />
        <Params readonly={readonly} />
        <Separator />
        <Body readonly={readonly} />
        <Separator />
        <Timeout readonly={readonly} />
        <Separator />
        <div className="space-y-1">
          <div className="text-xs font-medium">Outputs:</div>
          <Field<any> name="outputs">
            {({ field }) => {
              const properties = field.value?.properties || {};
              return (
                <div className="space-y-1 pl-2">
                  {Object.entries(properties).map(([key, prop]: [string, any]) => (
                    <div key={key} className="text-xs">
                      <span className="font-medium">{key}</span>: {prop.type}
                    </div>
                  ))}
                </div>
              );
            }}
          </Field>
        </div>
      </FormContent>
    </>
  );
};

export const formMeta: FormMeta = {
  render: (props) => <FormRender {...props} />,
  effect: defaultFormMeta.effect,
};