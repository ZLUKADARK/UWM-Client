import SubCategoryServices from '../../Axios/SubcategoryServices';
import CategoryServices from '../../Axios/CategoryServices';
import React, { Component } from 'react'

import {
    Link,
    Navigate,
} from "react-router-dom";

export default class CategoryCreate extends Component {

    constructor(props) {
        super(props);

        this.categoryServices = new CategoryServices();
        this.subCategoryServices = new SubCategoryServices();

        this.state = {
            id: 0,
            name: "",
            subcategoryname: "",
            redirect: false,
            addSubcategory: false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.Create = this.Create.bind(this);
        this.CreateSubcategory = this.CreateSubcategory.bind(this);
        this.addSubcategory = this.addSubcategory.bind(this);
    }

    async handleChange(e) {
        const { name, value } = e.target;
        await this.setState({
            [name]: value
        });
    }

    async Create() {
        const category = {
            name: this.state.name,
        }

        const id = await this.categoryServices.createCategory(category);

        if (this.state.addSubcategory) {
            await this.CreateSubcategory(id.data);
        }
        await this.setState({ id: id.data, redirect: true });
    }

    async CreateSubcategory(categoryId) {
        const subCategory = {
            name: this.state.subcategoryname,
            categoryId: categoryId
        }

        await this.subCategoryServices.createSubCategory(subCategory)
    }

    async addSubcategory() {
        let check = document.getElementById("check").checked;
        await this.setState({ addSubcategory: check })

        if (this.state.addSubcategory) {
            document.getElementById("subcategory").hidden = false;
            document.getElementById("yes").hidden = true;
            document.getElementById("no").hidden = false;
        } else {
            document.getElementById("subcategory").hidden = true;
            document.getElementById("yes").hidden = false;
            document.getElementById("no").hidden = true;
        }
    }

    render() {


        if (this.state.redirect) {
            return <Navigate to={`/CategoryEdit/${this.state.id}`} />
        }

        return (
            <div >
                <br /><br />
                <div className="mx-auto col-md-11 card shadow mb-4" >
                    <div className="card-header bg-transparent border-dark"><h3>Добавление категории</h3></div>
                    <div className="card-body text-dark">

                        <div className="form-floating">
                            <input className="form-control mb-4" type="text" id="name" name="name" onChange={this.handleChange} placeholder="Категория" />
                            <label className="form-label" htmlFor="name">Категория</label>
                            <div className="invalid-feedback">
                                {/* {this.state.validConfirmPassword.message[0]} */}
                            </div>
                        </div>

                        <div className="card-body text-dark col-4" id="subcategory" hidden>
                            <div className="form-floating">
                                <input className="form-control mb-4" type="text" id="subcategoryname" name="subcategoryname" onChange={this.handleChange} placeholder="Подкатегория" />
                                <label className="form-label" htmlFor="subcategoryname">Подкатегория</label>
                                <div className="invalid-feedback">
                                    {/* {this.state.validConfirmPassword.message[0]} */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer border-dark bg-transparent">
                        <div className="row" >
                            <div className="col-8 d-grid gap-2 d-md-flex">
                                <Link className="btn btn-outline-dark fw-bolder" to={`/`}>Отмена</Link>
                                <button type="button" onClick={this.Create} className="btn btn-outline-success fw-bolder">Сохранить</button>
                                <label className="btn btn-outline-primary" id="yes" htmlFor="check" >Добавить подкатегорию</label>
                                <label className="btn btn-outline-danger" id="no" htmlFor="check" hidden>Не добавлять подкатегорию</label>
                                <input autoComplete="off" className="btn-check" onClick={this.addSubcategory} type="checkbox" value={this.state.addSubcategory} id="check"></input>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}