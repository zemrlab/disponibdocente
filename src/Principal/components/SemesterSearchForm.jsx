import React, { Component } from 'react';
import {Panel} from 'react-bootstrap';
import {Grid, Col, Row} from 'react-bootstrap';
import {FormGroup, ControlLabel, FormControl, FieldGroup} from 'react-bootstrap';
import {Button} from 'react-bootstrap';

const SemesterSearchForm = ({handleChange=f=>f,onClickForm,ciclos,ciclo,dias,dia,...props}) =>
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
                                <FormControl  id="semestreFilter" className="color-fondo" componentClass="select" onChange={(e)=>handleChange(e)} value={ciclo}>
                                    {(ciclos.length>0) ?
                                        ciclos.map((n,i)=><option key={i} value={n.id_ciclo}>{n.nom_ciclo}</option>):
                                        <option value="select">select</option>
                                    }
                                </FormControl>
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
                                <FormControl  id="diaFilter" className="color-fondo" componentClass="select" onChange={(e)=>handleChange(e)} value={dia}>
                                    {(dias.length>0) ?
                                        dias.map((d,i)=><option key={i} value={d.id_dia}>{d.nom_dia}</option>):
                                        <option value="select">select</option>
                                    }
                                </FormControl>
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