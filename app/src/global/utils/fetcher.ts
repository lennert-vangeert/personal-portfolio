import axios, { AxiosError } from "axios";

/**
 * Configuration options for an HTTP request.
 *
 * @property {string} url - The URL to which the request is sent.
 * @property {string} method - The HTTP method to use for the request (e.g., "GET", "POST"). Defaults to "GET" if not provided.
 * @property {Record<string, string>} headers - The headers to include in the request. Defaults to a JSON content type header if not provided.
 * @property {any} data - The body of the request, typically used for POST or PUT requests.
 */
export const fetch = async (
  url: string,
  method: string = "GET",
  headers: Record<string, string> = { "Content-Type": "application/json" },
  body?: string
): Promise<any> => {
  const options = {
    method,
    headers,
    url,
    data: body,
  };

  try {
    const response = await axios(options);
    return response.data;
  } catch (err) {
    const error = err as AxiosError;

    if (axios.isAxiosError(error)) {
      // Handle rate limiting (429)
      if (error.response?.status === 429) {
        return {
          error:
            "Too many requests. Please slow down and try again in 15 minutes.",
        };
      }

      // Handle other API errors
      return {
        error:
          (error.response?.data as any)?.error ||
          error.response?.statusText ||
          error.message,
      };
    }

    // Handle unexpected errors
    return { error: "Unexpected error occurred." };
  }
};
