import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";

var style = {
  base: {
    color: "#32325d",
    lineHeight: "18px",
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: "antialiased",
    fontSize: "16px",
    "::placeholder": {
      color: "#aab7c4"
    }
  },
  invalid: {
    color: "#fa755a",
    iconColor: "#fa755a"
  }
};

class CheckoutForm extends Component {
  handleSubmit = ev => {
    // On empêche le formulaire d'être envoyé
    ev.preventDefault();
    // On utilise la fonction createToken pour envoyer la demande de Tokenization à Stripe
    this.props.stripe
      .createToken({
        name: "Xavier Colombel",
        address_line1: "42, rue des Orteaux"
      })
      .then(({ token }) => {
        console.log("Token:", token);
        // On poste l'objet Token à notre back-end

        fetch("https://b355d321.ngrok.io/api/", {
          method: "post",
          body: token
          // headers: new Headers({
          //   "Content-Type": "text/plain",

          // })
        })
          .then(response => {
            return response.json();
          })
          .then(json => {
            console.log(json);
          })
          .catch(function(error) {
            console.log(error);
          });
      });
  };

  render() {
    return (
      <form className="form-checkout" onSubmit={this.handleSubmit}>
        <div style={{ width: "100%" }}>
          <div
            style={{
              border: "solid 1px #333333",
              padding: 10,
              borderRadius: 3
            }}
          >
            <CardElement style={style} />
          </div>
        </div>
        <button>Confirmer la commande</button>
      </form>
    );
  }
}
// On injecte Stripe dans CheckoutForm
export default injectStripe(CheckoutForm);
