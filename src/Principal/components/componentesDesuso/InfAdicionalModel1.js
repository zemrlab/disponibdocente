import React, { Component } from 'react';
import {Panel, Button} from 'react-bootstrap';
import styles from '../styles.css'
import {FormGroup, ControlLabel, FormControl, FieldGroup} from 'react-bootstrap';
import InfAdicionalModel2 from "./InfAdicionalModel2";

const InfAdicionalModel1 = ({profesor}) =>
    <div>
        <FormGroup>
            <ControlLabel>Nombre</ControlLabel>
            <FormControl className="color-fondo"
                         type="text"
                         value="Nombre de Prueba"
                         disabled="true"/>
        </FormGroup>

        <InfAdicionalModel2/>
        <FormGroup>
            <ControlLabel>Grado</ControlLabel>
            <FormControl className="color-fondo"
                         type="text"
                         value="Grado de Prueba"
                         disabled="true"/>
        </FormGroup>
    </div>

export default InfAdicionalModel1;