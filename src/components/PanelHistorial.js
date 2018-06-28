import React, { Component } from 'react';
import {Grid, Col, Row} from 'react-bootstrap';
import {Table} from 'react-bootstrap';
import {Panel, FormControl} from 'react-bootstrap';

const PanelHistorial = ({ciclos})=>

    <Panel bsStyle="primary">
        <Panel.Heading>
            <Panel.Title componentClass="h3">Historial Semestres Academicos</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
            <Row>
                <Table striped bordered condensed hover responsive>
                    <thead>
                    <tr>
                        <th className="text-center">Ciclo</th>
                        <th className="text-center">Fecha Inicio</th>
                        <th className="text-center">Fecha Fin</th>
                        <th className="text-center">Habilitar</th>
                    </tr>
                    </thead>
                    <tbody>
                            {ciclos.map((item)=>
                                <tr>{
                                Object.keys(item).map((xd)=>
                                {if (xd!=='id_ciclo') return <td>
                                    <FormControl
                                        name="nombre"
                                        type="text"
                                        value={item[xd]}

                                        placeholder="Enter text"/>
                                </td>}
                                )}</tr>
                            )}
                    </tbody>
                </Table>
            </Row>
        </Panel.Body>
    </Panel>

export default PanelHistorial