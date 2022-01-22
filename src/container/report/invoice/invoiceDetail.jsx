import React, { Component } from "react";
import RightTop from "../../../components/rightbar/rightTop";
import RightBottom from "../../../components/rightbar/rightBottom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

class InvoiceDetail extends Component {
  printPDF = () => {
    html2canvas(document.querySelector(".section-to-print"), {
      logging: true,
      letterRendering: 1,
      allowTaint: false,
      useCORS: true,
    }).then((canvas) => {
      var imgData = canvas.toDataURL("image/jpeg", 1);
      var pdf = new jsPDF("p", "mm", "a4");
      var pageWidth = pdf.internal.pageSize.getWidth() - 22;
      var pageHeight = pdf.internal.pageSize.getHeight() - 22;
      var imageWidth = canvas.width;
      var imageHeight = canvas.height;

      var ratio =
        imageWidth / imageHeight >= pageWidth / pageHeight
          ? pageWidth / imageWidth
          : pageHeight / imageHeight;
      pdf.addImage(
        imgData,
        "JPEG",
        10,
        10,
        imageWidth * ratio,
        imageHeight * ratio
      );
      pdf.save("invoice.pdf");
    });
  };

  render() {
    return (
      <>
        <section className="card_sec">
          <div className="bcknd_container">
            <div className="row">
              <div className="col-lg-10 col-md-12">
                <div className="project_post invoice_detail">
                  <div className="d-flex align-items-center justify-content-between create_new">
                    <div>
                      <h4>
                        <i className="fa fa-book" aria-hidden="true"></i>{" "}
                        Invoice
                      </h4>
                    </div>
                    <div>
                      <a href="javascript:" onClick={() => window.print()}>
                        <i className="fa fa-print" aria-hidden="true"></i>
                      </a>
                      <a href="javascript:" onClick={() => this.printPDF()}>
                        <i className="fa fa-download" aria-hidden="true"></i>
                      </a>
                      <a className="create_btn">Create New</a>
                    </div>
                  </div>
                  <div className="section-to-print">
                    <div className="invoice_rec">
                      <h4 className="text-right">Invoice / Receipt</h4>
                      <div className="row">
                        <div className="col-md-6">
                          <a className="footer_logo">
                            <img    src="https://dhihitu47nqhv.cloudfront.net/bearole.png" alt="" />
                          </a>
                        </div>
                        <div className="col-md-6 text-right">
                          <label>
                            Date: <span>Nov 17,2017 11:23 AM</span>
                          </label>
                          <label>
                            Invoice / Receipt # <span>21321434</span>
                          </label>
                          <label>
                            Customer # <span>321434</span>
                          </label>
                        </div>
                        <div className="col-md-6">
                          <h6>Bearole Inc.</h6>
                          <label>4747, Pearl Street</label>
                          <label>Rainy Day Drive, Washington</label>
                          <label>Scrooge@hencework.com</label>
                        </div>
                      </div>
                    </div>
                    <div className="invoice_rec">
                      <div className="row align-items-center">
                        <div className="col-md-6">
                          <label>
                            <small>BILLING TO</small>
                          </label>
                          <h6>Supersonic Co.</h6>
                          <label>Sycamore Street</label>
                          <label>San Antonio Valley, CA 34668</label>
                          <label>thompson_peter@super.co</label>
                          <label>ABC:325487</label>
                        </div>
                        <div className="col-md-6 text-right">
                          <label>
                            <small>PAYMENT INFO</small>
                          </label>
                          <label>Scott L Thompson</label>
                          <label>MasterCard#########1234</label>
                          <label>Customer #324148</label>
                          <label className="amount_lbl">
                            <small>AMOUNT DUE</small>
                          </label>
                          <h6>$22,010</h6>
                        </div>
                      </div>
                    </div>
                    <div className="table-responsive detail_tbl feedback_tbl">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col" className="text-left">
                              Items
                            </th>
                            <th scope="col" className="text-right">
                              Number
                            </th>
                            <th scope="col" className="text-right">
                              Unit Cost
                            </th>
                            <th scope="col" className="text-right">
                              Amount
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="text-left">Design Service</td>
                            <td className="text-right">2</td>
                            <td className="text-right">$1500</td>
                            <td className="text-right">$3000</td>
                          </tr>
                          <tr>
                            <td className="text-left">Website Development</td>
                            <td className="text-right">1</td>
                            <td className="text-right">$7500</td>
                            <td className="text-right">$7500</td>
                          </tr>
                          <tr>
                            <td className="text-left">Social Media Services</td>
                            <td className="text-right">15</td>
                            <td className="text-right">$180</td>
                            <td className="text-right">$9000</td>
                          </tr>
                          <tr>
                            <td className="text-right" colspan="3">
                              Subtotals
                            </td>
                            <td className="text-right">$19,500</td>
                          </tr>
                          <tr>
                            <td className="text-right" colspan="3">
                              Tax
                            </td>
                            <td className="text-right">$3510</td>
                          </tr>
                          <tr>
                            <td className="text-right" colspan="3">
                              Discount
                            </td>
                            <td className="text-right">$1000</td>
                          </tr>
                          <tr>
                            <td className="text-right" colspan="3">
                              <b>Total</b>
                            </td>
                            <td className="text-right">
                              <b>$22,010</b>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="invoice_rec">
                      <div className="text-right">
                        <label>
                          <img
                            src="https://dxnqsgisijbjj.cloudfront.net/jungleworks/image/signature.png"
                            alt=""
                          />
                        </label>
                        <label>Seong R. Cho</label>
                      </div>
                    </div>
                    <div className="invoice_rec">
                      <ul>
                        <li>
                          <label>
                            A buyer must settle his or her account within 30
                            days of the date listed on the invoice.
                          </label>
                        </li>
                        <li>
                          <label>
                            The conditions under which a seller will complete a
                            sale. Typically, these terms specify the period
                            allowed to a buyer to pay off the amount due.
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-12">
                <RightTop />
                <RightBottom />
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default InvoiceDetail;
