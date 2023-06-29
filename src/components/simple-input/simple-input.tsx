import styles from "./simple-input.module.css";
import { TEXT_PLACEHOLDER, TYPE_SIMPLE_INPUT } from "../../utils/constants";
import { FC, useCallback, useEffect, useState } from "react";
import { TPropsInput } from "../../utils/types";

const SimpleInput: FC<TPropsInput> = ({
  type,
  index,
  onDo,
  listToDo,
  setListtoDo,
}) => {
  const [value, setValue] = useState(onDo.title);
  const [classInput, setClassInput] = useState(`${styles.input_text}`);
  const [classCheckbox, setClassCheckbox] = useState(`${styles.check__box}`)

  const handleChangeValue = useCallback((e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    setValue(value);
  }, []);

  const handleDeleteValue = useCallback(() => {
    setValue("");
  }, []);

  const handleDeleteItemList = useCallback(() => {
    const arr = listToDo.filter((item) => item.id !== onDo.id);
    setListtoDo(arr);
  }, [listToDo, setListtoDo, onDo.id]);

  const handleChangeCheckBox = useCallback(() => {
    const arr = listToDo.filter((item) => {
      if (item.id === onDo.id) {
        item.done = !item.done;
        return item;
      } else {
        return item;
      }
    });
    setListtoDo(arr);
  }, [listToDo, setListtoDo, onDo.id]);

  useEffect(() => {
    if(!onDo.done){
      setClassInput(`${styles.input_text}`)
      setClassCheckbox(`${styles.check__box}`)
    }else{
      setClassInput(`${styles.input_text} ${styles.input_text_through}`);
      setClassCheckbox(`${styles.check__box} ${styles.check__box_checked}`)
    }
  }, [onDo.done]);

  useEffect(() => {
    setListtoDo(
      listToDo.filter((item) => {
        if (item.id === onDo.id) {
          item.title = value;
          return item;
        } else {
          return item;
        }
      })
    );
  }, [value]);

  return (
    <fieldset className={styles.item} id={index}>
      {type === TYPE_SIMPLE_INPUT ? (
        <p className={styles.subtitle}>{onDo.date}</p>
      ) : (
        <label className={styles.check}>
          <input className={styles.check__input} type="checkbox" />
          <span
            className={classCheckbox}
            onClick={handleChangeCheckBox}
          ></span>
        </label>
      )}
      <input
        id={onDo.id}
        name={index}
        type="text"
        placeholder={TEXT_PLACEHOLDER}
        value={value}
        onChange={handleChangeValue}
        className={classInput}
        disabled={onDo.done || type === TYPE_SIMPLE_INPUT ? true : false}
      />
      {!type && (
        <>
          <button
            id="edit"
            type="button"
            className={`${styles.btn} ${styles.btn_delete}`}
            onClick={handleDeleteValue}
            disabled={onDo.done ? true : false}
          ></button>
          <button
            id="delete"
            type="button"
            className={`${styles.btn} ${styles.btn_delete_container}`}
            onClick={handleDeleteItemList}
          ></button>
        </>
      )}
    </fieldset>
  );
};

export default SimpleInput;
