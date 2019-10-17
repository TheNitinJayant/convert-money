import React, {Component} from 'react';

import './Form.css';

const API = 'https://api.exchangeratesapi.io/latest';


class Form extends Component
{

    constructor(props)
    {
        super(props);

        this.state = {

            NEW_API: 'https://api.exchangeratesapi.io/latest',
            items: [],
            baseCurrency: 'USD',
            convertingCurrency: 'USD',
            convertedCurrency : 'Click On Convert' ,
            isLoadded: false
        }

        this.convertMoney = this.convertMoney.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount()
    {
        fetch(this.state.NEW_API)
            .then(res => res.json())
            .then(json => {
                this.setState(
                    {
                        isLoadded : true,
                        items : json , 
                    }
                )
            })
    }

    componentWillUpdate()
    {
        fetch(this.state.NEW_API)
            .then(res => res.json())
            .then(json => {
                this.setState(
                    {
                        isLoadded : true,
                        items : json , 
                    }
                )
        })
    }

    convertMoney()
    {

        let table = this.state.items.rates;

        let baseCurrencyValue = document.getElementById('base-currency-value').value;
       
        let finalConvertedCurrency = table[this.state.convertingCurrency] * baseCurrencyValue ;

        this.setState( { convertedCurrency: finalConvertedCurrency } );

    }

    handleChange()
    {
        let baseCurrencyValue = document.getElementById('base-currency-list').value;
        let convertingCurrencyValue = document.getElementById('convert-currency-list').value;

        let changedAPI = API+'?base='+baseCurrencyValue;

        this.setState({ NEW_API: changedAPI, baseCurrency: baseCurrencyValue, convertingCurrency: convertingCurrencyValue })

    }

    render()
    {

        return(
            
            <div className="Form">
                <h2>From</h2>

                <div id="base-currency-value-container" className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">$</span>
                    </div>
                    <input id="base-currency-value" type="text" placeholder="How Many" className="form-control" aria-label="Amount (to the nearest dollar)" />
                    <div className="input-group-append">
                        <span className="input-group-text">.00</span>
                    </div>
                </div>

                <select id="base-currency-list" className="form-control" onChange= { this.handleChange } >
                    
                    <option value="USD">USD</option>
                    <option value="INR">INR</option>
                    <option value="CAD">CAD</option>
                    <option value="NZD">NZD</option>
                    <option value="AUD">AUD</option>
                    
                </select>

                <h2> To </h2>

                <select id="convert-currency-list" className="form-control" onChange= {this.handleChange}>
               
                    <option value="USD">USD</option>
                    <option value="INR">INR</option>
                    <option value="CAD">CAD</option>
                    <option value="NZD">NZD</option>
                    <option value="AUD">AUD</option>

                </select>


                <button onClick={ this.convertMoney }>

                    Convert

                </button>

                <h2>
                    {this.state.convertedCurrency}
                </h2>
                

            </div>
        );
    }

}

export default Form;
