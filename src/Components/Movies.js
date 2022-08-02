import React, { Component } from "react";
//import { movies } from "./getmovie";
import axios from "axios";
export default class Movies extends Component {
  constructor() {
    super();
    this.state = {
      hover: "",
      parr: [1],
      currentpage:1,
      movies:[],
      favourites:[]
    };
  }
 async componentDidMount() {
    //side effect work is done here
    const res=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${this.state.currentpage}`);
    let data =res.data;
   // console.log(data);
   this.setState({
    movies:[...data.results]
   }
   )
    
  }
 changemovies= async()=>{
    console.log('Movie change called');
    console.log(this.state.currentpage);
    const res=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${this.state.currentpage}`);
    let data =res.data;
   // console.log(data);
   this.setState({
    movies:[...data.results]
   }
   )

  }
  handelright=()=>{
    let temparr=[]
     for(let i=1;i<=this.state.parr.length+1;i++){
            temparr.push(i);
     }
     this.setState({
        parr:[...temparr],
        currentpage:this.state.currentpage+1
     },this.changemovies)
     
  }
  handleleft=()=>{
   
    if(this.state.currentpage!=1){
        this.setState({
            currentpage:this.state.currentpage-1
        },this.changemovies)
    }
  }
  handleClick=(value)=>{
     if(value!=this.state.currentpage){
         this.setState({
            currentpage:value
         },this.changemovies)
     }
  }

  handleFavourites=(movie)=>{
    let olddata= JSON.parse(localStorage.getItem('movies app') || '[]');
    if(this.state.favourites.includes(movie.id)){
        olddata=olddata.filter((m)=>m.id!=movie.id)
    }
    else{
        olddata.push(movie)
    }
    localStorage.setItem('movies app',JSON.stringify(olddata))
    console.log(olddata);
    this.handleFavouritesState();
  }

  handleFavouritesState=()=>{
    let olddata= JSON.parse(localStorage.getItem('movies app') || '[]');
    let temp=olddata.map((movie)=>movie.id);
    this.setState({
        favourites:[...temp]
    })
  }
  render() {
   // let movie = movies.results;
 
    return (
      <>
        {this.state.movies.length === 0 ? (
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div>
            <h3 className="text-center">
              <strong>Trending</strong>
            </h3>
            <div className="movies-list">
              {this.state.movies.map((movies0bj) => (
                <div
                  className="card movie-card grow"
                  onMouseEnter={() => this.setState({ hover: movies0bj.id })}
                  onMouseLeave={() => this.setState({ hover: "" })}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/original${movies0bj.backdrop_path}`}
                    className="card-img-top movie-img"
                    alt={movies0bj.title}
                  />
                  {/* <div className="card-body"> */}
                  <h5 className="card-title movie-title">{movies0bj.title}</h5>
                  {/* <p className="card-text movie-overview">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                </p> */}
                  <div className="btn-wrapper">
                    {this.state.hover === movies0bj.id && (
                      <a className="btn btn-primary movie-btn" onClick={()=>this.handleFavourites(movies0bj)}>
                       {this.state.favourites.includes(movies0bj.id) ? "Remove from favourites" : "Add to favourites"} 
                      </a>
                    )}
                  </div>
                  {/* </div> */}
                </div>
              ))}
            </div>
            <div className="pagination-cont">
              <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <li class="page-item">
                    <a class="page-link" onClick={this.handleleft}>
                      Previous
                    </a>
                  </li>
                  {this.state.parr.map((value) => (
                    <li class="page-item">
                      <a class="page-link" onClick={()=>this.handleClick(value)}>
                        {value}
                      </a>
                    </li>
                  ))}
                  {/* <li class="page-item">
                    <a class="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">
                      3
                    </a>
                  </li> */}
                  <li class="page-item">
                    <a class="page-link" onClick={this.handelright}>
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}
      </>
    );
  }
}
