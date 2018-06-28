import React, { Component } from 'react';
import {Panel, Button} from 'react-bootstrap';
import PhotoPanel from './PhotoPanel';
import {FormGroup, ControlLabel, FormControl, FieldGroup} from 'react-bootstrap';
import SemesterSearchForm from "./SemesterSearchForm";
import PanelResultado from "./PanelResultado";
import dataB from '../initialData/dataConsultas';
import dataRial from '../initialData/datarial'
import { compose } from 'redux'
import axios from 'axios';
import { OffCanvas, OffCanvasMenu, OffCanvasBody } from 'react-offcanvas';
import styles from './styles.css'
import InfAdicionalModel1 from "./InfAdicionalModel1";
import InfAdicionalModel2 from "./InfAdicionalModel2";


class ModuloConsultas extends Component {
    constructor(...props){
        super(...props)
        this.state = {
            isMenuOpened: false,
            cData:dataRial,
            resultados: [],
           // filteredList:[],
            filterBuscar:{
                semestreFilter:'',
                cursoFilter: '',
                docenteFilter:'',
                diaFilter: '',
                horaInicio: "",
                horaFin: ""
            },

            /*
            disponibilidadFilter:'',
            phoneFilter:'',
            dniFilter:'',
            lastnameFilter:''
*/
            //nameFilter: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.filterByCourse = this.filterByCourse.bind(this);
        this.filterByName = this.filterByName.bind(this);
        //this.filterList = this.filterList.bind(this);
        this.filterByDisp = this.filterByDisp.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.showInfoDocente = this.showInfoDocente.bind(this);
        
    }

    showInfoDocente = () =>
        this.handleClick()

    handleClick = () =>
        this.setState({ isMenuOpened: !this.state.isMenuOpened });

    filterByName = (initialList) =>
        initialList.filter(datum=>(datum.nombres.toLowerCase().search(this.state.nameFilter)!==-1));      
    
    filterByName = (initialList) =>
        initialList.filter(datum=>(datum.apellidos.toLowerCase().search(this.state.nameFilter)!==-1));
        
    filterByDNI = (initialList) =>
        initialList.filter(datum=>(datum.nombres.toLowerCase().search(this.state.nameFilter)!==-1||datum.apellidos.toLowerCase().search(this.state.nameFilter)!==-1));      
    
    filterByPhone = (initialList) =>
        initialList.filter(datum=>(datum.nombres.toLowerCase().search(this.state.nameFilter)!==-1||datum.apellidos.toLowerCase().search(this.state.nameFilter)!==-1));      
        
    filterByDisp = (initialList) =>
        initialList.filter(datum=>(datum.semestre[0].disponibilidad.reduce((acc,curr)=>curr.nombre.toLowerCase().search(this.state.dayFilter)!==-1||acc,false)));

    filterByCourse = (initialList) =>
        initialList.filter(datum=>(datum.semestre[0].cursos.reduce((acc,curr)=>curr.nombre.toLowerCase().search(this.state.courseFilter)!==-1||acc,false)));
    
    filterList = 
        compose(this.filterByDay,this.filterByName,this.filterByCourse);
        
    handleChange = (e) => {
        e.preventDefault()
        let property = e.target.id;
        console.log(property)
        let copyState=this.state.filterBuscar
        copyState[property]=e.target.value
        this.setState({ filterBuscar: copyState} )
        //this.setState({[property]: e.target.value},()=>this.setState({resultados:this.filterList(this.state.cData)}))
    }

    buscarClick = ()=>{
        console.log(this.state.filterBuscar)
        axios.post('https://apidisponibilidad.herokuapp.com/secretaria/buscar',this.state.filterBuscar).then(res =>
            this.setState({resultados:res.data})
        )
    }

    componentWillMount(){
        this.setState({resultados:this.state.cData})
    }

    render() {
        const {resultados} = this.state;
        const {handleChange} = this;
        return (

            <OffCanvas width={300} transitionDuration={300} isMenuOpened={this.state.isMenuOpened} position={"right"}>
                <OffCanvasBody className={styles.bodyClass} style={{fontSize: '30px'}}>
                    <h2>Modulo Consultas</h2>
                    <Button onClick={this.handleClick}>Panel Izquierdo</Button>
                    <SemesterSearchForm handleChange={this.handleChange} onClickForm={this.buscarClick}/>
                    <PanelResultado showDocenteInfo={this.showInfoDocente} handleChanges={f=>f} resultados={resultados} />
                </OffCanvasBody>
                <OffCanvasMenu className={styles.menuClass}>
                    <Panel bsStyle="primary" className={"infoClass"}>
                        <Panel.Heading>
                            <Panel.Title componentClass="h3">Informacion Adicional</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                            <div>
                                <PhotoPanel/>
                                <InfAdicionalModel1/>
                            </div>
                        </Panel.Body>
                    </Panel>
                </OffCanvasMenu>
            </OffCanvas>

        )
    }
}
    
export default ModuloConsultas
