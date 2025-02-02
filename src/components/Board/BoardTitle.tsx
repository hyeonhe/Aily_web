import Link from "next/link";
import { Article } from "@/components/Board/article";

function BoardTitle(props: { article: Article; boardName: string }) {
  const { article } = props;
  const { id, title, category, writer, date } = article;

  return (
    <li className="flex h-[50px] items-center border-b border-solid border-[#d9d9d9] hover:bg-[#f0f0f0] lg:p-0 px-[5px] py-0">
      <div className="lg:w-[10%] lg:flex lg:justify-center hidden">{id}</div>
      <div className="lg:w-1/5 lg:flex lg:justify-center hidden">
        {category}
      </div>
      <div className="lg:w-1/2 w-4/5 flex lg:text-base text-xs font-light">
        <Link
          href={`${props.boardName}/${id}`}
          className="no-underline text-black "
        >
          {title}
        </Link>
      </div>
      <div className="lg:w-[10%] lg:flex lg:justify-center hidden">
        {writer}
      </div>
      <div className="w-1/5 flex justify-center lg:text-base text-xs font-light">
        {date}
      </div>
    </li>
  );
}

export default BoardTitle;
