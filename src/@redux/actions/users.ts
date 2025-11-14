import { Dispatch } from 'redux';
import { ACTIONS, TYPES, IUsersApi } from '@redux/types/users';
import { api } from '@redux/api';

const endpoint = "/users"

const update = (data: IUsersApi) => async (dispatch: Dispatch<ACTIONS>) => {
    try{
        const res = await api.patch(`${endpoint}`, data);
        dispatch({
            type: TYPES.USERS_UPDATE,
            payload: res.data.data as IUsersApi
        });
    } catch(error:any){
        console.log(error.response);
        dispatch({
            type: TYPES.USERS_RESPONSE_ERROR,
            payload: {update: error.response.data.message}
        });
    }
};

const password = (password: string) => async (dispatch: Dispatch<ACTIONS>) => {
    try{
        await api.patch(`${endpoint}/password`, {password});
        dispatch({
            type: TYPES.USERS_RESPONSE_STATUS,
            payload: {password: "Password has been successfully changed."}
        });
        setTimeout(() => {
            dispatch({
                type: TYPES.USERS_RESPONSE_STATUS,
                payload: {}
            });
        }, 5000);
        dispatch({
            type: TYPES.USERS_RESPONSE_ERROR,
            payload: {}
        });
    } catch(error:any){
        console.log(error.response.data);
        dispatch({
            type: TYPES.USERS_RESPONSE_ERROR,
            payload: {update: error.response.data.message}
        });
    }
};

const state_errors = (key:string, value: string) => async (dispatch: Dispatch<ACTIONS>) => {
    dispatch({
        type: TYPES.USERS_RESPONSE_ERROR,
        payload: {[key]: value}
    });
};

const Users = {
    update,
    password,
    state_errors
};

export default Users;