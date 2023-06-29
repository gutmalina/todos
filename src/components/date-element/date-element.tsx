import { FC } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TPropsDateElement } from "../../utils/types";

const DateElement: FC<TPropsDateElement> = ({startDate, setStartDate}) => {

  return (
    <>
      <DatePicker
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
        inline
        />
    </>
  );
};

export default DateElement;
