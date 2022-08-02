import React, { Component } from "react";
import { movies } from "./getmovie";
export default class Favourites extends Component {
  constructor() {
    super();
    this.state = {
      generes: [],
      currgenre: "GENRE",
      movies: [],
      currtext: "",
      limit: 5,
      currpage:1
    };
  }
  componentDidMount() {
    let genreids = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Sci-Fi",
      10770: "TV",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };
    let data = JSON.parse(localStorage.getItem("movies app") || "[]");
    let temparr = [];
    data.forEach((movieObj) => {
      if (!temparr.includes(genreids[movieObj.genre_ids[0]])) {
        temparr.push(genreids[movieObj.genre_ids[0]]);
      }
    });
    temparr.unshift("GENRE");
    this.setState({
      generes: [...temparr],
      movies: [...data],
    });
  }

  handleGenerChange = (generes) => {
    this.setState({
      currgenre: generes,
    });
  };
  sortPopularitydesc = () => {
    let stemp = this.state.movies;
    stemp.sort(function (obja, objb) {
      return objb.popularity - obja.popularity;
    });
    this.setState({
      movies: [...stemp],
    });
  };
  sortPopularityasc = () => {
    let stemp = this.state.movies;
    stemp.sort(function (obja, objb) {
      return obja.popularity - objb.popularity;
    });
    this.setState({
      movies: [...stemp],
    });
  };
  sortRatingasc = () => {
    let stemp = this.state.movies;
    stemp.sort(function (obja, objb) {
      return obja.vote_average - objb.vote_average;
    });
    this.setState({
      movies: [...stemp],
    });
  };
  sortRatingdesc = () => {
    let stemp = this.state.movies;
    stemp.sort(function (obja, objb) {
      return objb.vote_average - obja.vote_average;
    });
    this.setState({
      movies: [...stemp],
    });
  };
  handlePageChange=(page)=>{
   this.setState({
    currpage:page
   })
  };
  handelDelete=(id)=>{
    let newarr=[];
    newarr=this.state.movies.filter((movieObj)=>movieObj.id!=id)
    this.setState({
        movies:[...newarr]
    })
    localStorage.setItem("movies app", JSON.stringify(newarr))
  }
  render() {
    const Movie = movies.results;
    console.log(Movie);
    let genreids = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Sci-Fi",
      10770: "TV",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };
    let filterarr = [];
    if (this.state.currtext == "") {
      filterarr = this.state.movies;
    } else {
      filterarr = this.state.movies.filter((movieObj) => {
        let title = movieObj.original_title.toLowerCase();
        return title.includes(this.state.currtext.toLowerCase());
      });
    }
    //    if(this.state.currgenre=='GENRE'){
    //     filterarr=this.state.movies;
    //    }
    if (this.state.currgenre != "GENRE") {
      filterarr = this.state.movies.filter(
        (movieObj) => genreids[movieObj.genre_ids[0]] === this.state.currgenre
      );
    }
let pages=Math.ceil(filterarr.length/this.state.limit);
let pagesarr=[]
for(let i=1;i<=pages;i++){
    pagesarr.push(i);
}
let stidx=(this.state.currpage-1)*this.state.limit;
let endidx=stidx+this.state.limit;
filterarr=filterarr.slice(stidx,endidx);
    return (
      <div>
        <>
          <div className="main">
            <div className="row">
              <div className="col-lg-3 col-sm-12">
                <ul class="list-group favourites-genre">
                  {this.state.generes.map((gener) =>
                    this.state.currgenre == gener ? (
                      <li
                        class="list-group-item "
                        style={{
                          background: "#0d6efd",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        {gener}
                      </li>
                    ) : (
                      <li
                        class="list-group-item "
                        style={{ background: "white", color: "#0d6efd" }}
                        onClick={() => this.handleGenerChange(gener)}
                      >
                        {gener}
                      </li>
                    )
                  )}

                  {/* <li class="list-group-item active" aria-current="true">
                        GENRES
                      </li>
                      <li class="list-group-item">Action</li>
                      <li class="list-group-item">Action</li>
                      <li class="list-group-item">Action</li>
                      <li class="list-group-item">Action</li> */}
                </ul>
              </div>
              <div className="col-lg-9 favourite-table col-sm-12">
                <div className="row">
                  <input
                    type="text"
                    className="input-group-text col"
                    placeholder="Search"
                    value={this.state.currtext}
                    onChange={(e) =>
                      this.setState({ currtext: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    className="input-group-text col"
                    placeholder="Number of rows"
                    value={this.state.limit} 
                    onChange={(e)=>this.setState({
                        limit:e.target.value
                    })}
                  />
                </div>
                <div className="row">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Genre</th>
                        <th scope="col">
                          <div style={{ display: "flex" }}>
                            <i
                              class="bi bi-caret-up-fill"
                              onClick={this.sortPopularitydesc}
                            />
                            <i class="bi bi-caret-down-fill" onClick={this.sortPopularityasc}/>
                            Popularity
                          </div>
                        </th>
                        <th scope="col"><div style={{ display: "flex" }}>
                            <i
                              class="bi bi-caret-up-fill"
                              onClick={this.sortRatingdesc}
                            />
                            <i class="bi bi-caret-down-fill" onClick={this.sortRatingasc}/>Rating</div></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filterarr.map((movieObj) => (
                        <tr>
                          <td>
                            {" "}
                            <img
                              src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                              alt={movieObj.title}
                              style={{ width: "12rem" }}
                            />
                            {movieObj.original_title}
                          </td>
                          <td>{genreids[movieObj.genre_ids[0]]}</td>
                          <td>{movieObj.popularity}</td>
                          <td>{movieObj.vote_average}</td>
                          <td>
                            <button type="button" class="btn btn-primary"
                            onClick={()=>this.handelDelete(movieObj.id)}>
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <nav aria-label="Page navigation example">
                  <ul class="pagination">
                    {
                        pagesarr.map((page)=>(
                            <li class="page-item">
                      <a class="page-link" onClick={()=>this.handlePageChange(page)}>
                        {page}
                      </a>
                      </li>
                        ))
                    }
                   
                   
                   
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </>
      </div>
    );
  }
}
