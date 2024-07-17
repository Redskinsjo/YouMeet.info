export interface HeaderComponentProps {
  classes?: string;
  newStyles?: { [key: string]: string | number };
  scrollY?: number;
  mui?: boolean;
  disabled?: boolean;
}

export type CardTurnUp = { id: string; waiting?: true };
