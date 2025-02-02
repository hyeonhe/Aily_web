import { useDispatch, useSelector } from "react-redux";
import classes from "@/components/Location/styles/LocationSearch.module.scss";
import React, {
  ChangeEvent,
  EventHandler,
  FormEvent,
  useEffect,
  useState,
} from "react";
import { keywordActions } from "@/store/keyword";
import { resultActions } from "@/store/result";
import { ToolkitStore } from "@/store";
import { Location } from "@/store/location";

const LocationSearch = () => {
  const dispatch = useDispatch();
  const locations = useSelector(
    (state: ToolkitStore) => state.location.location
  );
  const result = useSelector((state: ToolkitStore) => state.result.result);

  const [inputKeyword, setKeyword] = useState("");

  const keywordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value.trim());
  };

  useEffect(() => {
    dispatch(keywordActions.change(inputKeyword));
    inputKeyword && dispatch(resultActions.show());
  }, [dispatch, inputKeyword]);

  useEffect(() => {
    console.log(result);
  }, [result]);

  const resultBlurHandler = () => {
    locations.length
      ? dispatch(resultActions.show())
      : dispatch(resultActions.hide());
  };

  useEffect(() => {
    console.log(inputKeyword);
  }, [inputKeyword]);

  useEffect(() => {
    console.log(locations);
  }, [locations]);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className={classes.container}>
      <form className={classes.form} onSubmit={submitHandler}>
        <input
          className={classes.search}
          placeholder="기기명, 주소, 지역 등 검색"
          value={inputKeyword}
          onBlur={resultBlurHandler}
          onChange={keywordChangeHandler}
        ></input>
      </form>
      {result && (
        <div className={classes.result}>
          <span>검색된 {locations.length}대의 Aily가 있습니다.</span>
        </div>
      )}
      <ul className={classes.list}>
        {locations &&
          locations.map((marker: Location) => (
            <li key={marker.id} className={classes.li}>
              <span className={classes.title}>{marker.title}</span>
              <span className={classes.address}>{marker.address}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default LocationSearch;
