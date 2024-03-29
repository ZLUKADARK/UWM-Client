import ProviderServices from '../../Axios/ProviderServices';
import * as valid from "../../ValidationSchema/Provider/ProviderValidation"
import React, { Component } from 'react'
import { useParams, Navigate } from 'react-router-dom'

import {
    Link,
} from "react-router-dom";

export default function ProviderEdit(props) {

    let { id } = useParams();

    return (
        <div>
            <Provider id={id} />
        </div>
    );
}


class Provider extends Component {

    constructor(props) {
        super(props);

        this.providerServices = new ProviderServices();

        this.state = {
            id: 0,
            name: "",
            edit: false,
            provider: {},

            validName: {
                valid: false,
                message: []
            },
        }

        this.handleChange = this.handleChange.bind(this);
        this.Update = this.Update.bind(this);
        this.Delete = this.Delete.bind(this);
    }

    async handleChange(e) {
        const { name, value } = e.target;
        await this.setState({
            [name]: value
        });
        await this.validator();
    }

    async validator() {
        const data = {
            name: this.state.name,
        }

        await this.setState({
            validName: await valid.name(data),
        })
    }

    async Update() {
        const provider = {
            id: this.state.id,
            name: this.state.name,
        }

        await this.providerServices.updateProvider(this.props.id, provider);
        this.setState({ edit: false });
        await this.componentDidMount();
    }

    async Delete() {
        await this.providerServices.deleteProvider(this.state.id);
        this.setState({ redirectToList: true });
    }

    async componentDidMount() {
        const p = await this.providerServices.getProviderById(this.props.id)
        await this.setState({
            id: p.id,
            name: p.name,
            provider: p,
        })
        await this.validator();
    }

    render() {
        const { provider, name, edit } = this.state;

        if (this.state.redirectToList) {
            return <Navigate to={"/"} />
        }

        if (provider != null)
            if (edit) {
                return (
                    <div >
                        <br /><br />
                        <div className="mx-auto col-md-11 card shadow mb-4" >
                            <div className="card-header bg-transparent border-dark"><h3>Добавление поставщика</h3></div>
                            <div className="card-body text-dark">

                                <div className="form-floating">
                                    <input className={`form-control ${this.state.validName.valid ? "is-valid" : "is-invalid"}`} type="text" value={name} name="name" onChange={this.handleChange} placeholder="Имя поставщика" />
                                    <label className="form-label" htmlFor="manufacturer">Поставщик</label>
                                    <div className="invalid-feedback">
                                        {this.state.validName.message[0]}
                                    </div>
                                </div>

                            </div>

                            <div className="card-footer border-dark bg-transparent">
                                <div className="row" >
                                    <div className="col-8 d-grid gap-2 d-md-flex">
                                        <button type="button" onClick={() => this.setState({ edit: false })} className="btn btn-outline-dark fw-bolder">Отмена</button>
                                        <button type="button" onClick={this.Update} className="btn btn-outline-success fw-bolder">Сохранить</button>
                                    </div>
                                    <div className="col-4 d-grid gap-2 d-md-flex justify-content-end">
                                        <button type="button" onClick={this.Delete} className="btn btn-outline-danger fw-bolder">Удалить</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div >
                        <br /><br />
                        <div className="mx-auto col-md-11 card shadow mb-4" >
                            <div className="card-header bg-transparent border-dark"><h3>{provider.name}</h3></div>
                            <div className="card-body text-dark">
                                <table className="table table-hover">
                                    <tbody>
                                        <tr>
                                            <th>Поставщик</th>
                                            <th>{provider.name}</th>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="card-footer border-dark bg-transparent">
                                <div className="row" >
                                    <div className="col-8 d-grid gap-2 d-md-flex">
                                        <Link className="btn btn-outline-dark fw-bolder" to={`/`}>Назад</Link>
                                        <button type="button" onClick={() => this.setState({ edit: true })} className="btn btn-outline-warning fw-bolder">Редактировать</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                )
            }
        return (
            <div>
                <br /><br />
                <br />
                <div className="text-center">
                    <div className="spinner-border" role="status">
                    </div>
                </div>
            </div>
        )

    }
}