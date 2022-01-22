import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { JungleModal } from "./jungleModal.jsx";
import { useDispatch, useSelector } from "react-redux";
import SignModalBody from "./signModalContent.jsx";

export const NDABody = ({sign, setSign}) => {
  // const [sign, setSign] = useState("");

  const languageType = useSelector(
    (state) => state.languageReducer.languageType
  );

  return (
    <Container className="p-4 paddingMobileNda-Text">
      <div className="text-justify  mb-20">
        비밀 준수 조항은 제3자에게 제공된 모든 소스와 개발과정에서 획득하게된
        정보를 제공자의 허가없이 외부에 노출시키지 않겠다는 합의서입니다. 온라인
        특성상 지원자의 신분증확인은 베어롤에서 KYC를 통해 대신여드리기 때문에
        개인정보가 보안되며 심각한 계약위반 사항이 발견되었다고 판명되었을
        경우에만 심사후 계약 당사자의 요청에 따라 서명당시의 본명, 계약인의
        연락처를 제공합니다.{" "}
      </div>
      <div className="h2 text-center NdaModal_MobileTab">NON-DISCLOSURE AGREEMENT (NDA)</div>
      <div className="text-justify ">
        This Nondisclosure Agreement (the "Agreement") is entered into by and
        between _______________ with its principal offices at _______________,
        ("Disclosing Party") and _______________, located at _______________
        ("Receiving Party") for the purpose of preventing the unauthorized
        disclosure of Confidential Information as defined below. The parties
        agree to enter into a confidential relationship concerning the
        disclosure of certain proprietary and confidential information
        ("Confidential Information").
      </div>
      <div className="text-justify ">
        <dl>
          <dt>1. Definition of Confidential Information.</dt>
          <dd>
            For purposes of this Agreement, "Confidential Information" shall
            include all information or material that has or could have
            commercial value or other utility in the business in which
            Disclosing Party is engaged. If Confidential Information is in
            written form, the Disclosing Party shall label or stamp the
            materials with the word "Confidential" or some similar warning. If
            Confidential Information is transmitted orally, the Disclosing Party
            shall promptly provide writing indicating that such oral
            communication constituted Confidential Information.
          </dd>
          <dt>2. Exclusions from Confidential Information.</dt>
          <dd>
            {" "}
            Receiving Party's obligations under this Agreement do not extend to
            information that is: (a) publicly known at the time of disclosure or
            subsequently becomes publicly known through no fault of the
            Receiving Party; (b) discovered or created by the Receiving Party
            before disclosure by Disclosing Party; (c) learned by the Receiving
            Party through legitimate means other than from the Disclosing Party
            or Disclosing Party's representatives; or (d) is disclosed by
            Receiving Party with Disclosing Party's prior written approval.
          </dd>
          <dt>3. Obligations of Receiving Party.</dt>
          <dd>
            {" "}
            Receiving Party shall hold and maintain the Confidential Information
            in strictest confidence for the sole and exclusive benefit of the
            Disclosing Party. Receiving Party shall carefully restrict access to
            Confidential Information to employees, contractors and third parties
            as is reasonably required and shall require those persons to sign
            nondisclosure restrictions at least as protective as those in this
            Agreement. Receiving Party shall not, without the prior written
            approval of Disclosing Party, use for Receiving Party's benefit,
            publish, copy, or otherwise disclose to others, or permit the use by
            others for their benefit or to the detriment of Disclosing Party,
            any Confidential Information. Receiving Party shall return to
            Disclosing Party any and all records, notes, and other written,
            printed, or tangible materials in its possession pertaining to
            Confidential Information immediately if Disclosing Party requests it
            in writing.
          </dd>
          <dt>4. Time Periods.</dt>
          <dd>
            {" "}
            The nondisclosure provisions of this Agreement shall survive the
            termination of this Agreement and Receiving Party's duty to hold
            Confidential Information in confidence shall remain in effect until
            the Confidential Information no longer qualifies as a trade secret
            or until Disclosing Party sends Receiving Party written notice
            releasing Receiving Party from this Agreement, whichever occurs
            first.
          </dd>
          <dt>5. Relationships.</dt>
          <dd>
            Nothing contained in this Agreement shall be deemed to constitute
            either party a partner, joint venture or employee of the other party
            for any purpose.
          </dd>
          <dt>6. Severability.</dt>
          <dd>
            {" "}
            If a court finds any provision of this Agreement invalid or
            unenforceable, the remainder of this Agreement shall be interpreted
            so as best to affect the intent of the parties.
          </dd>
          <dt> 7. Integration.</dt>
          <dd>
            {" "}
            This Agreement expresses the complete understanding of the parties
            with respect to the subject matter and supersedes all prior
            proposals, agreements, representations, and understandings. This
            Agreement may not be amended except in writing signed by both
            parties.
          </dd>
          <dt>8. Waiver.</dt>
          <dd>
            {" "}
            The failure to exercise any right provided in this Agreement shall
            not be a waiver of prior or subsequent rights.
          </dd>
          <dt>9. Notice of Immunity.</dt>
          <dd>
            {" "}
            Employee is provided notice that an individual shall not be held
            criminally or civilly liable under any federal or state trade secret
            law for the disclosure of a trade secret that is made (i) in
            confidence to a federal, state, or local government official, either
            directly or indirectly, or to an attorney; and (ii) solely for the
            purpose of reporting or investigating a suspected violation of law;
            or is made in a complaint or other document filed in a lawsuit or
            other proceeding, if such filing is made under seal. An individual
            who files a lawsuit for retaliation by an employer for reporting a
            suspected violation of law may disclose the trade secret to the
            attorney of the individual and use the trade secret information in
            the court proceeding, if the individual (i) files any document
            containing the trade secret under seal; and (ii) does not disclose
            the trade secret, except pursuant to court order.
          </dd>
        </dl>
        <div className="text-justify pb-5">
          This Agreement and each party's obligations shall be binding on the
          representatives, assigns and successors of such party. Each party has
          signed this Agreement through its authorized representative.
        </div>
        <Row className="pb-3">
          <Col xs="12">
            <div className="h6 ">DISCLOSING PARTY</div>
          </Col>
          <Col xs="12">
            <p>
              Signature _____________________________________________________
            </p>
          </Col>
          <Col xs="12">
            <p>Typed or Printed Name ___________________________</p>
          </Col>
          <Col xs="12">
            <p>Date: _______________</p>
          </Col>
        </Row>
        <div className="h6">RECEIVING PARTY</div>
        <Row>
          <Col xs="12">
            <div className="d-flex align-items-baseline">
              <p>
                Signature {sign ? "" : " ____________________________________ "}
              </p>
              <span className={`${sign ? "" : "d-none"}`}>
                <img src={sign} width="200" height="100" />
              </span>
              <span className=" ml-2">
                <JungleModal
                  noHeader
                  dialogClassName="jungle-modal "
                  contentClassName="jungle-modal-content mx-auto border"
                  customClose
                  OpenButton={({ handleClick }) => (
                    <button
                      type="button"
                      className="btn bg-light-gray text-black btn-sm"
                      onClick={handleClick}
                    >
                      {languageType.SIGN}
                    </button>
                  )}
                  Body={SignModalBody}
                  onSave={(signBase64) => setSign(signBase64)}
                  languageType={languageType}
                  size="lg"
                />
              </span>
            </div>
          </Col>

          <Col xs="12">
            <p>Typed or Printed Name ___________________________</p>
          </Col>
          <Col xs="12">
            <p>Date: _______________</p>
          </Col>
        </Row>
      </div>
    </Container>
  );
};
