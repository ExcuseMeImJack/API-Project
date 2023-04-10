import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { thunkGetSpotById } from "../../store/spots";
import './spots.css'
import Reviews from "../Reviews/index";

const SpotDetails = () => {
  const {spotId} = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkGetSpotById(spotId));
  }, [dispatch, spotId]);

  const handleBooking = () => {
    alert('Feature Coming Soon...')
  }

  const spots = useSelector(state => Object.values(state.spots));
  const spot = spots.find(spot => spot.id === parseInt(spotId));

  if(!spot) return null;

  return (
    <div className="getSpotDetails">
      <h2>{spot.name}</h2>
      <h3>{spot.city}, {spot.state}, {spot.country}</h3>
        <div className="images">
          {spot.SpotImages?.map(spotImg => (
            spotImg.preview ?
            <div className="previewImage" key={spotImg.id}><img src={spotImg.url} alt="preview img" /></div>
            :
            <div className="spotImages" key={spotImg.id}><img src={spotImg.url} alt="not preview img" /></div>
          ))}
        </div>
      <div>
        <div className="description">
          <h3>Hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}</h3>
          <p>{spot.description}</p>
        </div>
        <div className="book-spot">
          <h3>${spot.price} night</h3>
          <i className="fa-solid fa-star"></i>
          <h3>{spot.avgStarRating === 0 ? 'New' : (spot.avgStarRating % 1 === 0 ? (spot.avgStarRating + '.0'): spot.avgStarRating)}</h3>
          <h3>{spot.numReviews === 0 ? null : spot.numReviews === 1 ? spot.numReviews + ' review' : spot.numReviews + ' reviews' } </h3>
          <button onClick={handleBooking}>Reserve</button>
        </div>
      </div>
      <div>
        <i className="fa-solid fa-star"></i>
        <h3>{spot.avgStarRating === 0 ? 'New' : (spot.avgStarRating % 1 === 0 ? (spot.avgStarRating + '.0'): spot.avgStarRating)}</h3>
        <h3>{spot.numReviews === 0 ? null : spot.numReviews === 1 ? ' · ' + spot.numReviews + ' review' : ' · ' + spot.numReviews + ' reviews' } </h3>
        <div className="reviews">
          <Reviews spotId={spotId}/>
        </div>
      </div>
    </div>
  )
}

export default SpotDetails;