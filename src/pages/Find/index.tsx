import { findTopics } from "@/services/api"
import { useEffect, useState, useRef, useMemo } from "react"
import { Card, Avatar, notification } from "antd";
import Masonry from "react-masonry-css";
import styles from './index.less';
import { unicodeToStr } from "@/utils";
import { useScroll } from "@reactuses/core";
import Loading from 'react-loading';
import { history } from "@umijs/max";

const { Meta } = Card;

export default () => {
  const [articleData, setArticleData] = useState<API.TopicData[]>([]);
  //记录每次请求数据条数的起始位置
  const [pageIndex, setPageIndex] = useState(1);
  const elementRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [x, y, isScrolling, arrivedState, directions] = useScroll(elementRef);
  const { bottom } = useMemo(
    () => arrivedState,
    [arrivedState],
  );

  useEffect(() => {
    if (JSON.stringify(bottom) === 'true') {
      setIsLoading(true);
      const fetchArticlesData = async (page: string) => {
        const { data } = await findTopics(page);
        const { topics } = data;
        if (topics.length === 0) {
          notification.success({
            message: '知识用尽啦！'
          })
        }
        setArticleData((prev) => {
          return [
            ...prev,
            ...topics
          ]
        });
      }
      fetchArticlesData(`${pageIndex}`);
      setPageIndex(pageIndex + 5);
    } else {
      setIsLoading(false);
    }
  }, [JSON.stringify(bottom)])


  useEffect(() => {
    const fetchArticlesData = async (page: string) => {
      const { data } = await findTopics(page);
      const { topics } = data;
      setArticleData(topics);
      setIsLoading(false);
    }
    fetchArticlesData(`${pageIndex}`);
    setPageIndex(pageIndex + 5);
  }, [])
  const topicTitle = (title: string, username: string, t_id: string) => {
    return (
      <span onClick={() => { history.push(`/topic/${username}/${t_id}`) }}>
        {title}
      </span>
    )
  }
  const items = articleData.map((item, index) => {
    return (
      <Card
        key={index}
        className={styles.card}
        hoverable
        style={{ width: 320 }}
        cover={<img src={`http://www.wusi.fun/media/${item.photos[0]}`} alt="" />}
      >
        <Meta
          title={topicTitle(item.title, item.author, String(item.id))}
          description={item.introduce}
          avatar={<Avatar src={`http://www.wusi.fun/media/${unicodeToStr(item.author_avatar)}`} onClick={() => { history.push(`/userinfo/${item.author}`) }} />}
        />
        <span className={styles.author}>{item.author}</span>

      </Card>
    )
  })
  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1
  };

  return (

    <div className={styles.container}>
      <div
        ref={elementRef}
        className={styles.refContainer}
      >
        <div className={styles.cardContaienr}>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className={styles.my_masonry_grid}
            columnClassName={styles.my_masonry_grid_column}
          >
            {items}
          </Masonry>
        </div>
        {isLoading && (<Loading type="cubes" color="#007BFF" className={styles.loading} />)}

      </div>
    </div>
  )
}