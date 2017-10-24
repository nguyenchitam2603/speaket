let isRelativeUrl = require('is-relative-url');

export class RestClientService {
  private static restClientService;
  private readonly headers: Headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });
  private readonly baseUrl: string = window.location.protocol
  + '//' + window.location.hostname + ':'
  + (process.env.PORT || window.location.port) + '/';

  private constructor() { }

  public static getInstance(): RestClientService {
    if (!RestClientService.restClientService) {
      RestClientService.restClientService = new RestClientService();
    }

    return RestClientService.restClientService;
  }

  public get(url: string, customHeaders?: Headers): Promise<any> {
    let headers: Headers = customHeaders ? customHeaders : this.headers;
    // The url can be a relative or absolute url
    return fetch(isRelativeUrl(url) ? (this.baseUrl + url) : url, {
      method: 'GET',
      headers: headers,
      credentials: 'include',
    }).then((response: Response) => {
      return response.json().then(data => {
        if (response.ok) {
          return data;
        } else {
          return Promise.reject(data);
        }
      });
    });
  }

  public post(url: string, payload: any, customHeaders?: Headers): Promise<any> {
    let headers: Headers = customHeaders ? customHeaders : this.headers;
    // The url can be a relative or absolute url
    return fetch(isRelativeUrl(url) ? (this.baseUrl + url) : url, {
      method: 'POST',
      headers: headers,
      credentials: 'include',
      body: JSON.stringify(payload)
    }).then((response: Response) => {
      return response.json().then(data => {
        if (response.ok) {
          return data;
        } else {
          return Promise.reject(data);
        }
      });
    });
  }

  public put(url: string, payload: any, customHeaders?: Headers): Promise<any> {
    let headers: Headers = customHeaders ? customHeaders : this.headers;
    // The url can be a relative or absolute url
    return fetch(isRelativeUrl(url) ? (this.baseUrl + url) : url, {
      method: 'PUT',
      headers: headers,
      credentials: 'include',
      body: JSON.stringify(payload)
    }).then((response: Response) => {
      return response.json();
    });
  }

  public delete(url: string, customHeaders?: Headers): Promise<any> {
    let headers: Headers = customHeaders ? customHeaders : this.headers;
    // The url can be a relative or absolute url
    return fetch(isRelativeUrl(url) ? (this.baseUrl + url) : url, {
      method: 'DELETE',
      headers: headers,
      credentials: 'include',
    }).then((response: Response) => {
      return response.json();
    });
  }
}
