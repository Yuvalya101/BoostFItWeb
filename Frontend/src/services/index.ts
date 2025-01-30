import axios from "axios";

export async function post<T, U>(path: string, data: T, headers?:any): Promise<U> {
  return axios
    .post(path, data,{headers})
    .then((res) => {
      if (Math.floor(res.data.status / 100) !== 2) {
        throw new Error(res.data.message);
      }
<<<<<<< HEAD
      return res.data.data;
    })
    .catch((e) => {
      throw new Error(e.response.data.message);
=======
      return res?.data?.data;
    })
    .catch((e) => {
      throw new Error(e.response?.data.message??e.message);
>>>>>>> 6d0a7e6ce8f01a1e0014a05ac25cf9e98dd89459
    });
}

export async function get<U>(path: string): Promise<U> {
  return axios
    .get(path)
    .then((res) => {
      if (Math.floor(res.data.status / 100) !== 2) {
        throw new Error(res.data.error);
      }
      return res.data.data;
    })
    .catch((e) => {
<<<<<<< HEAD
      throw new Error(e.response.data.message);
=======
      console.log(e)
      throw new Error(e.response?.data.message ?? e.message);
>>>>>>> 6d0a7e6ce8f01a1e0014a05ac25cf9e98dd89459
    });
}

export async function put<T, U>(path: string, data: T): Promise<U> {
  return axios
    .put(path, data)
    .then((res) => {
      if (Math.floor(res.data.status / 100) !== 2) {
        throw new Error(res.data.message);
      }
      return res.data.data;
    })
    .catch((e) => {
      throw new Error(e.response.data.message);
    });
}

export async function _delete<U>(path: string): Promise<U> {
  return axios
    .delete(path)
    .then((res) => {
      if (Math.floor(res.data.status / 100) !== 2) {
        throw new Error(res.data.message);
      }
      return res.data.data;
    })
    .catch((e) => {
      throw new Error(e.response.data.message);
    });
}
