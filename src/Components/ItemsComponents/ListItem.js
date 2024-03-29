import React, { Component } from 'react'
import Sidebar from "./Sidebar";
import ItemAxios from '../../Axios/ItemServices';
import { Link } from "react-router-dom";

export default class Main extends Component {

    constructor(props) {
        super(props);
        this.getBySubCategory = this.getBySubCategory.bind(this);
        this.itemServices = new ItemAxios();

        this.state = {
            items: [],
        }
    }

    async getBySubCategory(scategoryId) {
        this.setState({ items: await this.itemServices.getItemByCategory(scategoryId) });
    }

    render() {
        if (window.screen.width >= 700)
            return (
                <div className="shadow row justify-content-md-center">

                    <div className="col-sm-12">
                        <Sidebar getBy={this.getBySubCategory} />
                    </div>

                    <div className={`col-6 col-md-9`}>
                        <br />
                        <table className={`table table-hover`}>
                            <thead>
                                <tr>
                                    <th scope="col">Название</th>
                                    <th scope="col">Цена</th>
                                    <th scope="col">Количество</th>
                                    <th scope="col">Поставщик</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.items.map(item =>
                                    <tr key={item.id}>
                                        <td><Link className="btn btn-outline-primary border-0" to={`/ItemEdit/${item.id}`}>{item.title}</Link> </td>
                                        <td> <p className="fw-bold" style={{ color: "green" }}> {item.price} $ </p></td>
                                        <td>
                                            <div>{item.quantity} {item.unit}</div>
                                        </td>
                                        <td>{item.providerName}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        return (
            <div className="shadow row justify-content-md-center">

                <div className="col-sm-12">
                    <Sidebar getBy={this.getBySubCategory} />
                </div>

                <div>
                    {this.state.items.map(item =>
                        <div class="card" key={item.id}>
                            <div class="card-body">
                                <h5 class="card-title">Название: {item.title}</h5>
                                <p class="card-text">Цена: {item.price} $</p>
                                <p class="card-text">Количество: {item.quantity} {item.unit}</p>
                                <Link className="btn btn-outline-primary border-0" to={`/ItemEdit/${item.id}`}>Открыть</Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}
