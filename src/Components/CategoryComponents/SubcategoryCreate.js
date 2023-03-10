import SubCategoryServices from '../../Axios/SubcategoryServices';
import React, { Component } from 'react'
import { useParams, Navigate } from 'react-router-dom'

import {
    Link,
} from "react-router-dom";


export default function SubCategoryCreate(props) {

    let { categoryId } = useParams();

    return (
        <div>
            <SubCategory categoryId={categoryId} />
        </div>
    );
}

class SubCategory extends Component {

    constructor(props) {
        super(props);

        this.subCategoryServices = new SubCategoryServices();

        this.state = {
            id: 0,
            name: "",
            redirect: false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.Create = this.Create.bind(this);
    }

    async handleChange(e) {
        const { name, value } = e.target;
        await this.setState({
            [name]: value
        });
    }

    async Create() {
        const subCategory = {
            name: this.state.name,
            categoryId: this.props.categoryId
        }
        await this.subCategoryServices.createSubCategory(subCategory)
        this.setState({ redirect: true })
    }

    render() {


        if (this.state.redirect) {
            return <Navigate to={`/CategoryEdit/${this.props.categoryId}`} />
        }

        return (
            <div >
                <br /><br />
                <div className="mx-auto col-md-11 card shadow mb-4" >
                    <div className="card-header bg-transparent border-dark"><h3>Добавление подкатегории</h3></div>
                    <div className="card-body text-dark">

                        <div className="form-floating">
                            <input className="form-control mb-4" type="text" id="name" name="name" onChange={this.handleChange} placeholder="Подкатегория" />
                            <label className="form-label" htmlFor="name">Подкатегория</label>
                            <div className="invalid-feedback">
                                {/* {this.state.validConfirmPassword.message[0]} */}
                            </div>
                        </div>

                    </div>
                    <div className="card-footer border-dark bg-transparent">
                        <div className="row" >
                            <div className="col-8 d-grid gap-2 d-md-flex">
                                <Link className="btn btn-outline-dark fw-bolder" to={`/CategoryEdit/${this.props.categoryId}`}>Отмена</Link>
                                <button type="button" onClick={this.Create} className="btn btn-outline-success fw-bolder">Сохранить</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}