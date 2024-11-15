import {Movie} from "./type";

interface CinemaProps {
    name : string;
    movies: Movie[];
  }
  
  const Cinema =  (props : CinemaProps)=>{
    return(
      <>
        <h2>{props.name}</h2>
        <div>
          <ul>
            {props.movies.map((movie)=>(
                <li key={movie.title}>
                    <strong>{movie.title}</strong> - Realistateur : {movie.director}
                </li>
            ))}
          </ul>
        </div>
      </>
    )
  }
  export default Cinema;