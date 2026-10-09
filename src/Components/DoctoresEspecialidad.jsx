import React, { Component } from 'react'
import axios from 'axios'
import Global from '../Global'
export default class DoctoresEspecialidad extends Component {
    api = Global.urlDoctores
    EspecialidadDoc = React.createRef()

    loadEspecialidad = () => {
        let request = "api/Doctores/Especialidades"
        axios.get(this.api + request).then((response) => {
            this.setState({
                especialidad: response.data
            })
        })
    }


    state = {
        especialidad: [],
        idEspecialidad: "",
        doctores: null
    }

    componentDidMount = () => {
        this.loadEspecialidad()

    }

    buscarEspecialidad = () => {
        let idEspecialidad = this.EspecialidadDoc.current.value
        let request = "api/Doctores/DoctoresEspecialidad/" + idEspecialidad
        axios.get(this.api + request).then((response) => {
            this.setState({
                doctores: response.data
            })
        })
    }

    
    render() {
        return (
            <div>
                <a href="/">Home</a><br />
                <a href="/doctores">Doctores</a>
                <h1>Doctores Especialidades</h1>
                <form>
                    <label htmlFor="">Selecciona especialidad</label>
                    <select ref={this.EspecialidadDoc} name="" id="">
                        {
                            this.state.especialidad &&
                            this.state.especialidad.map((e, i) => {
                                return (<option key={i}>{e}</option>)
                            })
                        }
                    </select>
                    <button type="button" onClick={this.buscarEspecialidad} >Buscar Doctor</button>
                </form>
                {
                    this.state.doctores &&
                    <ul>
                        {
                            this.state.doctores.map((d, i) => {
                                return (
                                    <li key={i}>
                                        {d.idDoctor} {d.apellido} {d.especialidad} {d.salario} {d.idHospital}
                                    </li>
                                )
                            }
                            )
                        }
                    </ul>
                }
            </div>
        )
    }
}
