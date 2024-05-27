import type { Response as ExpressResponse } from 'express'

enum HttpStatusCode {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501
}

export const send = (res: ExpressResponse) => {
    return {
        ok: (data: any) => res.status(HttpStatusCode.OK).json(data),
        createOk: (data: any) => res.status(HttpStatusCode.CREATED).json(data),
        notFound: () => res.status(HttpStatusCode.NOT_FOUND).send('Not found'),
        badRequest: (msg: string) => res.status(HttpStatusCode.BAD_REQUEST).send(msg),
        notImplemented: () => res.status(HttpStatusCode.NOT_IMPLEMENTED).send('Not implemented'),
        conflict: (msg: string) => res.status(HttpStatusCode.CONFLICT).send(msg),
        internalError: (msg: string) => res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(msg),
    }
}