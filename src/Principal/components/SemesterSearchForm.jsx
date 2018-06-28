import React, { Component } from 'react';
import {Panel} from 'react-bootstrap';
import {Grid, Col, Row} from 'react-bootstrap';
import {FormGroup, ControlLabel, FormControl, FieldGroup} from 'react-bootstrap';
import {Button} from 'react-bootstrap';

const SemesterSearchForm = ({handleChange=f=>f,onClickForm,...props}) =>
    <div>
        <Panel bsStyle="primary">
            <Panel.Heading>
                <Panel.Title componentClass="h3">Consultas</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
                    <Row>
                        <Col md={4}>
                            <FormGroup>
                                <ControlLabel>Semestre</ControlLabel>
                                <FormControl className="color-fondo"
                                             id="semestreFilter"
                                             type="text"
                                             onChange={(e)=>handleChange(e)}/>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <ControlLabel>Curso</ControlLabel>
                                <FormControl className="color-fondo"
                                             id="cursoFilter"
                                             type="text"
                                             onChange={(e)=>handleChange(e)}/>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <ControlLabel>Docente</ControlLabel>
                                <FormControl className="color-fondo"
                                            id="docenteFilter"
                                             type="text"
                                             onChange={(e)=>handleChange(e)}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <FormGroup>
                                <ControlLabel>Dia</ControlLabel>
                                <FormControl className="color-fondo"
                                            id="diaFilter"
                                             type="text"
                                             onChange={(e)=>handleChange(e)}/>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <ControlLabel>Hora Inicio</ControlLabel>
                                <FormControl className="color-fondo"
                                             id="horaInicio"
                                             type="text"
                                             onChange={(e)=>handleChange(e)}/>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <ControlLabel>Hora Final</ControlLabel>
                                <FormControl className="color-fondo"
                                             id="horaFin"
                                             type="text"
                                             onChange={(e)=>handleChange(e)}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Button onClick={onClickForm} bsStyle="primary">Buscar</Button>
            </Panel.Body>
        </Panel>
    </div>
export default SemesterSearchForm


/*<form className="ciclo-form" onSubmit={onClickForm}>
*
*
                </form>
* */