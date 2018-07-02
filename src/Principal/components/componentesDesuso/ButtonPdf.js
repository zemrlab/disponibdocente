import React, {Component} from "react";
import {Button} from 'react-bootstrap';
import html2canvas from 'html2canvas';
import jsPDF from "jspdf";


export default class ButtonPdf extends Component {
    constructor(props) {
        super(props);
    }

    printDocument() {
        const input = document.getElementById('resultados_buscar');
        const emtHeight = input.offsetHeight;
        const emtWidth = input.offsetWidth;
        const proporcion = emtHeight/emtWidth;
        let imagen=new Image();
        //{
        //             width: 600,
        //             height: 600
        //         }
        html2canvas(input).then((canvas) => {
                imagen.src = canvas.toDataURL('image/JPEG');
                imagen.width=500;
                const pdf = new jsPDF();
                console.log(pdf);
                let width = pdf.internal.pageSize.width-20;
                let height = width * proporcion;

                pdf.addImage(imagen, 'JPEG' , 0, 0,width,height);

                pdf.output('dataurlnewwindow');
                //pdf.save("download.pdf");
            })
        ;
    }

    render() {
        return (
                <Button onClick={this.printDocument}>Print</Button>
        );
    }
}