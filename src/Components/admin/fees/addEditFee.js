import React, { Component } from 'react'
import * as moment  from 'moment';

import AdminLayout from '../../../Hoc/AdminLayout';
import FormField from '../../ui/formFields';
import { validate, firebaseLooper } from '../../ui/misc';
import { firebaseFees, firebaseYears, firebaseMonths, firebaseDB} from '../../../firebase';

export default class AddEditFee extends Component {

    state = {
        feeId: '',
        formType: '',
        formError: '',
        formSuccess: '',
        formdata: {
            // processedDate: {
            //     element: 'input',
            //     value: '',
            //     config: {
            //         label: 'Issue Date',
            //         name: 'processedDate_input',
            //         type: 'date',
            //     },
            //     validation: {
            //         required: true,
            //     },
            //     valid: false,
            //     validationMessage: '',
            //     showlabel: true
            // },
            year: {
                element: 'select',
                value: '',
                config: {
                    label: 'Select Year',
                    name: 'select_year',
                    type: 'select',
                    options: []
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            month: {
                element: 'select',
                value: '',
                config: {
                    label: 'Select Month',
                    name: 'select_month',
                    type: 'select',
                    options: []
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            sewage: {
                element: 'input',
                value: '0',
                config: {
                    label: 'Sewage',
                    name: 'sewage_input',
                    type: 'number',
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showlabel: false
            },
            electric: {
                element: 'input',
                value: '0',
                config: {
                    label: 'Electric',
                    name: 'electric_input',
                    type: 'number',
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showlabel: false
            },
            water: {
                element: 'input',
                value: '0',
                config: {
                    label: 'Water',
                    name: 'water_input',
                    type: 'number',
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showlabel: false
            },
            pool: {
                element: 'input',
                value: '0',
                config: {
                    label: 'Pool',
                    name: 'pool_input',
                    type: 'number',
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showlabel: false
            },
            garden: {
                element: 'input',
                value: '0',
                config: {
                    label: 'Garden',
                    name: 'garden_input',
                    type: 'number',
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showlabel: false
            },
            extra: {
                element: 'input',
                value: '0',
                config: {
                    label: 'Extra',
                    name: 'extra_input',
                    type: 'number',
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showlabel: false
            }
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

    updateFields(fee, years, yearOptions, months, monthOptions, type, feeId){
        const newFormdata = {
            ...this.state.formdata
        }

        for (let key in newFormdata) {
            if (fee) {
                newFormdata[key].value = fee[key];
                newFormdata[key].valid = true;
            }
            if (key === 'year') {
                newFormdata[key].config.options = yearOptions;
            }
            if (key === 'month') {
                newFormdata[key].config.options = monthOptions;
            }
        }

        this.setState({
            feeId,
            formType: type,
            formdata: newFormdata,
            years,
            months
        })
    }

    successForm(message){
        this.setState({ formSuccess: message })

        setTimeout(()=>{
            this.setState({ formSuccess: '' })
            this.props.history.push('/admin_fees');
        }, 2000)
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
            if(this.state.formType==='Edit Fee'){
                dataToSubmit['updatedDate'] = moment().format("MMM Do YY");
                firebaseDB.ref(`fees/${this.state.feeId}`)
                .update(dataToSubmit)
                .then(()=>{
                    this.successForm('Updated Successfully')
                })
                .catch((error)=>{
                    this.setState({ formError: true })
                })
            } else {
                dataToSubmit['processedDate'] = moment().format("MMM Do YY"); //moment().toString(); //new Date().toISOString().slice(0, 10);
                firebaseFees.push(dataToSubmit).then(()=>{
                    this.props.history.push('/admin_fees');
                }).catch((e)=>{
                    this.setState({ formError: true })
                })
            }
        } else {
            this.setState({
                formError: true
            })
        }
    }

    componentDidMount() {
        const feeId = this.props.match.params.id;

        const getSelects = (fee, type) => {
            firebaseMonths.once('value').then((snapshot) => {
                    const months = firebaseLooper(snapshot)
                    const monthOptions = [];

                    snapshot.forEach((childSnapshot) => {
                        monthOptions.push({
                            key: childSnapshot.val().month,
                            value: childSnapshot.val().month
                        })
                    })

                firebaseYears.once('value').then((snapshot) => {
                    const years = firebaseLooper(snapshot)
                    const yearOptions = [];

                    snapshot.forEach((childSnapshot) => {
                        yearOptions.push({
                            key: childSnapshot.val().year,
                            value: childSnapshot.val().year
                        })
                    })
                    this.updateFields(fee, years, yearOptions, months, monthOptions, type, feeId)
                })
            })
        }

        if (!feeId) {
            getSelects(false, 'Add Fee');
        } else {
            firebaseDB.ref(`fees/${feeId}`).once('value')
                .then((snapshot) => {
                    const fee = snapshot.val();
                    getSelects(fee, 'Edit Fee');
                })
        }
    }

    render() {
        return (
            <AdminLayout>
                <div className='editfee_dialog_wrapper'>
                    <h2>{this.state.formType}</h2>
                    <div>
                        <form onSubmit={(event) => this.sumbitForm(event)}>
                            {/* <FormField
                                id={'processedDate'}
                                formdata={this.state.formdata.processedDate}
                                change={(element) => this.updateForm(element)}
                            /> */}
                            <div className='select_month_layout'>
                                <div className='wrapper'>
                                    `    <div className='left'>
                                        <FormField
                                            id={'year'}
                                            formdata={this.state.formdata.year}
                                            change={(element) => this.updateForm(element)}
                                        />
                                    </div>
                                    <div className='right'>
                                        <FormField
                                            id={'month'}
                                            formdata={this.state.formdata.month}
                                            change={(element) => this.updateForm(element)}
                                        />
                                    </div>`
                            </div>
                            </div>
                            <div className='split_fields'>
                                <div className='select_month_layout'>
                                    <div className='wrapper'>
                                        <div className='label_inputs left'>
                                            Sewage
                                    </div>
                                        <div>
                                            <FormField
                                                id={'sewage'}
                                                formdata={this.state.formdata.sewage}
                                                change={(element) => this.updateForm(element)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='select_month_layout'>
                                    <div className='wrapper'>
                                        <div className='label_inputs left'>
                                            Electric
                                    </div>
                                        <div>
                                            <FormField
                                                id={'electric'}
                                                formdata={this.state.formdata.electric}
                                                change={(element) => this.updateForm(element)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='select_month_layout'>
                                    <div className='wrapper'>
                                        <div className='label_inputs left'>
                                            Water
                                    </div>
                                        <div>
                                            <FormField
                                                id={'water'}
                                                formdata={this.state.formdata.water}
                                                change={(element) => this.updateForm(element)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='select_month_layout'>
                                    <div className='wrapper'>
                                        <div className='label_inputs left'>
                                            Pool
                                    </div>
                                        <div>
                                            <FormField
                                                id={'pool'}
                                                formdata={this.state.formdata.pool}
                                                change={(element) => this.updateForm(element)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='select_month_layout'>
                                    <div className='wrapper'>
                                        <div className='label_inputs left'>
                                            Garden
                                    </div>
                                        <div>
                                            <FormField
                                                id={'garden'}
                                                formdata={this.state.formdata.garden}
                                                change={(element) => this.updateForm(element)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='select_month_layout'>
                                    <div className='wrapper'>
                                        <div className='label_inputs left'>
                                            Extra
                                    </div>
                                        <div>
                                            <FormField
                                                id={'extra'}
                                                formdata={this.state.formdata.extra}
                                                change={(element) => this.updateForm(element)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='sucess_label'>{this.state.formSuccess}</div>
                            {this.state.formError ?
                                <div className='error_label'>{this.state.formError}</div>
                                : ''}
                            <div className='admin_submit'>
                                <button onClick={(event) => this.submitForm(event)}>
                                    {this.state.formType}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </AdminLayout>
        )
    }
}
