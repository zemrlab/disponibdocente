import React, { Component } from 'react';
import { FieldGroup} from 'react-bootstrap';
import SemesterSearchForm from "./SemesterSearchForm";
import PanelResultado from "./PanelResultado";
import api from '../componentsSpecials/api';
import swal from "sweetalert2";

const toastEvento=swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 1500,
});

class ModuloConsultas extends Component {
    constructor(...props){
        super(...props)
        this.state = {
            isMenuOpened: false,
            cData:[],
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
            ciclos:[],
            dias:[],
        }

        this.handleChange = this.handleChange.bind(this);
        
    }
    handleChange = (e) => {
        e.preventDefault()
        let property = e.target.id;
        //console.log(property)
        let copyState=this.state.filterBuscar
        copyState[property]=e.target.value
        this.setState({ filterBuscar: copyState} )
    }

    buscarClick = ()=>{
        api.post('secretaria/buscar',this.state.filterBuscar).then(res =>{
            this.setState({resultados:res.data.resultado})
            console.log(res.data)
            if(res.data.estadoBusqueda)
                if(res.data.resultado.length===0)
                    toastEvento({type: "error", title: "NO SE ENCONTRE DATOS"})
                else
                    toastEvento({type: "success", title: "BUSQUEDA EXITOSA"})
            else
                toastEvento({type: "warning", title: "BUSQUEDA NO ADMITIDA"})
        })
    }
    componentDidMount(){
        api.get('curso/ciclos').then(res_ciclo => {
            let ciclos=res_ciclo.data.slice();
            ciclos.push({
                    id_ciclo:'',
                    nom_ciclo:"Ninguno",
                }
            )
            this.setState({ciclos: ciclos})
        })
        api.get('disponibilidad/dias').then(res_dias=>{
            let dias=res_dias.data.slice();
            dias.push({
                    id_dia:'',
                    nom_dia:"Ninguno",
                }
            )
            this.setState({dias: dias})
        })
    }

    render() {
        const {resultados,ciclos,dias,filterBuscar} = this.state;
        return (
            <div>
                <h2>Modulo Consultas</h2>
                        <SemesterSearchForm handleChange={this.handleChange} onClickForm={this.buscarClick}
                                            ciclos={ciclos} ciclo={filterBuscar.semestreFilter}
                                            dias={dias} dia={filterBuscar.diaFilter}/>
                        <PanelResultado showDocenteInfo={this.showInfoDocente} handleChanges={f=>f} resultados={resultados} />
            </div>
        )
    }
}
    
export default ModuloConsultas