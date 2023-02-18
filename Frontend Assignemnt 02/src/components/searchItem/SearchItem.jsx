import "./searchItem.css";

const SearchItem = (props) => {
  return (
    <div className="searchItem">
      <img src={props.data.photos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{props.data.title}</h1>
        <span className="siDistance">{props.data.distance} from center</span>
        {/* <span className="siTaxiOp">{tag}</span> */}
        <span className="siSubtitle">{props.data.description}</span>
        <span className="siFeatures">{props.data.type}</span>
        {/* If can cancel */}
        {props.data.featured ? (
          <div>
            <span className="siCancelOp">Free cancellation </span>
            <span className="siCancelOpSubtitle">
              You can cancel later, so lock in this great price today!
            </span>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="siDetails">
        <div className="siRating">
          {/* <span>{rate_text}</span> */}
          <button>{props.data.rating}</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">${props.data.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <button className="siCheckButton">See availability</button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
