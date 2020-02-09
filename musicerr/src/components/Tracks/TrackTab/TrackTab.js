import React from "react";

const TrackTab = ({ tab, item }) => {
  const handleTabs = tab => {
    if (tab === "TEXT_GUITAR_TAB") {
      return `guitar`;
    }
    if (tab === "TEXT_BASS_TAB") {
      return `bass`;
    }
    if (tab === "CHORDS") {
      return `drums`;
    }
    if (tab === "PLAYER") {
      return `piano`;
    }
  };

  return (
    <a
      className="tab-link"
      target="_blank"
      title={tab}
      rel="noopener noreferrer"
      href={`http://www.songsterr.com/a/wa/bestMatchForQueryString?s=${
        item.title
      }&a=${item.artist.nameWithoutThePrefix}&t=${handleTabs(tab)}`}
    >
      {String(tab).replace("TEXT_", "").split`_`.join`-`}
    </a>
  );
};

export default TrackTab;
