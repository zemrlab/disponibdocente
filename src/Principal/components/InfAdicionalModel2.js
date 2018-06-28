import React, { Component } from 'react';
import {Panel, Button} from 'react-bootstrap';
import styles from './styles.css'
import {FormGroup, ControlLabel, FormControl, FieldGroup} from 'react-bootstrap';
import PhotoPanel from './PhotoPanel';

const InfAdicionalModel2 = ({profesor}) =>
    <div>
        <FormGroup>
            <ControlLabel>Correo</ControlLabel>
            <FormControl className="color-fondo"
                         type="text"
                         value="Correo de Prueba"
                         disabled="true"/>
        </FormGroup>
        <FormGroup>
            <ControlLabel>Direccion</ControlLabel>
            <FormControl className="color-fondo"
                         type="text"
                         value="Direccion de Prueba"
                         disabled="true"/>
        </FormGroup>
        <FormGroup>
            <ControlLabel>Celular</ControlLabel>
            <FormControl className="color-fondo"
                         type="text"
                         value="Celular de Prueba"
                         disabled="true"/>
        </FormGroup>
    </div>

export default InfAdicionalModel2;