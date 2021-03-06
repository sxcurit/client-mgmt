import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import axios from 'axios';

export interface IValues {
    [key: string]: any;
}

export interface IFormState {
    id: number,
    customer: any;
    values: IValues[];
    submitSuccess: boolean;
    loading: boolean;
}

class EditCustomer extends React.Component<RouteComponentProps<any>, IFormState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            customer: {},
            values: [],
            loading: false,
            submitSuccess: false,
        }
    }

    public componentDidMount(): void {
        axios.get(`http://localhost:5000/customers/${this.state.id}`).then(data => {
            this.setState({ customer: data.data });
        })
    }

    private processFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        this.setState({ loading: true });
        axios.patch(`http://localhost:5000/customers/${this.state.id}`, this.state.values).then(data => {
            this.setState({ submitSuccess: true, loading: false })
            setTimeout(() => {
                this.props.history.push('/');
            }, 1500)
        })
    }


    private setValues = (values: IValues) => {
        this.setState({ values: { ...this.state.values, ...values } });
    }

    private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.setValues({ [e.currentTarget.id]: e.currentTarget.value })
    }

    public render() {
        const { submitSuccess, loading } = this.state;
        return (
            <div className="App">
                {this.state.customer &&
                    <div>
                        < h1 > Dx Client Management</h1>
                        <p> Built with React.js and TypeScript </p>


                        <div>
                            <div className={"col-md-12 form-wrapper"}>
                                <h2> Edit Client </h2>

                                {submitSuccess && (
                                    <div className="alert alert-info" role="alert">
                                        Client's details has been edited successfully </div>
                                )}

                                <form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true}>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="name"> Name </label>
                                        <input type="text" id="name" defaultValue={this.state.customer.name} onChange={(e) => this.handleInputChanges(e)} name="name" className="form-control" placeholder="Enter clients's first name" />
                                    </div>

                                    <div className="form-group col-md-12">
                                        <label htmlFor="text"> Domain </label>
                                        <input type="text" id="domain" defaultValue={this.state.customer.domain} onChange={(e) => this.handleInputChanges(e)} name="domain" className="form-control" placeholder="Enter Domain" />
                                    </div>

                                    <div className="form-group col-md-12">
                                        <label htmlFor="text"> Manager Name </label>
                                        <input type="text" id="manager_name" defaultValue={this.state.customer.manager_name} onChange={(e) => this.handleInputChanges(e)} name="manager_name" className="form-control" placeholder="Enter Manager Name" />
                                    </div>

                                    <div className="form-group col-md-12">
                                        <label htmlFor="text"> Revenue </label>
                                        <input type="text" id="text" defaultValue={this.state.customer.revenue} onChange={(e) => this.handleInputChanges(e)} name="revenue" className="form-control" placeholder="Enter Revenue in Millions" />
                                    </div>

                                    <div className="form-group col-md-4 pull-right">
                                        <button className="btn btn-success" type="submit">
                                            Edit Client </button>
                                        {loading &&
                                            <span className="fa fa-circle-o-notch fa-spin" />
                                        }
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default withRouter(EditCustomer)