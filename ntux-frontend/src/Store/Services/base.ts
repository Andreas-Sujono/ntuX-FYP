import axios, { CancelToken } from 'axios';
import {
  parseObjectToCamelCase,
  parseObjectToSnakeCase,
  camelToSnake,
} from '../../common/utils';

export interface ApiResponse {
  errorCode: number;
  status: number;
}

export type ApiRequestData = Record<string, any> | FormData;

export default class BaseService {
  _baseUrl: string;
  _cancelToken: CancelToken | null;

  constructor({
    baseUrl = '',
    cancelToken = null,
  }: {
    baseUrl: string;
    cancelToken: CancelToken | null;
  }) {
    this._baseUrl = baseUrl;
    this._cancelToken = cancelToken;
  }

  joinURL = (...args: string[]) => {
    return args.join('');
  };

  parseData = (data: ApiRequestData, config: any = {}) => {
    const headersPayload = config?.headers || { headers: {} };

    if (headersPayload['Content-Type'] === undefined) {
      headersPayload['Content-Type'] = 'application/json';
    } else if (headersPayload['Content-Type'] === null) {
      delete headersPayload['Content-Type'];
    }

    switch (headersPayload['Content-Type']) {
      case 'application/json':
        return { data: parseObjectToSnakeCase(data), config };
      case 'multipart/form-data':
      default: {
        if (data instanceof FormData) {
          const fd: any = new FormData();
          for (const key of data.keys()) {
            fd.append(camelToSnake(key), data.get(key));
          }

          const formConfig = {};
          return { data: fd, config: formConfig };
        }
        return { data: parseObjectToSnakeCase(data), config };
      }
    }
  };

  getRequest = async (url: string) => {
    try {
      const response: ApiResponse = await axios.get(
        this.joinURL(this._baseUrl, url),
      );
      if (response.errorCode === 401 || response.status === 401) {
        // unauthorized
        localStorage.clear();
      }
      return parseObjectToCamelCase(response);
    } catch (err: any) {
      return {
        data: {
          errorCode: err.response.status,
          ...err.response.data,
        },
      };
    }
  };

  postRequest = async (url: string, data: ApiRequestData, config: any = {}) => {
    try {
      const parsedData = this.parseData(data, config);
      const response: ApiResponse = await axios.post(
        this.joinURL(this._baseUrl, url),
        parsedData.data,
        {
          ...parsedData.config,
          cancelToken: this._cancelToken,
        },
      );
      return parseObjectToCamelCase(response);
    } catch (err: any) {
      return {
        data: {
          errorCode: err.response.status,
          ...err.response.data,
        },
      };
    }
  };

  putRequest = async (url: string, data: ApiRequestData, config: any = {}) => {
    try {
      const parsedData = this.parseData(data, config);
      const response: ApiResponse = await axios.put(
        this.joinURL(this._baseUrl, url),
        parsedData.data,
        {
          ...parsedData.config,
          cancelToken: this._cancelToken,
        },
      );
      return parseObjectToCamelCase(response);
    } catch (err: any) {
      return {
        data: {
          errorCode: err.response.status,
          ...err.response.data,
        },
      };
    }
  };

  patchRequest = async (
    url: string,
    data: ApiRequestData,
    config: any = {},
  ) => {
    try {
      const parsedData = this.parseData(data, config);
      const response: ApiResponse = await axios.patch(
        this.joinURL(this._baseUrl, url),
        parsedData.data,
        {
          ...parsedData.config,
          cancelToken: this._cancelToken,
        },
      );
      return parseObjectToCamelCase(response);
    } catch (err: any) {
      return {
        data: {
          errorCode: err.response.status,
          ...err.response.data,
        },
      };
    }
  };

  deleteRequest = async (
    url: string,
    data: ApiRequestData,
    config: any = {},
  ) => {
    try {
      const parsedData = this.parseData(data, config);
      const response: ApiResponse = await axios.delete(
        this.joinURL(this._baseUrl, url),
        parsedData.data,
      );
      return parseObjectToCamelCase(response);
    } catch (err: any) {
      return {
        data: {
          errorCode: err.response.status,
          ...err.response.data,
        },
      };
    }
  };
}
