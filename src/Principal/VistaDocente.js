import React, { Component } from 'react';
import axios from 'axios';
import logo from './media/teacher.svg';
import './VistaDocente.css';
import data from "./initialData/data.json";
import {ControlLabel,FormControl,FormGroup, Grid, Col, Row } from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import InformacionAcademica from './components/InformationAcademic';
import InformacionPersonal from './components/InformationPersonal';
import PhotoPanel from './components/PhotoPanel';
import PreferencesPanel from "./components/PreferencesPanel";
import DisponibilidadPanel from './components/DisponibilidadPanel';
import PDFPanel from './components/PDFPanel';
import fotoHombre from './media/imageHombre.png';
import fotoMujer from './media/ImagenMujer.jpg';
import swal from "sweetalert2"

import {Tabs, Tab} from "react-bootstrap";

const toastEvento=swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 1500,
});

class VistaDocente extends Component {
    constructor(...props){
        super(...props)
        this.state = {
            rows: data[0].rows,
            columns: data[0].columns,
            selection: [],
            enabled: data[0].enabled,
            values: data[0].programas,
            courseHistory: [],
            coursesSelection: data[0].seleccion,
            profesor: data[0].profesor,
            dhenabled: false,
            msenabled: false,
            //ciclo_actual: 1,
            cicleros:[],
            ciclo: '',
            estadoCiclo: true,
            id: this.props.id,
            foto: '',
        }

        for (let i=0;i<this.state.rows.length*this.state.columns.length;i++)
            this.state.selection.push(false)

        this.selectBox = this.selectBox.bind(this)
        this.selectAll = this.selectAll.bind(this)
        this.select = this.select.bind(this)
        this.sendDisp = this.sendDisp.bind(this)
        this.handleMS = this.handleMS.bind(this)
        this.getPDF = this.getPDF.bind(this)
        this.changeDHEditable = this.changeDHEditable.bind(this)
        this.expandDong = this.expandDong.bind(this)
        this.sendMS = this.sendMS.bind(this)
        this.changeMSEditable = this.changeMSEditable.bind(this)

    }

    expandDong = (prevState,newData) => {
        //console.log(newData)
        let coursesS = newData.map((n,i)=> {
            var newP =Object.assign({},n);
            newP.cursos=[]
            return newP
        })
        return coursesS
    }

    async componentDidMount(){
        axios.get('https://apidisponibilidad.herokuapp.com/curso/ciclos').then(res_ciclo => {
            this.setState({cicleros:res_ciclo.data,ciclo:res_ciclo.data[0].id_ciclo,estadoCiclo:!res_ciclo.data[0].estado})
            console.log(res_ciclo)
            axios.get(`https://apidisponibilidad.herokuapp.com/docente/docente/${this.state.id}`).then(res=>{
                this.buscarImagen(res.data);
                this.setState(({profesor:res.data}))
            }).then(
                axios.get('https://apidisponibilidad.herokuapp.com/curso/cursos').then(resi =>{
                    //console.log(this.state.ciclo)
                    axios.get(`https://apidisponibilidad.herokuapp.com/curso/docente/${this.state.id}/${res_ciclo.data[0].id_ciclo}`).then(res4 =>{
                        let selectedArray = res4.data.map(n=>n.id_curso)
                        this.setState(prevState => {
                            //console.log(prevState.coursesSelection)
                            return {values: resi.data,
                                coursesSelection: this.expandDong(prevState,resi.data).map((n,pos)=>
                                    Object.assign(n,{cursos:resi.data[pos].cursos.filter(curso=>selectedArray.includes(curso.id_curso))})
                                )}})
                    })
                    //this.setState(prevState => ({values: resi.data, coursesSelection:this.expandDong(prevState,resi.data)}));
                })).then(
                axios.get(`https://apidisponibilidad.herokuapp.com/disponibilidad/api/${this.state.id}/${res_ciclo.data[0].id_ciclo}`).then(res2 =>{
                    this.setState(prevState => ({
                        selection: JSON.parse(res2.data)
                    }));
                }).then(
                    axios.get(`https://apidisponibilidad.herokuapp.com/docente/docente/${this.state.id}`).then(res3 =>{
                        this.setState(prevState => ({
                            profesor: res3.data
                        }))})).then(
                    axios.get(`https://apidisponibilidad.herokuapp.com/docente/docente/${this.state.id}`).then(resina =>{
                        this.setState(prevState => ({
                            courseHistory:resina.data
                        }))
                    })
                )
            )
        });

        //console.log(this.props);
    }
    buscarImagen= (profesor) =>{
        switch (profesor.genero){
            case "M":  this.state.foto=fotoHombre; break;
            case "F": this.state.foto=fotoMujer; break;
            default: this.state.foto="";
        }
    }

