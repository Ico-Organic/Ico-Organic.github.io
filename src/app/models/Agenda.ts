export class Agenda {

    solicitorBy?: string; 
    solicitorTo?: string; 
    parcela?: string; 
    receta?: string; 
    fechaIni?: string; 
    fechaFin?: string;
    horaIni?: string;
    horaFin?: string;
    title?: string;
    description?: string;
    tipo?: string;
    status?: string;

    constructor(fechaIni: string,receta:string, parcela: string, fechaFin: string, horaIni: string,
        horaFin: string, title: string, description:string,status:string, tipo: string,solicitorBy:string, solicitorTo: string){
        this.solicitorBy = solicitorBy;
        this.solicitorTo = solicitorTo;
        this.parcela = parcela;
        this.receta = receta;
        this.fechaIni = fechaIni;
        this.fechaFin = fechaFin;
        this.horaIni = horaIni;
        this.horaFin = horaFin;
        this.title = title;
        this.description = description;
        this.tipo = tipo;
        this.status = status;
        
    }
}