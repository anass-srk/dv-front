function Star({color,bcolor,className,onClick} : {color: string, bcolor: string, className?: string,onClick?: React.MouseEventHandler<SVGSVGElement>}){

  return (
<svg viewBox="0 0 750 750"
    version="1.1"
    className={className}
    onClick={onClick}
  >
  <g
      id="layer1"
      transform="translate(0 -302.36)"
      stroke={color}
      strokeWidth="1px"
      display="none"
      fill={bcolor}
    >
    <path
        id="path3961"
        d="m375 705.67v-296.54"
    />
    <path
        id="path3963"
        d="m375 705.67 282.1-91.66"
    />
    <path
        id="path3965"
        d="m375 705.67 174.31 239.92"
    />
    <path
        id="path3967"
        d="m375 705.67-174.31 239.92"
    />
    <path
        id="path3969"
        d="m375 705.67-282.1-91.66"
    />
  </g>
  <g
      id="layer2"
      display="none"
    >
    <path
        id="path3971"
        d="m92.899 614.01 564.2 0.00001l-456.41 331.58 174.31-536.46 174.31 536.46z"
        transform="translate(0 -302.36)"
        stroke={color}
        strokeWidth="1px"
        fill={bcolor}
    />
  </g>
  <g
      id="g3016"
    >
    <path
        id="path3018"
        stroke={color}
        strokeWidth="1px"
        fill={bcolor}
        d="m375 106.78-66.562 204.88h-215.53l174.38 126.66-66.6 204.9 174.31-126.63 174.31 126.62-66.594-204.91 174.38-126.66h-215.53l-66.57-204.86z"
    />
  </g>
</svg>
  );
}

export default Star;