import { AbstractEntity } from "./abstract-entity";
import { Modelo } from "./ModeloModel";
import { Cor } from "./cor";
import { Tipo } from "./tipo";


export class Veiculo extends AbstractEntity {
    placa! : string
    modelo! :Modelo
    cor! : Cor
    tipo! : Tipo
    ano! : number
    

    constructor(){
        super()
        this.ativo = true
    }
}