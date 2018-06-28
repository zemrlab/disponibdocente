import React, { Component } from 'react';
import {Panel} from 'react-bootstrap';
import {FieldGroup} from 'react-bootstrap';
import TableResultado from "./TablaResultado";

const PanelResultado = ({resultados,handleChanges=f=>f,showDocenteInfo=f=>f,...props}) =>
    <div>
        <Panel bsStyle="primary">
            <Panel.Heading>
                <Panel.Title componentClass="h3">Resultado</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
                <TableResultado resultados={resultados} getDocenteData={showDocenteInfo} filterHandler={handleChanges}/>
            </Panel.Body>
        </Panel>
    </div>
export default PanelResultado