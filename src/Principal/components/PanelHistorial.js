import React, { Component } from 'react';
import {Grid, Col, Row} from 'react-bootstrap';
import {Table} from 'react-bootstrap';
import {Panel, FormControl,Checkbox,Button} from 'react-bootstrap';
import './cssComponents/PanelHistorial.css';
import HoursButtons from "./HoursButtons";


const PanelHistorial = ({ciclos,clickBorrar,clickGuardar=f=>f,clickEditar=f=>f,editarEstado=true,handleChange=(f,index)=>f})=>

    <Panel bsStyle="primary">
        <Panel.Heading>
            <Panel.Title componentClass="h3">Historial Semestres Academicos</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
            <Col>
                <Table striped bordered condensed hover responsive>
                    <thead>
                        <tr>
                            <th className="text-center">Ciclo</th>
                            <th className="text-center">Fecha Inicio</th>
                            <th className="text-center">Fecha Fin</th>
                            <th className="text-center">Habilitar</th>
                            <th className="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                            {ciclos.map((item,key)=>
                                <tr key={key}>
                                    <th>
                                        <FormControl
                                        name="nom_ciclo"
                                        type="text"
                                        value={item.nom_ciclo.trim()}
                                        disabled={!editarEstado}
                                        placeholder="Enter text"
                                        onChange={(e)=>handleChange(e,key)}
                                        />
                                    </th>
                                    <th>
                                        <FormControl
                                            name="fecha_inicio"
                                            type="text"
                                            value={item.fecha_inicio}
                                            disabled={!editarEstado}
                                            placeholder="Enter text"
                                            onChange={(e)=>handleChange(e,key)}/>
                                    </th>
                                    <th>
                                        <FormControl
                                            name="fecha_fin"
                                            type="text"
                                            value={item.fecha_fin}
                                            disabled={!editarEstado}
                                            placeholder="Enter text"
                                            onChange={(e)=>handleChange(e,key)}/>
                                    </th>
                                    <th className="div_estado">
                                        <Checkbox
                                            defaultChecked={item.estado}
                                            className="estado"
                                            name="estado"
                                            disabled={!editarEstado}
                                            onChange={(e)=>handleChange(e,key)}/>
                                    </th>
                                    <th className="btn_borrar">
                                        <Button bsStyle="danger"
                                        onClick={()=>clickBorrar(key)}
                                        disabled={!editarEstado}>BORRAR</Button>
                                    </th>
                                </tr>
                            )}
                    </tbody>
                </Table>
                <HoursButtons saveChanges={clickGuardar} editing={editarEstado} changeEdit={clickEditar} />
            </Col>
        </Panel.Body>
    </Panel>

export default PanelHistorial