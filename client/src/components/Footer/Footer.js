import PropTypes from 'prop-types';
import React from 'react';

import { snsLink } from '../../config';

import './Footer.scss';


const imgChange = (sns, on) => (e) => {
  e.currentTarget.src = `/image/icon/ico-${sns}-${on ? 'on' : 'off'}@3x.png`;
};

const sns = ['telegram', 'twitter', 'fb', 'medium', 'brunch', 'medi'];

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
              rel="noopener noreferrer"
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

Footer.propTypes = {
  mode: PropTypes.number.isRequired,
};

export default Footer;
