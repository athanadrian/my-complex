import React, { Component } from 'react'
import FormField from '../ui/formFields';
import { validate } from '../ui/misc';
import { firebase } from '../../firebase';

export default class SignIn extends Component {

    state = {
        formError: false,
        formSuccess: '',
        formdata: {
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                validationMessage: ''
            },
            password: {
                element: 'input',
                value: '',
                config: {
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'Enter your password'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: ''
            }
        }
    }

    resetFormDataSuccess(){
        const newFormdata={...this.state.formdata};

        for(let key in newFormdata){
            newFormdata[key].value='';
            newFormdata[key].valid=false;
            newFormdata[key].validationMessage='';
        }

        this.setState({
            formError:false,
            formdata:newFormdata,
            formSuccess:'Congratulations'
        })
        this.clearSuccessMessage();
    }

    clearSuccessMessage(){
        setTimeout(()=>{
            this.setState({
                formSuccess:''
            })
        },2000)
    }

    submitForm(event) {

        event.preventDefault();

        let dataToSubmit = {};
        let formValid = true;

        for (let key in this.state.formdata) {
            dataToSubmit[key] = this.state.formdata[key].value;
            formValid = this.state.formdata[key].valid && formValid;
        }
        if (formValid) {
            firebase.auth()
            .signInWithEmailAndPassword(dataToSubmit.email, dataToSubmit.password)
            .then(()=>{
                console.log('user is auth');
                this.props.history.push('/dashboard');
            })
            .catch((error)=>{
                this.setState({formError:true});
            })
            //this.resetFormDataSuccess();
        } else {
            this.setState({
                formError: true
            })
        }
    }

    updateForm(element) {
        const newFormdata = { ...this.state.formdata };
        const newElement = { ...newFormdata[element.id] };

        newElement.value = element.event.target.value;

        const validData = validate(newElement);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];

        newFormdata[element.id] = newElement;

        this.setState({
            formError: false,
            formdata: newFormdata,
            // formSuccess:''
        })
    }

    render() {
        return (
            <div className='container'>
                <div className='signin_wrapper' style={{ margin: '100px' }}>
                    <form onSubmit={(event) => this.submitForm(event)}>
                        <h2>Please Login</h2>
                        <FormField
                            id={'email'}
                            formdata={this.state.formdata.email}
                            change={(element) => this.updateForm(element)}
                        />
                        <FormField
                            id={'password'}
                            formdata={this.state.formdata.password}
                            change={(element) => this.updateForm(element)}
                        />
                        {this.state.formError ? <div className='error_label'>Something is wrong, try again.</div> : null}
                        <div className='success_label'>{this.state.formSuccess}</div>
                        <button onClick={(event) => this.submitForm(event)}>Login</button>
                    </form>
                </div>
            </div>
        )
    }
}
