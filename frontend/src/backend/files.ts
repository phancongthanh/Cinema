import APIError from '../types/APIError';
import identity from './identity';
import server from './server';

/**
 * Upload file lên server
 * @param file tệp tin cần upload
 * @returns id của file vừa upload dùng để lấy link hay download file
 * @throws APIError
 */
export async function upload(file: any) : Promise<string> {
    const url = server.basePath + "/Files";

    const token = identity.getToken() || "";

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': token
        },
        body: file
    });

    if (response.ok) return await response.text();

    const error:APIError = {
        status: response.status,
        response: response,
        message: ""
    }
    switch (response.status) {
        case 400: error.message = await response.text(); throw error;
        case 401: error.message = "Người dùng chưa đăng nhập"; throw error;
        case 403: error.message = "Người dùng không có quyền thực hiện"; throw error;
        default: throw error;
    }
}

const files = {
    upload,
    getLink: (id: string) => server.basePath + "/Files/" + id
}

export default files