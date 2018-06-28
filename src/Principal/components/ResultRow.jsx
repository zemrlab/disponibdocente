import React, { Component } from 'react';

const getDisponibilidad = (disponibilidades) => {
    let disponibilidad = '';
    disponibilidades.map(n=> disponibilidad=disponibilidad + n.nombre + ' ' + n.hinicio + ' a ' + n.hfin + ' ')
    return disponibilidad
}

const ResultRow = ({resultado,onClick,...props}) =>
    <tr>
        {
            Object.keys(resultado).map(key=>
                (key!="disponibilidad")?<td key={key}>{resultado[key]}</td>:<td  key={key}>{getDisponibilidad(resultado[key])}</td>
            )
        }
    </tr>

export default ResultRow;
