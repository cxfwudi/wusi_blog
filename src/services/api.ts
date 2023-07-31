import { useRequest, request } from "umi";
export const currentUser = () => {
  const username = localStorage.getItem('username')
  return request<API.UserInfo>(`/users/${username}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

//修改个人信息
export const updateUserInfo = (username:string,params:{
  nickname:string,
  sign:string,
  info:string,
  email:string
}) => {
  return request<{ code: number }>(`/users/${username}`, {
    method: 'PUT',
    data:{...params}
  })
}

export const uploadAvatar = (formdata: FormData, username: string) => {
  return request<{ code: number }>(`/users/${username}/avatar`, {
    method: 'POST',
    data: formdata,
    processData: false,
    contentType: false,
  })
}

export const loginHandler = (params: {
  username: string,
  password: string
}) => {
  return request<API.LoginData>('/tokens', {
    method: 'POST',
    data: { ...params },
  })
}

export const registerHandler = (
  params: {
    username: string,
    email: string,
    phone: string,
    password_1: string,
    password_2: string,
    identifying: string
  }
) => {
  return request<API.registerData>('/users', {
    method: 'POST',
    data: { ...params }
  })
}

export const randomTopics = () => {
  return request<API.ArticleData>('/topics', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const findTopics = (page:string)=>{
  return request<API.ArticleData>(`/topics/?page=${page}`,{
    method:'GET'
  })
}
