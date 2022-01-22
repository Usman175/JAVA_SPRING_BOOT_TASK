import React, { Component } from "react";

class TransactionTable extends Component {
  state = {};

  render() {
    return (
      <div style={{ marginTop: "2%" }}>
        {/* <!--  -->
      <!-- table section --> */}
        <section>
          <div className="tabCon">
            <div className="table table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Transaction Id</th>
                    <th scope="col">Date</th>
                    <th scope="col">Type</th>
                    <th scope="col">Description</th>
                    <th scope="col">Beneficiary</th>
                    <th scope="col">Amount/Balance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td> EMSI!283923</td>
                    <td>23rd Feb 2021</td>
                    <td>
                        <div className="project-type-badge-Hourly">  
                        Hourly 
                        </div>
                    </td>
                    <td> 11/01/21-17/01/21</td>
                    <td>Sonny Cho</td>
                    <td>($133.90) $0.00</td>
                  </tr>
                  <tr>
                    <td colSpan="3">
                      Ref. E9232SIMES &nbsp;&nbsp;&nbsp;&nbsp; Hourly work weekly payout
                    </td>
                  </tr>

                  <tr>
                    <td> EMSI!283923</td>
                    <td>23rd Feb 2021</td>
                    <td>
                        <div className="project-type-badge-Milestone">  
                        Milestone 
                        </div>
                    </td>
                    <td> 11/01/21-17/01/21</td>
                    <td>Sonny Cho</td>
                    <td>($133.90) $0.00</td>
                  </tr>
                  <tr>
                    <td colSpan="3">
                      Ref. E9232SIMES &nbsp;&nbsp;&nbsp;&nbsp; Hourly work weekly payout
                    </td>
                  </tr>

                  <tr>
                    <td> EMSI!283923</td>
                    <td>23rd Feb 2021</td>
                    <td>
                        <div className="project-type-badge-FreeContract">  
                        FreeContract 
                        </div>
                    </td>
                    <td> 11/01/21-17/01/21</td>
                    <td>Sonny Cho</td>
                    <td>($133.90) $0.00</td>
                  </tr>
                  <tr>
                    <td colSpan="3">
                      Ref. E9232SIMES &nbsp;&nbsp;&nbsp;&nbsp; Free Contract weekly payout
                    </td>
                  </tr>

                  <tr>
                    <td> EMSI!283923</td>
                    <td>23rd Feb 2021</td>
                    <td>
                        <div className="project-type-badge-Contest">  
                        Contest 
                        </div>
                    </td>
                    <td> 11/01/21-17/01/21</td>
                    <td>Sonny Cho</td>
                    <td>($133.90) $0.00</td>
                  </tr>
                  <tr>
                    <td colSpan="3">
                      Ref. E9232SIMES &nbsp;&nbsp;&nbsp;&nbsp; Contest payout
                    </td>
                  </tr>

                  <tr>
                    <td> EMSI!283923</td>
                    <td>23rd Feb 2021</td>
                    <td>
                        <div className="project-type-badge-OfficeWork">  
                        OfficeWork 
                        </div>
                    </td>
                    <td> 11/01/21-17/01/21</td>
                    <td>Sonny Cho</td>
                    <td>($133.90) $0.00</td>
                  </tr>
                  <tr>
                    <td colSpan="3">
                      Ref. E9232SIMES &nbsp;&nbsp;&nbsp;&nbsp; Office Work weekly payout
                    </td>
                  </tr>

                  <tr>
                    <td> EMSI!283923</td>
                    <td>23rd Feb 2021</td>
                    <td>
                        <div className="project-type-badge-Refund">  
                        Refund 
                        </div>
                    </td>
                    <td> 11/01/21-17/01/21</td>
                    <td>Sonny Cho</td>
                    <td>($133.90) $0.00</td>
                  </tr>
                  <tr>
                    <td colSpan="3">
                      Ref. E9232SIMES &nbsp;&nbsp;&nbsp;&nbsp; Refund from mansur
                    </td>
                  </tr>

                  <tr>
                    <td> EMSI!283923</td>
                    <td>23rd Feb 2021</td>
                    <td>
                        <div className="project-type-badge-Processing">  
                        Processing 
                        </div>
                    </td>
                    <td> 11/01/21-17/01/21</td>
                    <td>Sonny Cho</td>
                    <td>($133.90) $0.00</td>
                  </tr>
                  <tr>
                    <td colSpan="3">
                      Ref. E9232SIMES &nbsp;&nbsp;&nbsp;&nbsp; Payment Processing Charging - method
                    </td>
                  </tr>

                  <tr>
                    <td> EMSI!283923</td>
                    <td>23rd Feb 2021</td>
                    <td>
                        <div className="project-type-badge-Membership">  
                        Membership 
                        </div>
                    </td>
                    <td> 11/01/21-17/01/21</td>
                    <td>Sonny Cho</td>
                    <td>($133.90) $0.00</td>
                  </tr>
                  <tr>
                    <td colSpan="3">
                      Ref. E9232SIMES &nbsp;&nbsp;&nbsp;&nbsp; Hourly work weekly payout
                    </td>
                  </tr>

                  <tr>
                    <td> EMSI!283923</td>
                    <td>23rd Feb 2021</td>
                    <td>
                        <div className="project-type-badge-Payment">  
                        Payment 
                        </div>
                    </td>
                    <td> 11/01/21-17/01/21</td>
                    <td>Sonny Cho</td>
                    <td>($133.90) $0.00</td>
                  </tr>
                  <tr>
                    <td colSpan="3">
                      Ref. E9232SIMES &nbsp;&nbsp;&nbsp;&nbsp; Payment work weekly payout
                    </td>
                  </tr>

                  <tr>
                    <td> EMSI!283923</td>
                    <td>23rd Feb 2021</td>
                    <td>
                        <div className="project-type-badge-Premium">  
                        Premium 
                        </div>
                    </td>
                    <td> 11/01/21-17/01/21</td>
                    <td>Sonny Cho</td>
                    <td>($133.90) $0.00</td>
                  </tr>
                  <tr>
                    <td colSpan="3">
                      Ref. E9232SIMES &nbsp;&nbsp;&nbsp;&nbsp; Premium Post
                    </td>
                  </tr>

                  <tr>
                    <td> EMSI!283923</td>
                    <td>23rd Feb 2021</td>
                    <td>
                        <div className="project-type-badge-Bonus">  
                        Bonus 
                        </div>
                    </td>
                    <td> 11/01/21-17/01/21</td>
                    <td>Sonny Cho</td>
                    <td>($133.90) $0.00</td>
                  </tr>
                  <tr>
                    <td colSpan="3">
                      Ref. E9232SIMES &nbsp;&nbsp;&nbsp;&nbsp; Bonus payout
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
export default TransactionTable;
