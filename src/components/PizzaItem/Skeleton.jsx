import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="129" cy="141" r="110" />
    <rect x="8" y="413" rx="0" ry="0" width="109" height="45" />
    <rect x="1" y="271" rx="22" ry="22" width="280" height="27" />
    <rect x="-1" y="310" rx="0" ry="0" width="280" height="86" />
    <rect x="127" y="412" rx="30" ry="30" width="150" height="45" />
  </ContentLoader>
);

export default Skeleton;
