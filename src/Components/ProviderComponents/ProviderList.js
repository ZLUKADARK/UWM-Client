import React, { Component } from 'react'
import { Link } from "react-router-dom";
import ProviderServices from '../../Axios/ProviderServices';


export default class ProviderList extends Component {
    constructor(props) {
        super(props);

        this.providerServices = new ProviderServices();

        this.state = {
            provider: [],
        }
    }

    async componentDidMount() {
        this.setState({ provider: await this.providerServices.getProvider() })
    }

    render() {
        if (this.state.provider != null)
            return (
                <div>
                    <div className="row mb-4 justify-content-md-center">
                        <div className="col-md-9 shadow">
                            <br />
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Поставщик</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.provider.map(item =>
                                        <tr key={item.id}>
                                            <td>{item.name}</td>
                                            <td><Link to={`/ProviderEdit/${item.id}`}><button type="button" className="btn btn-outline-dark btn-sm fw-bolder">Открыть</button></Link></td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )
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
