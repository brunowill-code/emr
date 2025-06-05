import { IAvaliacao } from "./avaliacao.interface";
import { IObjetivo } from "./objetivo.interface";
import { IPlano } from "./plano.interface";
import { ISubjetivo } from "./subjetico.interface";

export interface ISoap {
    id_consulta: number|undefined,
    subjetivo:ISubjetivo |undefined,
    objetivo:IObjetivo|undefined,
    avaliacao:IAvaliacao|undefined,
    plano:IPlano|undefined,
}