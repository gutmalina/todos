import styles from "./render-todo.module.css";
import SimpleInput from "../simple-input/simple-input";
import { FC, useCallback, useEffect, useState } from "react";
import { v4 as random } from "uuid";
import {
  INITIAL_LIST_TODO,
  TEXT_BTN_LIST_TODOS,
  TEXT_BTN_LIST_TODOS_HIDDEN,
  TEXT_BTN_DONE_TRUE,
  TEXT_BTN_DONE_FALSE,
  TYPE_SIMPLE_INPUT,
} from "../../utils/constants";
import { TPropsRenderToDo } from "../../utils/types";
import { IObjectToDo } from "../../utils/interface";

const RenderToDo: FC<TPropsRenderToDo> = ({ date }) => {
  const [listToDo, setListtoDo] = useState(INITIAL_LIST_TODO);
  const [showAllToDo, setShowAllToDo] = useState(false);
  const [textBtnShowListAllToDo, setTextBtnShowListAllToDo] =useState(TEXT_BTN_LIST_TODOS);
  const [arrayAllToDos, setArrayAllToDos] = useState([]);

  const handleAddInput = useCallback(() => {
    setListtoDo([
      ...listToDo,
      { id: random(), title: "", date: date, done: false },
    ]);
  }, [date, listToDo]);

  const handleShowAllToDo = useCallback(() => {
    setShowAllToDo(!showAllToDo);
    if (showAllToDo) {
      setTextBtnShowListAllToDo(TEXT_BTN_LIST_TODOS);
    } else {
      setTextBtnShowListAllToDo(TEXT_BTN_LIST_TODOS_HIDDEN);
    }
  }, [showAllToDo]);

  useEffect(() => {
    const arrList = !listToDo.filter((item) => item.date === date).length;
    arrList && handleAddInput();
  }, [date]);

  useEffect(() => {
    const groupBy = (key: string) => {
      return function group(array: any) {
        return array.reduce((acc: any, obj: any) => {
          const property = obj[key];
          acc[property] = acc[property] || [];
          acc[property].push(obj);
          return acc;
        }, {});
      };
    };
    const groupByDone = groupBy("done");
    const arr = groupByDone(listToDo.filter((item) => item.title));
    setArrayAllToDos(arr);
  }, [listToDo]);

  return (
    <form className={styles.list} onSubmit={(e)=> e.preventDefault()}>
      {listToDo.length &&
        listToDo
          .filter((item) => item.date === date)
          .map((item, index) => (
            <SimpleInput
              type=""
              key={item.id}
              index={"" + index}
              onDo={item || ""}
              listToDo={listToDo}
              setListtoDo={setListtoDo}
            />
          ))}
      <button
        type="button"
        className={`${styles.btn} ${styles.btn_add}`}
        onClick={handleAddInput}
      ></button>
      <button
        type="button"
        className={`${styles.btn_all_todos}`}
        onClick={handleShowAllToDo}
      >
        {textBtnShowListAllToDo}
      </button>
      {showAllToDo &&
        Object.entries(arrayAllToDos).map(([key, val]: [string, any]) => (
          <div key={key} className={styles.container}>
            <input className={styles.date} value={key === 'true' ? TEXT_BTN_DONE_TRUE : TEXT_BTN_DONE_FALSE} disabled/>
            {val.map((item: IObjectToDo) => (
              <SimpleInput
                type={TYPE_SIMPLE_INPUT}
                key={item.id}
                index={""}
                onDo={item || ""}
                listToDo={listToDo}
                setListtoDo={setListtoDo}
              />
            ))}
          </div>
        ))}
    </form>
  );
};

export default RenderToDo;
