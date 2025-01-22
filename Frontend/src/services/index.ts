import axios from "axios";

export async function post<T, U>(path: string, data: T, headers?:any): Promise<U> {
  return axios
    .post(path, data,{headers})
    .then((res) => {
      if (Math.floor(res.data.status / 100) !== 2) {
        throw new Error(res.data.message);
      }
      return res?.data?.data;
    })
    .catch((e) => {
      throw new Error(e.response?.data.message??e.message);
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
      console.log(e)
      throw new Error(e.response?.data.message ?? e.message);
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
