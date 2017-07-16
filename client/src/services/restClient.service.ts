export class RestClientService {
  private static restClientService;
  private readonly headers: Headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  private constructor() { }

  public static getInstance(): RestClientService {
    if (!RestClientService.restClientService) {
      RestClientService.restClientService = new RestClientService();
    }

    return RestClientService.restClientService;
  }

  public get(url: string, customHeaders?: Headers): Promise<any> {
    let headers: Headers = customHeaders ? customHeaders : this.headers;

    return fetch(url, {
      method: 'GET',
      headers: headers
    }).then((response: Response) => {
      return response.json();
    });
  }

  public post(url: string, payload: any, customHeaders?: Headers): Promise<any> {
    let headers: Headers = customHeaders ? customHeaders : this.headers;

    return fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    }).then((response: Response) => {
      return response.json();
    });
  }

  public put(url: string, payload: any, customHeaders?: Headers): Promise<any> {
    let headers: Headers = customHeaders ? customHeaders : this.headers;

    return fetch(url, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(payload)
    }).then((response: Response) => {
      return response.json();
    });
  }

  public delete(url: string, customHeaders?: Headers): Promise<any> {
    let headers: Headers = customHeaders ? customHeaders : this.headers;

    return fetch(url, {
      method: 'DELETE',
      headers: headers
    }).then((response: Response) => {
      return response.json();
    });
  }
}
