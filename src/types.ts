export interface ICard {
  id: number;
  order: number;
  text: string;
  over?: boolean;
}

export interface IItem {
  id: number;
  title: string;
}

export interface IBoard {
  id: number;
  title: string;
  items: IItem[];
}
