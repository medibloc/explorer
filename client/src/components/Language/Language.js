import PropTypes from 'prop-types';
import React from 'react';
import { Collapse } from 'react-collapse';

import LanguageBox from './LanguageBox';
import { GlobalActions } from '../../redux/actionCreators';
import { countryList, countryName } from '../../config';

import './Language.scss';


const Language = ({ language, languageOpen }) => (
  <div className="language">
    <button type="button" onClick={GlobalActions.openLanguage}>
      <img src={`/image/icon/ico-country-${language}@3x.png`} alt="language" />
      { countryName[language] }
    </button>
    <img src="/image/icon/triangle.svg" alt="opener" />
    {
      // eslint-disable-next-line
      languageOpen && <div className="languageCloser" onClick={GlobalActions.closeLanguage} />
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

Language.propTypes = {
  language: PropTypes.oneOf(countryList).isRequired,
  languageOpen: PropTypes.bool.isRequired,
};

export default Language;
