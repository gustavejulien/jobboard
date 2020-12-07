import React from 'react';
import ContentApllyAd from './Ads/ContentApplyAds';
import ContentCreateCompany from './ContentCreateCompany';
import ContentCreateAd from './ContentCreateAd';
import ReactDOM from 'react-dom';
import './css/modal.css'

const ModalApply = ({ isShowing, hide, id, label, setRefresh }) => isShowing ? ReactDOM.createPortal(
    <React.Fragment>
      <div className="Modal-overlay"/>
      <div className="Modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
      <div className="Modal">
      <div className="Modal-header">
        <button type="button" className="Modal-close-button" data-dismiss="Modal" aria-label="Close" onClick={hide}>
          <span aria-hidden="true">&times;</span>
        </button>
        </div>
        {label === 'Ads' && (
          <ContentApllyAd 
            ad_id={id}
            modalDisplay={hide}
          />
        )}
        {label === 'Company' && (
          <ContentCreateCompany 
            modalDisplay={hide}
            setRefresh={setRefresh}
          />
        )}
        {label === 'CreateAd' && (
          <ContentCreateAd
            modalDisplay={hide}
            id_comp={id}
          />
        )}
        </div>
      </div>
      </React.Fragment>, document.body
      ) : null;
          
  export default ModalApply;