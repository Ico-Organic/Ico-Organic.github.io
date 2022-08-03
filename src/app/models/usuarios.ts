export class Usuarios {

    nombre?: string; 
    apellidoPa?: string;
    apellidoMa?: string;
    rol?: string;
    password?: string;
    telefono?: string;
    correo?: string;
    status?: string;


    constructor(nombre: string, apellidoPa: string, apellidoMa: string,
        rol: string, password: string, precio: number, telefono: string, correo: string, status: string ){
        this.nombre = nombre;
        this.apellidoPa = apellidoPa;
        this.apellidoMa = apellidoMa;
        this.rol = rol;
        this.password = password;
        this.telefono = telefono;
        this.correo = correo;
        this.status = status;
    }
}