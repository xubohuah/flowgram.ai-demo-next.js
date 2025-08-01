import { nanoid } from 'nanoid';
import { WorkflowNodeEntity, PositionSchema, FlowNodeTransformData, FormMeta } from '@flowgram.ai/free-layout-editor';
import { FlowNodeRegistry } from '../../typings';
import { WorkflowNodeType } from '../constants';
import { LoopFormRender } from './loop-form-render';
import { defaultFormMeta } from '../default-form-meta';

let index = 0;

const formMeta: FormMeta = {
  ...defaultFormMeta,
  render: LoopFormRender,
};

export const LoopNodeRegistry: FlowNodeRegistry = {
  type: WorkflowNodeType.Loop,
  info: {
    icon: '/icons/loop.svg',
    description: 'Used to repeatedly execute a series of tasks by setting the number of iterations and logic.',
  },
  meta: {
    /**
     * Mark as subcanvas
     */
    isContainer: true,
    /**
     * The subcanvas default size setting
     */
    size: {
      width: 424,
      height: 244,
    },
    /**
     * The subcanvas padding setting
     */
    padding: () => ({
      top: 120,
      bottom: 60,
      left: 60,
      right: 60,
    }),
    /**
     * Controls the node selection status within the subcanvas
     */
    selectable(node: WorkflowNodeEntity, mousePos?: PositionSchema): boolean {
      if (!mousePos) {
        return true;
      }
      const transform = node.getData<FlowNodeTransformData>(FlowNodeTransformData);
      return !transform.bounds.contains(mousePos.x, mousePos.y);
    },
    expandable: false, // disable expanded
    wrapperStyle: {
      minWidth: 'unset',
      width: '100%',
    },
  },
  onAdd() {
    return {
      id: `loop_${nanoid(5)}`,
      type: WorkflowNodeType.Loop,
      data: {
        title: `Loop_${++index}`,
        loopFor: {
          type: 'ref',
          content: ''
        }
      },
      blocks: [
        {
          id: `block_start_${nanoid(5)}`,
          type: WorkflowNodeType.BlockStart,
          meta: {
            position: {
              x: -80,
              y: 120,
            },
          },
          data: {},
        },
        {
          id: `block_end_${nanoid(5)}`,
          type: WorkflowNodeType.BlockEnd,
          meta: {
            position: {
              x: 80,
              y: 120,
            },
          },
          data: {},
        },
      ],
    };
  },
  formMeta,
  canAdd() {
    return true;
  },
};