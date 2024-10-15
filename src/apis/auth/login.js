import axiosRequest from "src/utils/request";

const prefix = "/auth/login";

export const login = async ({ data }) => {
    return await axiosRequest({
        url: `${prefix}`,
        method: 'POST',
        data
    })
}
