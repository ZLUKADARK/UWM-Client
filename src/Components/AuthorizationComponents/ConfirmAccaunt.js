import React, { Component } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import AuthorizationsServices from '../../Axios/AuthorizationsServices';

export default function ConfirmAccaunt(props) {

    const [searchParams] = useSearchParams();

    const code = searchParams.get('code').replace(/\s/g, "+");
    const email = searchParams.get('email');

    return (
        <Confirm code={code} email={email} />
    )
}

class Confirm extends Component {

    constructor(props) {
        super(props)
        this.authorizationsServices = new AuthorizationsServices();
        this.state = {
            confirmed: false
        }
    }

    async componentDidMount() {
        const confirmModel = {
            email: this.props.email,
            code: this.props.code
        }
        await this.setState({
            confirmed: await this.authorizationsServices.confirmAccaunt(confirmModel)
        })
    }

    render() {
        if (this.state.confirmed)
            return (
                <Navigate to={"/authorization/login"} />
            )
        return (
            <div >
                <div className="d-flex justify-content-center" >
                    <div className="spinner-grow text-dark" style={{ width: 7 + 'rem', height: 7 + 'rem' }} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        )
    }
}
