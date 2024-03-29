import React, { Component } from 'react';
import AuthorizationsServices from '../../Axios/AuthorizationsServices';
import { Link, Navigate } from "react-router-dom";
import * as validation from "../../ValidationSchema/Authorization/RegistrationValidation"

export default class Registration extends Component {
    constructor(props) {
        super(props)
        this.authorization = new AuthorizationsServices();

        this.state = {
            userName: "",
            email: "",
            password: "",
            confirmPassword: "",
            loading: false,
            loginOn: false,
            validForm: false,
            validEmail: {
                valid: false,
                message: []
            },
            validUserName: {
                valid: false,
                message: []
            },
            validPassword: {
                valid: false,
                message: []
            },
            validConfirmPassword: {
                valid: false,
                message: []
            }
        }

        this.registering = this.registering.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async registering() {
        const data = {
            userName: this.state.userName,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
        }
        if (this.state.validForm) {
            await this.setState({
                loading: true
            })
            let result = await this.authorization.Register(data);
            if (typeof (result.data) !== "undefined") {
                await alert(result.data)
                this.setState({ loginOn: true })
            }
            else {
                await alert("Ошибка!")
                await this.setState({
                    loading: false
                })
            }
        }
    }

    async handleChange(e) {
        const { name, value } = e.target;
        await this.setState({
            [name]: value
        })

        const data = {
            userName: this.state.userName,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
        }

        await this.setState({
            validUserName: await validation.userName(data),
            validPassword: await validation.password(data),
            validConfirmPassword: await validation.confirmPassword(data),
            validEmail: await validation.email(data),
            validForm: await validation.form(data),
        })
    }

    render() {
        if (this.state.loginOn)
            return (
                <Navigate to={"/authorization/login"} />
            )
        return (
            <div>
                <form>

                    <div className="form-outline mb-5">
                        <div className="form-floating">
                            <input type="text" id="userName" name="userName" onChange={this.handleChange} className={`form-control  ${this.state.validUserName.valid ? "is-valid" : "is-invalid"}`} placeholder="Имя пользователя" />
                            <label htmlFor="userName">Имя пользователя</label>
                            <div className="invalid-feedback">
                                {this.state.validUserName.message[0]}
                            </div>
                        </div>
                    </div>

                    <div className="form-outline mb-5">
                        <div className="form-floating">
                            <input type="email" id="email" name="email" onChange={this.handleChange} className={`form-control  ${this.state.validEmail.valid ? "is-valid" : "is-invalid"}`} placeholder="Почта" />
                            <label htmlFor="email">Почта</label>
                            <div className="invalid-feedback">
                                {this.state.validEmail.message[0]}
                            </div>
                        </div>
                    </div>

                    <div className="form-outline mb-5">
                        <div className="form-floating">
                            <input type="password" id="password" name="password" onChange={this.handleChange} className={`form-control  ${this.state.validPassword.valid ? "is-valid" : "is-invalid"}`} placeholder="Пароль" />
                            <label htmlFor="password">Пароль</label>
                            <div className="invalid-feedback">
                                {this.state.validPassword.message[0]}
                            </div>
                        </div>
                    </div>

                    <div className="form-outline mb-5">
                        <div className="form-floating">
                            <input type="password" id="confirmPassword" name="confirmPassword" onChange={this.handleChange} className={`form-control  ${this.state.validConfirmPassword.valid ? "is-valid" : "is-invalid"}`} placeholder="Подтвердите пароль" />
                            <label htmlFor="confirmPassword">Подтвердите пароль</label>
                            <div className="invalid-feedback">
                                {this.state.validConfirmPassword.message[0]}
                            </div>
                        </div>
                    </div>

                    <button type="button" onClick={this.registering} className={`btn btn-outline-dark col-12 mb-4 ${this.state.validForm ? "" : "disabled"}`}>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" hidden={!this.state.loading}></span>
                        {!this.state.loading ? "Подтвердить" : ""}
                    </button>
                    <div className="text-center">
                        <p><Link className="btn btn-outline-primary col-7 " to={"/authorization/login"}>Войти</Link></p>
                    </div>
                </form>
            </div>
        )
    }
}

