export class ResponseError extends Error {
  public response: Response;

  constructor(response: Response) {
    super(response.statusText);
    this.response = response;
  }
}

export interface RequestFetchOptions extends RequestInit {
  errorAsJson?: boolean;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export async function request(
  url: string,
  options?: RequestFetchOptions,
  file?: boolean,
): Promise<{} | { err: ResponseError }> {
  const fetchResponse = await fetch(url, options);
  if (fetchResponse.status >= 200 && fetchResponse.status < 300) {
    if (fetchResponse.status === 204 || fetchResponse.status === 205) {
      return Promise.resolve({});
    }
    if (file) {
      return fetchResponse;
    }
    return fetchResponse.json();
  }
  if (options?.errorAsJson) {
    return fetchResponse.json().then(data => {
      const error = new ResponseError(fetchResponse);
      error.response = data;
      throw error;
    });
  } else {
    const error = new ResponseError(fetchResponse);
    error.response = fetchResponse;
    throw error;
  }
}
