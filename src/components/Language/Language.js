import React from 'react';
import { Collapse } from 'react-collapse';
import { connect } from 'react-redux';

import LanguageBox from './LanguageBox';
import { GlobalActions } from '../../redux/actionCreators';
import { countryName } from '../../config';

import './Language.scss';


const Language = ({ language, languageOpen, mode }) => (
  <div className="language">
    <button type="button" onClick={GlobalActions.openLanguage}>
      <img src={`/image/icon/ico-country-${language}@3x.png`} alt="language" />
      { countryName[language] }
    </button>
    <img src="/image/icon/triangle.svg" alt="opener" />
    {
      languageOpen && <div className="languageCloser" onClick={GlobalActions.closeLanguage} role="button" />
    }
    <Collapse
      className="languageHamburger"
      isOpened={languageOpen}
      springConfig={{ stiffness: 60, damping: 10 }}
    >
      <LanguageBox />
    </Collapse>
  </div>
);

const mapStateToProps = ({ global }) => ({
  language: global.language,
  languageOpen: global.languageOpen,
  mode: global.mode,
});

export default connect(mapStateToProps)(Language);
