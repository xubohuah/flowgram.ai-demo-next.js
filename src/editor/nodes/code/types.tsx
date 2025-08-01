export interface CodeNodeJSON {
  title: string;
  inputsValues?: Record<string, any>;
  script: {
    language: string;
    content: string;
  };
  outputs?: {
    type: string;
    properties?: Record<string, any>;
  };
}