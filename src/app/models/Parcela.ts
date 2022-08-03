export class Parcela {
    id?: string;
    productor?: string;
    nombre?: string;
    medidas?: string;
    rendimiento?: string;
    cultivo?: string;
    calle?: string;
    colonia?: string;
    cuidad?: string;
    estado?: string;    

    constructor(id:string ,productor: string,nombre: string, medidas: string, rendimiento: string,
        cultivo: string, calle: string, colonia: string, cuidad: string, estado: string ){
        this.productor = productor;
        this.nombre = nombre;
        this.medidas = medidas;
        this.rendimiento = rendimiento;
        this.cultivo = cultivo;
        this.calle = calle;
        this.id = id;
        this.colonia = colonia;
        this.cuidad = cuidad;
        this.estado = estado;
       
    }
}