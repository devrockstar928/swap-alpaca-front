import Head from 'next/head'
import { useEffect, useState } from 'react';
import Container from '../../components/Container'

export default function TokenTerms() {
  const [displayContent, setDisplayContent] = useState(false);

  useEffect(() => {
    const answer = prompt('Access Code');
    if (!answer || answer !== 'applesauce2022') {
      setDisplayContent(false);
      return;
    }
    setDisplayContent(true);
  }, []);

  if (!displayContent) {
    return <></>;
  }

  return (
    <Container id="website-terms-age" className="py-4 md:py-8 lg:py-12 terms" maxWidth="2xl">
      <Head>
        <title>Token Terms | RadioShack</title>
        <meta key="description" name="description" content="Token Terms" />
      </Head>

      <h1>
        TOKEN SWAP AND USE TERMS &amp; CONDITIONS
      </h1>

      <p style={{'fontStyle': 'italic'}}>
        These terms govern the relationship between you and The The Company (As defined below). You should read them in full as they limit liability and govern how you may interact with the Token and Company.
      </p>
      <p>
        In purchasing, owning, operating, holding, swapping, or otherwise engaging with any of the RS Distributed Labs, Inc services, website, promotional material you are hereby deemed to have accepted these terms in full.
      </p>

      <h2>
        The Company overview
      </h2>

      <p>
        RS Distributed Labs, Inc is incorporated in The Republic of Seychelles (The 'The Company ', 'we', 'us', or 'RS Distributed Labs'). The The Company has designed, built, and deployed a state of the art Cryptographic Token which allows users to engage with an already built DeFi user software platform. Users will receive tokens known as RADIO ('RADIO' or 'Tokens') that will work along side the newly developed ecosystem.
      </p>
      <p>
        Note: This platform has not been built by RS Distributed Labs and in order to use that platform, including its software abilities, you will have to subscribe to the terms and conditions of that platform. Limitations contained herein.
      </p>
      <p>
        This Token will be built using distributed ledger technology which contains unchangeable code functions, leveraging software which will enable its users to own and trade a specific type of Token.
      </p>
      <p>
        As part of an international growth strategy, it is anticipated that RS Distributed Labs, Inc, may provide new and advanced features, which are designed to expanded its abilities. Additionally, the The Company will enhance its administrative, technical and development services to this blockchain technology network enabled by its users. This growth development is not designed to build a product or service but rather allow the The Company to promote the Token itself.
      </p>
      <p>
        Overview of Network and Services
      </p>
      <p>
        The RADIO Token is deigned to interact with Software developed and built by other companies. Specifically, open sourced software which allows users to engage with each other and Cryptography assets (sometimes referred to as a 'DEX' or 'DAX'), or other similar software. The The Company has designed this Token to allow its operators the ability to pay for these third party companies license fee, gas fees, or other service fees, in order to use and interact with their respective software.
      </p>
      <p>
        The RADIO Token will be built on Ethereum blockchain technology and accessible from most computer and mobile devices with a private wallet.
      </p>
      <p>
        The RADIO Token has been developed by some of the most technological minded individuals in the crypto-industry backed by a team featured in major publications across the globe.
      </p>
      <p>
        TERMS AND CONDITIONS -- DISCLAIMERS
      </p>
      <p>
        PLEASE READ THESE TERMS OF RADIO SALE CAREFULLY. NOTE THAT SECTIONS OF THESE TERMS AND EXHIBITS CONTAIN CLAUSES REQUIRING BINDING ARBITRATION AND CLASS ACTION WAIVER, WHICH, IF APPLICABLE TO YOU, AFFECT YOUR LEGAL RIGHTS. IF YOU DO NOT AGREE TO THESE TERMS OF SALE, DO NOT Acquisition TOKENS.
      </p>
      <p>
        Your Acquisition of RADIO (“Tokens”) during the RS Distributed Labs sale period (“Sale Period”) from RS Distributed Labs (“The Company ,” “we,” or “us”) is subject to these Terms of Sale (“Terms”). Each of you ('You' or 'Participant') and The The Company is a “Party,” and together the “Parties.”
      </p>
      <p>
        By purchasing Tokens from us during the Sale Period, you will be bound by these Terms and all terms incorporated by reference. If you have any questions regarding these Terms, please contact us by using our website as contained in these terms.
      </p>
      <p>
        Updates to the Terms and Conditions of the Tokensale:
      </p>
      <p>
        RS Distributed Labs reserves the right, at its sole discretion, to change, modify, add, or remove portions of the Terms at any time during the sale by posting the amended Terms on the RS Distributed Labs website www.radioRADIO.io Any Participant will be deemed to have accepted such changes by purchasing a unit, Tokens, engaging with our website, or undertaking any action for the advancement of the project. These Terms may not be otherwise amended except in a signed writing executed by both the Participant and RADIO . For purposes of this agreement, "writing" does not include an e-mail message and a signature does not include an electronic signature. If at any point you do not agree to any portion of the then-current version of the Terms, you should not Acquisition the unit or any Tokens on offer.
      </p>
      <p>
        These terms maybe assigned at any time to any other company. Any such assignment shall not impact Your use rights as a Token Holder or Token Operator. Notice will be posted on the company website in the advance of an assignment. Such an assignment maybe undertaken without the consent or approval of You. Such an assignment is undertaken to ensure business continuity. In the event that You do not agree with any assignment you must return all of your Tokens without compensation and immediately discontinue the use of the RS Distributed Labs services.
      </p>
      <h2>
        The use of the name RadioRADIO
      </h2>
      <p>
        The term RadioShack is a trademark of the respective owner(s). It is operated under RS Distributed Labs under license from the respective owner(s). The Owner(s) of the Trademarks have no involvement of or participation in, the sale of these tokens to the General Public, including You. Participation in this Sale Event does not entitle you to use the name RaidoShack nor grant you any rights to promote, or otherwise engage with the RadioShack brand.
      </p>
      <p>
        Acquisition of, use of, acquisition of, or holding of RADIO tokens does not cause any type of relationship between you or any company using the RadioShack brand. The use of RADIO tokens does not and do not constitute the formation of a contract, duty, or other relationship such as partnership between You and any company bearing and using the RadioShack brand name.
      </p>
      <p>
        Through your use of, holding of, or participation with the RADIO Token, You hereby hold harmless and agree to indemnify any company bearing the RadioShack logo (under official license or officially used in commerce) for any claims You, your agents, lawyers, officers, or affiliates make.
      </p>
      <p>
        The RadioShack brand is used internationally and certain legal entities have no involvement with or engagement with the RADIO Token. Identifying a corporation, partnership, or other legal entity within your country of residence bearing the RadioShack brand is not cause or grounds to file any suit against that entity. In the event that You, Your Agent, Lawyer, Representative, Officer, Partner, or Affiliate file any lawsuit, issue demand letters, send notices or correspondence to any RadioShack entity which is not RS Distributed Labs, Inc (or any assignee) using the RadioShack brand under License, the entity which You communicate with/serve/file against shall have the right to immediately file a dismissal and ask for all costs associated with responding to any notices, letters, suits, or communication from You (or any party acting on your behalf).
      </p>
      <p>
        In the event that You make demands against any entity bearing the RadioShack brand which is not RS Distributed Labs, Inc (or its assignees), You expressly warrant and undertake that You shall indemnify and hold harmless such an entity (however it is legally constructed, such as partnership, corporation etc). That Entity will be entitled to immediately demand from you repayment of any legal or other fees associated in responding to you.
      </p>
      <p>
        You warrant and undertake to hold harmless any entity, company, partnership, or other legal entity using the RadioShack branding under official license with and in connection with your ownership, use of, or holding of the RADIO Token.
      </p>
      <p>
        Making damaging statements, speaking out against, filing suit, in connection with your use of RADIO Tokens is grounds to have your Tokens immediately suspended and Your use of Tokens will be removed. You will be asked to return any Tokens you hold to RS Distributed Labs (and any assignee).
      </p>
      <h2>
        You and RS Distributed Labs:
      </h2>
      <p>
        Purpose and Use of Tokens in the Network
      </p>
      <p>
        The purpose of the RADIO Token is to interact with Software developed and built by other companies. Specifically, open sourced software which allows users to engage with each other and Cryptography assets (sometimes referred to as a 'DEX' or 'DAX'), or other similar software. The The Company has designed this Token to allow its operators the ability to pay for these third party companies license fee, gas fees, or other service fees, in order to use and interact with their respective software. Additionally, the Token can be used to facilitate users to transfer and share data in a decentralized manner in exchange for reward points (the “Network”), utilizing blockchain technology backed with a website that allows members and licensees to control, monitor, and trade their Cryptographic assets or be rewarded for their engagement with retail outlets. (collectively, the “Services”). These services, website, and software applications are designed to complement certain social objectives aimed to promote social and financial inclusion of all users. Each one of these will have their own respective terms which You must agree to before you can use the Token in or with any of these Services.
      </p>
      <p>
        The Tokens issued during the sale period are intended to facilitate the provision of Services from The Company through third party software applications, and product development which serves as a user interface and development platform on the Network. Important additional details regarding the Network, Services, and The Company are provided in Exhibit A, and other exhibits herein.
      </p>
      <p>
        This is not a solicitation for investment and in no way is intended as an offering of securities in any jurisdiction. This is a crowdfunding project where those who put in certain amounts of money will be rewarded with Tokens.
      </p>
      <p>
        Since the Tokens are designed only for particular uses with respect to third party DEX ecosystem, it is not necessarily merchantable and does not necessarily have any other use or value. RS Distributed Labs views our Token(s) as a kind of consumable virtual fuel or tool(s) without any specific outlook or expectation on its merchantability or market price. This is sometimes referred to as a Utility Token.
      </p>
      <p>
        I. NON-FINANCIAL NATURE OF OUR TOKENS
      </p>
      <p>
        Being a method of using licensed software, and potentially as a reward protocol, by its design The RADIO Token is NOT and shall in NO case be understood, deemed, interpreted or construed as:
      </p>
      <p>
        (i) any kind of currency or money, whether fiat or not;
      </p>
      <p>
        (ii) equity interest, voting or nonvoting securities (or its like) in, or claims against, RS Distributed Labs including its members, shareholders, consultants, directors or any other entity in any jurisdiction;
      </p>
      <p>
        (iii) equity or debt investment of any kind in any venture; (iv) any securities having intrinsic value or market price; (v) any form of financial derivatives;
      </p>
      <p>
        (vi) any commercial paper or negotiable instrument;
      </p>
      <p>
        (vii) any form of investment contract between the relevant holder and any other person;
      </p>
      <p>
        (viii) any commodity or asset that any person is obliged to redeem or Acquisition; or
      </p>
      <p>
        (ix) any note, bond, warrant or other certificate that entitles the holder to interest, dividend or any kind of return from any person.
      </p>
      <p>
        For more information about RS Distributed Labs, our Wallet, Services, Third Parties, Software, or the Tokensale Event, please visit www.radioshack.com ( the "Site"), The RS Distributed Labs Sale Event or Terms of Services, or Terms of RADIO Sale, or the Whitepaper (“Whitepaper”). This includes any other document officially produced by the The Company .
      </p>
      <p>
        YOU HEREBY WARRANT AND AGREE THAT THE RADIO TOKEN IS NOT AND SHALL NOT BE TREATED AS A FINANCIAL INSTRUMENT OR OTHER INVESTMENT. IT IS NOT A 'SECURITY' AND IS NOT DESIGNED TO BE A SECURITY.
      </p>
      <p>
        II. SALE AND Acquisition – RADIO SALE EVENT PARTICIPATION
      </p>
      <p>
        (i) Participation in the RADIO sale is voluntary. No person will be deemed as committed or obliged to participate in the RADIO Sale Event or Acquisition any Tokens for visiting the site, registering themselves with the site, requesting or reading any materials (such as this Disclaimers, or the Whitepaper) made available by RS Distributed Labs website or communicating with RS Distributed Labs in any manner.
      </p>
      <p>
        Since Acquisition of RADIO Tokens during this Token Sale Event is made on a purely voluntary basis, it should be understood that Acquisition, holding or use of any RADIO Tokens is not risk-free. See “Risk Factors” discussed below for details.
      </p>
      <p>
        (ii) Each person shall only participate in the RS Distributed Labs Sale Event (a “Participant”) through a personal web account, as provided by the nominated third party (which is linked via our website).
      </p>
      <p>
        (iii) Each Participant will, upon participating in the RS Distributed Labs Sale Event, be deemed as having perused and comprehended these Disclaimers and the Whitepaper and the Terms of RS Distributed Labs Sale in full (inter alia, the risk factors set forth below) and having voluntarily accepted all the warranties and disclaimers made and the risks disclosed hereunder.
      </p>
      <p>
        (iv) Relevant Tokens subscribed by any Participant will be sent by RS Distributed Labs to their address specified by the Participant during sign up.
      </p>
      <p>
        (v) RS Distributed Labs shall be entitled to take any action to identify any Participant at any time, even after the close of the Participation Window (as defined in EXHIBIT A). If RS Distributed Labs conducts “know your customer” exercises or any other kind of customer due diligence to verify the identities of all or part of the Participants (outside those undertaken by any third party), the Participants concerned shall timely provide all such information and meet all such requests as may be sought or instructed by RS Distributed Labs for that purpose.
      </p>
      <p>
        (vi) If RS Distributed Labs discovers the Acquisition of Tokens by any Participant violating any anti-money laundering, counter-terrorism financing or other regulatory requirements, such Acquisition shall be invalid with retroactive effect and RS Distributed Labs shall be entitled to immediately deny the relevant person’s admissibility to the RS Distributed Labs Sale Event, reject delivery of any RADIO and request return of any delivered Tokens, irrespective of any payment that could have been made by that Participant.
      </p>
      <h2>
        Security
      </h2>
      <p>
        You are responsible for implementing reasonable measures for securing the wallet, or other storage mechanism you use to receive and hold Tokens you Acquisition from us, including any requisite private key(s) or other credentials necessary to access such storage mechanism(s). If your private key(s) or other access credentials are lost, you may lose access to your Tokens. We are not responsible for any such losses.
      </p>
      <h2>
        WARNING: DO NOT Acquisition TOKENS IF YOU ARE NOT AN EXPERT IN DEALING WITH CRYPTOGRAPHIC TOKENS AND BLOCKCHAIN-BASED SOFTWARE SYSTEMS
      </h2>
      <p>
        Acquisitions of Tokens should be undertaken only by individuals, entities, or companies that have significant experience with, and understanding of, the usage and intricacies of cryptographic Tokens, like Bitcoin(“BTC”), and blockchain based software systems. Participants should have functional understanding of storage and transmission mechanisms associated with other cryptographic Tokens. While the RS Distributed Labs Team will be available to assist Participants of Tokens during and after the sale, RS Distributed Labs will not be responsible for lost cryptocurrency, such as BTC, ETH, or other resulting from actions taken by, or omitted by Participants. Note, in particular, that our RADIO Participants should take great care to write down their wallet password and not lose it so as to be sure that they will be able to access their RADIO when it becomes available during or after the initial sale. If you do not have such experience or expertise, then you should not Acquisition Tokens or participate in the pre-sale of Tokens.
      </p>
      <p>
        The Company shall also not be liable for any losses sustained for or through any third party impersonating or acting as an impostor of The Company, including anyone who promotes or otherwise claims they can make the RADIO token available to you. RADIO Tokens can only be Acquisitiond by the official methods as outlined on the official website contained in these terms.
      </p>
      <p>
        REPRESENTATIONS AND WARRANTIES
      </p>
      <p>
        (i) To participate in the RS Distributed Labs Sale Event, each Participant shall represent and warrant that:
      </p>
      <p>
        (a) All the information submitted by him/her to RS Distributed Labs is true, complete, valid and non-misleading;
      </p>
      <p>
        (b) He/she is not a citizen, tax resident or green card holder of the United States of America, China, or any other country that is featured on the 'Banned List' contained on our website.
      </p>
      <p>
        (c) He/she is of sufficient age to participate in the RS Distributed Labs Sale Event and is a natural person with full civil capacity of conduct under the laws of the jurisdiction where he/she is domiciled or maintains citizenship;
      </p>
      <p>
        (d) He/she is a seasoned participant, backer, expert, technician and/or professional in the fields of blockchain, distributed ledger technology and crypto- Tokens, cryptocurrency and financial market and is fully aware of the risks associated with the development and use of the Token and any third party DEX ;
      </p>
      <p>
        (e) His/her participation in the RS Distributed Labs Sale Event is voluntary and based on his/her own independent judgment without being coerced, solicited or misled by anyone else;
      </p>
      <p>
        (f) He/she is permitted by the laws of each jurisdiction to participate in the RS Distributed Labs Sale Event and is legally permitted to acquire, receive and hold crypto-Tokens;
      </p>
      <p>
        (g) No consent, approval, order or authorization of, or registration, qualification, designation, declaration or filing with, any governmental authority is required on his/her part in connection with the participation in the RS Distributed Labs Sale Event;
      </p>
      <p>
        (h) He/she is experienced in and capable of maintaining and safekeeping the Bitcoin or Ethereum private key(s) of the sending address out of which he/she makes any payment for purchasing the Coin;
      </p>
      <p>
        (i) He/she only uses such crypto-Tokens as lawfully acquired through mining and/or trading to make payment in the RS Distributed Labs Sale Event and does not participate in the RS Distributed Labs Sale Event for any money-laundering, terrorism financing or other illicit purpose;
      </p>
      <p>
        (j) He/she aims to acquire Tokens from RS Distributed Labs primarily for using the designed functions of the RS Distributed Labs Ecosystem without expectation of any profit or financial yield and does not contemplate to use RADIO Tokens for any financial, speculative, illegal or unethical purpose;
      </p>
      <p>
        (k) (Except having specifically communicated to and been permitted by RS Distributed Labs in advance) he/she is participating in the RADIO Sale Event for his/her own benefit and is not acting as a nominee or agent for or on behalf of any third party, and;
      </p>
      <p>
        (j) That all Tokens are received under the principal of caveat emptor.
      </p>
      <p>
        All the above representations and warranties made by a Participant shall be true, complete, accurate and non-misleading on and from the date of that Participant making a payment hereunder throughout the RADIO Sale Event and onwards. RS Distributed Labs reserves the right to reject and invalidate the payment by, and withhold the relevant RADIO Tokens from, any Participant who has made a false representation in the sole judgment of RS Distributed Labs .
      </p>
      <p>
        We do not operate or maintain all aspects of the Network, and as such, we have no responsibility or liability for the Network or any ability to control third parties’ use of the Network.
      </p>
      <p>
        Ownership of Tokens carries no rights, express or implied, other than the right to use Tokens as a means to enable usage of and interaction with the Network, if successfully completed and deployed. In particular, you understand and accept that Tokens do not represent or confer any ownership right or stake, share or security or equivalent rights, or any right to receive future revenue shares, intellectual property rights or any other form of participation in or relating to the Network and/or The Company and its affiliates, other than rights relating to the provision and receipt of Services in the Network, subject to limitations and conditions in these Terms and applicable Network Terms and Policies (as defined below). You understand and accept that the Tokens are not intended to be a digital currency, security, commodity or any other kind of financial instrument.
      </p>
      <h2>
        Scope of Terms
      </h2>
      <p>
        These terms govern your acquisition of and use of the Token.
      </p>
      <p>
        Any use of Tokens in connection with providing or receiving Services in the Network will be governed by supplemental/additionally by other applicable terms and policies, which will be available on our and third party website(s), these Terms and Conditions - Disclaimers our online and mobile Terms of Use and our Privacy Policy (collectively, the “Terms and Policies”). As mentioned above, we may add new terms or policies to the Network Terms and Policies in our sole discretion, and may update each of the Network Terms and Policies from time to time according to modification procedures RS Distributed Labs may choose to implement.
      </p>
      <p>
        To the extent of any conflict with these Terms, the Network Terms and Policies shall control with respect to any issues relating to the use of Tokens in connection with providing or receiving Services in the Network.
      </p>
      <h2>
        Cancellation; Refusal of Acquisition Requests
      </h2>
      <p>
        Your Acquisition of Tokens from us during the Sale Period is final, and there are no refunds or cancellations except as may be required by applicable law or regulation. We reserve the right to refuse or cancel RADIO Acquisition requests at any time in our sole discretion.
      </p>
      <h2>
        Terms of RADIO Sale: Procedures and Specifications
      </h2>
      <p>
        Important information about the procedures and material specifications of our RADIO sale is provided in Exhibit B, including, but not limited to, details regarding the timing and pricing of the RADIO sale, the amount of Tokens we will sell, and our anticipated use of the RADIO sale proceeds. By purchasing Tokens, you acknowledge that you understand and have no objection to these procedures and material specifications.
      </p>
      <p>
        Acknowledgment and Assumption of Risks
      </p>
      <p>
        You acknowledge and agree that there are risks associated with purchasing Tokens, holding Tokens, and using Tokens for providing or receiving Services in the Network, as disclosed and explained in Exhibit C. If you have any questions regarding these risks, please contact us via our website. BY PURCHASING TOKENS, YOU EXPRESSLY ACKNOWLEDGE AND ASSUME THESE RISKS.
      </p>
      <h2>
        Personal Information
      </h2>
      <p>
        We may determine, in our sole discretion, that it is necessary to obtain certain information about you in order to comply with applicable law or regulation in connection with selling Tokens to you. You agree to provide us such information promptly upon request, and you acknowledge that we may refuse to sell Tokens to you until you provide such requested information and we have determined that it is permissible to sell you Tokens under applicable law or regulation.
      </p>
      <h2>
        Taxes
      </h2>
      <p>
        The Acquisition price that you pay for Tokens is exclusive of all applicable taxes. You are responsible for determining what, if any, taxes apply to your Acquisition of Tokens, including, for example, sales, use, value added, and similar taxes. It is also your responsibility to withhold, collect, report and remit the correct taxes to the appropriate tax authorities. We are not responsible for withholding, collecting, reporting, or remitting any sales, use, value added, or similar tax arising from your Acquisition of Tokens.
      </p>
      <h2>
        Representations and Warranties
      </h2>
      <p>
        By purchasing Tokens, you represent and warrant that:
      </p>
      <p>
        You have read and understand these Terms (including all Exhibits);
      </p>
      <p>
        You have sufficient understanding of the functionality, usage, storage, transmission mechanisms and other material characteristics of cryptographic Tokens, Tokenstorage mechanisms (such as Tokenwallets), blockchain technology and blockchain-based software systems to understand these Terms and to appreciate the risks and implications of purchasing the Tokens;
      </p>
      <p>
        You have obtained sufficient information about the Tokens to make an informed decision to Acquisition the Tokens;
      </p>
      <p>
        You understand that the Tokens confer only the right to provide and receive Services in the Network and confer no other rights of any form with respect to the Network or The Company or its corporate affiliates, including, but not limited to, any voting, distribution, redemption, liquidation, proprietary (including all forms of intellectual property), or other financial or legal rights;
      </p>
      <p>
        You are purchasing Tokens to provide or receive Services in the Network and to support the development, testing, deployment and operation of the Network. You are not purchasing Tokens for any other uses or purposes, including, but not limited to, any investment, speculative or other financial purposes;
      </p>
      <p>
        Your Acquisition of Tokens complies with applicable law and regulation in your jurisdiction, including, but not limited to,<br />
        (i) legal capacity and any other threshold requirements in your jurisdiction for purchasing the Tokens, using the Tokens in the Network, and entering into contracts with us,<br />
        (ii) any foreign exchange or regulatory restrictions applicable to such Acquisition, and<br />
        (iii) any governmental or other consents that may need to be obtained;
      </p>
      <p>
        You will comply with any applicable tax obligations in your jurisdiction arising from your Acquisition of Tokens;
      </p>
      <p>
        If you are purchasing Tokens on behalf of any entity, you are authorized to accept these Terms on such entity’s behalf and that such entity will be responsible for breach of these Terms by you or any other employee or agent of such entity (references to “you” in these Terms refer to you and such entity, jointly);
      </p>
      <p>
        You are not a resident or domiciliary of The United States of America, China, or purchasing Tokens from a location which is banned, and - You are not:<br />
        (i) a citizen or resident of a geographic area in which access to or use of the Services is prohibited by applicable law, decree, regulation, treaty, or administrative act,<br />
        (ii) a citizen or resident of, or located in, a geographic area that is subject to U.S. or other sovereign country sanctions or embargoes, or (iii) an individual, or an individual employed by or associated with an entity, identified on the U.S. Department of Commerce’s Denied Persons or Entity List, the U.S. Department of Treasury’s Specially Designated Nationals or Blocked Persons Lists, or the U.S. Department of State’s Debarred Parties List. You agree that if your country of residence or other circumstances change such that the above representations are no longer accurate, that you will immediately cease using the Services. If you are registering to use the Services on behalf of a legal entity, you further represent and warrant that (i) such legal entity is duly organized and validly existing under the applicable laws of the jurisdiction of its organization, and (ii) you are duly authorized by such legal entity to act on its behalf.
      </p>
      <p>
        You understand and acknowledge that title to, and risk of loss of, Tokens you receive from the Smart Contract System (as defined and explained in Exhibit A).
      </p>
      <p>
        You are not purchasing Tokens with the belief that they are a security. Nor that you are purchasing tokens with the belief that any regulator, or enforcement agency will have the power or ability to protect your Acquisition without the express regulation in place relating to Utility Tokens.
      </p>
      <h2>
        Indemnification
      </h2>
      <p>
        To the fullest extent permitted by applicable law, you will indemnify, defend and hold harmless The Company and our respective past, present and future employees, officers, directors, contractors, consultants, equity holders, suppliers, vendors, service providers, parent companies, subsidiaries, affiliates, agents, representatives, predecessors, successors and assigns (the “The Company Parties”) from and against all claims, demands, actions, damages, losses, costs and expenses (including attorneys’ fees) that arise from or relate to:<br />
        (i) your Acquisition or use of Tokens,(ii) your responsibilities or obligations under these Terms,<br />
        (iii) your violation of these Terms, or (iv) your violation of any rights of any other person or entity.
      </p>
      <p>
        The Company reserves the right to exercise sole control over the defense, at your expense, of any claim subject to indemnification under the applicable sections of the agreement herein. This indemnity is in addition to, and not in lieu of, any other indemnities set forth in a written agreement between you and The Company .
      </p>
      <h2>
        Disclaimers
      </h2>
      <p>
        TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW AND EXCEPT AS OTHERWISE SPECIFIED IN A WRITING BY US, (A) THE TOKENS ARE SOLD ON AN “AS IS” AND “AS AVAILABLE” BASIS WITHOUT WARRANTIES OF ANY KIND, AND WE EXPRESSLY DISCLAIM ALL IMPLIED WARRANTIES AS TO THE TOKENS, INCLUDING, WITHOUT LIMITATION, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON- INFRINGEMENT; (B) WE DO NOT REPRESENT OR WARRANT THAT THE TOKENS ARE RELIABLE, CURRENT OR ERROR-FREE, MEET YOUR REQUIREMENTS, OR THAT DEFECTS IN THE TOKENS WILL BE CORRECTED; AND (C) WE CANNOT AND DO NOT REPRESENT OR WARRANT THAT THE TOKENS OR THE DELIVERY MECHANISM FOR TOKENS ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
      </p>
      <p>
        Some jurisdictions do not allow the exclusion of certain warranties or disclaimer of implied terms in contracts with consumers, so some or all of the exclusions of warranties and disclaimers in this section may not apply to you.
      </p>
      <h2>
        Limitation of Liability
      </h2>
      <p>
        TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW: (I) IN NO EVENT WILL THE COMPANY OR ANY OF THE THE COMPANY'S PARTIES BE LIABLE FOR ANY INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES OF ANY KIND (INCLUDING, BUT NOT LIMITED TO, WHERE RELATED TO LOSS OF REVENUE, INCOME OR PROFITS, LOSS OF USE OR DATA, OR DAMAGES FOR BUSINESS INTERRUPTION) ARISING OUT OF OR IN ANY WAY RELATED TO THE SALE OR USE OF THE TOKENS OR OTHERWISE RELATED TO THESE TERMS, REGARDLESS OF THE FORM OF ACTION, WHETHER BASED IN CONTRACT, TORT (INCLUDING, BUT NOT LIMITED TO, SIMPLE NEGLIGENCE, WHETHER ACTIVE, PASSIVE OR IMPUTED), OR ANY OTHER LEGAL OR EQUITABLE THEORY (EVEN IF THE PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES AND REGARDLESS OF WHETHER SUCH DAMAGES WERE FORESEEABLE); AND (II) IN NO EVENT WILL THE AGGREGATE LIABILITY OF THE COMPANY AND THE THE COMAPN'S PARTIES (JOINTLY), WHETHER IN CONTRACT, WARRANTY, TORT (INCLUDING NEGLIGENCE, WHETHER ACTIVE, PASSIVE OR IMPUTED), OR OTHER THEORY, ARISING OUT OF OR RELATING TO THESE TERMS OR THE USE OF OR INABILITY TO USE THE TOKENS, EXCEED THE AMOUNT YOU PAY TO US FOR THE TOKENS.
      </p>
      <p>
        THE LIMITATIONS SET FORTH IN APPLICABLE SECTIONS HEREIN WILL NOT LIMIT OR EXCLUDE LIABILITY FOR THE GROSS NEGLIGENCE, FRAUD OR INTENTIONAL, WILLFUL OR RECKLESS MISCONDUCT OF THE COMPANY.
      </p>
      <p>
        Some jurisdictions do not allow the limitation or exclusion of liability for incidental or consequential damages. Accordingly, some of the limitations of this section may not apply to you.
      </p>
      <h2>
        Release
      </h2>
      <p>
        To the fullest extent permitted by applicable law, you release The Company and the other The Company's Parties from responsibility, liability, claims, demands and/or damages (actual and consequential) of every kind and nature, known and unknown (including, but not limited to, claims of negligence), arising out of or related to disputes between users and the acts or omissions of third parties. You expressly waive any rights you may have under principles that would otherwise limit the coverage of this release to include only those claims which you may know or suspect to exist in your favor at the time of agreeing to this release.
      </p>
      <p>
        Total waiver of Liability<br />
        You hereby warrant and agree that the The Company , its directors, members, shareholders or any other party associated with RS Distributed Labs shall not be liable for any losses associated with the use of, creation, development, obtaining, transfer, holding, or your general participation in the Tokeneven or possession of the Tokens.
      </p>
      <p>
        You further warrant and agree that you hereby hold the The Company , its members, directors, or shareholders harmless for any non-development of software features or project development associated with the RS Distributed Labs project. Any forecasts, figures, suggestions, designs, or ideas are subject to change, compliance, regulations, and development fees. In the event that RS Distributed Labs does not create, develop, or deploy any of its ideas or suggestions provided on its website, white paper, or in any press release. The The Company , directors, members, shareholders shall not be liable for any losses or breach of this agreement.
      </p>
      <h2>
        DISPUTE RESOLUTION -- ARBITRATION
      </h2>
      <h2>
        Binding Arbitration.
      </h2>
      <p>
        Except for any disputes, claims, suits, actions, causes of action, demands or proceedings (collectively, “Disputes”) in which either Party seeks injunctive or other equitable relief for the alleged unlawful use of intellectual property, including, without limitation, copyrights, trademarks, trade names, logos, trade secrets or patents, you and The Company (i) waive your and The Company ’s respective rights to have any and all Disputes arising from or related to these Terms resolved in a court, and (ii) waive your and The Company ’s respective rights to a jury trial. Instead, you and The Company will arbitrate Disputes through binding arbitration (which is the referral of a Dispute to one or more persons charged with reviewing the Dispute and making a final and binding determination to resolve it instead of having the Dispute decided by a judge or jury in court).
      </p>
      <p>
        No Class Arbitrations, Class Actions or Representative Actions.
      </p>
      <p>
        Any Dispute arising out of or related to these Terms is personal to you and The Company and will be resolved solely through individual arbitration and will not be brought as a class arbitration, class action or any other type of representative proceeding. There will be no class arbitration or arbitration in which an individual attempts to resolve a Dispute as a representative of another individual or group of individuals. Further, a Dispute cannot be brought as a class or other type of representative action, whether within or outside of arbitration, or on behalf of any other individual or group of individuals.
      </p>
      <p>
        Process.
      </p>
      <p>
        Arbitration will be conducted confidentially. Any Dispute shall be referred to and finally resolved by arbitration administered by the London Court of International Arbitration (“LCIA”) in accordance with the Arbitration Rules of The Republic of Seychelles, for the time being in force, which rules are deemed to be incorporated by reference in this clause. The seat of the arbitration shall be in London, England, held in English. The Tribunal shall consist of one (1) or three (3) arbitrator(s). The language of the arbitration shall be English. The English judicial system will have exclusive jurisdiction over any appeals and the enforcement of an arbitration award. All costs of Arbitration will be born and maintained by you.
      </p>
      <p>
        Authority of Arbitrator(s)
      </p>
      <p>
        As limited by these Terms and the applicable LCIA rules, the arbitrator(s) will have (i) the exclusive authority and jurisdiction to make all procedural and substantive decisions regarding a Dispute, including the determination of whether a Dispute is arbitrable, and (ii) the authority to grant any remedy that would otherwise be available in court; provided, however, that the arbitrator does not have the authority to conduct a class arbitration or a representative action, which is prohibited by these Terms. The arbitrator(s) may only conduct an individual arbitration and may not consolidate more than one individual’s claims, preside over any type of class or representative proceeding or preside over any proceeding involving more than one individual.
      </p>
      <p>
        Severability of Dispute Resolution and Arbitration Provisions.
      </p>
      <p>
        If any term, clause or provision of this Section is held invalid or unenforceable, it will be so held to the minimum extent required by law, and all other terms, clauses and provisions of this Section will remain valid and enforceable. Further, the waivers set forth in this Section are severable from the other provisions of these Terms and will remain valid and enforceable, except as prohibited by applicable law.
      </p>
      <p>
        Governing Law and Venue
      </p>
      <p>
        These Terms will be governed by and construed and enforced in accordance with the laws of the Republic of Seychelles (Specifically The Republic of Seychelles) without regard to conflict of law rules or principles that would cause the application of the laws of any other jurisdiction. Any Dispute between the Parties arising out or relating to these Terms or its subject matter or formation (including non-contractual Disputes of claims) that is not subject to arbitration will be resolved in the courts of The Republic of Seychelles applying the laws of The Republic of Seychelles.
      </p>
      <p>
        Severability
      </p>
      <p>
        If any term, clause or provision of these Terms is held unlawful, void or unenforceable, then that term, clause or provision will be severable from these Terms and will not affect the validity or enforceability of any remaining part of that term, clause or provision, or any other term, clause or provision of these Terms.
      </p>
      <p>
        Miscellaneous
      </p>
      <p>
        These Terms constitute the entire agreement between you and us relating to your Acquisition of Tokens from us. We may make changes to these Terms from time to time as reasonably required to comply with applicable law or regulation. If we make changes, we will post the amended Terms at our website and update the “Last Updated” date above. The amended Terms will be effective immediately. We may assign our rights and obligations under these Terms. Our failure to exercise or enforce any right or provision of these Terms will not operate as a waiver of such right or provision. We will not be liable for any delay or failure to perform any obligation under these Terms where the delay or failure results from any cause beyond our reasonable control.
      </p>
      <p>
        Purchasing Tokens from us does not create any form of partnership, joint venture or any other similar relationship between you and us. Except as otherwise provided herein, these Terms are intended solely for the benefit of you and us and are not intended to confer third-party beneficiary rights upon any other person or entity. You agree and acknowledge that all agreements, notices, disclosures, and other communications that we provide to you, including these Terms, will be provided in electronic form.
      </p>
      <p>
        Waiver<br />
        The parties hereto agree to a uniform waiver of any and all claims in equity, contract, or criminal, against one another weather known, unknown, or anticipated.
      </p>
      <p>
        Assignment<br />
        The user may not assign this agreement under any circumstances. RADIO may assign it to a third party or other corporation by providing written notice to the other party.
      </p>
      <h2>
        *****
      </h2>
      <h1>
        Exhibit A
      </h1>
      <h2>
        TERMS OF SERVICE FOR SITE, WALLET AND USE OF NETWORK SERVICES
      </h2>
      <p>
        These additional Terms of Service and Use (Hereinafter " Exhibit A Terms" or "Terms of Service") are made between you (Hereinafter the “User” or “you”) and RS Distributed Labs (“ RS Distributed Labs”, “we”, “us” or “The The Company ”) (Hereinafter collectively called “The Parties”). By engaging with or using the www.radioRADIO.io (the “Site”), purchasing Tokens, or utilizing any of the services, you are deemed to have accepted these Terms of Service. If you do not agree with these Terms of Service or any of the clauses contained within, you should no longer continue using the RS Distributed Labs website.
      </p>
      <h2>
        Preamble
      </h2>
      <p>
        The The Company may provide an online feature known as the Wallet ( Hereinafter the “Wallet”) which allows Users to transfer the ownership of digital assets, or other cryptographically secured Tokens ( Hereinafter “Tokens”) over blockchain or distributed ledger technology (“DLT”) - For the avoidance of doubt these are sometimes colloquially referred to as “cryptocurrencies.” The User wishes to use the Wallet, change ownership of Tokens, or use any of the other services provided by RADIO (Hereinafter “the Services”). In doing so the User agrees to be bound to these Terms of Service. This agreement is made in good faith between the parties.
      </p>
      <p>
        In order for the User to access or use any of the services provided by RS Distributed Labs, it is required that You first accept and comply with these Terms. For the avoidance of doubt these Terms of Service apply to all visitors, users and any other party who accesses or uses either any of our Services or the Website. They govern the relationship between you and RS Distributed Labs and you should take time to read them carefully.
      </p>
      <p>
        All references to the term RS Distributed Labs or The Company also include its directors, members, shareholders, officers, agents, employees, or contractors working on their behalf.
      </p>
      <p>
        By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.
      </p>
      <h2>
        Electronic Acceptance
      </h2>
      <p>
        Pursuant to EU and International Electronic Signature Laws, you are deemed to accept these terms with your continued use of our website and any of our Services.
      </p>
      <p>
        We will provide notice of any amendment to these Terms by posting any revised terms to the site and updating the “Last updated” field above accordingly or by any other method we deem appropriate. We are not obligated to provide notice in any other method beyond these. Any change to these Terms will be effective immediately upon such notice and apply to any ongoing or subsequent use of the Site, Services, or Wallet.
      </p>
      <h2>
        Relationship
      </h2>
      <p>
        At no time are these Terms of Service designed to create a Partnership. The User and RADIO are entering into this agreement and at no time does it constitute the creation of a partnership, agency, or other business relationship in which the Parties can legally bind each other.
      </p>
      <h2>
        Qualifications of User in order to use the site
      </h2>
      <p>
        The User represents and warrants they are at least eighteen (18) years of age, are legally entitled to use the internet and services like those provided by RS Distributed Labs and Third Parties such as those creating the DEX (according to the laws of The Republic of Seychelles) and have not had your right to use our service previously suspended or revoked by us.
      </p>
      <h2>
        Illegal and Prohibited Use
      </h2>
      <p>
        The User represents and warrants that they will not use the Site, Coin, Network or Wallet for any criminal, illegal, or otherwise prohibited use, including (but not limited to) activities related to money laundering, drugs trafficking, human trafficking, weapon trafficking, terrorism, securities fraud, or tax evasion.
      </p>
      <p>
        The User further represents and warrants that they will not use the RS Distributed Labs Services or Wallet to assist any other party in activities which are not compatible with their domestic or international civil or criminal laws.
      </p>
      <p>
        From time to time as required by various Money Laundering regulations and regulatory bodies the User may be required to provide identification documents associated with them in order to prove identification or ownership of banking facilities. In the event that RS Distributed Labs is required to examine personal information relating to a User, RS Distributed Labs reserves the right to suspend or pause the User account until such time as they have reasonably identified themselves or ownership of banking facility.
      </p>
      <p>
        During such suspension time the User will not be able to access any Tokens or Funds already deposited in their account or Wallet.
      </p>
      <p>
        Identification documents that are accepted include government issued ID and Certified Banking Documentation provided by your banking or financial institution.
      </p>
      <p>
        At all times the User agrees to indemnify and hold harmless RS Distributed Labs (including any affiliated Company) for any claims or causes of action arising from or out of any investigation or enquiries made from any government or extra- governmental body responsible for financial regulatory conduct that holds jurisdiction over the User.
      </p>
      <p>
        The User represents and warrants that they will in no way use the Wallet or Services to: distribute spam, junk communications or chain letters; reverse engineer or otherwise improperly access any of the Site’s or the Wallet’s underlying code or technical mechanisms; cause damage to the Site or RS Distributed Labs through any means, including, but not limited to, through the use of hacking, malware, viruses, illegitimate credentials, phishing, brute force attacks, SQL exploits, or any other method of detrimentally intercepting, interrupting, or damaging any information or functionality related to the Site. You also agree not to transfer access to your Account (as defined below) or any other rights granted to you by these Terms.
      </p>
      <h2>
        Registration and Account
      </h2>
      <p>
        In order to use our Services you are first required to create an account with RS Distributed Labs or a third party at the appointment of RS Distributed Labs (“Account”).
      </p>
      <p>
        During the registration process you may be asked questions about yourself. This information is used in order to determine if you are eligible for an Account. You warrant and agree that all information provided when creating an Account is current, complete, and accurate.
      </p>
      <p>
        The User will promptly notify RS Distributed Labs of any changes to any information that would cause the information provided upon your Account’s creation to no longer be current, complete or accurate.
      </p>
      <p>
        The User also expressly agrees that no Account will be created until such time as they have successfully confirmed their identity and satisfied RS Distributed Labs that they are who they claim to be during registration. This includes all personal and contact information such as email address and contact number.
      </p>
      <p>
        You agree that you exclusively will access and use your Account, and may not transfer the right of its use or disclose any log-in credentials to a third party without our written consent. You agree to take full responsibility for any activity that occurs through the use of your account, and cannot transfer this obligation to any third party. You agree to notify RS Distributed Labs in the event that you discover or suspect any security breaches or vulnerabilities related to the Site, Services or Wallet.
      </p>
      <p>
        Each User is responsible for their own account, They are not to share passwords or identifying information with any other party.
      </p>
      <p>
        No accounts are to be created by Agents acting on behalf of another party. Each User is only to have one account.
      </p>
      <h2>
        NOTICE: USERS IN THE UNITED STATES OF AMERICA, CHINA, OR ANY BANNED COUNTRY WHICH IS PROHIBITED FROM USING, HOLDING, OR ENGAGING WITH CRYPTOGRAPGIC ASSETS.
      </h2>
      <h2>
        Jurisdictions
      </h2>
      <p>
        Users should check the laws of the jurisdiction in which the reside. If they have any doubt around the tokens being a Security or falling within Securities Laws they should not, under any circumstances, Acquisition or hold them. Users who Acquisition tokens in breach of their local securities laws will not be issued any kind of refund and will not be entitled to keep their tokens.
      </p>
      <p>
        Tokens are classed as a 'utility' under The Republic of Seychelles, European Union, State of Wyoming (USD) and United Kingdom laws. As such, they have not been registered with any member state for the purposes of any securities laws and the Company maintains that they are not and shall not become securities. They have also not been registered with any other international or domestic body for the purposes of securities laws. Users within certain EU member states (such as Germany, France, Italy and Spain) may have certain measures attached to their Acquisition of these tokens. Users from these member states should be aware of the laws and not Acquisition them in breach of these laws.
      </p>
      <h2>
        Limitation of Liability
      </h2>
      <p>
        The User hereby warrants and agrees that RS Distributed Labs is not responsible whatsoever for any damages caused by the interception, loss or alteration to any information sent over the internet.
      </p>
      <p>
        While The The Company will take reasonable steps to ensure the security and privacy of any information transmitted during your use of our Services, in no event will any such information be considered “confidential” or will its disclosure to a third party, accidental or otherwise, cause liability against The The Company , even if it occurs as a result of our negligence.
      </p>
      <p>
        The use of The The Company s Services is undertaken “at risk” meaning that RS Distributed Labs will hold no responsibility toward the User, or any third party, for any actual or anticipated loss resulting from the use of Services. The The Company takes every reasonable precaution to prevent and mitigate attacks. However, these problems still may occur from time to time for reasons that are out of our control.
      </p>
      <p>
        If The The Company believes a RADIO active in the Wallet has been compromised or is under attack, RS Distributed Labs reserves the right to immediately stop all Services related to such Token. If it is determined that such an attack caused an associated RADIO to rapidly lose value or otherwise cause or threaten to cause damage to the Wallet, the Site, or other users, RS Distributed Labs may immediately discontinue all activity regarding such The The Company entirely at its discretion.
      </p>
      <p>
        Resolution concerning deposits, withdrawals, account balances, services or other disputes related to an attacked The The Company will be determined on a case- by-case basis.
      </p>
      <p>
        The The Company makes no representation and does not warrant the safety of the Wallet and is not liable for any lost value or stolen property, regardless of whether RADIO was negligent in providing appropriate security.
      </p>
      <p>
        The The Company its members, freelancers, or anyone working on their behalf hold no liability to the client for any actual or anticipatory damages from breach of this contract.
      </p>
      <p>
        Users shall hold The The Company harmless for any breach of securities laws in their place of residence.
      </p>
      <h2>
        Mutual Release
      </h2>
      <p>
        By this Agreement each party hereto releases the other party hereto from all claims, demands, damages, rights, liabilities, and causes of action of any nature whatsoever, whether at law or equity, known or unknown, suspected or unsuspected, which are related or in any manner incidental to the Lease and which first arise out of transactions and occurrences from and after the Termination Date. Each party waives and relinquishes any right or benefit which it has or may have under applicable law regarding waiver of unknown claims to the full extent that it may lawfully waive such rights and benefits. In connection with such waiver and relinquishment, each party acknowledges that it is aware that it or its lawyers or accountants may hereafter discover facts in addition to or different from those which it now knows or believes to exist with respect to the subject matter of this Agreement or the other party hereto but that is such parties intention hereby fully, finally, and forever to settle and release all of the claims, disputes, and differences, known or unknown, suspected or unsuspected, which now exist or may exist hereafter between each party.
      </p>
      <p>
        Nothing contained in this section will remove the right of RS Distributed Labs to recover unpaid sums due for their performance under this contract and any costs associated with the recovery of that sums owed to them by the User.
      </p>
      <h2>
        RS Distributed Labs Does Not Provide Legal, Financial or Investing Advice
      </h2>
      <h2>
        At no time does RS Distributed Labs provide any legal, financial, investing advice and any publicised, provided, or referred to information or publications should not be considered as such.
      </h2>
      <h2>
        RS Distributed Labs's documents, site or services are not any other kind of specialized or expert advice on which the User might detrimentally depend, causing liability against RS Distributed Labs . In using the Wallet, you represent and warrant that you have sought any legal, financial, investment or otherwise specialized advice from an expert qualified to provide such counsel, or else you have the sufficient knowledge and sophistication to evaluate the risks and merits associated with Blockchain and/or RS Distributed Labs management and offerings and to competently use our Services. We give no warranty regarding the suitability of any Tokens or other assets acquired using our Wallet and assume no fiduciary duties to you.
      </h2>
      <h2>
        The User represents and warrants the understanding that any recommendations or commentary made by RS Distributed Labs or its employees or other users should be considered generalised in nature, and you should use your own judgement or seek the advice of an expert before taking any action regardless of such statement. We give no assurance as to the accuracy or completeness of any such statement.
      </h2>
      <h2>
        At all times the User agrees to undertake their own due diligence regarding the use of online digital Wallets and Tokens before engaging in any of the Services provided by RADIO .
      </h2>
      <h2>
        Acquisition of Tokens
      </h2>
      <p>
        The User can transfer BTC, ETH, and other permitted cryptocurrencies through our third party to acquire RADIO tokens. Only after they have completed KYC.
      </p>
      <p>
        Funds will appear in your Account depending on the processing time of the transaction, the User understands that this is out of RS Distributed Labs’ control.
      </p>
      <p>
        You agree to all of the terms of the third party which is facilitating the sale of RADIO through their platform.
      </p>
      <p>
        Tokens can only be Acquisitiond during the official RADIO sale period by accepting the respective Terms of RADIO Sale. No withdrawals are allowed during the RADIO Sale event, including pre-sale period. For any inquiries please contact support team at via our website.
      </p>
      <h2>
        Distribution of Tokens
      </h2>
      <p>
        Tokens Acquisitiond by the User will be issued according to the respective Terms of RADIO Sale ( and further detailed in Exhibit B). Once issued by the seller of the Tokens, RS Distributed Labs will distribute them to your Account.
      </p>
      <p>
        Tokens will be available in your Account until you transfer them outside of the Wallet. You shall be responsible for implementing reasonable measures for securing the wallet, or other storage mechanism you decide to use to receive and hold Tokens outside of your Account, including any requisite private key(s) or other credentials necessary to access such storage mechanism(s).
      </p>
      <p>
        If your private key(s) or other access credentials are lost, you may lose access to the Acquisitiond Tokens. RS Distributed Labs shall not be responsible for any such losses.
      </p>
      <h2>
        INVESTMENT NOTICE
      </h2>
      <h2>
        AT NO TIME IS THE Acquisition OF TOKENS AN INVESTMENT. THE Acquisition OF Tokens IS A TRANSACTION AND DOES NOT AMOUNT TO OWNERSHIP, LENDING, OR CASH STYLE INVESTMENTS. RADIO IS NOT REGULATED BY ANY FINANCIAL BODY AND DOES NOT PROVIDE INVESTMENT OPPORTUNITIES, ADVICE, OR OPTIONS.
      </h2>
      <h2>
        RADIO IS NOT PROVIDING AN INVESTMENT OPPORTUNITY.
      </h2>
      <h2>
        License
      </h2>
      <p>
        We grant you a limited, nonexclusive, nontransferable license (“License”) to access our network and use our Wallet, box, Site and Services.
      </p>
      <p>
        This License is subject to these Terms. Any other use of the Services not expressly permitted by these Terms is prohibited. All other rights in the Wallet are reserved by RADIO and our licensors, including that to any content or functionality as presented on the Site or the Wallet. “RADIO ,” and all logos related to Services or displayed on the Site are registered marks of RADIO or its affiliates.
      </p>
      <p>
        You will not redistribute, claim ownership, license, deconstruct, reverse engineer, alter, incorporate into any other works or websites, or otherwise exploit any such content or functionality without prior express written consent of RADIO .
      </p>
      <h2>
        Termination
      </h2>
      <p>
        We may terminate or suspend your License to use our Services without prior notice or liability for any reason whatsoever, including (but not limited to) breaching of these Terms. Nothing in these terms or in any other communication or action by RADIO or our employees, agents or representatives should be taken as a waiver of any legal remedies available for any event causing termination.
      </p>
      <p>
        All provisions of the Terms which by their nature should survive termination shall survive termination, including (but not limited to) ownership provisions, disclaimers or limitations of obligations or liability, and indemnity.
      </p>
      <h2>
        Assignment
      </h2>
      <p>
        RADIO reserves the right to assign this agreement or any part hereto to a third party without the written consent of the User.
      </p>
      <p>
        Any assignment will be notified to the User by email prior to the assignment of these Terms of Service.
      </p>
      <h2>
        Links to other Web Sites
      </h2>
      <p>
        RADIO or other users may provide links to third-party web sites or services that are not owned or controlled by RADIO . RADIO has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services.
      </p>
      <p>
        You further acknowledge and agree that RADIO shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or detrimental reliance on any information, content, goods or services available on or through any such web sites or services. RADIO is not liable for any loss or damage incurred as a result of interacting with any third party content on our Site.
      </p>
      <p>
        The owners of this website and the The Company cannot guarantee or verify the contents of any externally linked website despite their best efforts. Users should therefore note they click on external links at their own risk and this website and its owners cannot be held liable for any damages or implications caused by visiting any external links mentioned.
      </p>
      <p>
        This website may contain sponsored links and adverts. These will typically be served through our advertising partners, to whom may have detailed privacy policies relating directly to the adverts they serve.
      </p>
      <p>
        Clicking on any such adverts will send you to the advertisers website through a referral program which may use cookies and will track the number of referrals sent from this website. This may include the use of cookies which may in turn be saved on your computer's hard drive. Users should therefore note they click on sponsored external links at their own risk and this website and its owners cannot be held liable for any damages or implications caused by visiting any external links mentioned.
      </p>
      <p>
        The owners of this website and the The Company cannot guarantee or verify the contents of any externally linked website despite their best efforts. Users should therefore note they click on external links at their own risk and this website and its owners cannot be held liable for any damages or implications caused by visiting any external links mentioned.
      </p>
      <h2>
        Use of Cookies
      </h2>
      <p>
        This website uses cookies to better the users experience while visiting the website. Where applicable this website uses a cookie control system allowing the user on their first visit to the website to allow or disallow the use of cookies on their computer / device. This complies with recent legislation requirements for websites to obtain explicit consent from users before leaving behind or reading files such as cookies on a user's computer / device.
      </p>
      <p>
        Cookies are small files saved to the user's computer's hard drive that track, save and store information about the user's interactions and usage of the website. This allows the website, through its server to provide the users with a tailored experience within this website.
      </p>
      <p>
        Users are advised that if they wish to deny the use and saving of cookies from this website onto their computers hard drive they should take necessary steps within their web browsers security settings to block all cookies from this website and its external serving vendors.
      </p>
      <p>
        This website uses tracking software to monitor its visitors to better understand how they use it. The software will save a cookie to your computer's hard drive in order to track and monitor your engagement and usage of the website, but will not store, save or collect personal information. You can read our privacy policy on our website for further information.
      </p>
      <p>
        Other cookies may be stored to your computer's hard drive by external vendors when this website uses referral programs, sponsored links or adverts. Such cookies are used for conversion and referral tracking and typically expire after 30 days, though some may take longer. No personal information is stored, saved or collected.
      </p>
      <h2>
        Contact and Communication
      </h2>
      <p>
        Users contacting this website and/ or The The Company do so at their own discretion and provide any such personal details requested at their own risk.
      </p>
      <p>
        Your personal information is kept private and stored securely until a time it is no longer required or has no use, as detailed in the Data Protection Act. Every effort has been made to ensure a safe and secure form to email submission process but advise users using such form to email processes that they do so at their own risk.
      </p>
      <p>
        This website and its owners use any information submitted to provide you with further information about the products / services they offer or to assist you in answering any questions or queries you may have submitted.
      </p>
      <p>
        This includes using your details to subscribe you to any email newsletter program the website operates but only if this was made clear to you and your express permission was granted when submitting any form to email process. Or whereby you the consumer have previously Acquisitiond from or enquired about purchasing from the The Company a product or service that the email newsletter relates to. This is by no means an entire list of your user rights in regard to receiving email marketing material. Your details are not passed on to any third parties.
      </p>
      <p>
        In sending the The Company or the website your personal information you are consenting to allow the The Company to contact you subject to the above conditions. Any data held by the The Company relating to individuals will be stored and destroyed once a period of 12 months of no communication has occurred between The User and The The Company .
      </p>
      <p>
        The The Company will never knowingly or willingly pass information it holds on Users (For clarity this includes: clients, prospects, or website users) onto a third party without the consent of the said user.
      </p>
      <h2>
        Email Communications
      </h2>
      <p>
        From time to time The The Company operates an email newsletter program, used to inform subscribers about products and services supplied by this website. Users can subscribe through an online automated process should they wish to do so but do so at their own discretion. Some subscriptions may be manually processed through prior written agreement with the user.
      </p>
      <p>
        All personal details relating to subscriptions are held securely and in accordance with the Data Protection Act 1998. No personal details are passed on to third parties nor shared with companies / people outside of the The Company that operates this website.
      </p>
      <p>
        Under the Data Protection Act you may request a copy of personal information held about you by this website's email newsletter program. A small fee will be payable. If you would like a copy of the information held on you please write to us using the contact details contained on the website.
      </p>
      <p>
        Email marketing campaigns published by this website or its owners may contain tracking facilities within the actual email. Subscriber activity is tracked and stored in a database for future analysis and evaluation. Such tracked activity may include; the opening of emails, forwarding of emails, the clicking of links within the email content, times, dates and frequency of activity [this is by no far a comprehensive list].
      </p>
      <p>
        This information is used to refine future email campaigns and supply the user with more relevant content based around their activity.
      </p>
      <p>
        In compliance with international spam Laws and the Privacy and the European Electronic Communications Regulations 2003 subscribers are given the opportunity to un-subscribe at any time through an automated system. This process is detailed at the footer of each email campaign. If an automated un- subscription system is unavailable clear instructions on how to un-subscribe will by detailed instead.
      </p>
      <h2>
        Copyright of Communications In Connection With Our Services
      </h2>
      <p>
        You agree that any materials, information or communications transmitted between the User and RADIO in any form, or between the User and any other RADIO user via our Wallet, are non-confidential and will become the sole, exclusive property of RADIO .
      </p>
      <p>
        RADIO will own all intellectual property rights to such communications or materials, and can use or disseminate them in a completely unrestricted fashion for any legal purpose, commercial or otherwise, without notifying or compensating you. You hereby waive any right to litigation or recovery for perceived damages caused by the use of this information as is permissible by law.
      </p>
      <p>
        At all times the term RadioRADIO is and shall always be the respective ownership of the owner of the Trademark.
      </p>
      <h2>
        Social Media Platforms
      </h2>
      <p>
        Communication, engagement and actions taken through external social media platforms that this website, the The Company, and its owners participate on are custom to the terms and conditions as well as the privacy policies held with each social media platform respectively.
      </p>
      <p>
        Users are advised to use social media platforms wisely and communicate / engage upon them with due care and caution in regard to their own privacy and personal details. This website nor its owners will ever ask for personal or sensitive information through social media platforms and encourage users wishing to discuss sensitive details to contact them through primary communication channels such as by telephone or email.
      </p>
      <p>
        This website may use social sharing buttons which help share web content directly from web pages to the social media platform in question. Users are advised before using such social sharing buttons that they do so at their own discretion and note that the social media platform may track and save your request to share a web page respectively through your social media platform account.
      </p>
      <p>
        The The Company holds responsibility for any and all comments, posts or any other action taken on social media belonging to the The Company . Social media can easily be identified as belonging to the The Company by the name of the account on the relevant social media platform. Any and all comments and actions made on social media are not intended to cause offense or serve as a defamatory action. Each and every posting will be checked for accuracy.
      </p>
      <p>
        If you believe your intellectual property rights, personal rights, or any other rights have been infringed by any action on social media you are to notify the The Company as soon as possible so that the The Company has an opportunity to rectify and/or remove the post.
      </p>
      <h2>
        Reputation
      </h2>
      <p>
        The User shall do nothing to bring RADIO , its members, directors, shareholders, or any part belonging thereto into disrepute or dispute.
      </p>
      <p>
        At all times the User shall be an ambassador of RADIO and act within its best interests. They shall do nothing to harm the The Company , its members, shareholders, or anyone associated with it.
      </p>
      <p>
        The User shall report and notify RADIO of any unwanted, unreasonable, bad, or negative outcomes as to their use of the Website or Services.
      </p>
      <h2>
        Indemnification
      </h2>
      <p>
        You agree to indemnify, exculpate and hold RADIO , its representatives, affiliates, employees and service providers harmless from any claim or demand permissible by law arising out of or related to the use of these Services, including any breach by you of these Terms or violation of any law, rule, or rights of a third party. You agree to pay for any legal fees or other costs that incurred RADIO or any other indemnified parties as a result of your actions.
      </p>
      <h2>
        Disclaimer of Warrants and Guarantees
      </h2>
      <p>
        RADIO does not guarantee any level of performance or the continued, uninterrupted availability of our Services. We do not guarantee the accuracy of any information provided on the Site. We hereby disclaim all warrants and guarantees that not expressly made in these Terms.
      </p>
      <h2>
        Applicable Law and Venue
      </h2>
      <p>
        The validity, interpretation, construction and performance of these Terms, and all acts and transactions pursuant hereto and the rights and obligations of the parties hereto shall be governed, construed and interpreted in accordance with the laws of The Republic of Seychelles, without giving effect to principles of conflicts of law.
      </p>
      <p>
        The laws of The Republic of Seychelles shall apply to this contract and the courts of The Republic of Seychelles shall hold exclusive jurisdiction over any dispute arising from them.
      </p>
      <h2>
        Arbitration
      </h2>
      <p>
        As set forth elsewhere among these Terms and Conditions, the parties agree to binding arbitration.<br />
        Except for any disputes, claims, suits, actions, causes of action, demands or proceedings (collectively, “Disputes”) in which either Party seeks to bring an individual action in small claims tribunals or seeks injunctive or other equitable relief for the alleged unlawful use of intellectual property, including, without limitation, copyrights, trademarks, trade names, logos, trade secrets or patents, you and the The Company
      </p>
      <p>
        (i) waive your and the The Company ’s respective rights to have any and all Disputes arising from or related to these Terms resolved in a court, and
      </p>
      <p>
        (ii) waive your and the The Company ’s respective rights to a jury trial. Instead, you and the The Company will arbitrate Disputes through binding arbitration (which is the referral of a Dispute to one or more persons charged with reviewing the Dispute and making a final and binding determination to resolve it instead of having the Dispute decided by a judge or jury in court).
      </p>
      <h2>
        No Class Arbitration, Class Action or Representative Actions
      </h2>
      <p>
        Any Dispute arising out of or related to this Agreement is personal to you and the The Company and will be resolved solely through individual arbitration and will not be brought as a class arbitration, class action or any other type of representative proceeding. There will be no class arbitration or arbitration in which an individual attempts to resolve a Dispute as a representative of another individual or group of individuals. Further, a Dispute cannot be brought as a class or other type of representative action, whether within or outside of arbitration, or on behalf of any other individual or group of individuals.
      </p>
      <p>
        As agreed throughout these Terms, any Dispute shall be referred to and finally resolved by arbitration administered by the London Court of International Arbitration (“LCIA”) in accordance with the Arbitration Rules of the London Court of International Arbitration ("LCIA Rules") for the time being in force, which rules are deemed to be incorporated by reference in this clause. The seat of the arbitration shall be in London, United Kingdom. The Tribunal shall consist of either one (1) or three (3) arbitrator(s). The language of the arbitration shall be English applying the laws of The Republic of Seychelles. Any court actions not dealt with by arbitration shall be managed in the Republic of Seychelles applying the law of the Republic of Seychelles.
      </p>
      <h2>
        Notices
      </h2>
      <p>
        Any notices relating to these Terms of Service are to be sent to the The Company via email found on our website.
      </p>
      <h2>
        Survival and Severability
      </h2>
      <p>
        Any portion of these Terms that reasonably should survive the termination of your License or any other agreement is hereby agreed to do so. If any provision of these terms is deemed illegal, invalid or otherwise invalid for any reason, then that provision will be severed and the rest of these Terms will remain intact and enforceable.
      </p>
      <h2>
        Integration
      </h2>
      <p>
        Our failure to exercise or enforce any rights or provisions of these Terms does not constitute a waiver of those rights or provisions. These Terms represent the entire and complete agreement between the User and RADIO , including any future modification of these Terms, superseding any prior agreements or communications between you and us. Any ambiguities in these Terms shall be construed in the light most favourable to RADIO .
      </p>
      <h2>
        Act of God
      </h2>
      <p>
        RADIO ' performance under these Terms shall be excused if the failure of such performance is caused by forces beyond its reasonable control. This includes (but is not limited to) acts of God, acts of any government, war or civil unrest, severe weather, fire, natural disasters, political embargoes, terrorism, power or equipment failure, industrial or labor disputes or controversies, acts of any third party, or blockchain failures. Thus RADIO is not liable for failure to perform solely caused by unavoidable force majeure casualty, acts by common carriers, emergency conditions, or any similar unforeseen event that renders performance commercially implausible.
      </p>
      <p>
        If such an event of force majeure occurs, the party injured by the other’s inability to perform may elect to suspend the Agreement, in whole or part, for the duration of the force majeure circumstances. The party experiencing the force majeure circumstances shall cooperate with and assist the injured party in all reasonable ways to minimize the impact of force majeure on the injured party.
      </p>
      <h1>
        Exhibit B
      </h1>
      <h2>
        TERMS OF RADIO SALE RADIO
      </h2>
      <h2>
        Sale Procedures and Specification
      </h2>
      <h2 style={{fontStyle: 'italic'}}>
        RADIO Supply
      </h2>
      <p>
        The Company total RADIO supply can be found on the Company Website, and within the WhitePaper. The amount to be offered will be offered to the public (less excluded persons) in exchange, donation, or sacrifice as set forth below. Undistributed Tokens will be retained in inventory to be utilized as a Development Fund for the benefit of any third party Fund/Foundation as created.
      </p>
      <h2 style={{fontStyle: 'italic'}}>
        RADIO Price
      </h2>
      <p>
        The price per RADIO Token is set in RADIO at the USD price as contained within the WhitePaper and on the Website at the start of RADIO sale . The number of RADIO Tokens which may be acquired is set per respective rate as identified on the RADIO Website which can change based on time and date. The The Company will only accept participation, contributions, donations, or sacrifices made in the Tokens as listed on the Third Party who is selling the Token for and on behalf of RADIO. The Company reserves the right to lower or increase the price per Coin, at its sole discretion, during the Sale Period.
      </p>
      <h2 style={{fontStyle: 'italic'}}>
        Tokens to be Sold
      </h2>
      <p>
        The The Company anticipates distributing the Tokens in line with the amounts listed on the White Paper during the entire Sale Period. The Tokens to be sold to the public during the Sale Period will be from a pool of The Company -owned Tokens transferred from the The Company Custodial Wallet to the Smart Contract System. All Tokens will be of equal value and functionality.
      </p>
      <p>
        It is the objective of the The Company raise funds during the Sale Period during the duration of the RADIO sale event. At any time the Token amount to be sold can be amended or changed without notice. The Company is also using a third party to sell the Tokens and all sales are subject to their terms and satisfaction of your use of their respective services.
      </p>
      <p>
        The term 'Sold' is also interchangeable and dependent upon how we view your participation in the 'Token Sale event'. Meaning, your participation may also be seen as a donation, swap, exchange, contribution, or sacrifice during the 'sale period' The term 'Sale Period' is only used for ease of understanding and does not physically mean that the tokens are for 'Sale' to you. The use your tokens received in swap, exchange, donation, sacrifice, or sale will determine the means by which you participate.
      </p>
      <h2 style={{fontStyle: 'italic'}}>
        Commencement, Duration and Completion of RADIO Sale
      </h2>
      <p>
        You should check The Company website constantly for information on the sale dates and times. You can also use the official channels such as Telegram and Discord to find out more about the RADIO sale. These dates, times, and durations can be changed or amended at the sole discretion of The Company. Any change in sale duration is not right, and does not give you cause to demand any kind of refund or return of your Tokens given by you to receive RADIO Tokens.
      </p>
      <h2 style={{fontStyle: 'italic'}}>
        Procedures for Buying and Receiving Tokens
      </h2>
      <p>
        To receive Tokens during the Sale Period, you must have certain RADIO wallets established and operational. Specifically, you must have: (i) either an Ethereum wallet, and (ii) an Ethereum wallet that supports the ERC20 RADIO standard in order to receive Tokens that you Acquisition from the The Company . The Company reserves the right to prescribe additional guidance regarding specific wallet requirements.
      </p>
      <p>
        You must register for an account with the third party which is selling the Token to you. These third parties operate websites which undertake KYC/AML check to ensure that they Token(s) are not being used for any illegal purpose or can be acquired by any person not permitted to acquire them. The Company will not allow anyone to use the Token for the purposes of Money Laundering or Terrorist Financing and so all Acquisitionrs must pass through KYC/AML checks.
      </p>
      <p>
        You must only acquire Tokens from approved third parties appointed by The Company. Use links on the official website www.radioshack.com within the official discord group, or telegram channel. The Company takes no liability as to the loss, damage, or problems occurring from the sale of Tokens by any of these third parties. You MUST do you own due dilligence on these third parties selling the Token on behalf of The Company. The Company has appointed and may appoint or remove a third party at any time at their own discretion. The Company has no liability for you not receiving Tokens from the Third Party in the event of an act or omission on their part which causes your Tokens not to be received.
      </p>
      <h2 style={{fontStyle: 'italic'}}>
        Tokens Allocation
      </h2>
      <p>
        The Company has published their Token Allocation within the White Paper which can be found on the Website.
      </p>
      <p>
        Tokens not sold during the Sale Period will be retained by the The Company (the “<b>Retained Tokens</b>”) and allocated to the Development Fund. The RADIO amount in a Development Fund will not exceed 10% from the total RADIO supply. In the case unsold Tokens exceed around a 10% threshold, RADIO will reduce the total supply of Tokens authorized and outstanding to correspond to the Token allocation percentages set forth in the distribution schedule below.
      </p>
      <p>
        The Company may use the Development Fund to finance the promotion of the Token only. In no way are these tokens being used to develop any kind of product or service.
      </p>
      <p>
        Any Tokens outside of this 10% will be adjusted and relocated to a new jurisdiction which will allow users to maintain control of the Token in line with the objectives of the new entity. This method ensures that the Token maintains its Utility Status and is not under the common direction and control of one company for the benefit of that company or the profit of its holders. Neither apply to the Token.
      </p>
      <h2 style={{fontStyle: 'italic'}}>
        Tokens or Sale Proceeds Retained by Founders and Existing Early Backers
      </h2>
      <p>
        Except to the extent paid as compensation for work performed for the The Company, neither the founders nor the existing backers, supporters, and certain users of the The Company and it's network, services and products will receive Retained Tokens from The Company.
      </p>
      <h2 style={{fontStyle: 'italic'}}>
        Pre-Sales of Tokens
      </h2>
      <p>
        The The Company has committed to sell a certain portion of Tokens before the Launch Date (“RADIO Pre-Sales”). Under such RADIO Pre-Sale arrangements, by agreeing to pay The Company for Tokens before the Launch Date, a RADIO Pre-Sale Participant Acquisitiond Tokens at a discounted rate. RADIO Pre-Sale Participants, and others such as contractors or other service providers, must acknowledge and agree to be bound by these Terms, and receive Tokens pursuant to the procedures for receiving Tokens set forth in this Exhibit B, but must consent to receiving Tokens in a time-locked smart contract that will not permit further disposition of the Tokens for a certain period of time thereafter (which is generally in the range of 3 to 12 months after receipt). The discounts and time-lock periods under RADIO Pre-Sale arrangements generally depended on the amount of Tokens that the Pre-Sale Participant agreed to Acquisition or the services for which contractors have provided.
      </p>
      <h2 style={{fontStyle: 'italic'}}>
        Use of Proceeds from TokenSale
      </h2>
      <p>
        The Bitcoin and Ether proceeds from The Company ’s sale of Tokens will be used to compensate technical and non-technical staff, cover marketing costs and operating expenses, and develop technical infrastructure, among other purposes as summarized in the breakdown set forth in the Terms of Sale.
      </p>
      <p>
        Currently, we envision that our development of technical infrastructure will focus on two primary areas. The first is to develop the Network, the second is the promotion of the Token.
      </p>
      <p>
        At a more detailed level, the following is an overview of how the The Company currently anticipates using the Tokens received from the sale of Tokens:
      </p>
      <p>
        *System Development, IT:<br />
        *Marketing and Business Development:<br />
        *Operations, Legal, Customer Support :<br />
        *Working Capital for Cryptocash Exchangers:
      </p>
      <div style={{margin: '0 0 0 60px'}}>
        <ul>
          <li>
            System, Technical Development and Staff, IT : The The Company aims to grow anticipating it will need to attract and assign engineers with a variety of skillsets, in order to fully staff its different development teams. These include dedicated teams working on tools, upgrades to the distributed systems, infrastructure and network stability, smart contracts and other novel technologies and general research.
          </li>
          <li>
            Marketing and Business Development: Through its marketing staff, The Company will undertake a variety of marketing-related projects and initiatives, including in-person events, press outreach, advertisements, and promotional content, analytics and customer management tools. This will entail a dedicated sales team that will manage the sales process for small/medium enterprises and undertake project management to coordinate with engineering teams. The Company will also build out a dedicated marketing team, which will drive awareness and adoption of the Network, plan and execute the marketing initiatives discussed above, and develop documentation and tutorials with the goal of encouraging adoption. Furthermore, The Company will have a dedicated support and customer success team that is community-led and will also contribute to the development of documentation and tutorials relating to the RADIO Network.
          </li>
          <li>
            Operations, Legal and Customer Support: The Company ’s anticipated infrastructure expenses will focus on establishing and maintaining geographically- redundant bridge servers, co-locating critical infrastructure, and acquiring and maintaining physical hardware (as necessary). The Company ’s other operating expenses are currently anticipated to include (i) rent for its physical premises in international locations, (ii) outside legal and advisory expenses, including a reserve for potential future professional services, and (iii) office furniture and computers. Finally, a back office team will be built, with a generalist staff that handles human resources, bookkeeping and logistics, and with an office manager for each physical location.
          </li>
        </ul>
      </div>
      <p>
        The envisioned expenditures and areas of development described above are provided for illustrative purposes only, and The Company reserves the right to allocate its resources, including proceeds from the sale of Tokens toward such areas of development at its sole discretion.
      </p>
      <h1>
        Exhibit C
      </h1>
      <h2>
        ACKNOWLEDGMENT and ASSUMPTION of RISKS
      </h2>
      <h2>
        Certain Risk Factors Relating to Acquisition, Sale and Use of Tokens
      </h2>
      <p>
        Important Note: As noted elsewhere in these Terms, the Tokens are not being structured or sold as securities or any other form of investment product. Accordingly, none of the information presented in this Exhibit C is intended to form the basis for any investment decision, and no specific recommendations are intended. The Company expressly disclaims any and all responsibility for any direct or consequential loss or damage of any kind whatsoever arising directly or indirectly from: (i) reliance on any information contained in this Exhibit C, (ii) any error, omission or inaccuracy in any such information or (iii) any action resulting from such information.
      </p>
      <p>
        By purchasing, holding and using Tokens, you expressly acknowledge and assume the following risks:
      </p>
      <h2>
        Risk of Losing Access to Tokens Due to Loss of Private Key(s)
      </h2>
      <p>
        A private key, or a combination of private keys, is necessary to control and dispose of Tokens stored in your digital wallet. Accordingly, loss of requisite private key(s) associated with your digital wallet storing Tokens will result in loss of such Tokens. Moreover, any third party that gains access to such private key(s), including by gaining access to login credentials of a hosted wallet service you use, may be able to misappropriate your Tokens.
      </p>
      <h2>
        Risks Associated with the Ethereum Protocol
      </h2>
      <p>
        Because Tokens and the Network are based on the Ethereum protocol, any malfunction, breakdown or abandonment of the Ethereum protocol may have a material adverse effect on the Network or Tokens. Moreover, advances in cryptography, or technical advances such as the development of quantum computing, could present risks to the Tokens and the Network by rendering ineffective the cryptographic consensus mechanism that underpins the Ethereum protocol.
      </p>
      <h2>
        Risk of Mining Attacks
      </h2>
      <p>
        As with other decentralized cryptographic Tokens based on the Ethereum protocol, the Tokens are susceptible to attacks by miners in the course of validating Tokentransactions on the Ethereum blockchain, including, but not limited, to double-spend attacks, majority mining power attacks, and selfish- mining attacks. Any successful attacks present a risk to the Network and the Tokens, including, but not limited to, accurate execution and recording of transactions involving Tokens.
      </p>
      <h2>
        Risk of Hacking and Security Weaknesses
      </h2>
      <p>
        Hackers or other malicious groups or organizations may attempt to interfere with the Network or the Tokens in a variety of ways, including, but not limited to, treasury vulnerability, malware attacks, denial of service attacks, consensus-based attacks, man in the middle, Sybil attacks, smurfing and spoofing. Furthermore, because the Network is based on open-source software, there is a risk that a third party or a member of the The Company team may intentionally or unintentionally introduce weaknesses into the core infrastructure of the Network, which could negatively affect the Network and the Tokens.
      </p>
      <p>
        Hackers or other groups or organizations may attempt to steal the revenue from the initial sale, thus potentially impacting the ability of RADIO to develop the RADIO Platform and operate the Network. To account for this risk, RADIO has and will continue to implement comprehensive security precautions to safeguard the proceeds obtained from the sale of Tokens. Multi-factor security measures will be taken to protect the revenue and all currencies and proceeds including physical elements, algorithms, multisignature keys, anti-spear-phishing procedures, splitting of funds, hot/cold wallet partitioning and diversification. Moreover, regular security audits of hot and cold wallets will be conducted by internal and external teams. As acknowledged, there is always a risk that the RADIO Team, or other third parties not directly affiliated with the Parties, may intentionally or unintentionally introduce weaknesses or bugs into the core infrastructural elements of the RADIO Platform causing the system to lose Tokens stored in one or more Participant accounts or other accounts or lose sums of other valued Tokens issued on the RADIO Platform. RADIO has taken steps to build, maintain, and secure the infrastructure of the RADIO Platform, and will continue to do so after the initial sale. For example, RADIO intends to hire external consultants on a periodic basis to assess and audit the security of the RADIO Platform and will work with cryptography and security experts to develop and employ best practices to audit the Platform. As acknowledged by both parties, advances in code cracking, or technical advances such as the development of quantum computers, could present risks to cryptocurrencies and the RADIO Platform, which could result in the theft or loss of Tokens or other valuable assets. To the extent possible, Tokens intends to update the protocol underlying the RADIO Platform to account for any advances in cryptography and to incorporate additional security measures, but it cannot predict the future of cryptography or the success of any future security updates. As with other cryptocurrencies, the blockchain used for the RADIO Platform is susceptible to mining attacks, among others. Any successful attacks present a risk to the Ethereum Platform generally, and the RADIO network specifically, effecting expected proper execution and sequencing of Tokens transactions, and expected proper execution and sequencing of contract computations, as well as other potential losses identified here as risk factors, in addition to those unidentified or unexpected. The Acquisition of Tokens carries with these significant risks. Prior to purchasing Tokens, the Participant should carefully consider the risks herein identified, and, to the extent necessary, consult experts of your choosing ( cryptographic and cyber security specialists, lawyers, accountants, and/or other professionals) prior to determining whether to Acquisition Tokens.
      </p>
      <h2>
        Risks Associated with Markets for Tokens
      </h2>
      <p>
        The Tokens are intended to be used solely within the Network, and The Company will not support or otherwise facilitate any secondary trading or external valuation of Tokens. This restricts the contemplated avenues for using Tokens to the provision or receipt of Services, and could therefore create illiquidity risk with respect to the Tokens you hold. Even if secondary trading of Tokens is facilitated by third party exchanges, such exchanges may be relatively new and subject to little or no regulatory oversight, making them more susceptible to fraud or manipulation.
      </p>
      <p>
        Furthermore, to the extent that third parties do ascribe an external exchange value to Tokens (e.g., as denominated in a digital or fiat currency), such value may be extremely volatile and diminish to zero.
      </p>
      <h2>
        Risk of Uninsured Losses
      </h2>
      <p>
        Unlike bank accounts or accounts at some other financial institutions, Tokens are uninsured unless you specifically obtain private insurance to insure them. Thus, in the event of loss or loss of utility value, there is no public insurer, such as the Federal Deposit Insurance Corporation, or private insurance arranged by us, to offer recourse to you.
      </p>
      <h2>
        Risks Associated with Uncertain Regulations and Enforcement Actions
      </h2>
      <p>
        The regulatory status of the Tokens and distributed ledger technology is unclear or unsettled in many jurisdictions. It is difficult to predict how or whether regulatory agencies may apply existing regulation with respect to such technology and its applications, including the Network and the Tokens. It is likewise difficult to predict how or whether legislatures or regulatory agencies may implement changes to law and regulation affecting distributed ledger technology and its applications, including the Network and the Tokens. Regulatory actions could negatively impact the Network and the Tokens in various ways, including, for purposes of illustration only, through a determination that Tokens are a regulated financial instrument that require registration or licensing. The Company may cease operations in a jurisdiction in the event that regulatory actions, or changes to law or regulation, make it illegal to operate in such jurisdiction, or commercially undesirable to obtain the necessary regulatory approval(s) to operate in such jurisdiction.
      </p>
      <h2>
        Risks Arising from Taxation
      </h2>
      <p>
        The tax characterization of Tokens is uncertain. You must seek your own tax advice in connection with purchasing Tokens, which may result in adverse tax consequences to you, including withholding taxes, income taxes and tax reporting requirements.
      </p>
      <h2>
        Risk of Alternative Networks
      </h2>
      <p>
        It is possible that alternative networks could be established that utilize the same open source code and protocol underlying the Network and attempt to facilitate services that are materially similar to the Services. The Network may compete with these alternative networks, which could negatively impact the Network and Tokens.
      </p>
      <h2>
        Risk of Insufficient Interest in the Network or Distributed Applications
      </h2>
      <p>
        It is possible that the Network will not be used by a large number of individuals, companies and other entities or that there will be limited public interest in the creation and development of distributed ecosystems (such as the Network) more generally. Such a lack of use or interest could negatively impact the development of the Network and therefore the potential utility of Tokens.
      </p>
      <h2>
        Risks Associated with the Development and Maintenance of the Network
      </h2>
      <p>
        The Network is still under development and may undergo significant changes over time. Although we intend for the Tokens and Network to follow the specifications set forth in our Terms and Conditions, and throughout or site, and intend to take commercially reasonable steps toward those ends, we may have to make changes to the specifications of the Tokens or Network for any number of legitimate reasons.
      </p>
      <p>
        This could create the risk that the Tokens or Network, as further developed and maintained, may not meet your expectations at the time of Acquisition. Furthermore, despite our good faith efforts to develop and maintain the Network, it is still possible that the Network will experience malfunctions or otherwise fail to be adequately developed or maintained, which may negatively impact the Network and Tokens.
      </p>
      <h2>
        Risk of an Unfavorable Fluctuation of Ether and Other Currency Value
      </h2>
      <p>
        The The Company team intends to use the proceeds from selling Tokens to fund the maintenance and development of the Network, as described further in the Terms of Sale. The proceeds of the RADIO sale will be denominated in Legacy Coin or Stable Coin, and converted into other cryptographic and fiat currencies. In addition, some pre-sales of the Tokens may also be denominated in fiat currencies. If the value of Ether or other currencies fluctuates unfavorably during or after the Sale Period, the The Company team may not be able to fund development, or may not be able to develop or maintain the Network in the manner that it intended.
      </p>
      <h2>
        Risk of Dissolution of the The Company or Network
      </h2>
      <p>
        It is possible that, due to any number of reasons, including, but not limited to, an unfavorable fluctuation in the value of Ether (or other cryptographic and fiat currencies), decrease in the Tokens’ utility, the failure of commercial relationships, or intellectual property ownership challenges, the Network may no longer be viable to operate and the The Company may dissolve.
      </p>
      <h2>
        Risks Arising from Lack of Governance Rights
      </h2>
      <p>
        Because Tokens confer no governance rights of any kind with respect to the Network or The Company or its corporate affiliates, all decisions involving the Network or The Company will be made by The Company at its sole discretion, including, but not limited to, decisions to discontinue the Network, to create and sell more Tokens for use in the Network, or to sell or liquidate the The Company . These decisions could adversely affect the Network and the Tokens you hold.
      </p>
      <h2>
        Risks Involving Cloud Storage
      </h2>
      <p>
        As the The Company provides services to individual and institutional clients, including users and applications which involves data storage to some extent, the Services are susceptible to a number of risks related to the storage of data in the cloud. While the The Company does not have access to the contents of the data stored through the Services, the Services may involve the storage of large amounts of sensitive and/or proprietary information, which may be compromised in the event of a cyber- attack or other malicious activity. Similarly, the Services may be interrupted and files may become temporarily unavailable in the event of such an attack or malicious activity. Because users can use a variety of hardware and software that may interface with the Network, there is the risk that the Services may become unavailable or interrupted based on a failure of interoperability or an inability to integrate these third-party systems and devices that the The Company does not control with the The Company ’s Services. The risk that the Services may face increasing interruptions and the Network may face additional security vulnerabilities could adversely affect the Network and therefore the future utility of any Tokens that you hold.
      </p>
      <h2>
        Unanticipated Risks
      </h2>
      <p>
        Cryptographic Tokens such as RADIO are a new and untested technology. In addition to the risks included in this Exhibit C, there are other risks associated with your Acquisition, holding and use of Tokens, including those that the The Company cannot anticipate. Such risks may further materialize as unanticipated variations or combinations of the risks discussed in this Exhibit C.
      </p>
      <h2>
        Contact Us
      </h2>
      <p>
        If you have any questions about these Terms or the Conditions and Disclaimers as set forth herein and in the attached Exhibits, please contact us at our website
      </p>
      <p>
        Disclaimer: All information contained herein is accurate at the time of publishing.
      </p>
    </Container>
  )
}
