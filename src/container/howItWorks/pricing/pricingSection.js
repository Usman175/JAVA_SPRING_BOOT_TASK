import React, { Component } from "react";
import { connect } from "react-redux";
import AllPlans from "./plansPricing.json";
import "./pricing.scss";

class PricingSection extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { languageType } = this.props;
    return (
      <>
        <section className="about_sec_pricing plan_sec_top">
          <div className="container">
            <h3 className="title_h3_pricing">
              {languageType.REGISTER_FOR_PRICING}
            </h3>
            <h3 className="title_h3_pricing2">
              Join <span className="green_text">Standard</span> and{" "}
              <span className="underline_premiumPricing">
                get <span className="green_text">Premium</span>
              </span>
            </h3>
            <h3 className="title_h3_pricing2">
              Event valid until 31st May 2022!
            </h3>

            <div className="box_pricing_top">
              <div className="box_pricing"></div>
            </div> 
          </div>

          <section className="plan_sec position-relative pricingContainer">
              <div className="position-relative">
                <div className="text-center month_annual" id="pricing">
                  {/* plan switcher */}
                  <label className="switch_pricing m-0">
                    <input type="checkbox" />
                    <span className="sliderinput round">
                      <span className="annualy">Annualy</span>
                      <span className="monthly">Monthly</span>
                    </span>
                  </label>

                  <p className="discount_text">
                    Get 15% discount for yearly payment option
                  </p>
                </div>
                <div className="row">
                  {AllPlans.map((plan, i) => (
                    <div
                      key={`${plan.id}${i}`}
                      className="col-md-6 col-lg-3"
                      data-aos={plan.animate}
                      data-aos-duration="1200"
                    >
                      <div
                        className={`plan_box position-relative ${
                          plan.title === "Premium" ? "active_plan" : ""
                        }`}
                      >
                        <div className="text-center">
                          <h2 className="white_text">{plan.title}</h2>
                          <p className="white_text price_usd">
                            USD
                            <span className="white_text">{plan.price}</span>
                            /mo
                          </p>
                          <button type="button" className="btn">
                            Choose plan
                          </button>
                          {plan.condition && (
                            <p className="white_text">
                              Free until you get 1st contract,
                              <br />
                              You cancel the subscription at any time
                            </p>
                          )}
                        </div>
                        <ul className="list-unstyled">
                          {plan.features.map((feature, i) => (
                            <li key={i}>
                              <i className="fa fa-check" aria-hidden="true"></i>
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <div className="plan_bodr position-absolute"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
        </section>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    languageType: state.languageReducer.languageType,
  };
}

export default connect(mapStateToProps)(PricingSection);
