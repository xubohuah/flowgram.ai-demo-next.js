import { nanoid } from 'nanoid';
import { FlowNodeRegistry } from '../../typings';
import { formMeta } from './form-meta';
import { WorkflowNodeType } from '../constants';

export const ConditionNodeRegistry: FlowNodeRegistry = {
  type: WorkflowNodeType.Condition,
  info: {
    icon: '/icons/condition.svg',
    description: 'Connect multiple downstream branches. Only the corresponding branch will be executed if the set conditions are met.',
  },
  meta: {
    defaultPorts: [{ type: 'input' }],
    // Condition Outputs use dynamic port
    useDynamicPort: true,
    expandable: false, // disable expanded
    size: {
      width: 360,
      height: 210,
    },
  },
  formMeta,
  onAdd() {
    return {
      id: `condition_${nanoid(5)}`,
      type: 'condition',
      data: {
        title: 'Condition',
        conditions: [
          {
            key: `if_${nanoid(5)}`,
            value: {
              type: 'expression',
              content: ''
            },
          },
          {
            key: `if_${nanoid(5)}`,
            value: {
              type: 'expression',
              content: ''
            },
          },
        ],
      },
    };
  },
  canAdd() {
    return true;
  },
};