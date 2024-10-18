export interface HeaderComponentProps {
  classes?: string;
  newStyles?: { [key: string]: string | number };
  mui?: boolean;
  disabled?: boolean;
}

export type CardTurnUp = { id: string; waiting?: true };
