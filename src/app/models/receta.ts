export class Receta {
    id?: string; 

    productor?: string; 
    ingeniero?: string;
    parcela?: string;
    fecha?: Date;
    suelos?: Array<any>;
    foliares?: Array<any>;
    nov?: Number;
    sup?: string;
    sta?: string 
    constructor(productor: string,id:string,sta: string, ingeniero: string, parcela: string,
        fecha: Date, suelos: Array<any>, foliares: Array<any>,nov: Number, sup: string){
        this.productor = productor;
        this.ingeniero = ingeniero;
        this.parcela = parcela;
        this.fecha = fecha;
        this.suelos = suelos;
        this.foliares = foliares;
        this.nov = nov;
        this.sup = sup;
        this.sta = sta;
        this.id = id;
        
    }
}