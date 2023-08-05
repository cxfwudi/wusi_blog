import { FieldTimeOutlined, UserOutlined } from '@ant-design/icons';
import { Button, notification } from 'antd';
import { history, useModel } from '@umijs/max';
import { deleteTopic } from '@/services/api';
import styles from './index.less'
interface ListTopicData {
  id: string,
  title: string,
  category: string,
  created_time: string,
  introduce: string,
  author: string
}

export default (props: { params: ListTopicData,deleteSuccess:(carryDelete:boolean)=>void }) => {
  const { params } = props;
  const { initialState, setInitialState } = useModel('@@initialState');
  const deleteTop = async (t_id:string) => {
    if(initialState?.username){
      const {code} = await deleteTopic(initialState.username,t_id);
      if(code === 200) {
        notification.success({
          message:'删除成功'
        })
        props.deleteSuccess(true);
      }else{
        notification.error({
          message:'呃，好像哪里出了问题'
        })
      }
    }
  }
  return (
    <div className={styles.cardContainer}>
      <div className={styles.itemInfo}>
        <span><UserOutlined />{params.author}</span>|
        <span><FieldTimeOutlined />{params.created_time}</span>|
        <span>
          {params.category === 'tec' ? '科技' : '非科技'}
        </span>
      </div>
      <div className={styles.itemContent}>
        <p onClick={()=>{history.push(`/topic/${params.author}/${params.id}`)}} style={{cursor:'pointer'}}>{params.title}</p>
        <p>{params.introduce}</p>
        <div className={styles.operate}>
          <span onClick={() => { history.push(`/topic/update/${params.id}`) }}>编辑</span>
          <span onClick={()=>{deleteTop(params.id)}}>删除</span>
        </div>
      </div>
    </div>
  )

}
