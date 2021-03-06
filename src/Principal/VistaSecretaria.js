import React, {Component} from "react";
import PanelAgregar from "./components/PanelAgregar";
import PanelHistorial from "./components/PanelHistorial";
import ModuloConsultas from "./components/ModuloConsultas";
import { Grid, Col, Row } from 'react-bootstrap';
import {Tabs, Tab,Button} from "react-bootstrap";
import swal from "sweetalert2";
import api from "./componentsSpecials/api"

const toastEvento=swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 1500,
});


class VistaSecretaria extends Component {
    constructor(...props) {
        super(...props)
        this.state = {
            cicleros: [],
            estadoCiclos:false,
        }
    }

    componentDidMount() {
        api.get('curso/ciclos').then(res_ciclo => {
            this.setState({cicleros: res_ciclo.data})
        })
    }

    guardarCiclo=(ciclo)=>{
        ////console.log(ciclo);
        api.post('http://apidisponibilidad.herokuapp.com/curso/nuevociclo', ciclo)
            .then(res => {
                //console.log(res);
                //console.log(res.data);
                api.get('curso/ciclos').then(res_ciclo => {
                    this.setState({cicleros: res_ciclo.data})
                })
            })
    }

    borrarCiclo = (index) =>{
        let copyCiclos=this.state.cicleros;
        copyCiclos.splice(index, 1);
        this.setState({ciclero:copyCiclos})
    }

    handleCiclos = (e,index) => {
        let property = e.target.name;
        let tipo=e.target.type;
        let copyState=this.state.cicleros;
        switch(tipo){
            case "checkbox":
                (copyState[index])[property]=e.target.checked; break;
            default:(copyState[index])[property]=e.target.value;
        }
        this.setState({ filterBuscar: copyState} )
   }

    editarCiclos= () =>{
        if (this.state.estadoCiclos) {
            api.get('curso/ciclos').then(res_ciclo =>{
                this.setState(prevState => ({
                    estadoCiclos: !prevState.estadoCiclos,
                    cicleros: res_ciclo.data
                }))
            })
        }
        else
            this.setState(prevState => ({
                estadoCiclos: !prevState.estadoCiclos
            }))
    }

    confirmarCiclos =() =>{
        swal({
            title: '¿Seguro?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            confirmButtonText: 'Si',
            cancelButtonText:'No',
        }).then((result)=>{
            if(result.value){
                api.post('curso/ciclos-update-destroy',this.state.cicleros).then(res=>{
                    toastEvento({type:'success', title:'Actualizado con exito'})
                    this.setState({estadoCiclos:false})
                }).catch( srror=> {
                        swal({
                            title: 'ERROR!! ENVIO DE DATOS ERRONEO',
                            type: 'error'
                        })
                    }
                )
            }
        })
       // api.post('curso/ciclos-update-destroy',this.state.cicleros).catch(

        //)
    }

    render() {
        const { cicleros,estadoCiclos } = this.state;
        const {guardarCiclo,borrarCiclo,editarCiclos,handleCiclos,confirmarCiclos}=this;
        return (
                <div className="App">
                    <header className="App-header">
                        <Row>
                            <Col mdOffset={3} md={6}>
                                <h1 className="App-title">Módulo Secretaria</h1>
                            </Col>
                            <Col mdOffset={1} md={2}>
                                <Button href="http://siga-fisi.herokuapp.com/dashboard">VOLVER A MENU</Button>
                            </Col>
                        </Row>
                    </header>

                    <Grid>
                        <Col md={12}>
                            <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                                <Tab eventKey={1} title="Apertura de Ciclo">
                                    <br/>
                                    <br/>
                                    <Row>
                                        <Col md={12}>
                                            <PanelAgregar guardarCiclo={guardarCiclo}/>
                                            <br/>
                                            <br/>
                                            <PanelHistorial ciclos={cicleros} clickBorrar={borrarCiclo}
                                                editarEstado={estadoCiclos} clickEditar={editarCiclos}
                                                handleChange={handleCiclos} clickGuardar={confirmarCiclos}/>
                                        </Col>
                                    </Row>
                                </Tab>
                                <Tab eventKey={2} title="Módulo de Consultas">
                                        <ModuloConsultas />
                                </Tab>

                            </Tabs>
                        </Col>

                    </Grid>
                </div>
        );
    }
}

export default VistaSecretaria