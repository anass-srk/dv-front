import { Media } from "./utils";

function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  const d = [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");

  return d;
}

function get_angle(rating: number): number{
  return (360/5)*rating
}

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