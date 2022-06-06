import React from "react";

function CastItem({ data }) {
  const { name, character, profile_path } = data;
  return (
    <div className="cast-item">
      <img
        src={
          profile_path
            ? `https://image.tmdb.org/t/p/w500${profile_path}`
            : "https://images.unsplash.com/photo-1535704882196-765e5fc62a53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YW5pbWUlMjBnaXJsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
        }
        alt={name}
      />
      <p className="cast-name">{name} </p>
      <p className="cast-character">{character}</p>
    </div>
  );
}

export default CastItem;