    changeDHEditable = () => {
        if (this.state.dhenabled) {
            axios.get(`https://apidisponibilidad.herokuapp.com/disponibilidad/api/${this.state.id}/${this.state.ciclo}`).then(res =>{
                this.setState(prevState => ({
                    selection: JSON.parse(res.data),
                    dhenabled: !prevState.dhenabled
                }));
            }).catch(rej => {
                //console.log('EL BACK NO ESTA ACTIVADO')
                this.setState(prevState => ({
                        dhenabled: !prevState.dhenabled
                    })
                )})
        }
        else
            this.setState(prevState => ({
                dhenabled: !prevState.dhenabled
            }))
    }

    changeMSEditable = () => {
        if (this.state.msenabled) {
            axios.get(`https://apidisponibilidad.herokuapp.com/curso/docente/${this.state.id}/${this.state.ciclo}`).then(res4 =>{
                let selectedArray = res4.data.map(n=>n.id_curso)
                this.setState(prevState => {
                    //console.log(prevState.coursesSelection)
                    return {msenabled:!prevState.msenabled,
                        coursesSelection: this.expandDong(prevState,prevState.values).map((n,pos)=>
                            Object.assign(n,{cursos:this.state.values[pos].cursos.filter(curso=>selectedArray.includes(curso.id_curso))})
                        )}})
            })
        }
        else
            this.setState(prevState => ({
                msenabled: !prevState.msenabled
            }))
    }


    select(n,isEnabled,isSelectAll){
        if (isSelectAll && this.state.dhenabled) this.selectAll(n)
        else if (isEnabled && this.state.dhenabled)  this.selectBox(n)

    }

    /*
    siguienteCiclo = () => {
        this.setState(prevState => ({
            ciclo_actual:prevState.ciclo_actual+1
        }))
    }

    anteriorCiclo = () => {
        this.setState(prevState => ({
            ciclo_actual:prevState.ciclo_actual-1
        }))
    }
*/
    selectAll(n){
        this.setState(prevState => ({
            selection: prevState.selection.map((nu,iki) =>
                ((iki>=n*14 && iki<(n+1)*14) && !!this.state.enabled[iki]) ? true : nu
            )
        }))
    }

    selectBox = n => {
        this.setState(prevState => ({
            selection: prevState.selection.map((nu,iki) =>
                (iki!==n) ? nu : !nu
            )
        }))
    }

    sendDisp = () => {
        axios.post(`https://apidisponibilidad.herokuapp.com/disponibilidad/api/${this.state.id}/${this.state.ciclo}`,{selection:this.state.selection}).then(res =>{
            this.setState(prevState => ({
                dhenabled: !prevState.dhenabled
            }));
            toastEvento({type:"success",title:"GUARDADO CON EXITO"})
        }).catch(res=>
            toastEvento({type:"error",title:"ERROR!! NO SE GUARDO CON EXITO"})
        )

    }

    sendMS = () => {
        axios.post(`https://apidisponibilidad.herokuapp.com/curso/docente/${this.state.id}/${this.state.ciclo}`,{coursesSelection:this.state.coursesSelection}).then(res =>{
            this.setState(prevState => ({
                    msenabled: !prevState.msenabled
                })
            );
            toastEvento({type:"success",title:"GUARDADO CON EXITO"})
        }).catch(res=>
            toastEvento({type:"error",title:"ERROR!! NO SE GUARDO CON EXITO"})
        )

    }

