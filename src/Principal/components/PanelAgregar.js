import React, { Component } from 'react';
import {Panel} from 'react-bootstrap';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Grid, Col, Row} from 'react-bootstrap';
import DatePickerCustom from './DatePicker';
import moment from 'moment';
import swal from "sweetalert2";

Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return [
        (dd>9 ? '' : '0') + dd,
        (mm>9 ? '' : '0') + mm,
        this.getFullYear()
    ].join('-');
}

class PanelAgregar extends Component{
    constructor(props){
        let date=new Date();
        super(props);
        this.state = {
            newCiclo: {
                nombre: '',
                fecha_inicio:date.yyyymmdd(),
                fecha_fin: date.yyyymmdd()
            },
            nombre: '',
            fecha_inicio: date.yyyymmdd(),
            fecha_fin:date.yyyymmdd(),
        };
        this.handleChangeFechaInicio = this.handleChangeFechaInicio.bind(this),
            this.handleChangeFechaFin = this.handleChangeFechaFin.bind(this),
            this.handleChangeNombre = this.handleChangeNombre.bind(this)
    }

    functionFechaFix(fecha){
        let fechanew = fecha.split("-");
        fecha = fechanew[2] + "-" + fechanew[1] + "-" + fechanew[0];
        return fecha
    }

    functionFechaDate(fecha){
        let fechanew = fecha.split("-");
        fecha = fechanew[1] + "-" + fechanew[0] + "-" + fechanew[2];
        return fecha
    }

    addNewCiclo(e){
        e.preventDefault();
        let fecha_inicio =new Date(
            this.functionFechaDate(this.state.newCiclo.fecha_inicio) );
        let fecha_fin = new Date(
            this.functionFechaDate(this.state.newCiclo.fecha_fin));
        if(fecha_inicio.getTime()<fecha_fin.getTime()) {
            var ciclo = {
                nom_ciclo: this.state.nombre,
                //fecha_inicio:this.state.newCiclo.fecha_inicio,
                //fecha_fin:this.state.newCiclo.fecha_fin,
                fecha_inicio: this.functionFechaFix(this.state.newCiclo.fecha_inicio),
                fecha_fin: this.functionFechaFix(this.state.newCiclo.fecha_fin),
                estado: true
            }

            //console.log(ciclo);
            this.props.guardarCiclo(ciclo)
        }else
            swal({
                title: 'La fecha de inicio debe ser menor a la fecha final',
                type: 'error',
                showConfirmButton: false,
                timer: 2000,
            })
    }

    handleChangeFechaInicio(date){
        this.setState(prevState=>{
            let nCiclo = prevState.newCiclo;
            nCiclo['fecha_inicio'] = date;
            return {newCiclo:nCiclo};
        })
    }

    handleChangeFechaFin(date){
        this.setState(prevState=>{
            let nCiclo = prevState.newCiclo;
            nCiclo['fecha_fin'] = date;
            return {newCiclo:nCiclo}
        })
    }

    handleChangeNombre(e){
        this.setState({
            nombre : e.target.value
        });
        console.log(this.state.nombre);
    }

    render(){
        const {handleChangeFechaInicio} = this;
        const {handleChangeFechaFin} = this;
        const {handleChangeNombre}=this;
        return(
            <Panel bsStyle="primary">
                <Panel.Heading>
                    <Panel.Title componentClass="h3">Agregar Semestre</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    <Row>
                        <form className="ciclo-form" onSubmit={(e)=>this.addNewCiclo(e)}>
                            <Col md={2}>
                                <FormGroup>
                                    <ControlLabel>Nombre del Ciclo</ControlLabel>
                                    <FormControl
                                        value={this.state.nombre}
                                        type="text"
                                        placeholder="Enter text"
                                        onChange = {this.handleChangeNombre}/>
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <ControlLabel>Fecha Inicio</ControlLabel>
                                    <DatePickerCustom
                                        startDate={() => this.state.fecha_inicio()} handleChange={handleChangeFechaInicio}
                                    />
                                </FormGroup>

                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <ControlLabel>Fecha Fin</ControlLabel>
                                    <DatePickerCustom
                                        startDate={() => this.state.fecha_fin()} handleChange={handleChangeFechaFin}
                                    />
                                </FormGroup>

                            </Col>
                            <br/>
                            <Col md={2}> <Button bsStyle="primary" type="submit">Agregar</Button> </Col>
                        </form>
                    </Row>

                </Panel.Body>
            </Panel>
        )
    }
}

export default PanelAgregar