import styles from './container.module.css';
import { FC, PropsWithChildren } from "react";
import { TPropsContainer } from '../../utils/types';

const Container: FC<PropsWithChildren<TPropsContainer>> = ({title, children}) => {

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      {children}
    </section>
  )
};

export default Container;
