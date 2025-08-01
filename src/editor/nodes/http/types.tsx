export interface HTTPNodeJSON {
  title: string;
  api: {
    method: string;
    url?: string;
  };
  body: {
    bodyType: 'JSON' | 'RAW' | 'FORM';
    content?: any;
  };
  headers?: Record<string, string>;
  headersValues?: Record<string, any>;
  params?: Record<string, string>;
  paramsValues?: Record<string, any>;
  timeout?: {
    timeout?: number;
    retries?: number;
  };
  outputs?: {
    type: string;
    properties?: Record<string, any>;
  };
}