import React from 'react';
import { connect } from 'react-redux';

import './Footer.scss';

const sns = ['telegram', 'twitter', 'fb', 'blog', 'medi'];

const Footer = () => (
  <div className="footer">
    <div className="footerContent">
      <div className="footerLogo">
        <img src="/image/icon/logo-footer.svg" alt="footerLogo" />
      </div>
      <div className="footerRights">
        ©2018 MediBloc. All Rights Reserved.
      </div>
      <div className="footerSNS">
        {
          sns.map(service => (
            <img src={`/image/icon/ico-${service}-on@3x.png`} alt="sns" key={service} />
          ))
        }
      </div>
    </div>
  </div>
);

const mapStateToProps = () => ({

});

export default connect(mapStateToProps)(Footer);
