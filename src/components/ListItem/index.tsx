import { FieldTimeOutlined, UserOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import styles from './index.less'
interface ListTopicData{
  id:string,
  title:string,
  category:string,
  created_time:string,
  introduce:string,
  author:string
}
export default (props: { params: ListTopicData }) => {
  const { params } = props
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
        <p>{params.title}</p>
        <p>{params.introduce}</p>
        <div className={styles.operate}>
          <span>编辑</span>
          <span>删除</span>
        </div>
      </div>
    </div>
  )

}
