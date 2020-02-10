import React from "react";
import "./Tracks.scss";
import TrackTab from "./TrackTab/TrackTab";

const Tracks = ({ data, error, loading }) => {
  if (loading) {
    return <div style={{ textAlign: "center" }}>...loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return data.map((item, i) => (
    <div className="tracks-container track" key={i}>
      <div className="track-info">
        <div className="track-info__title" title={item.title}>
          {item.title.length > 45
            ? `${item.title.slice(0, 45)}...`
            : item.title}
        </div>
        <p
          className="track-info__artist"
          title={item.artist.nameWithoutThePrefix}
        >
          {item.artist.nameWithoutThePrefix.length > 35
            ? `${item.artist.nameWithoutThePrefix.slice(0, 35)}...`
            : item.artist.nameWithoutThePrefix}
        </p>
      </div>
      <div className="track-tabs">
        {item.tabTypes.map(tab => (
          <TrackTab item={item} key={tab} tab={tab} />
        ))}
      </div>
    </div>
  ));
};

export default Tracks;
