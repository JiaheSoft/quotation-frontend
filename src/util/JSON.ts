
export interface FromJSON {
  fromJSON(json: string): boolean;
}

export interface ToJSON {
  toJSON(): string;
}