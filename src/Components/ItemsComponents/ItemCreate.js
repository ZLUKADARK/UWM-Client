import ItemServices from '../../Axios/ItemServices';
import ProviderServices from '../../Axios/ProviderServices';
import WarehouseServices from '../../Axios/WarehouseServices';
import SubCategoryServices from '../../Axios/SubcategoryServices';
import * as valid from "../../ValidationSchema/Item/ItemValidation";
import React, { Component } from 'react'
import { Navigate } from 'react-router-dom'

import {
    Link,
} from "react-router-dom";


export default class ItemCreate extends Component {

    constructor(props) {
        super(props);

        this.itemServices = new ItemServices();
        this.providerServices = new ProviderServices();
        this.warehouseServices = new WarehouseServices();
        this.subCategoryServices = new SubCategoryServices();
        this.state = {
            id: 0,
            manufacturer: "",
            price: 0,
            providerId: 0,
            quantity: 0,
            specifications: "",
            subCategoryId: 0,
            title: "",
            unit: "",
            redirect: false,
            warehouseId: 0,
            subCategory: [],
            provider: [],
            wahehouse: [],

            validTitle: {
                valid: false,
                message: []
            },
            validPrice: {
                valid: false,
                message: []
            },
            validProviderId: {
                valid: false,
                message: []
            },
            validWarehouseId: {
                valid: false,
                message: []
            },
            validSubCategory: {
                valid: false,
                message: []
            },
            formValid: false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.Create = this.Create.bind(this);
    }

    async handleChange(e) {
        const { name, value } = e.target;
        await this.setState({
            [name]: value
        });
        await this.validator()
    }

    async validator() {
        const data = {
            title: this.state.title,
            price: this.state.price,
            providerId: this.state.providerId,
            warehouseId: this.state.warehouseId,
            subCategoryId: this.state.subCategoryId,
        }

        await this.setState({
            validTitle: await valid.title(data),
            validPrice: await valid.price(data),
            validProviderId: await valid.providerId(data),
            validWarehouseId: await valid.warehouseId(data),
            validSubCategory: await valid.subCategoryId(data),
            formValid: await valid.form(data)
        })
    }

    async Create() {
        const item = {
            title: this.state.title,
            specifications: this.state.specifications,
            manufacturer: this.state.manufacturer,
            quantity: this.state.quantity,
            price: this.state.price,
            unit: this.state.unit,
            providerId: this.state.providerId,
            warehouseId: this.state.warehouseId,
            subCategoryId: this.state.subCategoryId,
        }
        if (this.state.formValid) {
            let id = await this.itemServices.createItem(item);
            this.setState({ id: id.data, redirect: true });
            console.log("+")
        }
    }


    async componentDidMount() {
        this.setState({
            subCategory: await this.subCategoryServices.getSubCategory(),
            provider: await this.providerServices.getProvider(),
            wahehouse: await this.warehouseServices.getWarehouse(),
        })
    }

    render() {
        const { id, redirect } = this.state;

        if (redirect) {
            return <Navigate to={`/ItemEdit/${id}`} />
        }

        return (
            <div >
                <br /><br />
                <div className="shadow mx-auto col-md-11 card mb-4" >
                    <div className="card-header bg-transparent border-dark"><h3>Добавление предмета</h3></div>
                    <div className="card-body text-dark">
                        <div className="form-floating mb-4">
                            <input className={`form-control ${this.state.validTitle.valid ? "is-valid" : "is-invalid"}`} id="title" type="text" name="title" onChange={this.handleChange} placeholder="Название" />
                            <label className="form-label" htmlFor="title">Название</label>
                            <div className="invalid-feedback">
                                {this.state.validTitle.message[0]}
                            </div>
                        </div>

                        <div className="form-floating mb-4">
                            <input className="form-control" id="manufacturer" type="text" name="manufacturer" onChange={this.handleChange} placeholder="Производитель" />
                            <label className="form-label" htmlFor="manufacturer">Производитель</label>
                        </div>

                        <div className="form-floating mb-4">
                            <input className={`form-control ${this.state.validPrice.valid ? "is-valid" : "is-invalid"}`} id="price" type="number" name="price" onChange={this.handleChange} placeholder="Цена" />
                            <label className="form-label" htmlFor="price">Цена</label>
                            <div className="invalid-feedback">
                                {this.state.validPrice.message[0]}
                            </div>
                        </div>

                        <div className="row g-2 mb-4">
                            <div className="col-md">
                                <div className="form-floating">
                                    <input className="form-control col-6" id="quantity" type="number" name="quantity" onChange={this.handleChange} placeholder="Количество" />
                                    <label className="form-label" htmlFor="quantity">Количество</label>
                                </div>
                            </div>
                            <div className="col-md">
                                <div className="form-floating">
                                    <input className="form-control col-6" id="unit" type="text" name="unit" onChange={this.handleChange} placeholder="Единица" />
                                    <label className="form-label" htmlFor="unit">Единица</label>
                                </div>
                            </div>
                        </div>

                        <div className="col-md mb-4">
                            <div className="form-floating">
                                <select className={`form-select ${this.state.validProviderId.valid ? "is-valid" : "is-invalid"}`} id="providerId" defaultValue={'Default'} name="providerId" onChange={this.handleChange}>
                                    <option value="Default" disabled>Пусто</option>
                                    {this.state.provider.map(p =>
                                        <option key={p.id} value={p.id}>{p.name}</option>
                                    )}
                                </select>
                                <label className="form-label" htmlFor="providerId">Поставщик</label>
                                <div className="invalid-feedback">
                                    {this.state.validProviderId.message[0]}
                                </div>
                            </div>
                        </div>

                        <div className="col-md mb-4">
                            <div className="form-floating">
                                <select className={`form-select ${this.state.validSubCategory.valid ? "is-valid" : "is-invalid"}`} id="subCategoryId" defaultValue={'Default'} name="subCategoryId" onChange={this.handleChange}>
                                    <option value="Default" disabled>Пусто</option>
                                    {this.state.subCategory.map(sc =>
                                        <option key={sc.id} value={sc.id}>{sc.name}</option>
                                    )}
                                </select>
                                <label className="form-label" htmlFor="subCategoryId">Категория</label>
                                <div className="invalid-feedback">
                                    {this.state.validSubCategory.message[0]}
                                </div>
                            </div>
                        </div>

                        <div className="col-md mb-4">
                            <div className="form-floating">
                                <select className={`form-select ${this.state.validWarehouseId.valid ? "is-valid" : "is-invalid"}`} id="warehouseId" defaultValue={'Default'} name="warehouseId" onChange={this.handleChange}>
                                    <option value="Default" disabled>Пусто</option>
                                    {this.state.wahehouse.map(w =>
                                        <option key={w.id} value={w.id}>{w.number}</option>
                                    )}
                                </select>
                                <label className="form-label" htmlFor="warehouseId">Склад</label>
                                <div className="invalid-feedback">
                                    {this.state.validWarehouseId.message[0]}
                                </div>
                            </div>
                        </div>

                        <div className="form-floating">
                            <textarea className="form-control" id="specifications" placeholder="Описание товара" name="specifications" onChange={this.handleChange}></textarea>
                            <label htmlFor="specifications">Описание товара</label>
                        </div>

                    </div>
                    <div className="card-footer border-dark bg-transparent">
                        <div className="row" >
                            <div className="col-8 d-grid gap-2 d-md-flex">
                                <Link className="btn btn-outline-dark fw-bolder" to="/">Отмена</Link>
                                <button type="button" onClick={this.Create} className={`btn btn-outline-success fw-bolder ${this.state.formValid ? "" : "disabled"}`}>Сохранить</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}