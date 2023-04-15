import { Outlet } from "react-router-dom";
import BoardTitle from "./Board/BoardTitle";
import classes from "./Notice.module.css";

const DUMMY_DATA = [
  { id: "1", title: "첫 글", content: "aily에 오신 것을 환영합니다." },
  { id: "2", title: "두번째 글", content: "안녕하세요~" },
  { id: "3", title: "세번째 글", content: "안녕하세요~" },
];

const Notice = () => {
  return (
    <>
      <div className={classes.notice}>
        <p className={classes.title}>공지사항</p>
        <hr />
        <ul className={classes.list}>
          {DUMMY_DATA.map((article) => (
            <BoardTitle
              key={article.id}
              id={article.id}
              title={article.title}
              content={article.content}
            />
          ))}
        </ul>
      </div>
      <Outlet />
    </>
  );
};

export default Notice;
