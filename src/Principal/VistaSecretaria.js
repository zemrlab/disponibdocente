import React, {Component} from "react";
import PanelAgregar from "./components/PanelAgregar";
import PanelHistorial from "./components/PanelHistorial";
import ModuloConsultas from "./components/ModuloConsultas";
import { Grid, Col, Row } from 'react-bootstrap';
import {Tabs, Tab,Button} from "react-bootstrap";
import axios from "axios/index";

class VistaSecretaria extends Component {
    constructor(...props) {
        super(...props)
        this.state = {
            cicleros: []
        }
    }

    componentDidMount() {
        axios.get('https://apidisponibilidad.herokuapp.com/curso/ciclos').then(res_ciclo => {
            this.setState({cicleros: res_ciclo.data})
        })
    }

    guardarCiclo=(ciclo)=>{
        ////console.log(ciclo);
        axios.post('http://apidisponibilidad.herokuapp.com/curso/nuevociclo', ciclo)
            .then(res => {
                //console.log(res);
                //console.log(res.data);
                axios.get('https://apidisponibilidad.herokuapp.com/curso/ciclos').then(res_ciclo => {
                    this.setState({cicleros: res_ciclo.data})
                })
            })
    }
    render() {
        const { cicleros } = this.state;
        return (
                <div className="App">

                    <Row>
                        <Col mdOffset={10} md={2}>
                            <Button href="http://siga-fisi.herokuapp.com/dashboard">VOLVER A MENU</Button>
                        </Col>
                    </Row>
                    <header className="App-header">
                        <h1 className="App-title">Módulo Secretaria</h1>
                    </header>

                    <Grid>
                        <Col md={12}>
                            <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                                <Tab eventKey={1} title="Apertura de Ciclo">
                                    <br/>
                                    <br/>
                                    <Row>
                                        <Col md={12}>
                                            <PanelAgregar guardarCiclo={this.guardarCiclo}/>
                                            <br/>
                                            <br/>
                                            <PanelHistorial ciclos={cicleros}/>
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