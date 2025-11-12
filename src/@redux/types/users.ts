export interface IUsersApi {
    _id: string,
    email: string,
    role: "user" | "admin",
    credit: number,
    password: string,
    reset_password_expiration: number,
    reset_link_hash: string,
    createdAt: number,
};


export interface ResponseType {
    [key: string]: any
};

/*STATE**************************************************************************************************************/

export interface INITIALSTATE {
    user: IUsersApi[] | null,
    status: ResponseType,
    errors: ResponseType,
};

/*ACTION**************************************************************************************************************/

export enum TYPES {
    USERS_UPDATE = "USERS_UPDATE",
    USERS_RESPONSE_STATUS = "USERS_RESPONSE_STATUS",
    USERS_RESPONSE_ERROR  = "USERS_RESPONSE_ERROR",
};

interface Update {
    type: TYPES.USERS_UPDATE,
    payload: IUsersApi
};

interface Response_Status {
    type: TYPES.USERS_RESPONSE_STATUS,
    payload: ResponseType;
};

interface Response_Error {
    type: TYPES.USERS_RESPONSE_ERROR,
    payload: ResponseType;
};

export type ACTIONS = Update | Response_Status | Response_Error;