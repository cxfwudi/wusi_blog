import { findTopics } from "@/services/api"
import { useEffect, useState, useRef, useMemo } from "react"
import { Card, Avatar } from "antd";
import Masonry from "react-masonry-css";
import styles from './index.less';
import { unicodeToStr } from "@/utils";
import { useScroll } from "@reactuses/core";
import Loading from 'react-loading';

const { Meta } = Card;
interface TopicData {
  photos: string[],
  id: number,
  title: string,
  category: string,
  created_time: string,
  introduce: string,
  author: string,
  author_avatar: string
}
export default () => {
  const [articleData, setArticleData] = useState<TopicData[]>([]);
  //记录每次请求数据条数的起始位置
  const [pageIndex, setPageIndex] = useState(1);
  const elementRef = useRef<HTMLDivElement>(null);
  const [x, y, isScrolling, arrivedState, directions] = useScroll(elementRef);
  const { bottom } = useMemo(
    () => arrivedState,
    [arrivedState],
  );

  useEffect(() => {
    if (JSON.stringify(bottom) === 'true') {
      const fetchArticlesData = async (page: string) => {
        const { data } = await findTopics(page);
        const { topics } = data;
        setArticleData((prev)=>{
          return [
            ...prev,
            ...topics
          ]
        });
      }
      fetchArticlesData(`${pageIndex}`);
      setPageIndex(pageIndex+5);
    }

  }, [JSON.stringify(bottom)])


  useEffect(() => {
    const fetchArticlesData = async (page: string) => {
      const { data } = await findTopics(page);
      const { topics } = data;
      setArticleData(topics);
    }
    fetchArticlesData(`${pageIndex}`);
    setPageIndex(pageIndex+5);
  }, [])
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
          title={item.title}
          description={item.introduce}
          avatar={<Avatar src={`http://www.wusi.fun/media/${unicodeToStr(item.author_avatar)}`} />}
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
        <span className={styles.endTip}>知识用尽啦!</span>
        <Loading type="cubes" color="#007BFF" className={styles.loading} />
      </div>
    </div>
  )
}