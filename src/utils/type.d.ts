export interface IUserRequestSidebarState {
  url: string;
  method: string;
  headers: Headers;
  responseType: string;
  requestedTime: number;
  favoritedTime: any;
  isUserFavorite: boolean;
  id: string;
  requestObject: RequestObject;
}

export interface Headers {
  "Cache-Control": string;
  Accept: string;
  "Accept-Encoding": string;
  Connection: string;
}

export interface RequestObject {
  requestMethod: string;
  requestUrl: string;
  authOption: string;
  authData: AuthData;
  bodyOption: string;
  bodyRawOption: string;
  bodyRawData: BodyRawData;
  keyValueTableData: KeyValueTableDaum[];
}

export interface IRequestHeaderInformation {
  [key: string]: string;
}

export interface IParameterKeyValueData {
  optionType: string;
  isChecked: boolean;
  key: string;
  value: string;
  description: string;
}

export interface IBodyRawData {
  text: string;
  javascript: string;
  json: string;
  html: string;
}

export interface IHeaderAuth {
  username: string;
  password: string;
  token: string;
}
