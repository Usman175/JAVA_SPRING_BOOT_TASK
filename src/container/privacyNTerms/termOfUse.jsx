import React, { Component } from "react";
// Redux
import {
  onReduxRouteChange,
  onReduxProjectConfirmationDataHandle,
} from "../../store/action/action";
import { connect } from "react-redux";
import IconBar from "../home/iconBar";
import { Accordion, Card, Button } from "react-bootstrap";
import './privacyNTerms.scss'
class TermOfUse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
      errorMessage: {},
      isContestDetailActive: false,
    };
  }

  render() {
    return (
      <>
        <IconBar />
        <section className="about_sec service_sec customer-terms-use-page private_sec">
          <div className="container">
            <div className="row">
         <div className="col-md-12">
         
    
         <div className="top-heading-block" >
        
           <h3 className="title_h3 mb-2">User Agreement</h3>
           <h6 className="title_h6">Effective July 13, 2020</h6>
           <p> PLEASE READ THIS USER AGREEMENT AND ALL OTHER AGREEMENTS AND
                  POLICIES REFERENCED HEREIN COLLECTIVELY DEFINED BELOW AS THE
                  "TERMS OF SERVICE" CAREFULLY AS THEY CONTAIN IMPORTANT
                  INFORMATION REGARDING YOUR LEGAL RIGHTS, REMEDIES, AND
                  OBLIGATIONS. THESE INCLUDE VARIOUS LIMITATIONS AND EXCLUSIONS
                  AND A BINDING ARBITRATION AGREEMENT AND CLASS ACTION WAIVER.</p>
         </div>
  
         <Accordion className="tip_box p-0 border-0">
              <Card>
                <div className="" id="headingOne">
                  <h5 className="mb-0">
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                      <span className="heading-top">Section 1.</span><span className="heading-top-marign">Declaration</span> <i className="fa fa-angle-down" aria-hidden="true"></i>
                    </Accordion.Toggle>
                  </h5>
                </div>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                  <div className="mb-2">
                  This User Agreement (this “Agreement”) is a contract between
                  you (“you” or “User”) Bearole Global Inc. (“Bearole,” “we,” or
                  “us”) and our affiliates Bearole Escrow Inc. (“Bearole
                  Escrow”) and, to the extent expressly stated, Elance Limited
                  ("Elance Ltd."). You must read, agree to, and accept all of
                  the terms and conditions contained in this Agreement to be a
                  User of our website located at www.Bearole.com or any part of
                  the rest of the Site (defined in the Site Terms of Use) or the
                  Site Services (defined in the Site Terms of Use).
                </div>
                <div className="mb-2">
                  This Agreement includes and hereby incorporates by reference
                  the following important agreements, as they may be in effect
                  and modified from time to time: Site Terms of Use; Fee and ACH
                  Authorization Agreement; Cookie Policy; Privacy Policy; Mark
                  Use Guidelines; Freelancer Membership Agreement; Proprietary
                  Rights Infringement Reporting Procedures; Bearole App Software
                  License Agreement; API Terms of Use; and the escrow
                  instructions as applicable to any Service Contract you enter
                  into with another User, specifically the Hourly, Bonus, and
                  Expense Payment Agreement with Escrow Instructions; and
                  Fixed-Price Escrow Instructions. This Agreement also
                  incorporates, for any User using the Bearole Direct Contract
                  Service, Bearole Direct Contract Terms and Direct Contract
                  Escrow Instructions. These agreements are collectively, with
                  this Agreement, called the “Terms of Service”.
                </div>
                <div className="mb-2">
                  Subject to the conditions set forth herein, Bearole may, in
                  its sole discretion, amend this Agreement and the other Terms
                  of Service at any time by posting a revised version on the
                  Site. Bearole will provide reasonable advance notice of any
                  amendment that includes a Substantial Change (defined below),
                  by posting the updated Terms of Service on the Site, providing
                  notice on the Site, and/or sending you notice by email. If the
                  Substantial Change includes an increase to Fees charged by
                  Bearole, Bearole will provide at least 30 days’ advance notice
                  of the change, but may not provide any advance notice for
                  changes resulting in a reduction in Fees or any temporary or
                  promotional Fee change. Any revisions to the Terms of Service
                  will take effect on the noted effective date (each, as
                  applicable, the “Effective Date”).
                </div>
                <div className="mb-2">
                  YOU UNDERSTAND THAT BY USING THE SITE OR SITE SERVICES AFTER
                  THE EFFECTIVE DATE, YOU AGREE TO BE BOUND BY THE TERMS OF
                  SERVICE, INCLUDING THE ARBITRATION PROVISION IN SECTION 14 OF
                  THIS AGREEMENT (SUBJECT TO YOUR RIGHT TO OPT OUT OF THE
                  ARBITRATION PROVISION AS PROVIDED IN SECTION 14). IF YOU DO
                  NOT ACCEPT THE TERMS OF SERVICE IN ITS ENTIRETY, YOU MUST NOT
                  ACCESS OR USE THE SITE OR THE SITE SERVICES AFTER THE
                  EFFECTIVE DATE EXCEPT AS PERMITTED BY THE SITE TERMS OF USE.
                </div>
                <div className="mb-2">
                  IF YOU AGREE TO THE TERMS OF SERVICE ON BEHALF OF AN ENTITY OR
                  AGENCY, OR IN CONNECTION WITH PROVIDING OR RECEIVING SERVICES
                  ON BEHALF OF AN ENTITY OR AGENCY, YOU REPRESENT AND WARRANT
                  THAT YOU HAVE THE AUTHORITY TO BIND THAT ENTITY OR AGENCY TO
                  THE TERMS OF SERVICE AND AGREE THAT YOU ARE BINDING BOTH YOU
                  AND THAT ENTITY OR AGENCY TO THE TERMS OF SERVICE. IN THAT
                  EVENT, “YOU” AND “YOUR” WILL REFER AND APPLY TO YOU AND THAT
                  ENTITY OR AGENCY.
                </div>
                  </Card.Body>
                  </Accordion.Collapse>
                </Card>
                </Accordion>  
                <Accordion className="tip_box p-0 border-0">
              <Card>
                <div className="" id="headingOne">
                  <h5 className="mb-0">
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                      <span className="heading-top">Section 2.</span><span className="heading-top-marign">Bearole Accounts</span> <i className="fa fa-angle-down" aria-hidden="true"></i>
                    </Accordion.Toggle>
                  </h5>
                </div>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                  <div className="mb-2">
                  Section 1 discusses what you must agree to before using the
                  Site or Site Services and the different types of accounts that
                  can be created on the Site, as detailed below.
                </div>
                <h4 className="mb-2 font-weight-600" id="u11">
                  2.1 REGISTRATION AND ACCEPTANCE
                </h4>
                <div className="mb-2">
                  By registering for an account to use the Site or Site Services
                  (an “Account”), by using the Site or Site Services after the
                  Effective Date if you had an Account on the Effective Date, or
                  by clicking to accept the Terms of Service when prompted on
                  the Site, you agree to abide by this Agreement and the other
                  Terms of Service.
                </div>
                <div className="mb-2">
                  To access and use certain portions of the Site and the Site
                  Services, you must register for an Account. Subject to the
                  Site Terms of Use, certain portions of the Site are available
                  to Site Visitors, including those portions before your Account
                  registration is accepted. Bearole reserves the right to
                  decline a registration to join Bearole or to add an Account of
                  any type (i.e., as a Client or Freelancer), for any lawful
                  reason, including supply and demand, cost to maintain data, or
                  other business considerations.
                </div>
                <div className="mb-2">
                  If you create an Account as an employee or agent on behalf of
                  a company, you represent and warrant that you are authorized
                  to enter into binding contracts, including the Terms of
                  Service, on behalf of yourself and the company. Your privacy
                  is important to Bearole and your information will be handled
                  in accordance with our Privacy Policy, which is part of the
                  Terms of Service, and applicable law.
                </div>
                <h4 className="mb-2 font-weight-600" id="u12">
          2.2 ACCOUNT ELIGIBILITY
                </h4>
                <div className="mb-2">
                  Bearole offers the Site and Site Services for your business
                  purposes only and not for personal, household, or consumer
                  use. To register for an Account or use the Site and Site
                  Services, you must, and hereby represent that you: (a) are an
                  employee or agent of and authorized to act for and bind an
                  independent business (whether it be as a self-employed
                  individual/sole proprietor or as a corporation, limited
                  liability company, or other entity); (b) will use the Site and
                  Site Services for business purposes only; (c) will comply with
                  any licensing, registration, or other requirements with
                  respect to your business, or the business for which you are
                  acting, and the provision of Freelancer Services; and (d) are
                  either a legal entity or an individual who is 18 years or
                  older (or have otherwise reached the age of majority in the
                  jurisdiction in which you conduct business) in each case who
                  can form legally binding contracts.
                </div>
                <h4 className="mb-2 font-weight-600" id="u13">
                  2.3 ACCOUNT PROFILE
                </h4>
                <div className="mb-2">
                  To register for an Account to join the Site, you must complete
                  a User profile (“Profile”), which you consent to be shown to
                  other Users and, unless you change your privacy settings, to
                  be shown to the public. You agree to provide true, accurate,
                  and complete information on your Profile and all registration
                  and other forms you access on the Site or provide to us and to
                  update your information to maintain its truthfulness,
                  accuracy, and completeness. You agree not to provide any false
                  or misleading information about your identity or location,
                  your business, your skills, or the services your business
                  provides and to correct any such information that is or
                  becomes false or misleading.
                </div>
                <h4 className="mb-2 font-weight-600" id="u14">
                  2.4 ACCOUNT TYPES
                </h4>
                <div className="mb-2">
                  As described in this Section, there are a number of different
                  Account types. Once you register for one Account type, you can
                  add the other Account types under the same username and
                  password. For example, if you already have a Freelancer
                  Account (defined below), you can add a Client Account (defined
                  below) as a separate account type in settings without
                  re-registering. You agree not to have or register for more
                  than one Account without express written permission from us.
                  We reserve the right to revoke the privileges of the Account
                  or access to or use of the Site or Site Services, and those of
                  any and all linked Accounts without warning if, in our sole
                  discretion, false or misleading information has been provided
                  in creating, marketing, or maintaining your Profile or
                  Account.
                </div>
                <h4 className="mb-2 font-weight-600" id="u141">
                  2.4.1 CLIENT ACCOUNT
                </h4>
                <div className="mb-2">
                  You can register for an Account or add an Account type to use
                  the Site and Site Services as a Client (a “Client Account”).
                  Each User under a Client Account (“Team Member”) can be given
                  different permissions to act on behalf of the Client Account.
                </div>
                <h4 className="mb-2 font-weight-600" id="u142">
                  2.4.2 FREELANCER, AGENCY, AND AGENCY MEMBER ACCOUNT
                </h4>
                <div className="mb-2">
                  Freelancer: You can register for an Account or add an Account
                  type to use the Site and Site Services as a Freelancer (a
                  “Freelancer Account”). Agency and Agency Member: A specific
                  type of Freelancer Account you can add is an “Agency Account”,
                  the owner of which is referred to as an “Agency”. An Agency
                  Account allows permissions to be granted to Users under the
                  Agency Account which can be given different permissions to act
                  on behalf of the Agency (each, an “Agency Member”). You
                  acknowledge and agree that the Agency is solely responsible,
                  and assumes all liability, for: (a) the classification of your
                  Agency Members as employees or independent contractors; and
                  (b) paying your Agency Members in accordance with applicable
                  law for work performed on behalf of the Agency for Projects.
                  You further acknowledge and agree that (i) the Agency may
                  determine the Profile visibility and pricing/rate information
                  of any of its Agency Members; and (ii) Agency Members’
                  Profiles may display work history that includes work done
                  under the Agency Account, including after the Agency Member is
                  no longer an Agency Member.
                </div>
                <h4 className="mb-2 font-weight-600" id="15">
                  2.5 ACCOUNT PERMISSIONS
                </h4>
                <div className="mb-2">
                  You agree not to request or allow another person to create an
                  Account on your behalf, for your use, or for your benefit,
                  except that an authorized employee or agent may create an
                  Account on behalf of your business. By granting other Users
                  permissions under your Account, including as a Team Member or
                  Agency Member, you represent and warrant that: (a) the User is
                  authorized to act on your behalf; and (b) you are fully
                  responsible and liable for the User’s acts and omissions,
                  including for obligations and liabilities relating to making
                  payments and entering into Service Contracts and the Terms of
                  Service. If any such User violates the Terms of Service, it
                  may affect your ability to use the Site and Site Services.
                  Upon closure of an Account, Bearole may close any or all
                  related Accounts.
                </div>
                <h4 className="mb-2 font-weight-600" id="u16">
                  2.6 IDENTITY AND LOCATION VERIFICATION
                </h4>
                <div className="mb-2">
                  When you register for an Account and from time to time
                  thereafter, your Account will be subject to verification,
                  including, but not limited to, validation against third-party
                  databases or the verification of one or more official
                  government or legal documents that confirm your identity, your
                  location, and your ability to act on behalf of your business
                  on Bearole. You authorize Bearole, directly or through third
                  parties, to make any inquiries necessary to validate your
                  identity, your location, and confirm your ownership of your
                  email address or financial accounts, subject to applicable
                  law. When requested, you must timely provide us with complete
                  information about yourself and your business, which includes,
                  but is not limited to, providing official government or legal
                  documents. During verification some Account features may be
                  temporarily limited. When a verification is successfully
                  completed, Account features will be restored.
                </div>
                <h4 className="mb-2 font-weight-600" id="u17">
                  2.7 USERNAMES AND PASSWORDS
                </h4>
                <div className="mb-2">
                  Each person who uses the Site must register for their own
                  Account. When you register for an Account, you will be asked
                  to choose a username and password for the Account. You are
                  entirely responsible for safeguarding and maintaining the
                  confidentiality of your username and password. You agree not
                  to share your username or password with any person, and, if
                  you are a legal entity who is not a natural person, to only
                  share your username and password with a person who is
                  authorized to use your Account. You authorize Bearole to
                  assume that any person using the Site with your username and
                  password, either is you or is authorized to act for you. You
                  agree to notify us immediately if you suspect or become aware
                  of any unauthorized use of your Account or any unauthorized
                  access to the password for any Account. You further agree not
                  to use the Account or log in with the username and password of
                  another User of the Site if (a) you are not authorized to use
                  both or (b) the use would violate the Terms of Service.
                </div>
              
                
             
                  </Card.Body>
                  </Accordion.Collapse>
                </Card>
                </Accordion>  
                <Accordion className="tip_box p-0 border-0">
              <Card>
                <div className="" id="headingOne">
                  <h5 className="mb-0">
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                      <span className="heading-top">Section 3.</span><span className="heading-top-marign"> Purpose OF Bearole</span> <i className="fa fa-angle-down" aria-hidden="true"></i>
                    </Accordion.Toggle>
                  </h5>
                </div>
                <Accordion.Collapse eventKey="0">
                <Card.Body>
                <div className="mb-2">
                  Section 2 discusses what Bearole does and does not do when
                  providing the Site and Site Services and some of your
                  responsibilities when using the Site to find or enter into a
                  Service Contract with a Freelancer or Client, as detailed
                  below. The Site is a marketplace where Clients and Freelancers
                  can identify each other and advertise, buy, and sell
                  Freelancer Services online. Subject to the Terms of Service,
                  Bearole provides the Site Services to Users, including hosting
                  and maintaining the Site, facilitating the formation of
                  Service Contracts, and assisting Users in resolving disputes
                  which may arise in connection with those Service Contracts.
                  When a User enters a Service Contract, the User uses the Site
                  to invoice and pay any amounts owed under the Service
                  Contract.
                </div>
                <h4 className="mb-2 font-weight-600" id="u21">
                  3.1 RELATIONSHIP WITH Bearole
                </h4>
                <div className="mb-2">
                  Bearole merely makes the Site and Site Services available to
                  enable Freelancers and Clients to find and transact directly
                  with each other. Bearole does not introduce Freelancers to
                  Clients, find Projects for Freelancers, or find Freelancers
                  for Clients. Through the Site and Site Services, Freelancers
                  may be notified of Clients that may be seeking the services
                  they offer, and Clients may be notified of Freelancers that
                  may offer the services they seek; at all times, however, Users
                  are responsible for evaluating and determining the suitability
                  of any Project, Client or Freelancer on their own. If Users
                  decide to enter into a Service Contract, the Service Contract
                  is directly between the Users and Bearole is not a party to
                  that Service Contract. You acknowledge, agree, and understand
                  that Bearole is not a party to the relationship or any
                  dealings between Client and Freelancer. Without limitation,
                  Users are solely responsible for: (a) ensuring the accuracy
                  and legality of any User Content; (b) determining the
                  suitability of other Users for a Service Contract (such as any
                  interviews, vetting, background checks, or similar actions);
                  (c) negotiating, agreeing to, and executing any terms or
                  conditions of Service Contracts; (d) performing Freelancer
                  Services; and/or (e) paying for Freelancer Services. You
                  further acknowledge, agree, and understand that you are solely
                  responsible for assessing whether to enter into a Service
                  Contract with another User and for verifying any information
                  about another User, including Composite Information (defined
                  below). Bearole does not make any representations about or
                  guarantee the truth or accuracy of any Freelancer’s or
                  Client’s listings or other User Content on the Site; does not
                  verify any feedback or information provided by Users about
                  Freelancers or Clients; and does not perform background checks
                  on or guarantee the work of Freelancers or Clients. You
                  acknowledge, agree, and understand that Bearole does not, in
                  any way, supervise, direct, control, or evaluate Freelancers
                  or their work and is not responsible for any Project, Project
                  terms or Work Product. Bearole makes no representations about
                  and does not guarantee, and you agree not to hold Bearole
                  responsible for, the quality, safety, or legality of
                  Freelancer Services; the qualifications, background, or
                  identities of Users; the ability of Freelancers to deliver
                  Freelancer Services; the ability of Clients to pay for
                  Freelancer Services; User Content and statements or posts made
                  by Users; or the ability or willingness of a Client or
                  Freelancer to actually complete a transaction. While Bearole
                  may provide certain badges on Freelancer or Client profiles,
                  such badges are not a guarantee or warranty of quality or
                  ability or willingness of the badged Freelancer or Client to
                  complete a Service Contract and is not a guarantee of any
                  kind, including, the quality of Freelancer Services or Client
                  Project. You also acknowledge, agree, and understand that
                  Freelancers are solely responsible for determining, and have
                  the sole right to determine, which Projects to accept; the
                  time, place, manner, and means of providing any Freelancer
                  Services; the type of services they provide; and the price
                  they charge for their services or how that pricing is
                  determined or set. You further acknowledge, agree, and
                  understand that: (i) you are not an employee of Bearole, and
                  you are not eligible for any of the rights or benefits of
                  employment (including unemployment and/or workers compensation
                  insurance); (ii) Bearole will not have any liability or
                  obligations, including under or related to Service Contracts
                  and/or Freelancer Services for any acts or omissions by you or
                  other Users; (iii) Bearole does not, in any way, supervise,
                  direct, or control any Freelancer or Freelancer Services; does
                  not impose quality standards or a deadline for completion of
                  any Freelancer Services; and does not dictate the performance,
                  methods or process Freelancer uses to perform services; (iv)
                  Freelancer is free to determine when and if to perform
                  Freelancer Services, including the days worked and time
                  periods of work, and Bearole does not set or have any control
                  over Freelancer’s pricing, work hours, work schedules, or work
                  location, nor is Bearole involved in any other way in
                  determining the nature and amount of any compensation that may
                  be charged by or paid to Freelancer for a Project; (v)
                  Freelancer will be paid at such times and amounts as agreed
                  with a Client in a given Service Contract, and Bearole does
                  not, in any way, provide or guarantee Freelancer a regular
                  salary or any minimum, regular payment; (vi) Bearole does not
                  provide Freelancers with training or any equipment, labor,
                  tools, or materials related to any Service Contract; (vii)
                  Bearole does not provide the premises at which Freelancers
                  will perform the work. Freelancers are free to use
                  subcontractors or employees to perform Freelancer Services and
                  may delegate work on fixed-price contracts or by agreeing with
                  their Clients to have hourly contracts for Freelancer’s
                  subcontractor(s) or employee(s); and (viii) Bearole does not
                  provide shipping services for any physical Work Product. If a
                  Freelancer uses subcontractors or employees, Freelancer
                  further agrees and acknowledges that this Section applies to
                  Bearole’s relationship, if any, with Freelancer’s
                  subcontractors and employees as well and Freelancer is solely
                  responsible for Freelancer’s subcontractors and employees.
                  Without limiting the foregoing paragraph, if you are an Agency
                  or Agency Member, you expressly acknowledge, agree, and
                  understand that: (1) the Agency is solely responsible for
                  paying its Agency Members for work performed on behalf of the
                  Agency and that such payments will not be made through the
                  Site; (2) Bearole is not a party to any agreement between the
                  Agency and its Agency Members and does not have any liability
                  or obligations under or related to any such agreement, even if
                  the Agency or Agency Member defaults; (3) neither Agencies nor
                  Agency Members are employees or agents of Bearole; (4) Bearole
                  does not, in any way, supervise, direct, or control the Agency
                  or Agency Members; (5) Bearole does not set Agencies’ or
                  Agency Members’ contract terms amongst themselves or with
                  Clients (including determining whether the contract will be
                  hourly or fixed price), fees, pricing, work hours, work
                  schedules, or location of work; (6) Bearole does not provide
                  Agencies or Agency Members with training or any equipment,
                  labor, tools, or materials needed for any Service Contract;
                  (7) Bearole does not provide the premises at which the Agency
                  or Agency Members will perform the work; and (8) Bearole makes
                  no representations as to the reliability, capability, or
                  qualifications of any Agency or Agency Member or the ability
                  or willingness of any Agency to make payments to or fulfill
                  any other obligations to Agency Members, and Bearole disclaims
                  any and all liability relating thereto. Nothing in this
                  Agreement is intended to prohibit or discourage (nor should be
                  construed as prohibiting or discouraging) any User from
                  engaging in any other business activities or providing any
                  services through any other channels they choose, provided, if
                  applicable, Users comply with the Opt Out provisions described
                  in Section 7. Users are free at all times to engage in such
                  other business activities and services and are encouraged to
                  do so.
                </div>
                <h4 className="mb-2 font-weight-600" id="u22">
                  3.2 TAXES AND BENEFITS
                </h4>
                <div className="mb-2">
                  Freelancer acknowledges and agrees that Freelancer is solely
                  responsible (a) for all tax liability associated with payments
                  received from Freelancer’s Clients and through Bearole, and
                  that Bearole will not withhold any taxes from payments to
                  Freelancer; (b) to obtain any liability, health, workers’
                  compensation, disability, unemployment, or other insurance
                  needed, desired, or required by law, and that Freelancer is
                  not covered by or eligible for any insurance from Bearole; (c)
                  for determining whether Freelancer is required by applicable
                  law to issue any particular invoices for the Freelancer Fees
                  and for issuing any invoices so required; (d) for determining
                  whether Freelancer is required by applicable law to remit to
                  the appropriate authorities any value added tax or any other
                  taxes or similar charges applicable to the Freelancer Fees and
                  remitting any such taxes or charges to the appropriate
                  authorities, as appropriate; and (e) if outside of the United
                  States, for determining if Bearole is required by applicable
                  law to withhold any amount of the Freelancer Fees and for
                  notifying Bearole of any such requirement and indemnifying
                  Bearole for any requirement to pay any withholding amount to
                  the appropriate authorities (including penalties and
                  interest). In the event of an audit of Bearole, Freelancer
                  agrees to promptly cooperate with Bearole and provide copies
                  of Freelancer’s tax returns and other documents as may be
                  reasonably requested for purposes of such audit, including but
                  not limited to records showing Freelancer is engaging in an
                  independent business as represented to Bearole.
                </div>
                <h4 className="mb-2 font-weight-600" id="u23">
                  3.3 MARKETPLACE FEEDBACK AND USER CONTENT
                </h4>
                <div className="mb-2">
                  You hereby acknowledge and agree that Users publish and
                  request Bearole to publish on their behalf information on the
                  Site about the User, such as feedback, composite feedback,
                  geographical location, or verification of identity or
                  credentials. However, such information is based solely on
                  unverified data that Freelancers or Clients voluntarily submit
                  to Bearole and does not constitute and will not be construed
                  as an introduction, endorsement, or recommendation by Bearole;
                  Bearole provides such information solely for the convenience
                  of Users. You acknowledge and agree that User feedback
                  benefits the marketplace, all Users, and the efficiency of the
                  Site and you specifically request that Bearole post composite
                  or compiled feedback about Users, including yourself, on User
                  Profiles and elsewhere on the Site. You acknowledge and agree
                  that feedback results for you, including your Job Success
                  Score, wherever referenced, and other User Content highlighted
                  by Bearole on the Site or otherwise (“Composite Information”),
                  if any, may include User comments, User ratings, indicators of
                  User satisfaction, and other feedback left exclusively by
                  other Users. You further acknowledge and agree that Bearole
                  will make Composite Information available to other Users,
                  including composite or compiled feedback. Bearole provides its
                  feedback system as a means through which Users can share their
                  opinions of other Users publicly, and Bearole does not
                  monitor, influence, contribute to or censor these opinions.
                  You acknowledge and agree that posted composite or compiled
                  feedback and any other Composite Information relates only to
                  the business advertised in the Profile and not to any
                  individual person. You agree not to use the Composite
                  Information to make any employment, credit, credit valuation,
                  underwriting, or other similar decision about any other User.
                  Bearole does not generally investigate any remarks posted by
                  Users or other User Content for accuracy or reliability and
                  does not guarantee that User Content is accurate. You are
                  solely responsible for your User Content, including the
                  accuracy of any User Content, and are solely responsible for
                  any legal action that may be instituted by other Users or
                  third parties as a result of or in connection with your User
                  Content. Bearole is not legally responsible for any feedback
                  or comments posted or made available on the Site by any Users
                  or third parties, even if that information is defamatory or
                  otherwise legally actionable. In order to protect the
                  integrity of the feedback system and protect Users from abuse,
                  Bearole reserves the right (but is under no obligation) to
                  remove posted feedback or information that, in Bearole’s sole
                  judgment, violates the Terms of Service or negatively affects
                  our marketplace, diminishes the integrity of the feedback
                  system or otherwise is inconsistent with the business
                  interests of Bearole. You acknowledge and agree that you will
                  notify Bearole of any error or inaccurate statement in your
                  feedback results, including the Composite Information, and
                  that if you do not do so, Bearole may rely on the accuracy of
                  such information.
                </div>
                  </Card.Body>
                </Accordion.Collapse>
                </Card>
                </Accordion>
           


                <Accordion className="tip_box p-0 border-0">
              <Card>
                <div className="" id="headingOne">
                  <h5 className="mb-0">
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                      <span className="heading-top">Section 4.</span><span className="heading-top-marign"> Contractual Relationship Between Client And Freelancer</span> <i className="fa fa-angle-down" aria-hidden="true"></i>
                    </Accordion.Toggle>
                  </h5>
                </div>
                <Accordion.Collapse eventKey="0">
                <Card.Body>
                <div className="mb-2">
                  Section 3 discusses the relationship you may decide to enter
                  into with another User, including Service Contracts between
                  Users, as detailed below.
                </div>
                <h4 className="mb-2 font-weight-600" id="u31">
                  4.1 SERVICE CONTRACTS
                </h4>
                <div className="mb-2">
                  If a Client and Freelancer decide to enter into a Service
                  Contract, the Service Contract is a contractual relationship
                  directly between the Client and Freelancer. Client and
                  Freelancer have complete discretion both with regard to
                  whether to enter into a Service Contract with each other and
                  with regard to the terms of any Service Contract. You
                  acknowledge, agree, and understand that Bearole is not a party
                  to any Service Contract, that the formation of a Service
                  Contract between Users will not, under any circumstance,
                  create an employment or other service relationship between
                  Bearole and any User or a partnership or joint venture between
                  Bearole and any User. With respect to any Service Contract,
                  Clients and Freelancers may enter into any written agreements
                  that they deem appropriate (e.g., confidentiality agreements,
                  invention assignment agreements, assignment of rights, etc.)
                  provided that any such agreements do not conflict with,
                  narrow, or expand Bearole’s rights and obligations under the
                  Terms of Service, including this Agreement and the applicable
                  Escrow Instructions. The parties to a Service Contract can, if
                  the parties prefer, agree to the Optional Service Contract
                  Terms in whole or in part, in addition to or instead of other
                  such agreements. Only to the extent that they have not entered
                  into another agreement or terms with respect to a Service
                  Contract, the parties to a Service Contract agree that the
                  Optional Service Contract Terms apply to their Service
                  Contract. The Optional Service Contract Terms are provided as
                  a sample only and may not be appropriate for all jurisdictions
                  or all contracts. Users are responsible for complying with any
                  local requirements, including applicable laws, rules, and
                  regulations. Bearole does not assume any responsibility for
                  any consequence of using the Optional Service Contract Terms.
                  The Optional Service Contract Terms are not intended to and do
                  not (a) constitute legal advice, (b) create an attorney-client
                  relationship, or (c) constitute advertising or a solicitation
                  of any type. Each situation is highly fact-specific and
                  requirements vary by situation and jurisdiction and therefore
                  any party should seek legal advice from a licensed attorney in
                  the relevant jurisdictions. Bearole expressly disclaims any
                  and all liability with respect to actions or omissions based
                  on the Optional Service Contract Terms. Please refer to the
                  Bearole Payroll Agreement for Service Contracts using Bearole
                  Payroll.
                </div>
                <h4 className="mb-2 font-weight-600" id="u32">
                  4.2 DISPUTES AMONG USERS
                </h4>
                <div className="mb-2">
                  For disputes arising between Clients and Freelancers, you
                  agree to abide by the dispute process that is explained in the
                  Escrow Instructions that apply to your particular Service
                  Contract. If the dispute process does not resolve your
                  dispute, you may pursue your dispute independently, but you
                  acknowledge and agree that Bearole will not and is not
                  obligated to provide any dispute assistance beyond what is
                  provided in the Escrow Instructions. If Freelancer or Client
                  intends to obtain an order from any arbitrator or any court
                  that might direct Bearole, Bearole Escrow, or our Affiliates
                  to take or refrain from taking any action with respect to an
                  Escrow Account, that party will (a) give us at least five
                  business days’ prior notice of the hearing; (b) include in any
                  such order a provision that, as a precondition to obligation
                  affecting Bearole or Bearole Escrow, we be paid in full for
                  any amounts to which we would otherwise be entitled; and (c)
                  be paid for the reasonable value of the services to be
                  rendered pursuant to such order.
                </div>
                <h4 className="mb-2 font-weight-600" id="u33">
                  4.3 CONFIDENTIAL INFORMATION
                </h4>
                <div className="mb-2">
                  Users may agree to any terms they deem appropriate with
                  respect to confidentiality, including those set forth in the
                  Optional Service Contract Terms. If and to the extent that the
                  Users do not articulate any different agreement with regard to
                  confidentiality, then they agree that this Section 3.3
                  (Confidential Information) applies. To the extent a User
                  provides Confidential Information to the other, the recipient
                  will protect the secrecy of the discloser’s Confidential
                  Information with the same degree of care as it uses to protect
                  its own Confidential Information, but in no event with less
                  than due care. On a User’s written request, the party that
                  received Confidential Information will promptly destroy or
                  return the disclosing party’s Confidential Information and any
                  copies thereof contained in or on its premises, systems, or
                  any other equipment otherwise under its control.
                </div>
                  </Card.Body>
                </Accordion.Collapse>
                </Card>
                </Accordion>



                <Accordion className="tip_box p-0 border-0">
              <Card>
                <div className="" id="headingOne">
                  <h5 className="mb-0">
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                      <span className="heading-top">Section 5.</span><span className="heading-top-marign"> Worker Classification And Bearole Payroll</span> <i className="fa fa-angle-down" aria-hidden="true"></i>
                    </Accordion.Toggle>
                  </h5>
                </div>
                <Accordion.Collapse eventKey="0">
                <Card.Body>
                  
                <div className="mb-2">
                  Section 4 discusses what you agree to concerning whether a
                  Freelancer is an employee or independent contractor and when
                  you agree to use Bearole Payroll, as detailed below.
                </div>
                <h4 className="mb-2 font-weight-600" id="u41">
                  5.1 WORKER CLASSIFICATION
                </h4>
                <div className="mb-2">
                  Nothing in this Agreement is intended to or should be
                  construed to create a partnership, joint venture,
                  franchisor/franchisee or employer-employee relationship
                  between Bearole and a User. Client is solely responsible for
                  and has complete discretion with regard to selection of any
                  Freelancer for any Project. Client is solely responsible for
                  and assumes all liability for determining whether Freelancers
                  should be engaged as independent contractors or employees of
                  Client and engaging them accordingly. Client warrants its
                  decisions regarding classification are correct and its manner
                  of engaging Freelancers complies with applicable laws,
                  regulations, and rules. Bearole will have no input into, or
                  involvement in, worker classification as between Client and
                  Freelancer and Users agree that Bearole has no involvement in
                  and will have no liability arising from or relating to the
                  classification of a Freelancer generally or with regard to a
                  particular Project.
                </div>
                <h4 className="mb-2 font-weight-600" id="u42">
                  5.2 Bearole PAYROLL SERVICES
                </h4>
                <div className="mb-2">
                  Client agrees to enroll in Bearole Payroll if it will receive
                  services from a Freelancer under terms and conditions that
                  would give rise to an employment relationship (unless Client
                  elects instead to pay the Conversion Fee (see Section 7)).
                  When the Client enrolls in Bearole Payroll, Client will engage
                  Bearole’s third-party staffing vendor (the “Staffing
                  Provider”), which is an Agency on Bearole, through the Site.
                  The Staffing Provider will hire Freelancer at the request of
                  Client and Freelancer according to the terms described on the
                  Site and otherwise agreed to by the Staffing Provider and
                  Client and/or Freelancer, and subject to the Bearole Payroll
                  Agreement. For all purposes with Bearole Payroll, the employer
                  of Freelancer will be the Staffing Provider and not Bearole
                  under any circumstances. Freelancer, acknowledges,
                  understands, and agrees that Bearole will have no control
                  over, or involvement in determining or influencing, the terms
                  and conditions of any employment relationship that may arise
                  between Freelancer and Staffing Provider or Client, including
                  the selection of an employee, pay rate, work hours, employment
                  dates and working conditions. Freelancer will not have any
                  contract on the Site or contact with Bearole regarding such
                  employment terms. Where Freelancer and Client have enrolled in
                  Bearole Payroll the Site is provided for, and Users agree to
                  use the Site for, the sole purpose of enabling Freelancer to
                  communicate with the Staffing Provider and the Client.
                </div>
                  </Card.Body>
                </Accordion.Collapse>
                </Card>
                </Accordion>


                <Accordion className="tip_box p-0 border-0">
              <Card>
                <div className="" id="headingOne">
                  <h5 className="mb-0">
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                      <span className="heading-top">Section 6.</span><span className="heading-top-marign"> Bearole Fees</span> <i className="fa fa-angle-down" aria-hidden="true"></i>
                    </Accordion.Toggle>
                  </h5>
                </div>
                <Accordion.Collapse eventKey="0">
                <Card.Body>
                <div className="mb-2">
                  Section 5 describes what fees you agree to pay to Bearole in
                  exchange for Bearole providing the Site and Site Services to
                  you and what taxes Bearole may collect, as detailed below.
                </div>
                <h4 className="mb-2 font-weight-600" id="u51">
                  6.1 FEES FOR FREELANCERS
                </h4>
                <div className="mb-2">
                  Service Fees. Freelancers will pay Bearole a service fee for
                  the use of the Site Services as set forth in the Fee and ACH
                  Authorization Agreement and the Direct Contract Terms, for
                  using the Site Services, including the communication,
                  invoicing, reporting, dispute resolution and payment services,
                  including facilitating arbitration services and Hourly Payment
                  Protection, as described in the applicable Escrow Instructions
                  (the “Service Fees”). The Service Fees (to use the Site
                  Services) are paid solely by Freelancer. When a Client pays a
                  Freelancer for a Project or when funds related to a Project
                  are otherwise released to a Freelancer as required by the
                  applicable Escrow Instructions (See Section 6.1), Bearole
                  Escrow will credit the Freelancer Escrow Account for the full
                  amount paid or released by the Client, and then subtract and
                  disburse to Bearole the Service Fee. Freelancer hereby
                  irrevocably authorizes and instructs Bearole Escrow to deduct
                  the Service Fee from the Freelancer Escrow Account and pay
                  Bearole on Freelancer’s behalf. In the event the Freelancer
                  chooses to withdraw funds in a currency other than U.S.
                  dollars, there may also be a foreign currency conversion
                  charge imposed by Bearole Escrow or an affiliate and the rate
                  may differ from rates that are in effect on the date of the
                  payment and you may be able to obtain a better rate from your
                  bank or financial institution. Membership Fees and Connects.
                  Freelancers may subscribe to different levels of participation
                  and privileges on the Site to access additional features and
                  Site Service, by payment of subscription membership fees and
                  by purchasing "Connects" as described in and subject to the
                  terms of the Freelancer Membership Agreement. Disbursement
                  Fees. Freelancers will pay Bearole a disbursement fee for
                  remitting payments to their preferred payment method
                  (“Disbursement Fee”). The Disbursement Fee is paid to Bearole
                  in consideration of costs incurred and administration of
                  disbursements via the disbursement method requested by
                  Freelancer and varies by disbursement method. The Disbursement
                  Fee for each disbursement method is listed under Fees and
                  Schedules on the Site as revised from time to time. In
                  addition to fees charged by Bearole, your disbursement method
                  may also charge activation, maintenance, or other account
                  fees.
                </div>
                <h4 className="mb-2 font-weight-600" id="u52">
                  6.2 CLIENT FEES
                </h4>
                <div className="mb-2">
                  Clients pay Bearole a fee for payment processing and
                  administration related to the Freelancer Fees they pay to
                  Freelancers they engage through the Site, as described in the
                  Fee and ACH Authorization Agreement. Clients may also choose
                  to pay for a premium membership plan to access additional
                  features and Site Services, as described in the Fee and ACH
                  Authorization Agreement. Clients do not pay fees if they use
                  the Site solely for Direct Contracts.
                </div>
                <h4 className="mb-2 font-weight-600" id="u53">
                  6.3 VAT AND OTHER TAXES
                </h4>
                <div className="mb-2">
                  Bearole may be required by applicable law to collect taxes or
                  levies including, without limitation, withholding income tax
                  or VAT (while some countries may refer to VAT using other
                  terms, e.g. GST, we’ll just refer to VAT, GST and any local
                  sales taxes collectively as “VAT”) in the jurisdiction of the
                  Freelancer (the "Taxes"). In such instances, any amounts
                  Bearole is required to collect or withhold for the payment of
                  any such Taxes shall be collected in addition to the fees owed
                  to Bearole under the Terms of Service.
                </div>
                <h4 className="mb-2 font-weight-600" id="u54">
                  6.4 NO FEE FOR INTRODUCING OR FOR FINDING PROJECTS
                </h4>
                <div className="mb-2">
                  Bearole does not introduce Clients to Freelancers and does not
                  help Freelancers secure Projects. Bearole merely makes the
                  Site and Site Services available to enable Freelancers to do
                  so themselves and may from time to time highlight Projects
                  that may be of interest. Therefore, Bearole does not charge a
                  fee when a Freelancer finds a suitable Client or finds a
                  Project. In addition, Bearole does not charge any fee or dues
                  for posting public feedback and composite or compiled
                  feedback, including Composite Information.
                </div>
                  </Card.Body>
                </Accordion.Collapse>
                </Card>
                </Accordion>



                <Accordion className="tip_box p-0 border-0">
              <Card>
                <div className="" id="headingOne">
                  <h5 className="mb-0">
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                      <span className="heading-top">Section 7.</span><span className="heading-top-marign"> Payment Terms And Escrow Services</span> <i className="fa fa-angle-down" aria-hidden="true"></i>
                    </Accordion.Toggle>
                  </h5>
                </div>
                <Accordion.Collapse eventKey="0">
                <Card.Body>
                <div className="mb-2">
                  Section 6 discusses your agreement to pay Freelancer Service
                  Fees on Service Contracts, and describes how Bearole’s Escrow
                  Services work, what happens if a Client doesn’t pay, and
                  related topics, as detailed below.
                </div>
                <h4 className="mb-2 font-weight-600" id="u61">
                  7.1 ESCROW SERVICES
                </h4>
                <div className="mb-2">
                  Bearole Escrow provides escrow services to Users to deliver,
                  hold, and/or receive payment for a Project, and to pay fees to
                  Bearole (“Escrow Services”). Bearole Escrow is a Delaware
                  corporation and a licensed Internet escrow agent that holds
                  California Department of Business Oversight License No. 963
                  5086. The Escrow Services are intended for business use, and
                  you agree to use the Escrow Services only for business
                  purposes and not for consumer, personal, family, or household
                  purposes.
                </div>
                <h4 className="mb-2 font-weight-600" id="u611">
                  7.1.1 ESCROW INSTRUCTIONS
                </h4>
                <div className="mb-2">
                  Bearole Escrow will use and release funds deposited in an
                  Escrow Account only in accordance with this Agreement and the
                  applicable Escrow Instructions. You acknowledge and agree that
                  Bearole Escrow acts merely as an Internet escrow agent.
                  Bearole Escrow has fully delivered the Escrow Services to you
                  if Bearole Escrow provides the Escrow Services described in
                  this Agreement and the applicable Escrow Instructions. Bearole
                  Escrow is only obligated to perform those duties expressly
                  described in this Agreement and any applicable Escrow
                  Instructions. If you authorize or instruct Bearole Escrow to
                  release or make a payment of funds from an Escrow Account
                  associated with you, Bearole Escrow may release or pay those
                  funds as instructed in reliance on your authorization, this
                  Agreement, and the applicable Escrow Instructions or as
                  required by applicable law. Fixed-Price Projects. If Users
                  choose fixed-price compensation, then the Users agree that
                  they will be bound by, and Bearole Escrow will follow, the
                  Fixed-Price Escrow Instructions. Hourly Projects, Bonus
                  Payments, or Expense Payments. If Users choose hourly
                  compensation, and/or if the Client makes bonus or expense
                  payments, then the Users agree that they will be bound by, and
                  Bearole Escrow will follow, the Hourly, Bonus and Expense
                  Payment Agreement with Escrow Instructions. Direct Contracts.
                  If Users enter into a Direct Contract, then the Users agree
                  that they will be bound by, and Bearole Escrow will follow,
                  the Direct Contract Escrow Instructions. Bearole Payroll
                  Engagements. If Users use Bearole Payroll (Section 4) for a
                  particular Project, then the Staffing Employee is paid
                  directly by the Staffing Provider. A Client will be invoiced
                  through the Site by the Staffing Provider, and the applicable
                  Escrow Instructions will apply. However, the Client will not
                  be able to dispute hours reported by the Staffing Employee and
                  there is no waiting period for the disbursement of funds to
                  the Staffing Employee.
                </div>
                <h4 className="mb-2 font-weight-600" id="u612">
                  7.1.2 ESCROW ACCOUNTS
                </h4>
                <div className="mb-2">
                  Bearole Escrow will use and release funds deposited in an
                  Escrow Account only in accordance with this Agreement and the
                  applicable Escrow Instructions. Depending on your needs and
                  the applicable Escrow Instructions, Bearole Escrow will
                  establish and maintain one of three different types of Escrow
                  Accounts:
                </div>
                <div className="mb-2">
                  (a) Client Escrow Account. After entering into a Service
                  Contract, the first time a Client makes a payment for a
                  Project, Bearole Escrow will establish and maintain a “Client
                  Escrow Account” to hold funds for the Client to use to make
                  payments for Projects, to receive refunds in connection with
                  Projects, and to make payments to Bearole.
                </div>
                <div className="mb-2">
                  (b) Freelancer Escrow Account. After entering into a Service
                  Contract, the first time a Freelancer uses the Site to receive
                  payment for a Project, Bearole Escrow will establish and
                  maintain a “Freelancer Escrow Account” for Freelancer to
                  receive payments for Projects, withdraw payments, make
                  payments to Bearole and issue refunds to Clients.
                </div>
                <div className="mb-2">
                  (c) Fixed-Price Escrow Account. When you enter into a
                  Fixed-Price Contract, Bearole Escrow will establish and
                  maintain a “Fixed-Price Escrow Account” to receive, hold, and
                  release payments pursuant to the Fixed-Price Escrow
                  Instructions for the Project that is the subject of that
                  Fixed-Price Contract.
                </div>
                <div className="mb-2">
                  (d) Direct Contract Escrow Account. When you enter into a
                  Direct Contract, Bearole Escrow will establish and maintain a
                  “Direct Contract Escrow Account” to receive, hold, and release
                  payments pursuant to the Direct Contract Escrow Instructions
                  for the Project that is the subject of that Direct Contract.
                </div>
                <div className="mb-2">
                  You hereby authorize and instruct Bearole Escrow to act as
                  escrow agent in connection with the Escrow Accounts and the
                  payment, holding, and receipt of funds for each Project and
                  other specified purposes in accordance with the Terms of
                  Service and the applicable Escrow Instructions. Client and
                  Freelancer may access current information regarding the status
                  of an Escrow Account on the Site.
                </div>
                <h4 className="mb-2 font-weight-600">
                  7.1.3 FREELANCER APPOINTMENT OF Bearole ESCROW AND
                  SUBSIDIARIES AS AGENT
                </h4>
                <div className="mb-2">
                  If you are a Freelancer and you request payment related to an
                  Hourly Contract or the release of funds from a Fixed-Price
                  Escrow Account, you hereby appoint Bearole Escrow and its
                  wholly-owned subsidiaries, as your agent to obtain funds on
                  your behalf and credit them to your Freelancer Escrow Account
                  as applicable. Because Bearole Escrow is Freelancer’s agent,
                  Freelancer must, and hereby does, fully discharge and credit
                  Freelancer’s Client for all payments and releases that Bearole
                  Escrow receives on Freelancer’s behalf from or on behalf of
                  such Client.
                </div>
                <h4 className="mb-2 font-weight-600">6.1.4 TITLE TO FUNDS</h4>
                <div className="mb-2">
                  Bearole, Bearole Escrow and our Affiliates are not banks.
                  Bearole Escrow deposits and maintains all Escrow Account funds
                  in an escrow trust account at a bank insured by the Federal
                  Deposit Insurance Corporation and approved to receive, hold,
                  and deliver escrow funds under applicable laws and
                  regulations. The escrow trust account is separate from the
                  operating accounts of Bearole and each of our Affiliates.
                  Bearole Escrow will not voluntarily make funds deposited in
                  the escrow trust account available to its creditors, or the
                  creditors of its Affiliates, in the event of a bankruptcy, or
                  for any other purpose. As provided in United States Bankruptcy
                  Code, § 541(d), Bearole Escrow holds only legal title to, and
                  not any equitable interest in, the escrow trust account and
                  any funds deposited therein. This Agreement is supplementary
                  to the Service Contract and to any other agreement between
                  Client and Freelancer concerning the Project, as provided in
                  11 United States Bankruptcy Code, § 365(n).
                </div>
                <h4 className="mb-2 font-weight-600">6.1.5 NO INTEREST</h4>
                <div className="mb-2">
                  You agree that you will not receive interest or other earnings
                  on the funds held in your Escrow Account. Bearole, Bearole
                  Escrow, or our Affiliates may charge or deduct fees, may
                  receive a reduction in fees or expenses charged, and may
                  receive other compensation in connection with the services
                  they provide as provided in Section 5 and the Fee and ACH
                  Authorization Agreement.
                </div>
                <h4 className="mb-2 font-weight-600">
                  7.1.6 ESCROW AGENT DUTIES
                </h4>
                <div className="mb-2">
                  We undertake to perform only such duties as are expressly set
                  forth in this Agreement, the applicable Escrow Instructions,
                  and the other Terms of Service, and no other duties will be
                  implied. We have no liability under, and no duty to inquire as
                  to, the provisions of any agreement, other than the Terms of
                  Service, including this Agreement and the applicable Escrow
                  Instructions. We will be under no duty to inquire about or
                  investigate any agreement or communication between Client and
                  Freelancer, even if posted to the Site. We have the right to
                  rely upon, and will not be liable for acting or refraining
                  from acting upon, any written notice, instruction, or request
                  furnished to us by Client or Freelancer in accordance with
                  this Agreement or the applicable Escrow Instructions, if we
                  reasonably believe that such notice, instruction, or request
                  is genuine and that it is signed or presented by the proper
                  party or parties. We have no duty to inquire about or
                  investigate the validity, accuracy, or content of any such
                  notice, instruction, or request. We have no duty to solicit
                  any payments or releases that may be due to or from any Escrow
                  Account. We may execute any of our powers and perform any of
                  our duties under this Agreement and the applicable Escrow
                  Instructions directly or through agents or attorneys (and will
                  be liable only for the careful selection of any such agent or
                  attorney) and may consult with counsel, accountants, and other
                  skilled persons to be selected and retained by us. To the
                  extent permitted by applicable law, we will not be liable for
                  anything done, suffered, or omitted in good faith by us in
                  accordance with the advice or opinion of any such counsel,
                  accountants, or other skilled persons. If we are uncertain as
                  to our duties or rights hereunder or receive instructions,
                  claims, or demands from any party hereto that, in our opinion,
                  conflict with any of the provisions of this Agreement or the
                  applicable Escrow Instructions, we will be entitled to refrain
                  from taking any action, and our sole obligation will be to
                  keep safely all property held in the Escrow Account until we
                  are directed otherwise in writing by Client and Freelancer or
                  by a final order or judgment of an arbitrator or court of
                  competent jurisdiction.
                </div>
                <h4 className="mb-2 font-weight-600">
                  7.1.7 ESCROW AGENT RIGHT
                </h4>
                <div className="mb-2">
                  We have the right, in our sole discretion, but not the
                  obligation, to institute arbitration or, if no arbitration
                  provision applies, other legal proceedings, including
                  depositing funds held in the Escrow Account with a court of
                  competent jurisdiction, and to resolve any dispute between
                  Client and Freelancer related to the Escrow Account. Any
                  provision of this Agreement and the applicable Escrow
                  Instructions to the contrary notwithstanding and regardless
                  whether we are identified as a party in interest in any
                  dispute, arbitration, or other legal proceeding, nothing
                  herein will be construed to limit our legal and equitable
                  rights, including, but not limited to, depositing funds held
                  in the Escrow Account with a court of competent jurisdiction.
                  Any corporation or association into which Bearole Escrow may
                  be merged or converted or with which Bearole Escrow may be
                  consolidated, or any corporation or association to which all
                  or substantially all the escrow business of Bearole Escrow may
                  be transferred will succeed to all the rights and obligations
                  of Bearole Escrow as escrow holder and escrow agent under this
                  Agreement and the applicable Escrow Instructions without
                  further act to the extent permitted by applicable law.
                </div>
                <h4 className="mb-2 font-weight-600" id="u62">
                  7.2 CLIENT PAYMENTS ON SERVICE CONTRACTS
                </h4>
                <div className="mb-2">
                  Hourly Contracts. Freelancer will invoice Client for
                  Freelancer Fees on a weekly basis through Bearole, and Client
                  will pay invoices consistent with the Hourly Escrow
                  Instructions. When Client approves an Hourly Invoice for an
                  Hourly Contract, Client automatically and irrevocably
                  authorizes and instructs Bearole or its Affiliate, Bearole
                  Escrow or Elance Ltd., to charge Client’s Payment Method for
                  the Freelancer Fees. Fixed-Price Contracts. Client becomes
                  obligated to pay applicable amounts into the Escrow Account
                  immediately upon sending a Fixed-Price Contract offer (for the
                  full amount or for the first milestone, if milestones are
                  used) or upon activating any additional milestone. When Client
                  authorizes the payment of the Freelancer Fees for a
                  Fixed-Price Contract on the Site, Client automatically and
                  irrevocably authorizes and instructs Bearole or its
                  Affiliates, Bearole Escrow or Elance Ltd., to charge Client’s
                  Payment Method for the Freelancer Fees. Client acknowledges
                  and agrees that for both Hourly Contracts and Fixed-Price
                  Contracts, failure by Client to decline or dispute an Hourly
                  Invoice or request for payment is an authorization and
                  instruction to release payment, as described more fully in the
                  applicable Escrow Instructions.
                </div>
                <h4 className="mb-2 font-weight-600" id="u63">
                  7.3 DISBURSEMENTS TO FREELANCERS ON SERVICE CONTRACTS
                </h4>
                <div className="mb-2">
                  Under the relevant Escrow Instructions, Bearole Escrow
                  disburses funds that are available in the applicable
                  Freelancer Escrow Account and payable to a Freelancer upon
                  Freelancer’s request. A Freelancer can request disbursement of
                  available funds any time on a one-time basis or by setting up
                  an automatic disbursement schedule. If Freelancer does not
                  request a disbursement, Bearole will automatically disburse
                  available funds no more than 90 days after the Freelancer Fees
                  are released to the Freelancer Escrow Account, unless the
                  amount in the Escrow Account is less than the Minimum
                  Threshold. For purposes of the Terms of Service, a “Minimum
                  Threshold” is either (a) $100 for Freelancers within the
                  United States, or (b) $1,000 for Freelancers outside the
                  United States. When the funds in the Freelancer Escrow Account
                  are below the Minimum Threshold, the automatic disbursement
                  schedule is paused and the available and payable funds are
                  released on the earlier of: (i) Freelancer’s request; (ii) on
                  the first scheduled automatic disbursement occurring after the
                  amount exceeds the Minimum Threshold; or (iii) 180 days after
                  the funds are available in the Freelancer Escrow Account.
                  Hourly Contracts. Freelancer Fees become available to
                  Freelancers following the expiration of the dispute period and
                  the five-day security period. Fixed-Price Contracts.
                  Freelancer Fees become available to Freelancers following the
                  expiration of the five-day security period after the funds are
                  released as provided in the applicable Escrow Instructions.
                  The security period begins after Client accepts and approves
                  work submitted by Freelancer. Notwithstanding any other
                  provision of the Terms of Service or the Escrow Instructions,
                  Bearole Escrow, in its sole discretion and except as
                  prohibited by applicable law, may refuse to process, may hold
                  the disbursement of the Freelancer Fees or any other amounts
                  and offset amounts owed to us, or take such other actions with
                  respect to the Escrow Account as we deem appropriate in our
                  sole discretion if: (a) we require additional information,
                  such as Freelancer’s tax information, government-issued
                  identification or other proof of identity, address, or date of
                  birth; (b) we have reason to believe the Freelancer Fees may
                  be subject to dispute or chargeback; (c) we suspect a User has
                  committed or attempted to commit fraud or other illicit acts
                  on or through the Site; (d) we believe there are reasonable
                  grounds for insecurity with respect to the performance of
                  obligations under this Agreement or other Terms of Service; or
                  (e) we deem it necessary in connection with any investigation
                  or required by applicable law. If, after investigation, we
                  determine that the hold on the disbursement of the Freelancer
                  Fees is no longer necessary, Bearole Escrow will release such
                  hold as soon as practicable. In addition, notwithstanding any
                  other provision of the Terms of Service or the Escrow
                  Instructions and to the extent permitted by applicable law, we
                  reserve the right to seek reimbursement from you, and you will
                  reimburse us, if we: (i) suspect fraud or criminal activity
                  associated with your payment, withdrawal, or Project; (ii)
                  discover erroneous or duplicate transactions; or (iii) have
                  supplied our services in accordance with this Agreement yet we
                  receive any chargeback from the Payment Method used by you, or
                  used by your Client if you are a Freelancer, despite our
                  provision of the Site Services in accordance with this
                  Agreement. You agree that we have the right to obtain such
                  reimbursement by instructing Bearole Escrow to (and Bearole
                  Escrow will have the right to) charge the applicable Escrow
                  Account, and any other accounts you hold with us, offsetting
                  any amounts determined to be owing, deducting amounts from
                  future payments or withdrawals, charging your Payment Method,
                  or obtaining reimbursement from you by any other lawful means.
                  If we are unable to obtain such reimbursement, we may, in
                  addition to any other remedies available under applicable law,
                  temporarily or permanently revoke your access to the Site and
                  Site Services and close your Account.
                </div>
                <h4 className="mb-2 font-weight-600" id="u64">
                  7.4 NON-PAYMENT
                </h4>
                <div className="mb-2">
                  If Client is in “default”, meaning the Client fails to pay the
                  Freelancer Fees or any other amounts when due under the Terms
                  of Service, or a written agreement for payment terms
                  incorporating the Terms of Service (signed by an authorized
                  representative of Bearole), Bearole will be entitled to the
                  remedies described in this Section 6.4 in addition to such
                  other remedies that may be available under applicable law or
                  in such written agreement. For the avoidance of doubt, Client
                  will be deemed to be in default on the earliest occurrence of
                  any of the following: (a) Client fails to pay the Freelancer
                  Fees when due; (b) Client fails to pay a balance that is due
                  or to bring, within a reasonable period of time but no more
                  than 30 days after accrual of the charge, an account current
                  after a credit or debit card is declined or expires; (c)
                  Client fails to pay an invoice issued to the Client by Bearole
                  within the time period agreed or, if no period is agreed,
                  within 30 days; (d) Client initiates a chargeback with a bank
                  or other financial institution resulting in a charge made by
                  Bearole for Freelancer Fees or such other amount due being
                  reversed to the Client; or (e) Client takes other actions or
                  fails to take any action that results in a negative or
                  past-due balance on the Client’s account. If Client is in
                  default, we may, without notice, temporarily or permanently
                  close Client’s Account and revoke Client’s access to the Site
                  and Site Services, including Client’s authority to use the
                  Site to process any additional payments, enter into Service
                  Contracts, or obtain any additional Freelancer Services from
                  other Users through the Site. However, Client will remain
                  responsible for any amounts that accrue on any open Projects
                  at the time a limitation is put on the Client’s Account as a
                  result of the default. Without limiting other available
                  remedies, Client must pay Bearole upon demand for any amounts
                  owed, plus interest on the outstanding amount at the lesser of
                  one and one-half percent (1.5%) per month or the maximum
                  interest allowed by applicable law, plus attorneys’ fees and
                  other costs of collection to the extent permitted by
                  applicable law. At our discretion and to the extent permitted
                  by applicable law, Bearole or its Affiliates, Bearole Escrow
                  or Elance Ltd., may, without notice, charge all or a portion
                  of any amount that is owed on any Account to Bearole or as
                  Freelancer Fees or otherwise to any Payment Method on file on
                  the Client’s Account; set off amounts due against other
                  amounts received from Client or held by for Client by Bearole,
                  Bearole Escrow or another Affiliate; make appropriate reports
                  to credit reporting agencies and law enforcement authorities;
                  and cooperate with credit reporting agencies and law
                  enforcement authorities in any investigation or prosecution.
                  Bearole does not guarantee that Client is able to pay or will
                  pay Freelancer Fees and Bearole is not liable for Freelancer
                  Fees if Client is in default. Freelancer may use the dispute
                  process as described in the applicable Escrow Instructions in
                  order to recover funds from Client in the event of a default
                  or may pursue such other remedies against Client as Freelancer
                  chooses. If Bearole recovers funds from a Client in default
                  pursuant to this Section 6.4, Bearole will disburse any
                  portion attributable to Freelancer Fees to the applicable
                  Freelancer to the extent not already paid by Client or
                  credited by Bearole through any Payment Protection program.
                </div>
                <h4 className="mb-2 font-weight-600" id="u65">
                  7.5 NO RETURN OF FUNDS AND NO CHARGEBACKS
                </h4>
                <div className="mb-2">
                  Client acknowledges and agrees that Bearole or its Affiliates,
                  Bearole Escrow or Elance Ltd., will charge or debit Client’s
                  designated Payment Method for the Freelancer Fees incurred as
                  described in the applicable Escrow Instructions and the Fee
                  and ACH Authorization Agreement and that once Bearole or its
                  Affiliates, Bearole Escrow or Elance Ltd., charges or debits
                  the Client’s designated Payment Method for the Freelancer
                  Fees, the charge or debit is non-refundable, except as
                  otherwise required by applicable law. Client also acknowledges
                  and agrees that the Terms of Service provide a dispute
                  resolution process as a way for Client resolve disputes. To
                  the extent permitted by applicable law, Client therefore
                  agrees not to ask its credit card company, bank, or other
                  Payment Method provider to charge back any Freelancer Fees or
                  other fees charged pursuant to the Terms of Service for any
                  reason. A chargeback in breach of the foregoing obligation is
                  a material breach of the Terms of Service. If Client initiates
                  a chargeback in violation of this Agreement, Client agrees
                  that Bearole or its Affiliates, Bearole Escrow or Elance Ltd.,
                  may dispute or appeal the chargeback and institute collection
                  action against Client and take such other action it deems
                  appropriate.
                </div>
                <h4 className="mb-2 font-weight-600" id="u66">
                  7.6 PAYMENT METHODS
                </h4>
                <div className="mb-2">
                  In order to use certain Site Services, Client must provide
                  account information for at least one valid Payment Method.
                  Client hereby authorizes Bearole, Bearole Escrow, and Elance
                  Ltd., as applicable, to run credit card authorizations on all
                  credit cards provided by Client, to store credit card and
                  banking or other financial details as Client’s method of
                  payment consistent with our Privacy Policy, and to charge
                  Client’s credit card (or any other Payment Method) for the
                  Freelancer Fees and any other amounts owed under the Terms of
                  Service. To the extent permitted by applicable law and subject
                  to our Privacy Policy, you acknowledge and agree that we may
                  use certain third-party vendors and service providers to
                  process payments and manage your Payment Method information.
                  By providing Payment Method information through the Site and
                  authorizing payments with the Payment Method, Client
                  represents, warrants, and covenants that: (a) Client is
                  legally authorized to provide such information; (b) Client is
                  legally authorized to make payments using the Payment
                  Method(s); (c) if Client is an employee or agent of a company
                  or person that owns the Payment Method, that Client is
                  authorized by the company or person to use the Payment Method
                  to make payments on Bearole; and (d) such actions do not
                  violate the terms and conditions applicable to Client’s use of
                  such Payment Method(s) or applicable law. When Client
                  authorizes a payment using a Payment Method via the Site,
                  Client represents and warrants that there are sufficient funds
                  or credit available to complete the payment using the
                  designated Payment Method. To the extent that any amounts owed
                  under this Agreement or the other Terms of Service cannot be
                  collected from Client’s Payment Method(s), Client is solely
                  responsible for paying such amounts by other means. Bearole is
                  not liable to any User if Bearole does not complete a
                  transaction as a result of any limit by applicable law or your
                  financial institution, or if a financial institution fails to
                  honor any credit or debit to or from an account associated
                  with such Payment Method. Bearole will make commercially
                  reasonable efforts to work with any such affected Users to
                  resolve such transactions in a manner consistent with this
                  Agreement and any applicable Escrow Instructions.
                </div>
                <h4 className="mb-2 font-weight-600" id="u67">
                  7.7 U.S. DOLLARS AND FOREIGN CURRENCY CONVERSION
                </h4>
                <div className="mb-2">
                  The Site and the Site Services operate in U.S. Dollars. If a
                  User's Payment Method is denominated in a currency other than
                  U.S. Dollars and requires currency conversion to make or
                  receive payments in U.S. Dollars, the Site may display foreign
                  currency conversion rates that Bearole, Bearole Escrow, or our
                  Affiliates currently make available to convert supported
                  foreign currencies to U.S. Dollars. These foreign currency
                  conversion rates adjust regularly based on market conditions.
                  Please note that the wholesale currency conversion rates at
                  which we or our Affiliates obtain foreign currency will
                  usually be different than the foreign currency conversion
                  rates offered on the Site. Each User, at its sole discretion
                  and risk, may authorize the charge, debit, or credit of its
                  Payment Method in a supported foreign currency and the
                  conversion of the payment to U.S. Dollars at the foreign
                  currency conversion rate displayed on the Site. A list of
                  supported foreign currencies is available on the Site. If
                  foreign currency conversion is required to make a payment in
                  U.S. Dollars and Bearole or its Affiliate, Bearole Escrow or
                  Elance Ltd., as applicable, does not support the foreign
                  currency or the User does not authorize the conversion of such
                  payment at the foreign currency conversion rate displayed on
                  the Site, Bearole Escrow or one of our Affiliates will charge,
                  debit, or credit the User's Payment Method in U.S. Dollars and
                  the User's Payment Method provider will convert the payment at
                  a foreign currency conversion rate selected by the User's
                  Payment Method provider. The User's Payment Method provider
                  may also charge fees directly to the Payment Method even when
                  no currency conversion is involved. The User's authorization
                  of a payment using a foreign currency conversion rate
                  displayed on the Site is at the User's sole risk. Bearole,
                  Bearole Escrow, Elance Ltd., and our Affiliates are not
                  responsible for currency fluctuations that occur when billing
                  or crediting a Payment Method denominated in a currency other
                  than U.S. Dollars. Bearole, Bearole Escrow, Elance Ltd., and
                  our Affiliates are not responsible for currency fluctuations
                  that occur when receiving or sending payments to and from the
                  Escrow Account.
                </div>
                <h4 className="mb-2 font-weight-600" id="u66">
                  7.8 Non-circumvention
                </h4>
                <div className="mb-2">
                  Section 7 discusses your agreement to make and receive
                  payments only through Bearole for two years from the date you
                  first identify or meet your Client or Freelancer on the Site,
                  unless you pay a Conversion Fee; violating this Section 7 is a
                  serious breach and your Account may be permanently suspended
                  for violations, as detailed below.
                </div>

                  </Card.Body>
                </Accordion.Collapse>
                </Card>
                </Accordion>

        


                <Accordion className="tip_box p-0 border-0">
              <Card>
                <div className="" id="headingOne">
                  <h5 className="mb-0">
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                      <span className="heading-top">Section 8.</span><span className="heading-top-marign"> Making Payments Through Bearole</span> <i className="fa fa-angle-down" aria-hidden="true"></i>
                    </Accordion.Toggle>
                  </h5>
                </div>
                <Accordion.Collapse eventKey="0">
                <Card.Body>
                  
                <div className="mb-2">
                  You acknowledge and agree that a substantial portion of the
                  compensation Bearole receives for making the Site available to
                  you is collected through the Service Fee described in Section
                  5.1 and that in exchange a substantial value to you is the
                  relationships you make with other Users when you identify or
                  are identified by another person through the Site or Site
                  Services (the “Bearole Relationship”). Bearole only receives
                  the Service Fee when a Client and a Freelancer pay and receive
                  payment through the Site. Therefore, except as set out in
                  Section 7.2, for 24 months from the start of an Bearole
                  Relationship (the “Non-Circumvention Period”), you agree to
                  use the Site as your exclusive method to request, make, and
                  receive all payments for work directly or indirectly with that
                  person or arising out of your relationship with that person
                  and not to circumvent the Payment Methods offered on the Site
                  unless you pay a fee to take the relationship off of the Site
                  (the “Conversion Fee”). For the avoidance of doubt, if you, or
                  the business you represent, did not identify and were not
                  identified by another person through the Site, such as if you
                  and another User worked together before meeting on the Site,
                  then the Non-Circumvention Period does not apply. If you use
                  the Site as an employee, agent, or representative of another
                  business, then the Non-Circumvention Period applies to you and
                  other employees, agents, or representatives of the business or
                  its successor when acting in that capacity with respect to the
                  other User.
                </div>
                <div className="mb-2">
                  By way of illustration and not in limitation of the foregoing,
                  you agree not to:
                </div>
                <div className="mb-2">
                  • Offer or solicit or accept any offer or solicitation from
                  parties identified through the Site to contract, hire,
                  invoice, pay, or receive payment in any manner other than
                  through the Site.
                </div>
                <div className="mb-2">
                  • Invoice or report on the Site or in a Conversion Fee request
                  an invoice or payment amount lower than that actually agreed,
                  made, or received between Users.
                </div>
                <div className="mb-2">
                  • Refer a User you identified on the Site to a third-party who
                  is not a User of the Site for purposes of making or receiving
                  payments other than through the Site.
                </div>
                <div className="mb-2">
                  You agree to notify Bearole immediately if a person suggests
                  to you making or receiving payments other than through the
                  Site in violation of this Section 7 or if you receive
                  unsolicited contact outside of the Site. If you are aware of a
                  breach or potential breach of this non-circumvention
                  agreement, please submit a confidential report to Bearole
                  here.
                </div>
                <div className="mb-2">
                  You acknowledge and agree that a violation of any provision in
                  this Section 8.1 is a material breach of the Terms of Service.
                  Your Account may be permanently suspended and charged the
                  Conversion Fee (defined above) if you violate this Section
                  8.1. If you refuse to accept any new version of the Terms of
                  Service or elect not to comply with certain conditions of
                  using the Site, such as minimum rates supported on the Site,
                  and therefore choose to cease using the Site, you may pay the
                  Conversion Fee for each other User you wish to continue
                  working with on whatever terms you agree after you cease using
                  the Site.
                </div>
                <h4 className="mb-2 font-weight-600" id="u72">
                  8.2 COMMUNICATING THROUGH THE SITE; NOT SHARING CONTACT
                  DETAILS
                </h4>
                <div className="mb-2">
                  The provisions of this Section 8.2 apply to any interaction
                  between Users where the Client has a Basic or Plus Account.
                  The provisions of this Section 7.2 do not apply to any
                  interaction between Users where the Client is an Enterprise
                  Client. For purposes of the Terms of Service, “Enterprise
                  Client ” means a Client, including a legacy Enterprise client
                  or an Bearole Business Client, that has the following
                  “Enterprise” badge displayed on its job post or search tile:
                  Untitled For Users subject to this Section 7.2, Users agree to
                  use the communication services available on the Site to
                  communicate with other Users prior to entering into a Service
                  Contract. You agree that prior to entering into a Service
                  Contract, you (a) will use Bearole as the sole manner to
                  communicate with other Users; (b) will not provide your Means
                  of Direct Contact (defined below) to any other User or another
                  person that you identified or were identified by through the
                  Site; (c) will not use Means of Direct Contact of another user
                  to attempt to or to communicate with, solicit, contact, or
                  find the contact information of a User outside of Bearole; (d)
                  will not ask for, provide, or attempt to identify through
                  public means the contact information of another User; and (e)
                  you will not include any Means of Direct Contact (defined
                  below) or means by which your contact information could be
                  discovered in any profile, proposal, job posting, invitation,
                  or pre-hire communication through the Site’s communications
                  services (including in each case in any attached file), except
                  as otherwise provided on the Site. For purposes of the Terms
                  of Service “Means of Direct Contact” means any information
                  that would allow another person to contact you directly,
                  including, without limitation, phone number, email address,
                  physical address, a link to a contact form or form requesting
                  contact information, any link to an applicant management
                  system or means to submit a proposal or application outside of
                  the Site, or any information that would enable a user to
                  contact you on social media or other website or platform or
                  application that includes a communications tool, such as
                  Skype, Bearole, Wechat, or Facebook. For the avoidance of
                  doubt, information is a Means of Direct Contact if it would
                  enable another user to identify any of the information above
                  through other sources, such as going to a website that
                  included an email address or identifying you on social media,
                  such as through Facebook or LinkedIn. You acknowledge and
                  agree that a violation of any provision of this Section 8.2 is
                  a material breach of the Terms of Service. Your Account may be
                  permanently suspended if you violate this Section 8.2.
                </div>
                <h4 className="mb-2 font-weight-600" id="u73">
                  8.3 OPTING OUT
                </h4>
                <div className="mb-2">
                  You may opt out of the obligations in Section 8.1 with respect
                  to each Bearole Relationship only if the Client or Freelancer
                  pays Bearole a Conversion Fee which is a minimum of $1,000 USD
                  and up to $50,000 USD for each Bearole Relationship. You agree
                  that the Conversion Fee is 12% of the estimated earnings over
                  a twelve (12) month period, which is calculated by taking the
                  Hourly Rate (defined below) and multiplying it by 2,080.
                  “Hourly Rate” means the highest of (a) the highest hourly rate
                  charged by the Freelancer on any Service Contract, if any; (b)
                  the highest hourly rate proposed by the Freelancer in any
                  proposal, if any; or (c) the hourly rate in the Freelancer’s
                  profile. The Conversion Fee may be calculated differently for
                  Bearole Relationships when the Client is an Enterprise Client
                  if the Enterprise Client contract with Bearole provides for
                  different terms. To inquire about or pay the Conversion Fee,
                  send an email message to conversionfee@Bearole.com. You
                  understand and agree that if Bearole determines, in its sole
                  discretion, that you have violated Section 7, Bearole or its
                  Affiliates may, to the maximum extent permitted by law (x)
                  charge your Payment Method the Conversion Fee (including
                  interest) if permitted by law or send you an invoice for the
                  Conversion Fee (including interest), which you agree to pay
                  within 30 days, (y) close your Account and revoke your
                  authorization to use the Site and Site Services, and/or (z)
                  charge you for all losses and costs (including any and all
                  time of Bearole’s employees) and reasonable expenses
                  (including attorneys’ fees) related to investigating such
                  breach and collecting such fees.
                </div>
                <h3 className="title_h3 mb-2">8.4. NON-CIRCUMVENTION</h3>
                <div className="mb-2" id="u8">
                  Section 8 discusses your agreement to make and keep all
                  required records, as detailed below. Users will each (a)
                  create and maintain records to document satisfaction of their
                  respective obligations under this Agreement, including,
                  without limitation, their respective payment obligations and
                  compliance with tax and employment laws, and (b) provide
                  copies of such records to Bearole upon request. Nothing in
                  this subsection requires or will be construed as requiring
                  Bearole to supervise or monitor a User’s compliance with this
                  Agreement, the other Terms of Service, or a Service Contract.
                  You are solely responsible for creation, storage, and backup
                  of your business records. This Agreement and any registration
                  for or subsequent use of the Site will not be construed as
                  creating any responsibility on Bearole’s part to store,
                  backup, retain, or grant access to any information or data for
                  any period.
                </div>
                  </Card.Body>
                </Accordion.Collapse>
                </Card>
                </Accordion>



                <Accordion className="tip_box p-0 border-0">
              <Card>
                <div className="" id="headingOne">
                  <h5 className="mb-0">
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                      <span className="heading-top">Section 9.</span><span className="heading-top-marign"> Warranty Disclaimer</span> <i className="fa fa-angle-down" aria-hidden="true"></i>
                    </Accordion.Toggle>
                  </h5>
                </div>
                <Accordion.Collapse eventKey="0">
                <Card.Body>
                  

                <div className="mb-2">
                  Section 9 discusses your agreement and understanding that the
                  Site and Site Services may not always be available or work
                  perfectly, as detailed below. YOU AGREE NOT TO RELY ON THE
                  SITE, THE SITE SERVICES, ANY INFORMATION ON THE SITE OR THE
                  CONTINUATION OF THE SITE. THE SITE AND THE SITE SERVICES ARE
                  PROVIDED “AS IS” AND ON AN “AS AVAILABLE” BASIS. Bearole MAKES
                  NO REPRESENTATIONS OR WARRANTIES WITH REGARD TO THE SITE, THE
                  SITE SERVICES, WORK PRODUCT, USER CONTENT, OR ANY ACTIVITIES
                  OR ITEMS RELATED TO THIS AGREEMENT OR THE TERMS OF SERVICE. TO
                  THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, Bearole
                  DISCLAIMS ALL EXPRESS AND IMPLIED CONDITIONS, REPRESENTATIONS,
                  AND WARRANTIES INCLUDING, BUT NOT LIMITED TO, THE WARRANTIES
                  OF MERCHANTABILITY, ACCURACY, FITNESS FOR A PARTICULAR
                  PURPOSE, TITLE, AND NON-INFRINGEMENT. SOME JURISDICTIONS MAY
                  NOT ALLOW FOR ALL OF THE FOREGOING LIMITATIONS ON WARRANTIES,
                  SO TO THAT EXTENT, SOME OR ALL OF THE ABOVE LIMITATIONS MAY
                  NOT APPLY TO YOU. SECTION 13 (AGREEMENT TERM AND TERMINATION)
                  STATES USER’S SOLE AND EXCLUSIVE REMEDY AGAINST Bearole WITH
                  RESPECT TO ANY DEFECTS, NON-CONFORMANCES, OR DISSATISFACTION.
                </div>
                  </Card.Body>
                </Accordion.Collapse>
                </Card>
                </Accordion>


                <Accordion className="tip_box p-0 border-0">
              <Card>
                <div className="" id="headingOne">
                  <h5 className="mb-0">
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                      <span className="heading-top">Section 10.</span><span className="heading-top-marign"> Limitation Of Liability</span> <i className="fa fa-angle-down" aria-hidden="true"></i>
                    </Accordion.Toggle>
                  </h5>
                </div>
                <Accordion.Collapse eventKey="0">
                <Card.Body>
                <div className="mb-2">
                  Section 10 discusses your agreement that Bearole usually will
                  not have to pay you damages relating to your use of the Site
                  and Site Services and, if it is, at most it will be required
                  to pay you $2,500, as detailed below. Bearole is not liable,
                  and you agree not to hold us responsible, for any damages or
                  losses arising out of or in connection with the Terms of
                  Service, including, but not limited to: your use of or your
                  inability to use our Site or Site Services; delays or
                  disruptions in our Site or Site Services; viruses or other
                  malicious software obtained by accessing, or linking to, our
                  Site or Site Services; glitches, bugs, errors, or inaccuracies
                  of any kind in our Site or Site Services; damage to your
                  hardware device from the use of the Site or Site Services; the
                  content, actions, or inactions of third parties’ use of the
                  Site or Site Services; a suspension or other action taken with
                  respect to your Account; your reliance on the quality,
                  accuracy, or reliability of job postings, Profiles, ratings,
                  recommendations, and feedback (including their content, order,
                  and display), Composite Information, or metrics found on, used
                  on, or made available through the Site; and your need to
                  modify practices, content, or behavior or your loss of or
                  inability to do business, as a result of changes to the Terms
                  of Service. ADDITIONALLY, IN NO EVENT WILL Bearole, OUR
                  AFFILIATES, OUR LICENSORS, OR OUR THIRD-PARTY SERVICE
                  PROVIDERS BE LIABLE FOR ANY SPECIAL, CONSEQUENTIAL,
                  INCIDENTAL, PUNITIVE, EXEMPLARY, OR INDIRECT COSTS OR DAMAGES,
                  INCLUDING, BUT NOT LIMITED TO, LITIGATION COSTS, INSTALLATION
                  AND REMOVAL COSTS, OR LOSS OF DATA, PRODUCTION, PROFIT, OR
                  BUSINESS OPPORTUNITIES. THE LIABILITY OF Bearole, OUR
                  AFFILIATES, OUR LICENSORS, AND OUR THIRD-PARTY SERVICE
                  PROVIDERS TO ANY USER FOR ANY CLAIM ARISING OUT OF OR IN
                  CONNECTION WITH THIS AGREEMENT OR THE OTHER TERMS OF SERVICE
                  WILL NOT EXCEED THE LESSER OF: (A) $2,500; OR (B) ANY FEES
                  RETAINED BY Bearole WITH RESPECT TO SERVICE CONTRACTS ON WHICH
                  USER WAS INVOLVED AS CLIENT OR FREELANCER DURING THE SIX-MONTH
                  PERIOD PRECEDING THE DATE OF THE CLAIM. THESE LIMITATIONS WILL
                  APPLY TO ANY LIABILITY, ARISING FROM ANY CAUSE OF ACTION
                  WHATSOEVER ARISING OUT OF OR IN CONNECTION WITH THIS AGREEMENT
                  OR THE OTHER TERMS OF SERVICE, WHETHER IN CONTRACT, TORT
                  (INCLUDING NEGLIGENCE), STRICT LIABILITY, OR OTHERWISE, EVEN
                  IF ADVISED OF THE POSSIBILITY OF SUCH COSTS OR DAMAGES AND
                  EVEN IF THE LIMITED REMEDIES PROVIDED HEREIN FAIL OF THEIR
                  ESSENTIAL PURPOSE. SOME STATES AND JURISDICTIONS DO NOT ALLOW
                  FOR ALL OF THE FOREGOING EXCLUSIONS AND LIMITATIONS, SO TO
                  THAT EXTENT, SOME OR ALL OF THESE LIMITATIONS AND EXCLUSIONS
                  MAY NOT APPLY TO YOU.
                </div>
                  </Card.Body>
                </Accordion.Collapse>
                </Card>
                </Accordion>


                <Accordion className="tip_box p-0 border-0">
              <Card>
                <div className="" id="headingOne">
                  <h5 className="mb-0">
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                      <span className="heading-top">Section 11.</span><span className="heading-top-marign"> Release</span> <i className="fa fa-angle-down" aria-hidden="true"></i>
                    </Accordion.Toggle>
                  </h5>
                </div>
                <Accordion.Collapse eventKey="0">
                <Card.Body>
                <div className="mb-2">
                  Section 11 discusses your agreement not to hold us responsible
                  for any dispute you may have with another User, as detailed
                  below. In addition to the recognition that Bearole is not a
                  party to any contract between Users, you hereby release
                  Bearole, our Affiliates, and our respective officers,
                  directors, agents, subsidiaries, joint ventures, employees and
                  service providers from claims, demands, and damages (actual
                  and consequential) of every kind and nature, known and
                  unknown, arising out of or in any way connected with any
                  dispute you have with another User, whether it be at law or in
                  equity that exist as of the time you enter into this
                  agreement. This release includes, for example and without
                  limitation, any disputes regarding the performance, functions,
                  and quality of the Freelancer Services provided to Client by a
                  Freelancer and requests for refunds based upon disputes.
                  Procedures regarding the handling of certain disputes between
                  Users are discussed in the Escrow Instructions. TO THE EXTENT
                  APPLICABLE, YOU HEREBY WAIVE THE PROTECTIONS OF CALIFORNIA
                  CIVIL CODE § 1542 (AND ANY ANALOGOUS LAW IN ANY OTHER
                  APPLICABLE JURISDICTION) WHICH SAYS: “A GENERAL RELEASE DOES
                  NOT EXTEND TO CLAIMS THAT THE CREDITOR OR RELEASING PARTY DOES
                  NOT KNOW OR SUSPECT TO EXIST IN HIS OR HER FAVOR AT THE TIME
                  OF EXECUTING THE RELEASE AND THAT, IF KNOWN BY HIM OR HER,
                  WOULD HAVE MATERIALLY AFFECTED HIS OR HER SETTLEMENT WITH THE
                  DEBTOR OR RELEASED PARTY.” This release will not apply to a
                  claim that Bearole failed to meet our obligations under the
                  Terms of Service.
                </div>
                  </Card.Body>
                </Accordion.Collapse>
                </Card>
                </Accordion>
              
          

               
               

               
                <Accordion className="tip_box p-0 border-0">
              <Card>
                <div className="" id="headingOne">
                  <h5 className="mb-0">
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                      <span className="heading-top">Section 12.</span><span className="heading-top-marign"> Indemnification</span> <i className="fa fa-angle-down" aria-hidden="true"></i>
                    </Accordion.Toggle>
                  </h5>
                </div>
                <Accordion.Collapse eventKey="0">
                <Card.Body>
                            
                <div className="mb-2">
                  Section 12 discusses your agreement to pay for any costs or
                  losses we have as a result of a claim brought against us
                  related to your use of the Site or Site Services or your
                  illegal or harmful conduct, as detailed below. You will
                  indemnify, defend, and hold harmless Bearole, our Affiliates,
                  and our respective directors, officers, employees,
                  representatives, and agents (each an “Indemnified Party”) for
                  all Indemnified Claims (defined below) and Indemnified
                  Liabilities (defined below) relating to or arising out of: (a)
                  the use of the Site and the Site Services by you or your
                  agents, including any payment obligations or default
                  (described in Section 6.4 (Non-Payment)) incurred through use
                  of the Site Services; (b) any Work Product or User Content
                  developed, provided, or otherwise related to your use of the
                  Site Services; (c) any Service Contract entered into by you or
                  your agents, including, but not limited to, the classification
                  of a Freelancer as an independent contractor; the
                  classification of Bearole as an employer or joint employer of
                  Freelancer; any employment-related claims, such as those
                  relating to employment termination, employment discrimination,
                  harassment, or retaliation; and any claims for unpaid wages or
                  other compensation, overtime pay, sick leave, holiday or
                  vacation pay, retirement benefits, worker’s compensation
                  benefits, unemployment benefits, or any other employee
                  benefits; (d) failure to comply with the Terms of Service by
                  you or your agents; (e) failure to comply with applicable law
                  by you or your agents; (f) negligence, willful misconduct, or
                  fraud by you or your agents; and (g) defamation, libel,
                  violation of privacy rights, unfair competition, or
                  infringement of Intellectual Property Rights or allegations
                  thereof to the extent caused by you or your agents. For
                  purposes of this Section 12, your agents includes any person
                  who has apparent authority to access or use your account
                  demonstrated by using your username and password. “Indemnified
                  Claim” means any and all claims, damages, liabilities, costs,
                  losses, and expenses (including reasonable attorneys’ fees and
                  all related costs and expenses) arising from or relating to
                  any claim, suit, proceeding, demand, or action brought by you
                  or a third party or other User against an Indemnified Party.
                  “Indemnified Liability” means any and all claims, damages,
                  liabilities, costs, losses, and expenses (including reasonable
                  attorneys’ fees and all related costs and expenses) arising
                  from or relating to any claim, suit, proceeding, demand, or
                  action brought by an Indemnified Party against you or a third
                  party or other User.
                </div>
                  </Card.Body>
                </Accordion.Collapse>
                </Card>
                </Accordion>
              

                <Accordion className="tip_box p-0 border-0">
              <Card>
                <div className="" id="headingOne">
                  <h5 className="mb-0">
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                      <span className="heading-top">Section 13.</span><span className="heading-top-marign"> Agreement Term And Termination</span> <i className="fa fa-angle-down" aria-hidden="true"></i>
                    </Accordion.Toggle>
                  </h5>
                </div>
                <Accordion.Collapse eventKey="0">
                <Card.Body>
                <div className="mb-2">
                  Section 13 discusses your and Bearole’s agreement about when
                  and how long this Agreement will last, when and how either you
                  or Bearole can end this Agreement, and what happens if either
                  of us ends the Agreement, as detailed below.
                </div>
                <h4 className="mb-2 font-weight-600" id="u1131">
                  13.1 TERMINATION
                </h4>
                <div className="mb-2">
                  Unless both you and Bearole expressly agree otherwise in
                  writing, either of us may terminate this Agreement in our sole
                  discretion, at any time, without explanation, upon written
                  notice to the other, which will result in the termination of
                  the other Terms of Service as well, except as otherwise
                  provided herein. You may provide written notice to
                  legalnotices@Bearole.com. In the event you properly terminate
                  this Agreement, your right to use the Site and Site Services
                  is automatically revoked, and your Account will be closed.
                  Bearole is not a party to any Service Contract between Users.
                  Consequently, User understands and acknowledges that
                  termination of this Agreement (or attempt to terminate this
                  Agreement) does not terminate or otherwise impact any Service
                  Contract or Project entered into between Users. If you attempt
                  to terminate this Agreement while having one or more open
                  Projects, you agree (a) you hereby instruct Bearole to close
                  any open contracts; (b) you will continue to be bound by this
                  Agreement and the other Terms of Service until all such
                  Projects have closed on the Site; (c) Bearole will continue to
                  perform those Site Services necessary to complete any open
                  Project or related transaction between you and another User;
                  and (d) you will continue to be obligated to pay any amounts
                  accrued but unpaid as of the date of termination or as of the
                  closure of any open Service Contracts, whichever is later, to
                  Bearole for any Site Services or such other amounts owed under
                  the Terms of Service and to any Freelancers for any Freelancer
                  Services. Without limiting Bearole’s other rights or remedies,
                  we may, but are not obligated to, temporarily or indefinitely
                  revoke or limit access to the Site or Site Services, deny your
                  registration, or permanently revoke your access to the Site
                  and refuse to provide any or all Site Services to you if: (i)
                  you breach the letter or spirit of any terms and conditions of
                  this Agreement or any other provisions of the Terms of
                  Service; (ii) we suspect or become aware that you have
                  provided false or misleading information to us; or (iii) we
                  believe, in our sole discretion, that your actions may cause
                  legal liability for you, our Users, or Bearole or our
                  Affiliates; may be contrary to the interests of the Site or
                  the User community; or may involve illicit or illegal
                  activity. If your Account is temporarily or permanently
                  closed, you may not use the Site under the same Account or a
                  different Account or reregister under a new Account without
                  Bearole’s prior written consent. If you attempt to use the
                  Site under a different Account, we reserve the right to
                  reclaim available funds in that Account and/or use an
                  available Payment Method to pay for any amounts owed by you to
                  the extent permitted by applicable law. You acknowledge and
                  agree that the value, reputation, and goodwill of the Site
                  depend on transparency of User’s Account status to all Users,
                  including both yourself and other Users who have entered into
                  Service Contracts with you. You therefore agree as follows: IF
                  Bearole DECIDES TO TEMPORARILY OR PERMANENTLY CLOSE YOUR
                  ACCOUNT, Bearole HAS THE RIGHT WHERE ALLOWED BY LAW BUT NOT
                  THE OBLIGATION TO: (A) NOTIFY OTHER USERS THAT HAVE ENTERED
                  INTO SERVICE CONTRACTS WITH YOU TO INFORM THEM OF YOUR CLOSED
                  ACCOUNT STATUS, (B) PROVIDE THOSE USERS WITH A SUMMARY OF THE
                  REASONS FOR YOUR ACCOUNT CLOSURE. YOU AGREE THAT Bearole WILL
                  HAVE NO LIABILITY ARISING FROM OR RELATING TO ANY NOTICE THAT
                  IT MAY PROVIDE TO ANY USER REGARDING CLOSED ACCOUNT STATUS OR
                  THE REASON(S) FOR THE CLOSURE.
                </div>
                <h4 className="mb-2 font-weight-600" id="u1132">
                  13.2 ACCOUNT DATA ON CLOSURE
                </h4>
                <div className="mb-2">
                  Except as otherwise required by law, if your Account is closed
                  for any reason, you will no longer have access to data,
                  messages, files, or other material you keep on the Site and
                  any closure of your Account may involve deletion of any
                  content stored in your Account for which Bearole will have no
                  liability whatsoever. Bearole, in its sole discretion and as
                  permitted or required by law, may retain some or all of your
                  Account information.
                </div>
                <h4 className="mb-2 font-weight-600" id="u1133">
                  13.3 SURVIVAL
                </h4>
                <div className="mb-2">
                  After this Agreement terminates, the terms of this Agreement
                  and the other Terms of Service that expressly or by their
                  nature contemplate performance after this Agreement terminates
                  or expires will survive and continue in full force and effect.
                  For example, the provisions requiring arbitration, permitting
                  audits, protecting intellectual property, requiring
                  non-circumvention, indemnification, payment of fees,
                  reimbursement and setting forth limitations of liability each,
                  by their nature, contemplate performance or observance after
                  this Agreement terminates. Without limiting any other
                  provisions of the Terms of Service, the termination of this
                  Agreement for any reason will not release you or Bearole from
                  any obligations incurred prior to termination of this
                  Agreement or that thereafter may accrue in respect of any act
                  or omission prior to such termination.
                </div>
                  </Card.Body>
                </Accordion.Collapse>
                </Card>
                </Accordion>
         

              
                <Accordion className="tip_box p-0 border-0">
              <Card>
                <div className="" id="headingOne">
                  <h5 className="mb-0">
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                      <span className="heading-top">Section 14.</span><span className="heading-top-marign">  Disputes Between You And Bearole</span> <i className="fa fa-angle-down" aria-hidden="true"></i>
                    </Accordion.Toggle>
                  </h5>
                </div>
                <Accordion.Collapse eventKey="0">
                <Card.Body>
                <div className="mb-2">
                  Section 14 discusses your agreement with Bearole and our
                  agreement with you about how we will resolve any disputes,
                  including that we will both first try to resolve any dispute
                  informally and, if you are in the United States, that we both
                  agree to use arbitration instead of going to court or using a
                  jury if we can’t resolve the dispute informally, as detailed
                  below.
                </div>
                <h4 className="mb-2 font-weight-600" id="u1141">
                  14.1 DISPUTE PROCESS, ARBITRATION, AND SCOPE
                </h4>
                <div className="mb-2">
                  If a dispute arises between you and Bearole or our Affiliates,
                  our goal is to resolve the dispute quickly and
                  cost-effectively. Accordingly, unless you opt out as provided
                  in Section 14.4.4 below, you, Bearole, and our Affiliates
                  agree to resolve any claim, dispute, or controversy that
                  arises out of or relates to this Agreement, the other Terms of
                  Service, your relationship with Bearole (including without
                  limitation any claimed employment with Bearole or one of our
                  Affiliates or successors), the termination of your
                  relationship with Bearole, or the Site Services (each, a
                  “Claim”) in accordance with this Section 14 (sometimes
                  referred to as the “Arbitration Provision”). Claims covered by
                  this Arbitration Provision include, but are not limited to,
                  all claims, disputes, or controversies arising out of or
                  relating to this Agreement, the Site, Site Services, the Terms
                  of Service, any Service Contract, escrow payments or
                  agreements, any payments or monies you claim are due to you
                  from Bearole or our Affiliates or successors, trade secrets,
                  unfair competition, false advertising, consumer protection,
                  privacy, compensation, classification, minimum wage, seating,
                  expense reimbursement, overtime, breaks and rest periods,
                  termination, discrimination, retaliation or harassment and
                  claims arising under the Defend Trade Secrets Act of 2016,
                  Civil Rights Act of 1964, Rehabilitation Act, Civil Rights
                  Acts of 1866 and 1871, Civil Rights Act of 1991, the Pregnancy
                  Discrimination Act, Americans With Disabilities Act, Age
                  Discrimination in Employment Act, Family Medical Leave Act,
                  Fair Labor Standards Act, Employee Retirement Income Security
                  Act (except for claims for employee benefits under any benefit
                  plan sponsored by the Company and (a) covered by the Employee
                  Retirement Income Security Act of 1974 or (b) funded by
                  insurance), Affordable Care Act, Genetic Information
                  Non-Discrimination Act, Uniformed Services Employment and
                  Reemployment Rights Act, Worker Adjustment and Retraining
                  Notification Act, Older Workers Benefits Protection Act of
                  1990, Occupational Safety and Health Act, Consolidated Omnibus
                  Budget Reconciliation Act of 1985, False Claims Act, state
                  statutes or regulations addressing the same or similar subject
                  matters, and all other federal or state legal claims arising
                  out of or relating to your relationship with Bearole or the
                  termination of that relationship. Disputes between the parties
                  that may not be subject to predispute arbitration agreement as
                  provided by the Dodd-Frank Wall Street Reform and Consumer
                  Protection Act (Public Law 111-203) or as provided by an Act
                  of Congress or lawful, enforceable Executive Order, are
                  excluded from the coverage of this Agreement.
                </div>
                <h4 className="mb-2 font-weight-600" id="u1142">
                  14.2 CHOICE OF LAW
                </h4>
                <div className="mb-2">
                  The Site Terms of Use, the other Terms of Service, and any
                  Claim will be governed by and construed in accordance with the
                  laws of the State of Delaware, without regard to its conflict
                  of law provisions and excluding the United Nations Convention
                  on Contracts for the International Sale of Goods (CISG);
                  provided, however, that any Claims made by any Freelancer
                  located within the United States will be governed by the law
                  of the state in which such Freelancer resides. However,
                  notwithstanding the foregoing sentence, this Arbitration
                  Provision is governed by the Federal Arbitration Act (9 U.S.C.
                  §§ 1 et seq.).
                </div>
                <h4 className="mb-2 font-weight-600" id="u1143">
                  14.3 INFORMAL DISPUTE RESOLUTION
                </h4>
                <div className="mb-2">
                  Before serving a demand for arbitration of a Claim, you and
                  Bearole agree to first notify each other of the Claim. You
                  agree to notify Bearole of the Claim at Attn: Legal, 2625
                  Augustine Dr., Suite 601, Santa Clara CA 95054 or by email to
                  legalnotices@Bearole.com, and Bearole agrees to provide to you
                  a notice at your email address on file (in each case, a
                  “Notice”). You and Bearole then will seek informal voluntary
                  resolution of the Claim. Any Notice must include pertinent
                  account information, a brief description of the Claim, and
                  contact information, so that you or Bearole, as applicable,
                  may evaluate the Claim and attempt to informally resolve the
                  Claim. Both you and Bearole will have 60 days from the date of
                  the receipt of the Notice to informally resolve the other
                  party’s Claim, which, if successful, will avoid the need for
                  further action.
                </div>
                <h4 className="mb-2 font-weight-600" id="u1144">
                  14.4 BINDING ARBITRATION AND CLASS ACTION/JURY TRIAL WAIVER
                  (DOES NOT APPLY TO USERS LOCATED OUTSIDE THE UNITED STATES AND
                  ITS TERRITORIES)
                </h4>
                <div className="mb-2">
                  This Arbitration Provision applies to all Users except Users
                  located outside of the United States and its territories. In
                  the unlikely event the parties are unable to resolve a Claim
                  within 60 days of the receipt of the applicable Notice, you,
                  Bearole, and our Affiliates agree to resolve the Claim by
                  final and binding arbitration before an arbitrator from JAMS,
                  instead of a court or jury. JAMS may be contacted at
                  www.jamsadr.com.
                </div>
                <h4 className="mb-2 font-weight-600">
                  14.4.1. SCOPE OF ARBITRATION AGREEMENT AND CONDUCT OF
                  ARBITRATION
                </h4>
                <div className="mb-2">
                  This Arbitration Provision applies to any Claim (defined
                  above) the parties may have and survives after your
                  relationship with Bearole ends. Claims covered by this
                  Arbitration Provision include, but are not limited to, all
                  claims, disputes or controversies arising out of or relating
                  to this Agreement, the Terms of Service and the Bearole
                  Payroll Agreement. This Arbitration Provision is intended to
                  apply to the resolution of disputes that otherwise would be
                  resolved in a court of law or before a forum other than
                  arbitration. If for any reason JAMS will not administer the
                  arbitration, either party may apply to a court of competent
                  jurisdiction with authority over the location where the
                  arbitration will be conducted for appointment of a neutral
                  arbitrator. Except as otherwise provided herein, arbitration
                  will be conducted in Santa Clara County, California in
                  accordance with the JAMS Comprehensive Arbitration Rules and
                  Procedures’ Optional Expedited Arbitration Procedures then in
                  effect. Arbitration of disputes brought by a User that allege
                  a violation of a consumer protection statute also will be
                  subject to the JAMS Consumer Arbitration Minimum Standards,
                  and such arbitrations will be conducted in the same state and
                  within 25 miles of where the User is located. Claims by
                  Freelancers that allege employment or worker classification
                  disputes or will be conducted in the state and within 25 miles
                  of where Freelancer is located in accordance with the JAMS
                  Employment Arbitration Rules and Procedures then in effect.
                  The applicable JAMS arbitration rules may be found at
                  www.jamsadr.com or by searching online for “JAMS Comprehensive
                  Arbitration Rules and Procedures,” “JAMS Employment
                  Arbitration Rules,” or “JAMS Consumer Arbitration Minimum
                  Standards.” Any dispute regarding the applicability of a
                  particular set of JAMS rules shall be resolved exclusively by
                  the arbitrator. Any party will have the right to appear at the
                  arbitration by telephone and/or video rather than in person.
                  You and Bearole will follow the applicable JAMS rules with
                  respect to arbitration fees. In any arbitration under the JAMS
                  Employment Arbitration Rules and Procedures, the Freelancer
                  will pay JAMS arbitration fees only to the extent those fees
                  are no greater than the filing or initial appearance fees
                  applicable to court actions in the jurisdiction where the
                  arbitration will be conducted, with Bearole to make up the
                  difference, if any. In any arbitration under the JAMS
                  Comprehensive Arbitration Rules and Procedures’ Optional
                  Expedited Arbitration Procedures then in effect in which a
                  User makes a claim under a consumer protection statute, the
                  User will pay JAMS arbitration fees only to the extent those
                  fees are no greater than the filing or initial appearance fees
                  applicable to court actions in the jurisdiction where the
                  arbitration will be conducted, or $250.00, whichever is less,
                  with Bearole to make up the difference, if any. The arbitrator
                  must follow applicable law and may award only those remedies
                  that would have applied had the matter been heard in court.
                  Judgment may be entered on the arbitrator’s decision in any
                  court having jurisdiction. This Arbitration Provision does not
                  apply to litigation between Bearole and you that is or was
                  already pending in a state or federal court or arbitration
                  before the expiration of the opt-out period set forth in
                  Section 14.4.4, below. Notwithstanding any other provision of
                  this Agreement, no amendment to this Arbitration Provision
                  will apply to any matter pending in an arbitration proceeding
                  brought under this Section 14 unless all parties to that
                  arbitration consent in writing to that amendment. This
                  Arbitration Provision also does not apply to claims for
                  workers compensation, state disability insurance or
                  unemployment insurance benefits. Nothing in this Arbitration
                  Provision prevents you from making a report to or filing a
                  claim or charge with a government agency, including without
                  limitation the Equal Employment Opportunity Commission, U.S.
                  Department of Labor, U.S. Securities and Exchange Commission,
                  National Labor Relations Board, or Office of Federal Contract
                  Compliance Programs. Nothing in this Arbitration Provision
                  prevents the investigation by a government agency of any
                  report, claim or charge otherwise covered by this Arbitration
                  Provision. This Arbitration Provision also does not prevent
                  federal administrative agencies from adjudicating claims and
                  awarding remedies based on those claims, even if the claims
                  would otherwise be covered by this Arbitration Provision.
                  Nothing in this Arbitration Provision prevents or excuses a
                  party from satisfying any conditions precedent and/or
                  exhausting administrative remedies under applicable law before
                  bringing a claim in arbitration. Bearole will not retaliate
                  against you for filing a claim with an administrative agency
                  or for exercising rights (individually or in concert with
                  others) under Section 7 of the National Labor Relations Act.
                </div>
                <h4 className="mb-2 font-weight-600">
                  14.4.2. INTERPRETATION AND ENFORCEMENT OF THIS ARBITRATION
                  PROVISION
                </h4>
                <div className="mb-2">
                  This Arbitration Provision is the full and complete agreement
                  relating to the formal resolution of Claims. Except as
                  otherwise provided in this Arbitration Provision, this
                  Arbitration Provision covers, and the arbitrator shall have
                  exclusive jurisdiction to decide, all disputes arising out of
                  or relating to the interpretation, enforcement, or application
                  of this Arbitration Provision, including the enforceability,
                  revocability, scope, or validity of the Arbitration Provision
                  or any portion of the Arbitration Provision. All such matters
                  shall be decided by an arbitrator and not by a court. The
                  parties expressly agree that the arbitrator and not a court
                  will decide any question of whether the parties agreed to
                  arbitrate, including but not limited to any claim that all or
                  part of this Arbitration Provision, this Agreement, or any
                  other part of the Terms of Service is void or voidable. In the
                  event any portion of this Arbitration Provision is deemed
                  unenforceable, the remainder of this Arbitration Provision
                  will be enforceable. If any portion of the Class Action Waiver
                  in Section 14.4.3, below, of this Arbitration Provision is
                  deemed to be unenforceable, you and Bearole agree that this
                  Arbitration Provision will be enforced to the fullest extent
                  permitted by law.
                </div>
                <h4 className="mb-2 font-weight-600">
                  14.4.3. CLASS AND COLLECTIVE WAIVER
                </h4>
                <div className="mb-2">
                  Private attorney general representative actions under the
                  California Labor Code are not arbitrable, not within the scope
                  of this Arbitration Provision and may be maintained in a court
                  of law. However, this Arbitration Provision affects your
                  ability to participate in class or collective actions. Both
                  you and Bearole agree to bring any dispute in arbitration on
                  an individual basis only, and not on a class or collective
                  basis on behalf of others. There will be no right or authority
                  for any dispute to be brought, heard or arbitrated as a class
                  or collective action, or as a member in any such class or
                  collective proceeding (“Class Action Waiver”). Notwithstanding
                  any other provision of this Agreement or the JAMS rules,
                  disputes regarding the enforceability, revocability, scope, or
                  validity or breach of the Class Action Waiver may be resolved
                  only by a civil court of competent jurisdiction and not by an
                  arbitrator. In any case in which (1) the dispute is filed as a
                  class or collective action and (2) there is a final judicial
                  determination that all or part of the Class Action Waiver is
                  unenforceable, the class or collective action to that extent
                  must be litigated in a civil court of competent jurisdiction,
                  but the portion of the Class Action Waiver that is enforceable
                  shall be enforced in arbitration. You and Bearole agree that
                  you will not be retaliated against, disciplined or threatened
                  with discipline as a result of your filing or participating in
                  a class or collective action in any forum. However, Bearole
                  may lawfully seek enforcement of this Arbitration Provision
                  and the Class Action Waiver under the Federal Arbitration Act
                  and seek dismissal of such class or collective actions or
                  claims.
                </div>
                <h4 className="mb-2 font-weight-600">
                  14.4.4. RIGHT TO OPT OUT OF THE ARBITRATION PROVISION
                </h4>
                <div className="mb-2">
                  You may opt out of the Arbitration Provision contained in this
                  Section 14 by notifying Bearole in writing within 30 days of
                  the date you first registered for the Site. To opt out, you
                  must send a written notification to Bearole at Attn: Legal,
                  2625 Augustine Dr., Suite 601, Santa Clara CA 95054 that
                  includes (a) your Account username, (b) your name, (c) your
                  address, (d) your telephone number, (e) your email address,
                  and (f) a statement indicating that you wish to opt out of the
                  Arbitration Provision. Alternatively, you may send this
                  written notification to legalnotices@Bearole.com. Opting out
                  of this Arbitration Provision will not affect any other terms
                  of this Agreement. If you do not opt out as provided in this
                  Section 14.4.4, continuing your relationship with Bearole
                  constitutes mutual acceptance of the terms of this Arbitration
                  Provision by you and Bearole. You have the right to consult
                  with counsel of your choice concerning this Agreement and the
                  Arbitration Provision.
                </div>
                <h4 className="mb-2 font-weight-600">
                  14.4.5. Enforcement of this Arbitration Provision.
                </h4>
                <div className="mb-2">
                  This Arbitration Provision replaces all prior agreements
                  regarding the arbitration of disputes and is the full and
                  complete agreement relating to the formal resolution of
                  disputes covered by this Arbitration Provision. In the event
                  any portion of this Arbitration Provision is deemed
                  unenforceable, the remainder of this Arbitration Provision
                  will be enforceable. If any portion of the Class Action Waiver
                  in Section 14.4.3, above, is deemed to be unenforceable, you
                  and Bearole agree that this Arbitration Provision will be
                  enforced to the fullest extent permitted by law.
                </div>
                  </Card.Body>
                </Accordion.Collapse>
                </Card>
                </Accordion>
              
          


               
                <Accordion className="tip_box p-0 border-0">
              <Card>
                <div className="" id="headingOne">
                  <h5 className="mb-0">
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                      <span className="heading-top">Section 15.</span><span className="heading-top-marign"> General</span> <i className="fa fa-angle-down" aria-hidden="true"></i>
                    </Accordion.Toggle>
                  </h5>
                </div>
                <Accordion.Collapse eventKey="0">
                <Card.Body>
                <div className="mb-2" id="u115">
                  Section 15 discusses additional terms of the agreement between
                  you and Bearole, including that the Terms of Service contain
                  our full agreement, how the agreement will be interpreted and
                  applied, and your agreement not to access the Site from
                  certain locations, as detailed below.
                </div>
                <h4 className="mb-2 font-weight-600" id="u1151">
                  15.1 ENTIRE AGREEMENT
                </h4>
                <div className="mb-2">
                  This Agreement, together with the other Terms of Service, sets
                  forth the entire agreement and understanding between you and
                  Bearole relating to the subject matter hereof and thereof and
                  cancels and supersedes any prior or contemporaneous
                  discussions, agreements, representations, warranties, and
                  other communications between you and us, written or oral, to
                  the extent they relate in any way to the subject matter hereof
                  and thereof. The section headings in the Terms of Service are
                  included for ease of reference only and have no binding
                  effect. Even though Bearole drafted the Terms of Service, you
                  represent that you had ample time to review and decide whether
                  to agree to the Terms of Service. If an ambiguity or question
                  of intent or interpretation of the Terms of Service arises, no
                  presumption or burden of proof will arise favoring or
                  disfavoring you or Bearole because of the authorship of any
                  provision of the Terms of Service.
                </div>
                <h4 className="mb-2 font-weight-600" id="u1152">
                  15.2 MODIFICATIONS; WAIVER
                </h4>
                <div className="mb-2">
                  No modification or amendment to the Terms of Service will be
                  binding upon Bearole unless they are agreed in a written
                  instrument signed by a duly authorized representative of
                  Bearole or posted on the Site by Bearole. Our failure to act
                  with respect to a breach by you or others does not waive our
                  right to act with respect to subsequent or similar breaches.
                  We do not guarantee we will take action against all breaches
                  of this User Agreement.
                </div>
                <h4 className="mb-2 font-weight-600" id="u1153">
                  15.3 ASSIGNABILITY
                </h4>
                <div className="mb-2">
                  User may not assign the Terms of Service, or any of its rights
                  or obligations hereunder, without Bearole’s prior written
                  consent in the form of a written instrument signed by a duly
                  authorized representative of Bearole. Bearole may freely
                  assign this Agreement and the other Terms of Service without
                  User’s consent. Any attempted assignment or transfer in
                  violation of this subsection will be null and void. Subject to
                  the foregoing restrictions, the Terms of Service are binding
                  upon and will inure to the benefit of the successors, heirs,
                  and permitted assigns of the parties.
                </div>
                <h4 className="mb-2 font-weight-600" id="u1154">
                  15.4 SEVERABILITY; INTERPRETATION
                </h4>
                <div className="mb-2">
                  If and to the extent any provision of this Agreement or the
                  other Terms of Service is held illegal, invalid, or
                  unenforceable in whole or in part under applicable law, such
                  provision or such portion thereof will be ineffective as to
                  the jurisdiction in which it is illegal, invalid, or
                  unenforceable to the extent of its illegality, invalidity, or
                  unenforceability and will be deemed modified to the extent
                  necessary to conform to applicable law so as to give the
                  maximum effect to the intent of the parties. The illegality,
                  invalidity, or unenforceability of such provision in that
                  jurisdiction will not in any way affect the legality,
                  validity, or enforceability of such provision in any other
                  jurisdiction or of any other provision in any jurisdiction.
                </div>
                <h4 className="mb-2 font-weight-600" id="u1155">
                  15.5 FORCE MAJEURE
                </h4>
                <div className="mb-2">
                  The parties to this Agreement will not be responsible for the
                  failure to perform, or any delay in performance of, any
                  obligation hereunder for a reasonable period due to labor
                  disturbances, accidents, fires, floods, telecommunications or
                  Internet failures, strikes, wars, riots, rebellions,
                  blockades, acts of government, governmental requirements and
                  regulations or restrictions imposed by law or any other
                  conditions beyond the reasonable control of such party.
                </div>
                <h4 className="mb-2 font-weight-600" id="u1156">
                  15.6 PREVAILING LANGUAGE AND LOCATION
                </h4>
                <div className="mb-2">
                  The English language version of the Terms of Service will be
                  controlling in all respects and will prevail in case of any
                  inconsistencies with translated versions, if any. The Site is
                  controlled and operated from our facilities in the United
                  States.
                </div>
                <h4 className="mb-2 font-weight-600" id="u1157">
                  15.7 ACCESS OF THE SITE OUTSIDE THE UNITED STATES
                </h4>
                <div className="mb-2">
                  Bearole makes no representations that the Site is appropriate
                  or available for use outside of the United States. Those who
                  access or use the Site from other jurisdictions do so at their
                  own risk and are entirely responsible for compliance with all
                  applicable foreign, United States, state, and local laws and
                  regulations, including, but not limited to, export and import
                  regulations, including the Export Administration Regulations
                  maintained by the United States Department of Commerce and the
                  sanctions programs maintained by the Department of the
                  Treasury Office of Foreign Assets Control. You must not
                  directly or indirectly sell, export, re-export, transfer,
                  divert, or otherwise dispose of any software or service to any
                  end user without obtaining any and all required authorizations
                  from the appropriate government authorities. You also warrant
                  that you are not prohibited from receiving U.S. origin
                  products, including services or software. In order to access
                  or use the Site or Site Services, you must and hereby
                  represent that you are not: (a) a citizen or resident of a
                  geographic area in which access to or use of the Site or Site
                  Services is prohibited by applicable law, decree, regulation,
                  treaty, or administrative act; (b) a citizen or resident of,
                  or located in, a geographic area that is subject to U.S. or
                  other sovereign country sanctions or embargoes; or (c) an
                  individual, or an individual employed by or associated with an
                  entity, identified on the U.S. Department of Commerce Denied
                  Persons or Entity List, the U.S. Department of Treasury
                  Specially Designated Nationals or Blocked Persons Lists, or
                  the U.S. Department of State Debarred Parties List or
                  otherwise ineligible to receive items subject to U.S. export
                  control laws and regulations or other economic sanction rules
                  of any sovereign nation. You agree that if your country of
                  residence or other circumstances change such that the above
                  representations are no longer accurate, that you will
                  immediately cease using the Site and Site Services and your
                  license to use the Site or Site Services will be immediately
                  revoked.
                </div>
                <h4 className="mb-2 font-weight-600" id="u1158">
                  15.8 CONSENT TO USE ELECTRONIC RECORDS
                </h4>
                <div className="mb-2">
                  In connection with the Site Terms of Use, you may be entitled
                  to receive, or we may otherwise provide, certain records from
                  Bearole or our Affiliates, such as contracts, notices, and
                  communications, in writing. To facilitate your use of the Site
                  and the Site Services, you give us permission to provide these
                  records to you electronically instead of in paper form.
                </div>
         </Card.Body>
                </Accordion.Collapse>
                </Card>
                </Accordion>
              
                <Accordion className="tip_box p-0 border-0">
              <Card>
                <div className="" id="headingOne">
                  <h5 className="mb-0">
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                      <span className="heading-top">Section 16.</span><span className="heading-top-marign"> DEFINITIONS</span> <i className="fa fa-angle-down" aria-hidden="true"></i>
                    </Accordion.Toggle>
                  </h5>
                </div>
                <Accordion.Collapse eventKey="0">
                <Card.Body>
                  
                <div className="mb-2" id="u116">
                  Section 16 gives you some definitions of capitalized terms
                  that appear in the Terms of Service but other capitalized
                  terms are defined above, which you can tell because the term
                  is put in quotation marks and bold font. Capitalized terms not
                  defined below or above have the meanings described in the Site
                  Terms of Use or elsewhere in the Terms of Service. “Client”
                  means any authorized User utilizing the Site or Site Services,
                  including Direct Contract Services, to seek and/or obtain
                  Freelancer Services, including from another User.
                  “Confidential Information” means any material or information
                  provided to, or created by, a User to evaluate a Project or
                  the suitability of another User for the Project, regardless of
                  whether the information is in tangible, electronic, verbal,
                  graphic, visual, or other form. Confidential Information does
                  not include material or information that: (a) is generally
                  known by third parties as a result of no act or omission of
                  Freelancer or Client; (b) was lawfully received by User
                  without restriction from a third party having the right to
                  disseminate the information; (c) was already known by User
                  prior to receiving it from the other party and was not
                  received from a third party in breach of that third party’s
                  obligations of confidentiality; or (d) was independently
                  developed by User without use of another person’s Confidential
                  Information. “Escrow Account” means Client Escrow Account,
                  Freelancer Escrow Account, or Fixed-Price Escrow Account.
                  “Escrow Instructions” means the Fixed-Price Escrow
                  Instructions or the Hourly, Bonus, and Expense Payment
                  Agreement with Escrow Instructions. “Fixed-Price Contract”
                  means a Service Contract for which Client is charged a fixed
                  fee agreed between a Client and a Freelancer, prior to the
                  commencement of a Service Contract, for the completion of all
                  Freelancer Services contracted by Client for such Service
                  Contract. “Freelancer” means any authorized User utilizing the
                  Site or Site Services, including Direct Contract Services, to
                  advertise or provide Freelancer Services to Clients, including
                  Freelancer Accounts that are Agency Accounts or, if
                  applicable, Agency Members. A Freelancer is a customer of
                  Bearole with respect to use of the Site and Site Services.
                  “Freelancer Fees” means: (a) for an Hourly Contract, the
                  amount reflected in the Hourly Invoice (the number of hours
                  invoiced by Freelancer, multiplied by the hourly rate charged
                  by Freelancer); (b) for a Fixed-Price Contract, the fixed fee
                  agreed between a Client and a Freelancer; and (c) any bonuses
                  or other payments made by a Client to a Freelancer.
                  “Freelancer Services” means all services performed for or
                  delivered to Clients by Freelancers. “Hourly Contract” means a
                  Service Contract for which Client is charged based on the
                  hourly rate charged by Freelancer. “Hourly Invoice” means the
                  report of hours invoiced for a stated period by a Freelancer
                  for Freelancer Services performed for a Client. The term
                  “including” as used herein means including without limitation.
                  “Intellectual Property Rights” means all patent rights,
                  copyright rights, mask work rights, moral rights, rights of
                  publicity, trademark, trade dress and service mark rights,
                  goodwill, trade secret rights and other intellectual property
                  rights as may now exist or hereafter come into existence, and
                  all applications therefore and registrations, renewals and
                  extensions thereof, in each case, under the laws of any state,
                  country, territory or other jurisdiction. “Payment Method”
                  means a valid credit card issued by a bank acceptable to
                  Bearole, a bank account linked to your Account, a PayPal
                  account, a debit card, or such other method of payment as
                  Bearole may accept from time to time in our sole discretion.
                  “Project” means an engagement for Freelancer Services that a
                  Freelancer provides to a Client under a Service Contract on
                  the Site. “Staffing Employee” means a Freelancer enrolled in
                  Bearole Payroll, accepted for employment by a Staffing
                  Provider, and assigned by the Staffing Provider to provide
                  Freelancer Services to one or more Client(s). “Service
                  Contract” means, as applicable, (a) the contractual provisions
                  between a Client and a Freelancer governing the Freelancer
                  Services to be performed by a Freelancer for Client for a
                  Project; (b) a Direct Contract as defined in the Bearole
                  Direct Contract Terms; or (c) if you use Bearole Payroll, the
                  contractual provisions between Freelancer and the Staffing
                  Provider for the provision of services to Client, if any.
                  “Substantial Change” means a change to the terms of the Terms
                  of Service that reduces your rights or increases your
                  responsibilities. “Bearole App” means the online platform
                  accessed using Bearole’s downloaded application or other
                  software that enables time tracking and invoicing, chat, and
                  screenshot sharing with other Users. “User Content” means any
                  comments, remarks, data, feedback, content, text, photographs,
                  images, video, music, or other content or information that you
                  or any Site Visitor or User post to any part of the Site or
                  provide to Bearole, including such content or information that
                  is posted as a result of questions. “Work Product” means any
                  tangible or intangible results or deliverables that Freelancer
                  agrees to create for, or actually delivers to, Client as a
                  result of performing the Freelancer Services, including, but
                  not limited to, configurations, computer programs, or other
                  information, or customized hardware, and any intellectual
                  property developed in connection therewith.
                </div>
                
                </Card.Body>
                </Accordion.Collapse>
                </Card>
                </Accordion>
             
              </div>
            </div>
          </div>
        </section>
        <div className="pagetop">
          <a className="scrolltop" href="#top">
            Top
          </a>
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    languageType: state.languageReducer.languageType,
    language: state.languageReducer.language,
    activeRoute: state.routeStore.activeRoute,
  };
}
function mapDispatchProps(dispatch) {
  return {
    onRouteChange: (activeRoute) => {
      dispatch(onReduxRouteChange(activeRoute));
    },
    onProjectConfirmationDataHandle: (data) => {
      dispatch(onReduxProjectConfirmationDataHandle(data));
    },
  };
}

export default connect(mapStateToProps, mapDispatchProps)(TermOfUse);
