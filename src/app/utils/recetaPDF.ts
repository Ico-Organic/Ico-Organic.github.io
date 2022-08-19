import jsPDF from 'jspdf';
import * as moment from 'moment';

export const RecetaPdf = (ObjectReceta: any = []) => {
    console.log(ObjectReceta);
    let recetaPDF: any = {
        height: 3.7,
        width: 1.5,
        whithEspacio: 3.4
    }
    let hoy:any

    if(!ObjectReceta.fecha){
        hoy = new Date()
    }else{
        hoy =   new Date(ObjectReceta.fecha)
      
      
    }
   
   
   
    /*HOJA POR EL FRENTE*/
    let imgFoo = '../../../assets/imagenes/login/logo-ico.png';
    var marca = '../../../assets/imagenes/login/logo-ico.png';
    var HEADER = '../../../assets/imagenes/headerico.jpg'
    var footer = '../../../assets/imagenes/footer.jpg'
    var marca = '../../assets/imagenes/piedepagina.png'

    // let universidad = this.recetMedica.universidad
    //let hora_impresion = hoy.toLocaleDateString()
    const doc: any = new jsPDF({
        unit: "cm",
        format: 'a4',
    });
    doc.addImage(HEADER, 'jpg', 0.1, 0, 21,4);
    doc.addImage(marca, 'PNG', 1, 3.5, 19, 25);

/*
    doc.addImage(imgFoo, 'PNG', 1, 0.5, 6, 2);
    doc.addImage(linea2, 'PNG', 17, 0.5, 2, 2);
    doc.addImage(marca, 'PNG', 1, 6, 19, 25);*/
    doc.setFontSize(16);
    doc.setFont('helvetica')
    .setFont(undefined, 'bold');
    doc.text('ASESORIA ICO-ORGANICA', 7,3 )
    doc.text('FOLIO: ' + ObjectReceta.novista, 16, 4)
    doc.setFontSize(12);
    doc.text('FECHA:', 10.5, 5)
    doc.text(`${hoy.toLocaleDateString('es-mx', { weekday:"long", year:"numeric", month:"long", day:"numeric"}).toLocaleUpperCase() }`, 12.5, 5)
    doc.text('PRODUCTOR: ', 1, 6.7);
    doc.text(`${ObjectReceta.productor.toLocaleUpperCase()}`, 3.9, 6.7);
    doc.text('CULTIVO: ', 13.3, 6.7);
    doc.text(`${ObjectReceta.cultivo}` + '', 15.5, 6.7);
    doc.text('MUNICIO: ', 13.3, 7.5);
    doc.text(`${ObjectReceta.cuidad.toLocaleUpperCase()}` + '', 15.5, 7.5);
    doc.text('EJIDO:', 1, 7.5)
    doc.text(`${ObjectReceta.ejido.toLocaleUpperCase()} `, 2.5, 7.5)
    doc.text('CONTACTO:', 1, 8.2)
    doc.text(`${ObjectReceta.contacto} `, 3.8, 8.2)
    doc.setFont('Times','BIU');

    doc.text('FOLIARES:', 1, 10)
    let a = 10.8;
    let b:any;
    ObjectReceta.foliares.forEach((element: any, index: number) => {
        recetaPDF.height += 1;

        doc.text(2, a, (recetaPDF.width, recetaPDF.height, '1.- OXI POWER: ' + `${element.oxifol}`), { maxWidth: 18 });
        a = a + 1.3;
        recetaPDF.height += 1;

        doc.text(2, a, (recetaPDF.width, recetaPDF.height, '2.- ENRAIZADOR: ' + `${element.enraizadorfol}`));
        a = a + 1.3;
        recetaPDF.height += 1;

        doc.text(2, a, (recetaPDF.width, recetaPDF.height, '3.- VEGETATIVO: ' + `${element.vegetativofol}`), { maxWidth: 18 });
        a = a + 1.3;
        recetaPDF.height += 1;

        doc.text(2, a, (recetaPDF.width, recetaPDF.height, '4.- FLORACION: ' + `${element.floracionfol}`));
        a = a + 1.3;
        recetaPDF.height += 1;

        doc.text(2, a, (recetaPDF.width, recetaPDF.height, '5.- ENGORDE: ' + `${element.engordefol}`), { maxWidth: 18 });
        a = a + 1.3;
        recetaPDF.height += 1;
    });

    doc.text('SUELO:', 1, (a + 0.1 ))
    ObjectReceta.suelos.forEach((element: any, index: number) => {
        recetaPDF.height += 1;
        b = a + 1.3;
       
        doc.text(2, b, (recetaPDF.width, recetaPDF.height, '1.- OXI POWER: ' + `${element.oxisul}`), { maxWidth: 18 });
        b = b + 1.3;
        recetaPDF.height += 1;

        doc.text(2, b, (recetaPDF.width, recetaPDF.height, '2.- ENRAIZADOR: ' + `${element.enraizadorsul}`));
        b = b + 1.3;
        recetaPDF.height += 1;

        doc.text(2, b, (recetaPDF.width, recetaPDF.height, '3.- VEGETATIVO: ' + `${element.vegetativosul}`), { maxWidth: 18 });
        b = b + 1.3;
        recetaPDF.height += 1;

        doc.text(2, b, (recetaPDF.width, recetaPDF.height, '4.- FLORACION: ' + `${element.floracionsul}`));
        b = b + 1.3;
        recetaPDF.height += 1;

        doc.text(2  , b, (recetaPDF.width, recetaPDF.height, '5.- ENGORDE: ' + `${element.engordesul}`), { maxWidth: 18 });
        recetaPDF.height += 1;
    });
    let c = 20.5

    //
    doc.setFont('helvetica')

    doc.text("ING. AGRONOMO: " + ObjectReceta.ingeniero, 7, 26);
    /* doc.text("UNIVERSIDAD: ", 8,26); */
    doc.addImage(footer, 'PNG', 0, 26.5, 21, 3.4);

    doc.setFontSize(12);
    doc.setTextColor("white");
    doc.text("Tel."+ ObjectReceta.telefono, 14, 28);
    doc.text("correo"+ ObjectReceta.correo, 14, 28.5);
    //doc.output('dataurlnewwindow');
    /* doc.save(this.paciente.nombrePaciente + " " + this.paciente.apellidoPaterno); */
    window.open(doc.output('bloburl', '_blank'));



}
