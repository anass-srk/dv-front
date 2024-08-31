import { describeArc, get_angle, Media } from "./utils";

function MediaCard({media} : {media: Media}){
  
  return (
    <div className="media-card">
      <div style={{position: "relative"}}>
        <img src={media.img} width={183} height={275}/>
        <svg viewBox="0 0 110 110" xmlns="http://www.w3.org/2000/svg" width={50} height={50} style={{position: "absolute",left: "4px",top: "230px"}}>
          <path d={describeArc(50,50,48,0,359)} fill="rgba(238, 237, 235,0.7)"></path>
          <path d={describeArc(50,50,48,0,359)} fill="none" stroke='rgb(238, 238, 238)' strokeWidth='8'></path>
          <path d={describeArc(50,50,48,0,get_angle(media.rating))} fill="none" stroke='rgb(104, 109, 118)' strokeWidth="8"></path>
          <text x="25" y="60" color="black" style={{fontSize: "18pt",fontWeight: "bold"}}>{`${Math.round(media.rating*20)}%`}</text>
        </svg>
      </div>
      <h5 style={{ textAlign: "center", minWidth: "100%"}}>{media.title}</h5>
      <hr/>
      <h5 style={{ textAlign: "center", minWidth: "100%"}}>({new Date(media.release_date).getFullYear()})</h5>
    </div>
  );
}

export default MediaCard;