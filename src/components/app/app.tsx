import styles from "./app.module.css";
import { TEXT_TITLE_DATE, TEXT_TITLE_TODOS } from "../../utils/constants";
import Container from "../container/container";
import DateElement from "../date-element/date-element";
import RenderToDo from "../render-todo/render-todo";
import { FC, useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";

const App: FC = () => {
  const [startDate, setStartDate] = useState(new Date());

  const handleDate = useCallback(() => {
    const day = ("0" + startDate.getDate()).slice(-2);
    const month = ("0" + (startDate.getMonth() + 1)).slice(-2);
    const year = startDate.getFullYear();
    return `${day}.${month}.${year}`;
  }, [startDate]);

  useEffect(() => {
    handleDate();
  }, [startDate, handleDate]);

  return (
    <>
      <main className={styles.main}>
        <Container title={TEXT_TITLE_DATE}>
          <DateElement startDate={startDate} setStartDate={setStartDate} />
        </Container>
        <Container title={`${TEXT_TITLE_TODOS} ${handleDate()}`}>
          <RenderToDo date={handleDate()}/>
        </Container>
      </main>
    </>
  );
};

export default App;
