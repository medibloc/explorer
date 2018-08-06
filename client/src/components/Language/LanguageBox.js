import React from 'react';
import { connect } from 'react-redux';

import { GlobalActions } from '../../redux/actionCreators';
import { countryList, countryName } from '../../config';
import './Language.scss';


const changeLanguage = (e) => {
  const lang = e.target.name ? e.target.name : e.target.alt;
  GlobalActions.changeLanguage(lang);
};

const LanguageBox = () => (
  <div className="languageBox">
    {
      countryList.map(country => (
        <button onClick={changeLanguage} type="button" key={country} name={country}>
          <img src={`/image/icon/ico-country-${country}@3x.png`} alt={country} />
          { countryName[country] }
        </button>
      ))
    }
  </div>
);

export default connect()(LanguageBox);
