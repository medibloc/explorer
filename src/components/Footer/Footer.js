import React from 'react';
import { connect } from 'react-redux';

import './Footer.scss';


const imgChange = (sns, on) => (e) => {
  e.currentTarget.src = `/image/icon/ico-${sns}-${on ? 'on' : 'off'}@3x.png`;
};

const sns = ['telegram', 'twitter', 'fb', 'medium', 'brunch', 'medi'];
const snsLink = {
  telegram: 'https://t.me/medibloc',
  twitter: 'https://twitter.com/_MediBloc',
  fb: 'https://www.facebook.com/medibloc/',
  medium: 'https://medium.com/@medibloc',
  brunch: 'https://brunch.co.kr/@medibloc/',
  medi: 'https://medibloc.org/',
};

const Footer = ({ mode }) => (
  <div className="footer">
    <div className="footerContent">
      <div className="footerLogo">
        <img src="/image/icon/logo-footer.svg" alt="footerLogo" />
      </div>
      {
        mode === 0 && (
          <div className="footerRights">
            ©2018 MediBloc. All Rights Reserved.
          </div>
        )
      }
      <div className="footerSNS">
        {
          sns.map(service => (
            <a
              href={snsLink[service]}
              target="_blank"
              rel="noopener"
              key={service}
            >
              <img
                src={`/image/icon/ico-${service}-off@3x.png`}
                alt="sns"
                onMouseOver={imgChange(service, true)}
                onFocus={imgChange(service, true)}
                onMouseOut={imgChange(service, false)}
                onBlur={imgChange(service, false)}
              />
            </a>
          ))
        }
      </div>
    </div>
  </div>
);

const mapStateToProps = ({ global }) => ({
  mode: global.mode,
});

export default connect(mapStateToProps)(Footer);
