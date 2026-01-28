import React from 'react';

function Footer() {
    return ( 
        <footer style={{ backgroundColor: "rgb(250, 250, 250)" }}>
      <div className="container border-top mt-5">
        <div className="row mt-5">
          <div className="col">
            <img src="media/images/logo.png" style={{ width: "50%" }} />
            <p>
              &copy; 2026, FinTrust Ltd. All rights reserved.
            </p>
          </div>
          <div className="col">
            <p>Company</p>
            <a href="" style={{ textDecoration: "none" }}>About</a>
            <br />
            <a href="" style={{ textDecoration: "none" }}>Products</a>
            <br />
            <a href="" style={{ textDecoration: "none" }}>Pricing</a>
            <br />
            <a href="" style={{ textDecoration: "none" }}>Referral programme</a>
            <br />
            <a href="" style={{ textDecoration: "none" }}>Careers</a>
            <br />
            <a href="" style={{ textDecoration: "none" }}>FinTrust.tech</a>
            <br />
            <a href="" style={{ textDecoration: "none" }}>Press & media</a>
            <br />
            <a href="" style={{ textDecoration: "none" }}>FinTrust cares</a>
            <br />
          </div>
          <div className="col">
            <p>Support</p>
            <a href="" style={{ textDecoration: "none" }}>Contact</a>
            <br />
            <a href="" style={{ textDecoration: "none" }}>Support portal</a>
            <br />
            <a href="" style={{ textDecoration: "none" }}>FT-Connect blog</a>
            <br />
            <a href="" style={{ textDecoration: "none" }}>List of charges</a>
            <br />
            <a href="" style={{ textDecoration: "none" }}>Downloads & resources</a>
            <br />
          </div>
          <div className="col">
            <p>Account</p>
            <a href="" style={{ textDecoration: "none" }}>Open an account</a>
            <br />
            <a href="" style={{ textDecoration: "none" }}>Fund transfer</a>
            <br />
            <a href="" style={{ textDecoration: "none" }}>60 day challenge</a>
            <br />
          </div>
        </div>
        <div className="mt-5 text-muted" style={{ fontSize: "14px" }}>
          <p>
            FinTrust Technologies Pvt. Ltd.: AI-based Credit Assessment Platform – Partnered with RBI-regulated NBFCs. Registered Address: FinTrust Technologies Pvt. Ltd., #88/12, 2nd Floor, Innovation Park, Koramangala, Bengaluru - 560034, Karnataka, India. For any complaints pertaining to credit scoring or data usage please write to grievance@fintrust.ai, for technical support related to the app contact support@fintrust.ai. Please ensure you carefully read the Behavioral Data Privacy Policy and Model Transparency Document as prescribed by Digital Lending Guidelines | IEEE Ethics Framework.
          </p>

          <p>
            Procedure to file a complaint on RBI Integrated Ombudsman: Register on the CMS portal. Mandatory details for filing complaints: Name, PAN, Address, Registered Mobile Number, E-mail ID. Benefits: Transparent resolution, Independent review of AI-driven credit decisions.
          </p>

          <p>
            Smart Credit Assessment | Behavioral Grievance Redressal Mechanism
          </p>

          <p>
            Credit products and loan approvals are subject to market risks and individual repayment capacity; read all loan-related documents and the AI Explainability Report carefully before accepting any offer.
          </p>

          <p>
            Attention Borrowers: 1) FinTrust evaluates alternative behavioral data (Savings rate, Expense volatility, Cashflow surplus) to provide credit access to the underbanked w.e.f January 2024. 2) Update your mobile number and email to receive real-time alerts for loan disbursements and EMI schedules directly from our NBFC partners. 3) Monitor your Behavioral Credit Score and Repayment Simulation monthly via the FinTrust dashboard to improve financial health.
          </p>

          <p>
            India's most transparent AI-driven credit platform based on explainability. IEEE Fairness Standards Compliant.
          </p>

          <p>
            "Prevent unauthorized access to your financial data. Do not share OTPs or login credentials. Receive transaction alerts directly from our partner banks at the end of the day. Issued in the interest of financial inclusion. KYC is a mandatory one-time exercise for credit assessment—once KYC is completed via a DigiLocker/UIDAI integrated process, it streamlines future applications. Dear User, FinTrust uses explainable AI to ensure fairness; our models do not use gender, religion, or caste as inputs. As a policy, we do not provide 'guaranteed' loans and have not authorized anyone to collect cash payments on our behalf. If you find anyone claiming to represent FinTrust and asking for upfront processing fees in cash, please report it via our in-app security ticket."
          </p>

          <p>
            Users accessing credit-linked insurance products offered by partner providers (IRDAI Registered Corporate Agents) will not have access to the FinTrust credit grievance redressal forum or the RBI Ombudsman for insurance-specific disputes.
          </p>
        </div>
      </div>
    </footer>
     );
}

export default Footer;