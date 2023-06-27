import { AbstractEntity } from "./abstract-entity";
import { Marca } from "./MarcaModel";

export class Modelo extends AbstractEntity {
  nome!: string;
  marcaId!: Marca;

  constructor() {
    super();
    this.ativo = true;
  }

  getNomeMarca(): string {
    return this.marcaId.nome;
  }
}
