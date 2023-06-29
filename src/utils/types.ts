import { IObjectToDo } from "./interface"

export type TPropsContainer = {
  title: string,
}

export type TPropsInput = {
  type: string | null,
  index: string,
  onDo: IObjectToDo,
  listToDo: TArrayToDos,
  setListtoDo: (value: TArrayToDos) => void
}

export type TPropsRenderToDo = {
  date: string,
}

export type TPropsDateElement = {
  startDate: Date,
  setStartDate: (value: Date) => void
}

export type TArrayToDos = IObjectToDo[]
