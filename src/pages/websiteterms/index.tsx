import Head from 'next/head'
import { useEffect, useState } from 'react';
import Container from '../../components/Container'

export default function WebsiteTerms() {
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
        <title>Website Terms | RadioShack</title>
        <meta key="description" name="description" content="Website Terms" />
      </Head>

      <h1>
        Privacy Policy and Website Terms
      </h1>

      <p>
        This privacy policy is for this website and any services provided through the ordinary course of business. Our website is (www.radioshack.com) (“The Website”) and is owned and operated by RS Distributed Labs, Inc of the Republic of Seychelles. (“The Company”). This policy governs the privacy of both users who choose to use our website or engage with any of our services for both with and without consideration (“Users”).
      </p>
      <p>
        The policy sets out the different areas where user privacy is concerned and outlines the obligations & requirements of the users, the website and The Company. Furthermore the way this website and company processes, stores and protects user data and information will also be detailed within this policy.
      </p>
      <h2>
        1. The Website
      </h2>
      <p className="indent">
        1.1 &emsp; This website and its owners take a proactive approach to user privacy and ensure the necessary steps are taken to protect the privacy of its users throughout their visiting experience. This website complies to all international national laws and requirements for user privacy.
      </p>
      <p className="indent">
        1.2 &emsp; For the avoidance of doubt the website and all company data is hosted, stored and maintained within the continent of Asia or Europe.
      </p>
      <h2>
        2. Use of Cookies
      </h2>
      <p className="indent">
        2.1 &emsp; This website uses cookies to better the users experience while visiting the website.<br />
        Where applicable this website uses a cookie control system allowing the user on their first visit to the website to allow or disallow the use of cookies on their computer / device. This complies with recent legislation requirements for websites to obtain explicit consent from users before leaving behind or reading files such as cookies on a user's computer / device.
      </p>
      <p className="indent">
        2.2 &emsp; Cookies are small files saved to the user's computers hard drive that track, save and store information about the user's interactions and usage of the website. This allows the website, through its server to provide the users with a tailored experience within this website.
      </p>
      <p className="indent">
        2.3 &emsp; Users are advised that if they wish to deny the use and saving of cookies from this website on to their computers hard drive they should take necessary steps within their web browsers security settings to block all cookies from this website and its external serving vendors.
      </p>
      <p className="indent">
        2.4 &emsp; This website uses tracking software to monitor its visitors to better understand how they use it. This software is provided by Google Analytics which uses cookies to track visitor usage. The software will save a cookie to your computers hard drive in order to track and monitor your engagement and usage of the website, but will not store, save or collect personal information. You can read Google's privacy policy here for further information http://www.google.com/privacy.html
      </p>
      <p className="indent">
        2.5 &emsp; Other cookies may be stored to your computers hard drive by external vendors when this website uses referral programs, sponsored links or adverts. Such cookies are used for conversion and referral tracking and typically expire after 30 days, though some may take longer. No personal information of any kind is stored, saved or collected.
      </p>
      <h2>
        3. Contact &amp; Communication
      </h2>
      <p className="indent">
        3.1 &emsp; Users contacting this website and/ or The Company do so at their own discretion and provide any such personal details requested at their own risk. Your personal information is kept private and stored securely until a time it is no longer required or has no use, as detailed in the Data Protection Laws. Every effort has been made to ensure a safe and secure form to email submission process but advise users using such form to email processes that they do so at their own risk.
      </p>
      <p className="indent">
        3.2 &emsp; This website and its owners use any information submitted to provide you with further information about the products / services they offer or to assist you in answering any questions or queries you may have submitted.
      </p>
      <p className="indent">
        3.3 &emsp; This includes using your details to subscribe you to any email newsletter program the website operates but only if this was made clear to you and your express permission was granted when submitting any form to email process. Or whereby you the consumer have previously purchased from or inquired about purchasing from the company a product or service that the email newsletter relates to. This is by no means an entire list of your user rights in regard to receiving email marketing material. Your details are not passed on to any third parties.
      </p>
      <p className="indent">
        3.4 &emsp; In sending the company or the website your personal information you are consenting to allow the company to contact you subject to the above conditions. Any data held by the company relating to individuals will be stored and destroyed once a period of 12 months of no communication has occurred between The User and The Company.
      </p>
      <p className="indent">
        3.5 &emsp; The company will never knowingly or willingly pass information it holds on Users (For clarity this includes: clients, prospects, or website users) onto a third party without the consent of the said user.
      </p>
      <h2>
        4. Email
      </h2>
      <p className="indent">
        4.1 &emsp; From time to time The Company operates various email campaigns program, (at all times we refer to these as a Newsletter Program) used to inform subscribers about products and services supplied by this website. Users can subscribe through an online automated process should they wish to do so but do so at their own discretion. Some subscriptions may be manually processed through prior written agreement with the user.
      </p>
      <p className="indent">
        4.2 &emsp; Subscriptions are taken in compliance with Spam Laws detailed in the Privacy and Electronic Communications Regulations. All personal details relating to subscriptions are held securely and in accordance with the Data Protection Laws. No personal details are passed on to third parties nor shared with companies / people outside of the company that operates this website. Under the Data Protection Laws you may request a copy of personal information held about you by this website's email newsletter program. A small fee will be payable. If you would like a copy of the information held on you please write to the business address at the bottom of this policy.
      </p>
      <p className="indent">
        4.3 &emsp; Email marketing campaigns published by this website or its owners may contain tracking facilities within the actual email. Subscriber activity is tracked and stored in a database for future analysis and evaluation. Such tracked activity may include; the opening of emails, forwarding of emails, the clicking of links within the email content, times, dates and frequency of activity [this is by no far a comprehensive list].
      </p>
      <p className="indent">
        4.4 &emsp; This information is used to refine future email campaigns and supply the user with more relevant content based around their activity.
      </p>
      <p className="indent">
        4.5 &emsp; In compliance with EU Spam Laws and the Privacy and Electronic Communications Regulations 2003, and GDPR subscribers are given the opportunity to un-subscribe at any time through an automated system. This process is detailed at the footer of each email campaign. If an automated un-subscription system is unavailable clear instructions on how to un-subscribe will by detailed instead.
      </p>
      <p className="indent">
        4.6 &emsp; At all times our email campaigns are run through third party providers such as Mailchimp. Users are advised to refer to the specific terms and conditions attached to these third party companies. Users can easily remove themselves from any email communication by “unsubscribing”.
      </p>
      <p className="indent">
        4.7 &emsp; The Company holds no liability as to any damages or losses associated with the use of any third party email service provider. In engaging with the company or continuing use of the website you hereby expressly accept that the Company holds no such liability
      </p>
      <h2>
        5. External Links
      </h2>
      <p className="indent">
        5.1 &emsp; While ever effort has been made to include quality, safe and relevant external links within this website, users are advised adopt a policy of caution before clicking any external web links mentioned throughout this website. (External links are clickable text / banner / image links to other websites)
      </p>
      <p className="indent">
        5.2 &emsp; The owners of this website and the company cannot guarantee or verify the contents of any externally linked website despite their best efforts. Users should therefore note they click on external links at their own risk and this website and its owners cannot be held liable for any damages or implications caused by visiting any external links mentioned.
      </p>
      <h2>
        6. Adverts and Sponsored Links
      </h2>
      <p className="indent">
        6.1 &emsp; This website may contain sponsored links and adverts. These will typically be served through our advertising partners, to whom may have detailed privacy policies relating directly to the adverts they serve.
      </p>
      <p className="indent">
        6.2 &emsp; Clicking on any such adverts will send you to the advertisers website through a referral program which may use cookies and will track the number of referrals sent from this website. This may include the use of cookies which may in turn be saved on your computers hard drive. Users should therefore note they click on sponsored external links at their own risk and this website and its owners cannot be held liable for any damages or implications caused by visiting any external links mentioned.
      </p>
      <p className="indent">
        6.3 &emsp; The owners of this website and the company cannot guarantee or verify the contents of any externally linked website despite their best efforts. Users should therefore note they click on external links at their own risk and this website and its owners cannot be held liable for any damages or implications caused by visiting any external links mentioned.
      </p>
      <h2>
        7. Social Media Platforms
      </h2>
      <p className="indent">
        7.1 &emsp; Communication, engagement and actions taken through external social media platforms that this website, the company, and its owners participate on are custom to the terms and conditions as well as the privacy policies held with each social media platform respectively.
      </p>
      <p className="indent">
        7.2 &emsp; Users are advised to use social media platforms wisely and communicate / engage upon them with due care and caution in regard to their own privacy and personal details. This website nor its owners will ever ask for personal or sensitive information through social media platforms and encourage users wishing to discuss sensitive details to contact them through primary communication channels such as by telephone or email.
      </p>
      <p className="indent">
        7.4 &emsp; This website may use social sharing buttons which help share web content directly from web pages to the social media platform in question. Users are advised before using such social sharing buttons that they do so at their own discretion and note that the social media platform may track and save your request to share a web page respectively through your social media platform account.
      </p>
      <p className="indent">
        7.5 &emsp; The Company holds responsibility for any and all comments, posts or any other action taken on social media belonging to the company. Social media can easily be identified as belonging to the company by the name of the account on the relevant social media platform. Any and all comments and actions made on social media are not intended to cause offense or serve as a defamatory action. Each and every posting will be checked for accuracy.
      </p>
      <p className="indent">
        7.6 &emsp; If you believe your intellectual property rights, personal rights, or any other rights have been infringed by any action on social media you are to notify the company as soon as possible so that the company has an opportunity to rectify and/or remove the post.
      </p>
      <h2>
        8. Shortened Links in Social Media
      </h2>
      <p className="indent">
        8.1 &emsp; This website and its owners through their social media platform accounts may share web links to relevant web pages. By default some social media platforms shorten lengthy domains and URL's to third party pages.
      </p>
      <p className="indent">
        8.2 &emsp; Users are advised to take caution and good judgement before clicking any shortened urls published on social media platforms by this website and its owners. Despite the best efforts to ensure only genuine urls are published many social media platforms are prone to spam and hacking and therefore this website and its owners cannot be held liable for any damages or implications caused by visiting any shortened links.
      </p>
      <h2>
        9. Governing Law and Jurisdiction
      </h2>
      <p className="indent">
        9.1 &emsp; This privacy policy and any and all items posted on behalf of the company are strictly subject to the Laws of The Republic of Seychelles. Any disagreement that arises under the use of personal information shall be resolved through the Courts of the Seychelles using the law of the Seychelles.
      </p>
      <p className="indent">
        9.2 &emsp; The User, in using the website or engaging in social media belonging to the company expressly agrees that they are accepting the terms of this privacy policy.
      </p>
      <p className="indent">
        9.3 &emsp; Any disagreement and all notices are to be delivered to the company registers office.
      </p>
      <p className="indent">
        9.4 &emsp; If any part of this policy is found to be defective, the remaining elements of the policy shall remain in place.
      </p>
      <p className="indent">
        9.5 &emsp; The Company registered office and address for service can be found on the website.
      </p>
      <p>
        Privacy Notice
      </p>
      <p>
        From time to time the company may collect information on you, including but not limited to the information as contained in these Website Terms.
      </p>
      <p>
        In addition, we may collect information on you as an individual during any sign up or purchase procedure that you pass through. Such information is used to identify you as an individual, and ensure that you are not breaking/breaching the terms of any such sale or interaction with The Company, generally.
      </p>
      <p>
        Any information that is obtained regarding the identification of you, including any devices you use or location you are based in, shall be covered by the laws of the Republic of Seychelles. Notwithstanding, some locations place specific requirements on websites and the storage of data.
      </p>
      <p>
        The Company meets all obligations in relation to the Republic of Seychelles where it collects data or information on you. Such data will only ever be shared with third parties where it is required in order to ascertain where you are, who you are, or to communicate with you in the event of necessary information.
      </p>
      <p>
        From time to time we may also use the information for marketing campaigns. Should you receive any unwanted communication from The Company, you should delete and select ‘opt-out’ or ‘unsubscribe’ as contained within the message.
      </p>
      <p>
        In the event of any company acquisition, merger, or buy-out, The Company shall transfer all information over to the new owners, or new company (if assets have been acquired). Such a transfer is prescribed in line with this document.
      </p>
      <p>
        The Company shall take all steps to ensure your privacy is not breached and should you believe it has been breached you should contact the company at once using the Website.
      </p>
      <h2>
        Special GDPR Notice
      </h2>
      <p>
        Citizens of the European Union have the right to track their data under the GDPR regulations brought into force within 2018.
      </p>
      <p>
        In using the company website you are hereby agreeing to the following terms and give your consent for such data to be stored as contained in accordance with this GDPR notice.
      </p>
      <p>
        Data Control Officer<br />
        The data control officer is based at the company head quarters which can be found in our Terms and Conditions document. You can reach the Data controller by emailing the company at the contact@email address located on the company website, or use the methods contained within the company website for contact with us. We will aim to reply to you within 72 hours. You may request all information and documentation held about you by the company.
      </p>
      <p>
        Purpose of the processing.<br/>
        The information is collected in the interest of Know Your Client and Anti Money Laundering regulations. The company is allowing individuals to participate in a crowdfunding exercise. Some jurisdictions do not allow its citizens and residents to participate in such activities. We therefore are required to collect basic information on those who participate to demonstrate, when necessary, that citizens and residents of that jurisdiction did not participate in the crowdfunding. The legal basis for this processing of data is found in international law (different laws from different countries) including but not limited to, The UK financial Services Act, The US Securities Legislation, European Monetary laws and regulations (including those of its member states), Chinese Financial Code, anti-money laundering laws, and antiterrorism laws.
      </p>
      <p>
        Third Parties<br />
        Data may from time to time, be shared with third parties for the purposes of conducting a Know Your Client assessment so that participants can prove their location, residence, and citizenship. All parties that have access to your data will be members of the necessary data controlling bodies of their respective countries. For example, the Information Commissioners Office of the United Kingdom.
      </p>
      <p>
        Recipients of the Data<br />
        At all times our compliance team with Gresham International will have access to the data. They are regulated by the Information Commissioners Office and will not share that data with any third party.
      </p>
      <p>
        Safeguards<br />
        Your data will never be shared with any third party without your consent or court order provided by a court of competent jurisdiction within the country making the request.
      </p>
      <p>
        Retention Period<br />
        All data will be stored for a period of a minimum of six months and a maximum of two years.
      </p>
      <p>
        The Existence of your rights<br />
        Nothing within this agreement or the company’s process impacts your rights under the GDPR.
      </p>
      <p>
        The right to withdraw consent<br />
        You may, at any time, request the right to know what information is held by the company relating to you. This request can only be made once as data is only captured once during the registration and participation process.
      </p>
      <p>
        As the information is required for anti-money laundering and antiterrorism laws, we are obliged to keep any and all information relating to you.
      </p>
      <p>
        <b>The right to lodge a compliant</b><br />
        Citizens of the EU may file a complaint with the relevant data controller within their country. Complaints should first be made to the company so that we can investigate any issues relating to the storage or use of your data.
      </p>
      <p>
        <b>Source of Data</b><br />
        All data collected on you will be done so by your submission of the information and collection of information from the machine you access the website with. Data collection is limited to that contained in our registration method and that information which your computer automatically transmits to our company when accessing our site such as cookies and IP data.
      </p>
      <p>
        <b>Disputes</b><br />
        Any disputes regarding the use of this website shall be managed within the Republic of Seychelles. In using the website, you agree to be bound by the laws of internet usage of the Republic of Seychelles including the use, deployment, storage, retention, and sharing of all data, information, and user experience. If you do not agree with any of these terms you should discontinue use of the Website immediately and not return.
      </p>

    </Container>
  )
}
