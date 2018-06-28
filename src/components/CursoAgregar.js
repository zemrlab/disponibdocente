import PanelAgregar from "./PanelAgregar";

class CursoAgregar extends React.Component {
    constructor(props){
        super(props)
        this.state = {nom_ciclo:'' ,fecha_inicio:'', fecha_fin:'', estado:''}
        this.handleChangeNombre = this.handleChangeNombre.bind(this)
        this.handleChangeFechaInicio = this.handleChangeFechaInicio.bind(this)
        this.handleChangeFechaFin = this.handleChangeFechaFin.bind(this)
        this.handleChangeEstado = this.handleChangeEstado.bind(this)
    }

    handleChangeNombre = (event) => {
        this.setState({nom_ciclo: event.target.value });
    }

    handleChangeFechaInicio = (event) => {
        this.setState({fecha_inicio: event.target.value });
    }

    handleChangeFechaFin = (event) => {
        this.setState({fecha_fin: event.target.value });
    }

    handleChangeEstado = (event) => {
        this.setState({estado: event.target.value });
    }

    render() {
        return <PanelAgregar cambionombre={handleChangeNombre} cambiofechainicio={handleChangeFechaInicio}
                             cambiofechafin={handleChangeFechaFin} cambioestado={handleChangeEstado}/>;
    }
}
export default CursoAgregar;