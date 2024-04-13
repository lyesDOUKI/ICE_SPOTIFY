export class NlpDTO {
  action: number;
  objet: {
    style: string;
    titre: string;
  };

  constructor(action: number, objet: { style: string; titre: string }) {
    this.action = action;
    this.objet = objet;
  }
}