    getPDF = () => {
        axios.get(`https://apidisponibilidad.herokuapp.com/docente/pdf/${this.state.id}/${this.state.ciclo}`).then( response=>{
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${this.state.profesor.apell_pat}_${((this.state.cicleros.find(c=>c.id_ciclo==this.state.ciclo)).nom_ciclo).trim()}.pdf`);
            document.body.appendChild(link);
            link.click();
        })
    }

    handleMS = (selectedOption,programa) =>{
        //console.log(selectedOption,programa)
        let selectedArray = selectedOption.split(',').map(n=>parseInt(n,10));
        this.setState(prevState => ({
            coursesSelection: prevState.coursesSelection.map((n,pos)=>{
                //console.log(n.id_programa)
                return (n.id_programa!==programa) ? {...n} :
                    Object.assign(n,{cursos:prevState.values[pos].cursos.filter(curso=>selectedArray.includes(curso.id_curso))})}
            )}))
        //console.log(this.state.coursesSelection)
    }

    changeCiclos=(ciclo)=>{
        let idciclo=ciclo;
        let cicl = this.state.cicleros.find(c=>c.id_ciclo==ciclo)
        console.log(cicl)
        this.setState({ciclo:idciclo,estadoCiclo:!cicl.estado,dhenabled:false,msenabled:false});
        axios.get(`https://apidisponibilidad.herokuapp.com/curso/docente/${this.state.id}/${idciclo}`).then(res4 =>{
            let selectedArray = res4.data.map(n=>n.id_curso)
            this.setState(prevState => {
                //console.log(prevState.coursesSelection)
                return {coursesSelection: this.expandDong(prevState,this.state.values).map((n,pos)=>
                        Object.assign(n,{cursos:this.state.values[pos].cursos.filter(curso=>selectedArray.includes(curso.id_curso))})
                    )}})
        })
        axios.get(`https://apidisponibilidad.herokuapp.com/disponibilidad/api/${this.state.id}/${idciclo}`).then(res2 =>{
            this.setState(({
                selection: JSON.parse(res2.data)
            }));
        })
    }

    render() {
        const { select, handleMS, getPDF,sendDisp,changeDHEditable,changeMSEditable,sendMS } = this;
        const {foto,rows,columns,selection,enabled,values,coursesSelection, profesor, dhenabled, msenabled, cicleros ,estadoCiclo} = this.state;
        return (
            <div className="App">
                <Row>
                    <Col mdOffset={10} md={2}>
                        <Button href="http://siga-fisi.herokuapp.com/dashboard">VOLVER A MENU</Button>
                    </Col>
                </Row>
                <Row>
                    <header className="App-header">
                        <h1 className="App-title"><img src={logo} className="App-logo" alt="logo" />
                            <div>Disponibilidad del docente</div></h1>
                    </header>
                    <Grid>
                        <Col md={9}>
                            <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                                <Tab eventKey={1} title="Informacion Personal">
                                    <InformacionPersonal profesor={profesor}/>
                                </Tab   >
                                <Tab eventKey={2} title="Informacion Academica">
                                    <InformacionAcademica profesor={profesor}/>
                                </Tab>
                            </Tabs>
                        </Col>
                        <Col md={3}>
                            <PhotoPanel photo={foto} />
                        </Col>
                        <Col md={9}>
                            <FormGroup controlId="formControlsSelect">
                                <ControlLabel>Ciclos</ControlLabel>
                                <FormControl componentClass="select" onChange={(e)=>this.changeCiclos(e.target.value)} value={this.state.value} placeholder="seleccionar ciclo">
                                    {(cicleros.length>0) ?
                                        cicleros.map((n,i)=><option key={i} value={n.id_ciclo}>{n.nom_ciclo}</option>):
                                        <option value="select">select</option>
                                    }
                                </FormControl>
                            </FormGroup>
                            <DisponibilidadPanel rows={rows} columns={columns} selection={selection}
                                                 enabled={enabled} onSelect={select} saveChanges={sendDisp}
                                                 editable={dhenabled} changeEdit={changeDHEditable} estadoEditar={estadoCiclo}/>

                            <PreferencesPanel notSelectedArray={values} selectedArray={coursesSelection} msedit={msenabled}
                                              changeSelection={handleMS} sendMS={sendMS} changeEdit={changeMSEditable} estadoEditar={estadoCiclo}/>
                            <PDFPanel getPDF={getPDF} />
                        </Col>
                    </Grid>
                </Row>
            </div>

        );
    }
}

export default VistaDocente;
