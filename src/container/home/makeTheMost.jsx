import React, { Component } from "react";

class MakeTheMost extends Component {
  render() {
    return (
      <>
        <section className="our_sec">
          <div className="container-fluid">
            <div className="simplan_text text-center">
              <h2 className="black_text">
                Utilize our system, and make the most out of it!
              </h2>
              <p>
                You can integrated with the below applications with{" "}
                <span>SIMPLAN</span> and monitor your work
              </p>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="media bitbucket">
                  <div className="media-left">
                    <img src="assets/img/bitbucket.png" alt="" />
                  </div>
                  <div className="media-body">
                    <h5>Bitbucket</h5>
                    <p>
                      A Git and Mercurial based source code management and
                      collaboration solution
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="media github">
                  <div className="media-left">
                    <img src="assets/img/github.png" alt="" />
                  </div>
                  <div className="media-body">
                    <h5>Github</h5>
                    <p>Git repository web-based hosting service</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="media evernote">
                  <div className="media-left">
                    <img src="assets/img/evernote.png" alt="" />
                  </div>
                  <div className="media-body">
                    <h5>Evernote</h5>
                    <p>Evernote is the app that keeps your notes organized.</p>
                    <p>Memos are synced so they're accessible anywhere</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="media jenkins">
                  <div className="media-left">
                    <img src="assets/img/jenkins.png" alt="" />
                  </div>
                  <div className="media-body">
                    <h5>Jenkins</h5>
                    <p>A Continuous Integration Service</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="media icinga">
                  <div className="media-left">
                    <img src="assets/img/icinga.png" alt="" />
                  </div>
                  <div className="media-body">
                    <h5>Icinga</h5>
                    <p>
                      An open source source network and computer system
                      monitoring application
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="media google">
                  <div className="media-left">
                    <img src="assets/img/google.png" alt="" />
                  </div>
                  <div className="media-body">
                    <h5>Google Plus</h5>
                    <div className="d-flex justify-content-between">
                      <p>Global Portal Site</p>
                      <a className="more_click" title="">
                        and more
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default MakeTheMost;
