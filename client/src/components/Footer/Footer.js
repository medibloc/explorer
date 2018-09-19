import PropTypes from 'prop-types';
import React from 'react';

import { sns, snsLink } from '../../config';

import './Footer.scss';


const imgChange = (targetSNS, on) => (e) => {
  e.currentTarget.src = `/image/icon/ico-${targetSNS}-${on ? 'on' : 'off'}@3x.png`;
};

const Footer = ({ language, mode }) => (
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
          sns.map((service) => {
            let snsRef = snsLink[service];
            if (service === 'telegram') {
              snsRef = snsLink[`${service}_${language}`];
            }
            return (
              <a
                href={snsRef}
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
            );
          })
        }
      </div>
    </div>
  </div>
);

Footer.propTypes = {
  language: PropTypes.string.isRequired,
  mode: PropTypes.number.isRequired,
};

export default Footer;
