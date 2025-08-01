import { nanoid } from 'nanoid';
import { WorkflowNodeType } from '../constants';
import { formMeta } from './form-meta';

let index = 0;

const defaultCode = `// Here, you can retrieve input variables from the node using 'params' and output results using 'ret'.
// 'params' has been correctly injected into the environment.
// Here's an example of getting the value of the parameter named 'input' from the node input:
// const input = params.input;
// Here's an example of outputting a 'ret' object containing multiple data types:
// const ret = { "name": 'Xiaoming', "hobbies": ["Reading", "Traveling"] };

async function main({ params }) {
    // Build the output object
    const ret = {
        "key0": params.input + params.input, // Concatenate the input parameter 'input' twice
        "key1": ["hello", "world"], // Output an array
        "key2": { // Output an Object
            "key21": "hi"
        },
    };

    return ret;
}`;

export const CodeNodeRegistry = {
  type: WorkflowNodeType.Code,
  info: {
    icon: '/icons/code.svg',
    description: 'Run custom JavaScript code with inputs and outputs.',
  },
  meta: {
    defaultPorts: [
      { type: 'input' },
      { type: 'output' },
    ],
    size: {
      width: 360,
      height: 390,
    },
  },
  onAdd() {
    return {
      id: `code_${nanoid(5)}`,
      type: 'code',
      data: {
        title: `Code_${++index}`,
        inputsValues: {
          input: '',
        },
        script: {
          language: 'javascript',
          content: defaultCode,
        },
        outputs: {
          type: 'object',
          properties: {
            key0: {
              type: 'string',
            },
            key1: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
            key2: {
              type: 'object',
              properties: {
                key21: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    };
  },
  formMeta: formMeta,
  canAdd() {
    return true;
  },
};