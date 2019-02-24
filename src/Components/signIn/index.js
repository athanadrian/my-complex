import React, { Component } from 'react'

export default class SignIn extends Component {

  state={
      formError:false,
      formSuccess:'',
      formdata:{
          email:{
            element:'input',
            value:'',
            config:{
                name:'email_input',
                type:'email',
                placeholder:'Enter your email'
            },
            validation:{
                required:true,
                email:true
            },
            valid:false,
            validationMessage:''
          },
          password:{
            element:'input',
            value:'',
            config:{
                name:'password_input',
                type:'password',
                placeholder:'Enter your password'
            },
            validation:{
                required:true,
            },
            valid:false,
            validationMessage:''
          }
      }
  }

  render() {
    return (
      <div>
        sign in
      </div>
    )
  }
}
