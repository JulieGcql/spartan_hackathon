import React, { Component } from 'react'
import 'react-credit-cards/es/styles-compiled.css';
import Card from 'react-credit-cards';
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData,
} from './utils';
import './PersonalData.scss';
import{NavLink} from 'react-router-dom';


export default class PersonalData extends Component {
  state = {
    firstName : '',
    email : '',
    phone : '',
    password : '',
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    issuer: '',
    focused: '',
    formData: null,
  }

  handleChange = (e) => {
    console.log(e.target.value);
    const currentFieldName = e.target.name

    this.setState({[currentFieldName]: e.target.value})
    
    if(e.target.value !== ''){
      this.setState({[`${currentFieldName}Completed`] : 'input-text not-empty'})
    } else {
      this.setState({[`${currentFieldName}Completed`] : 'input-text'})
    }
  } 

  handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer });
    }
  };

  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name,
    });
  };

  handleInputChange = ({ target }) => {
    if (target.name === 'number') {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === 'expiry') {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === 'cvc') {
      target.value = formatCVC(target.value);
    }

    this.setState({ [target.name]: target.value });
  };

  render() {
    const { name, number, expiry, cvc, focused, issuer, formData } = this.state;
    return (
      <div>
        <div className="dataHeader">
          <NavLink to={{pathname:"/booking"}} className="IconLink" >
            <img className="arrow" src={require("../../assets/img/WiHub-11.png")}/>
          </NavLink>
          <h1>INFOS PERSONNELLES</h1>
          <NavLink to={{pathname:"/reservations"}} className="IconLink" >
            <img className="user" src={require("../../assets/img/WiHub-12.png")}/>
          </NavLink>
        </div>
        
        <div className="ContactContainer">

          <form 
          className="contact-form"
          onSubmit={(e) => this.handleSubmit(e)}>

          {/* NAME FIELD */}

            <div className="form-fields">
              <label 
                className="label" 
                htmlFor="firstName">
              Nom *
              </label>
              <input 
                type="text" 
                name="firstName"
                placeholder="Guillaume DIVOL"  
                id="firstName" 
                value={this.state.firstName}
                onChange={(e) => this.handleChange(e)} 
                required>
              </input>

              
            </div>
            
          {/* EMAIL FIELD */}

            <div className="form-fields">
              <label 
              className="label" 
              htmlFor="email">
              Email *
              </label>
              <input 
                type="email" 
                name="email" 
                placeholder="guillaumedivol@yahoo.com" 
                id="email" 
                value={this.state.email}
                onChange={(e) => this.handleChange(e)} 
                required>
              </input>
              
            </div>

            {/* PASSWORD FIELD */}

            <div className="form-fields">
              <label 
              className="label" 
              htmlFor="password">
              Password *
              </label>
              <input 
                type="password" 
                name="password" 
                placeholder="marseille" 
                id="password" 
                value={this.state.password}
                onChange={(e) => this.handleChange(e)} 
                required>
              </input>            
            </div>

          {/* PHONE FIELD */}


            <div className="form-fields">
              <label 
                className="label" 
                htmlFor="phone">
              Téléphone *
              </label>
              <input 
                type="tel" 
                name="phone"
                placeholder="07 83 64 20 19"  
                id="phone" 
                value={this.state.phone}
                onChange={(e) => this.handleChange(e)} 
                required>
              </input>
              
            </div>

          </form>
        



    {/* CREDIT CARD */}
          <div key="Payment">
            <div className="App-payment">
              <Card
                number={number}
                name={name}
                expiry={expiry}
                cvc={cvc}
                focused={focused}
                callback={this.handleCallback}
              />
              <div className="paymentinfosContainer">
                <form ref={c => (this.form = c)} onSubmit={this.handleSubmit} >
                  <div className="form-group">
                    <label 
                      className="label" 
                      htmlFor="Numéro">
                      Numéro *
                    </label>
                    <input
                      type="tel"
                      name="number"
                      className="form-control"
                      placeholder="5555 6666 7777 8888"
                      pattern="[\d| ]{16,22}"
                      required
                      onChange={this.handleInputChange}
                      onFocus={this.handleInputFocus}
                    />
                  </div>
                  <div className="form-group">
                    <label 
                      className="label" 
                      htmlFor="Nom">
                      Nom *
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Guillaume Divol"
                      required
                      onChange={this.handleInputChange}
                      onFocus={this.handleInputFocus}
                    />
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <div className="form-group">
                        <label 
                          className="label" 
                          htmlFor="Date d'expiration">
                          Date d'expiration *
                        </label>
                        <input
                          type="tel"
                          name="expiry"
                          className="form-control"
                          placeholder="01/21"
                          pattern="\d\d/\d\d"
                          required
                          onChange={this.handleInputChange}
                          onFocus={this.handleInputFocus}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label 
                          className="label" 
                          htmlFor="Crytogramme">
                          Crytogramme *
                        </label>
                        <input
                          type="tel"
                          name="cvc"
                          className="form-control"
                          placeholder="867"
                          pattern="\d{3,4}"
                          required
                          onChange={this.handleInputChange}
                          onFocus={this.handleInputFocus}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="paiementDescription">
                    <p>Vous allez réserver une machine à laver, le transfert, le séchage & le pliage pour un lavage de 10kg le 27/01/19 à 9h30 pour un prix total TTC de 16.00 euros</p>
                  </div>
                  {/* <input type="hidden" name="issuer" value={issuer} /> */}
                  <div className="form-fields button">
                  <div className="buttonPayment">
                    <NavLink to={{pathname:"/recap"}} className="IconLink" >
                      <button 
                      className="btn btn-warning"
                      >Payer</button>   
                    </NavLink>
                  </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}
