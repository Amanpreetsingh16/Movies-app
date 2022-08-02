import { movies } from "./getmovie";
import React, { Component } from "react";

export default class Banner extends Component {
  render() {
    let Movies = movies.results[0];
    console.log(Movies);
//"https://picsum.photos/id/237/200/100"
    return (
      <>
        {Movies === "" ? (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div className="card banner-card">
            <img
              src={`https://www.themoviedb.org/t/p/original${Movies.backdrop_path}`}
              className="card-img-top banner-img"
              alt={Movies.title}
            />
            {/* <div className="card-body"> */}
            <h2 className="card-title banner-title">{Movies.title}</h2>
            <p className="card-text banner-overview">
             {Movies.overview}
            </p>
            {/* <a href="#" className="btn btn-primary">
                Go somewhere
              </a> */}
            {/* </div> */}
          </div>
        )}
      </>
    );
  }
}
