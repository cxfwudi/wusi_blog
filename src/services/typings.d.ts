declare namespace API {
  interface UserInfoDetail{
    info:string,
    sign:string,
    nickname:string,
    avatar:string,
    email:string
  }
  interface UserInfo{
    code:number,
    username:string,
    data:UserInfoDetail
  }
  interface LoginData{
    code:number,
    username:string,
    data:{
      token:string
    }
  }
}