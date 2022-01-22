import React, { useState } from "react";
import "./viewParticipant.css";
import { FacebookSelector } from "react-reactions";

export default function Reactions() {
  const [emojiSelector, setEmojiSelector] = useState(false);
  const [reaction, setReaction] = useState("");

  return (
    <div className="animation-story">
      <span
        onMouseEnter={() => setEmojiSelector(true)}
        style={{
          float: "right",
          font: "normal normal normal 14px/18px Roboto",
          background: "#F8F8F8 0% 0% no-repeat padding-box",
        }}
        className="like-button"
      >
        {reaction === "like" ? (
          <img
            className="emoji-type"
            alt="gesture_emoji"
            src="https://dhihitu47nqhv.cloudfront.net/icons/gestureEmojy.svg"
          />
        ) : reaction === "love" ? (
          <img
            className="emoji-type"
            alt="gesture_emoji"
            src="https://dhihitu47nqhv.cloudfront.net/icons/heartEmoji.svg"
          />
        ) : reaction === "wow" ? (
          <img
            className="emoji-type"
            alt="gesture_emoji"
            src="https://dhihitu47nqhv.cloudfront.net/icons/wowEmoji.svg"
          />
        ) : reaction === "sad" ? (
          <img
            className="emoji-type"
            alt="gesture_emoji"
            src="https://dhihitu47nqhv.cloudfront.net/icons/upsetEmoji.svg"
          />
        ) : reaction === "haha" ? (
          <img
            className="emoji-type"
            alt="gesture_emoji"
            src="https://dhihitu47nqhv.cloudfront.net/icons/smileEmoji.svg"
          />
        ) : (
          ""
        )}
        {reaction ? (
          <span style={{ marginLeft: "5px" }}>{icon(reaction)}</span>
        ) : (
          <span className="check-box-dammy"></span>
        )}

        <div className="reaction-box">
          {emojiSelector && (
            <div className={"PokemonSelector_Idle"}>
              <FacebookSelector
                iconSize={40}
                onSelect={(label) => {
                  setEmojiSelector(false);
                  setReaction(label);
                }}
              />
            </div>
          )}
        </div>
      </span>
    </div>
  );
}

function icon(str) {
  const text = {
    like: "Like",
    love: "Love",
    haha: "Haha",
    wow: "Wow",
    angry: "Angry",
    sad: "Sad",
  };

  return text[str] || "Like";
}
