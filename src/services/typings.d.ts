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
  interface registerData{
    code:number,
    username:string,
    data:{}
  }
  interface TopicData{
    photo:string[],
    id:number,
    title:string,
    category:string,
    created_time:string,
    introduce:string,
    author:string,
    author_avatar:string
  }
  interface ArticleData{
    code:number,
    data:{
      topics:TopicData[]
    }
  }
}