type QueryParam = string | boolean | number | null | undefined | Array<string | boolean | number>;

type QueryParams = Record<string, QueryParam>;

type ApiRequestOption<TBody = unknown> = Omit<RequestInit,'body'> & {
    params? : QueryParams,
    body? : TBody,
    errorMessage? : string 
}

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL ?? "/api").replace(/\/$/,"");

function createApiUrl(path:string,params?: QueryParams){
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    const searchParams = new URLSearchParams();

    for(const [key,value] of Object.entries(params ?? {})){
        if(value === null || value === undefined || value === ""){
            continue;
        }

        if(Array.isArray(value)){
            value.forEach((entry) => {
                searchParams.append(key,String(entry))
            })
            continue;
        }

        searchParams.append(key,String(value));
    }

    const query = searchParams.toString();
    return `${API_BASE_URL}${normalizedPath}${query ? `?${query}` : ""}`
}

function createRequestBody<TBody>(body : TBody | undefined, headers : Headers){
    if(body === null || body === undefined){
        return undefined;
    }

    if(body instanceof FormData ||
        body instanceof Blob ||
        body instanceof ArrayBuffer ||
        body instanceof URLSearchParams ||
        typeof body === 'string'
    ){
        return body;
    }

    if(!headers.has('content-type')){
        headers.set('content-type','application/json')
    }

    return JSON.stringify(body);
}

async function getErrorMessage(response : Response, defaultErrMessage: string){
   const contentType = response.headers.get('content-type');

   if(contentType?.includes('application/json')){
      const data = (await response.json()) as {message? : string}

      return data.message ?? defaultErrMessage;
   }

   const text = await response.text();

   return text || defaultErrMessage
}


async function apiRequest<TResponse, TBody = unknown>(
    path : string, 
    {params,body,headers,errorMessage = "Request Failed",...options} : ApiRequestOption<TBody> = {})
: Promise<TResponse>{
    const resolvedHeaders = new Headers(headers);
    const resolveBody = createRequestBody(body,resolvedHeaders);
    const response = await fetch(createApiUrl(path,params) , {
        ...options,
        headers : resolvedHeaders,
        body : resolveBody,
    })

    if(!response.ok){
        throw new Error(await getErrorMessage(response,errorMessage))
    }

    if(response.status === 204){
         return undefined as TResponse;
    }

    const contentType = response.headers.get('content-type');
    if(contentType?.includes('application/json')){
        return response.json() as Promise<TResponse>
    }

    return response.text() as Promise<TResponse>
}

export async function apiGet<TResponse>(
    path : string,
    options? : Omit<ApiRequestOption, 'body'>
){
  return apiRequest<TResponse>(path, {
     ...options,
     method : 'GET'
  })
}

export async function apiPost<TResponse,TBody>(
    path : string,
    body : TBody,
    options? : Omit<ApiRequestOption<TBody>,'body'>
){
 return await apiRequest<TResponse>(path,{
    ...options,
    body,
    method : 'POST'
 })
}

export async function apiPut<TResponse,TBody>(
    path : string,
    body : TBody,
    options? : Omit<ApiRequestOption<TBody>,'body'>
) {
    return await apiRequest<TResponse>(path,{
        ...options,
        body,
        method : 'PUT'
    })
}

export async function apiDelete<TResponse,TBody>(
    path : string,
    options? : Omit<ApiRequestOption<TBody>,'body'>
) {
    return await apiRequest<TResponse>(path,{
        ...options,
        method : 'DELETE'
    })
}

export async function apiPatch<TResponse,TBody>(
    path : string,
    body : TBody,
    options? : Omit<ApiRequestOption<TBody>,'body'>
) {
    return await apiRequest<TResponse>(path,{
        ...options,
        body,
        method : 'PATCH'
    })
}