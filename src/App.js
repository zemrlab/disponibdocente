import React, { Component } from 'react';
import './App.css';
import VistaDocente from "./Principal/VistaDocente";
import VistaSecretaria from "./Principal/VistaSecretaria";


class App extends Component {
    constructor(...props){
        super(...props)
        this.state = {
            tipo: "administrativo",
            id: 1
        }
    }

    async componentWillMount () {
        await this.getParametros();
    }

    getParametros = () => {
        let url = new URL(window.location.href);
        let id = url.searchParams.get("id");
        let tipo = url.searchParams.get("tipo");
        if(id!=null && tipo!=null)
            this.setState({
                tipo: tipo,
                id : id
            })
    }


    render() {
        switch (this.state.tipo){
            case "docente": return <VistaDocente id={this.state.id}/>
            case "administrativo": return <VistaSecretaria id={this.state.id}/>
            default : return <div></div>
        }
    }
}

export default App;
