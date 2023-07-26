// 运行时配置
import { logo } from './utils/imgApi';
import type { RequestConfig } from '@umijs/max';
import { history } from '@umijs/max';
import { host, perfix } from './../setting/apiPerfix';
import { settings } from './../setting/layoutDefault';
import { useModel } from '@umijs/max';
import { notification } from 'antd';
import './global.less';
// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
export async function getInitialState(): Promise<{
  settings?: any
  username?:string | null,
  token?: string | null
}> {
  if (history.location.pathname === '/login') {
    return {
      settings,
      username: '',
      token: ''
    }
  } else {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('wusiToken');
    return {
      settings,
      username,
      token
    };
  }

}
//请求拦截器
const requestInterceptor = (url: string, options: any) => {

  const notCarryTokenArr: string[] = ['/tokens'];
  if (notCarryTokenArr.includes(url)) {
    return {
      url: `${host}${perfix}${url}`,
      options,
    };
  }
  else {
    //此处使用useModel会报错，不知道为什么，暂时先存在localStorage
    const token:string|null = localStorage.getItem('wusiToken');
    return {
      url: `${host}${perfix}${url}`,
      options: {
        ...options,
        headers: {
          ...(options?.headers ?? {}),
          Authorization: `bearer ${token}`,    // 这里获取自己的token携带在请求头上
        },
      },
    };
  }
}
const responseInterceptor = (response:any)=>{
  const {data} = response;
  console.log(data)
  if(data.code !== 200) {
    notification.error({
      message:data.error
    })
  }
  return response;
}
//此处的请求拦截器与响应拦截器会覆盖request.ts中的拦截设置
export const request: RequestConfig = {
  requestInterceptors: [requestInterceptor],
  responseInterceptors: [responseInterceptor]
}
//成功code,data 失败code,error
export const layout = () => {
  return {
    title: '钨丝|个人博客',
    logo: logo,
    menu: {
      locale: false,
    },
   
    rightRenderContent: () => { },
    layout: 'top',
    // splitMenus:true
  };
};
