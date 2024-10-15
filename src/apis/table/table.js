import axiosRequest from "src/utils/request";

const prefix = "/table";

export const getListTable = async ({ params }) => {
    return await axiosRequest({
        url: `${prefix}`,
        method: 'GET',
        params
    })
}

export const createTable = async ({ data }) => {
    return await axiosRequest({
        url: `${prefix}/create`,
        method: 'POST',
        data
    })
}

export const updateTable = async ({ data }) => {
    return await axiosRequest({
        url: `${prefix}/update`,
        method: 'PUT',
        data
    })
}

export const deleteTable = async ({ data }) => {
    return await axiosRequest({
        url: `${prefix}/delete`,
        method: 'DELETE',
        data
    })
}

export const getTableById = async ({ id }) => {
    return await axiosRequest({
        url: `${prefix}/${id}`,
        method: 'GET'
    })
}

