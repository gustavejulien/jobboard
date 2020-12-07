import React, { useState, useEffect } from 'react';
import useInfiniteScroll from "./useInfiniteScroll";
import axios from 'axios';
import ModalApply from "./ModalApply";
import useModal from './useModal';
import "./css/style.css";

const ListCompanyAds = () => {
  const [listAds, setListAds] = useState({ads : []});
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);
  const [listItems, setListItems] = useState([]);
  const [user, setUser] = useState();
  
  const {isShowing, toggle} = useModal();
  const [idDivOpened, setIdDivOpened] = useState();
  const [isDivOpened, setDivOpened] = useState(false);

  const urlGetAds = 'http://localhost:8000/getAdsByCompanyId';
  const urlGetUser = 'http://localhost:8000/getSelfUser';

  useEffect(() => {  
    const fetchUser = async () => {
        const result = await axios.get(urlGetUser, {withCredentials: true});
        setUser(result.data);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchAds = async () => {
        if (user !== undefined) {
            const result = await axios.post(urlGetAds, {_id : user.company});
            setListAds(result.data);
            setListItems(result.data.ads.slice(0,30));
        };
    };
    fetchAds();
  }, [user !== undefined])
  
  function fetchMoreListItems() {
    setTimeout(() => {
      const newAds = listAds.ads.slice(listItems.length, listItems.length + 20);
      setListItems(listItems.concat(newAds));
      if(listItems < listAds){
        setIsFetching(false);
      } 
    }, 1000);
    console.log('Fetching');
  }

  function toggleAd(id) {
    if (id === idDivOpened) {
      setDivOpened(wasOpened => !wasOpened);
    }
    if (!isDivOpened && (id !== idDivOpened)){
      setDivOpened(wasOpened => !wasOpened)
    }
    setIdDivOpened(id);
  }
  
  return (
    <div className="Ads">
      {user !== undefined && (
        <div className="Ad-Create">
          <button className="button-default" onClick={toggle}>Create Ad</button>
          <ModalApply
            id={user.company}
            label='CreateAd'
            isShowing={isShowing}
            hide={toggle}
          />
        </div>
      )}
    {listItems.map(ad =>
    <div key={ad.id}>
      <div className="Ad"onClick={() => toggleAd(ad._id)}>
        <div className="Ad-Company">{ad.company}</div>
        <div className="Ad-Title">{ad.title}</div>
        <div className={`arrow ${isDivOpened && (idDivOpened === ad._id) ? "open" : null}`} />
      </div>
      {(idDivOpened === ad._id) && isDivOpened && (
      <div className="Ad-Description">
        <p>{ad.description}</p>
      </div>
      )}
    </div>
    )}
    {isFetching && 'Fetching more list items...'}
    </div>
  );
};

export default ListCompanyAds;