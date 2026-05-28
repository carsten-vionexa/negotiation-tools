export type ApiClientOptions = Omit<RequestInit, "body" | "method"> & {
  query?: Record<string, string | number | boolean | null | undefined>;
};

export class ApiError extends Error {
  status: number;
  details: unknown;

  constructor(message: string, status: number, details: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

const DEFAULT_API_BASE_URL = "http://localhost:8000";

export function getApiBaseUrl() {
  const serverApiUrl = process.env.SERVER_API_URL;
  const publicApiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (typeof window === "undefined" && serverApiUrl) {
    return serverApiUrl.replace(/\/$/, "");
  }

  return (publicApiUrl ?? DEFAULT_API_BASE_URL).replace(/\/$/, "");
}

export async function apiGet<TResponse>(path: string, options?: ApiClientOptions) {
  return apiRequest<TResponse>(path, { ...options, method: "GET" });
}

export async function apiPost<TResponse, TBody = unknown>(
  path: string,
  body: TBody,
  options?: ApiClientOptions,
) {
  return apiRequest<TResponse>(path, { ...options, method: "POST", body });
}

export async function apiPostForm<TResponse>(
  path: string,
  body: FormData,
  options?: ApiClientOptions,
) {
  return apiRequest<TResponse>(path, { ...options, method: "POST", body });
}

export async function apiPatch<TResponse, TBody = unknown>(
  path: string,
  body: TBody,
  options?: ApiClientOptions,
) {
  return apiRequest<TResponse>(path, { ...options, method: "PATCH", body });
}

async function apiRequest<TResponse>(
  path: string,
  options: ApiClientOptions & { method: "GET" | "POST" | "PATCH"; body?: unknown },
) {
  const { query, headers, body, ...requestOptions } = options;
  const isFormData = body instanceof FormData;
  const response = await fetch(buildUrl(path, query), {
    ...requestOptions,
    headers: {
      Accept: "application/json",
      ...(body === undefined || isFormData ? {} : { "Content-Type": "application/json" }),
      ...headers,
    },
    body: body === undefined ? undefined : isFormData ? body : JSON.stringify(body),
  });

  const parsedBody = await parseJson(response);

  if (!response.ok) {
    throw new ApiError(getErrorMessage(parsedBody, response.statusText), response.status, parsedBody);
  }

  return parsedBody as TResponse;
}

function buildUrl(path: string, query?: ApiClientOptions["query"]) {
  const url = new URL(path.startsWith("/") ? path : `/${path}`, getApiBaseUrl());

  Object.entries(query ?? {}).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  });

  return url.toString();
}

async function parseJson(response: Response) {
  if (response.status === 204) {
    return null;
  }

  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    throw new ApiError("API response was not valid JSON.", response.status, text);
  }
}

function getErrorMessage(body: unknown, fallback: string) {
  if (isErrorBody(body) && typeof body.detail === "string") {
    return body.detail;
  }

  return fallback || "API request failed.";
}

function isErrorBody(body: unknown): body is { detail?: unknown } {
  return typeof body === "object" && body !== null && "detail" in body;
}
