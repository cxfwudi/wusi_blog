import { useRequest,request } from "umi";
export const currentUser = ()=>{
  const username = localStorage.getItem('username')
  return request<API.UserInfo>(`users/${username}`,{
    method:'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const loginHandler = (params:{
  username:string,
  password:string
})=>{
  return request<API.LoginData>('/tokens',{
    method:'POST',
    data:{...params},
  })
}