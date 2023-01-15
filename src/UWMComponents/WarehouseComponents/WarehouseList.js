import React, { Component } from 'react'
import WarehouseServices from '../../Axios/WarehouseServices';
import { Link } from "react-router-dom";

export default class WarehouseList extends Component {
    constructor(props) {
        super(props);

        this.warehouseServices = new WarehouseServices();

        this.state = {
            warhouses: [],
        }
    }

    async componentDidMount() {
        this.setState({ warhouses: await this.warehouseServices.getWarehouse() })
    }

    render() {
        return (
            <div>
                <div className="row">

                    <div className="col-6 col-md-9">
                        <br />
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Номер</th>
                                    <th scope="col">Страна</th>
                                    <th scope="col">Город</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.warhouses.map(item =>
                                    <tr key={item.id}>
                                        <td>{item.number}</td>
                                        <td>{item.addressDto.country}</td>
                                        <td>{item.addressDto.city}</td>
                                        <td><Link to={`/WarehouseEdit/${item.id}`}><button type="button" className="btn btn-outline-warning btn-sm fw-bolder">Редактировать</button></Link></td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
