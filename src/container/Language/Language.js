import React from 'react';
import { Collapse } from 'react-collapse';
import { connect } from 'react-redux';

import LanguageBox from './LanguageBox';
import { GlobalActions } from '../../redux/actionCreators';
import { countryName } from '../../config';

import './Language.scss';


const Language = ({ language, languageOpen }) => (
  <div className="language">
    <button onClick={GlobalActions.openLanguage} type="button">
      <img src={`/image/icon/ico-country-${language}@3x.png`} alt="language" />
      { countryName[language] }
    </button>
    <Collapse className="languageHamburger" isOpened={languageOpen}>
      <LanguageBox />
    </Collapse>
  </div>
);

const mapStateToProps = ({ global }) => ({
  language: global.language,
  languageOpen: global.languageOpen,
});

export default connect(mapStateToProps)(Language);
