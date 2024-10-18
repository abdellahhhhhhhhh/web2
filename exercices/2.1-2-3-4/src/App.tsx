const App = () => {
  const pageTitle = "Informations sur les films dans les cinémas";

  const cinema1Name = "UGC DeBrouckère";
  const cinema1Movie1Title = "Film 1 - DeBrouckère";
  const cinema1Movie1Director = "Director A";
  const cinema1Movie2Title = "Film 2 - DeBrouckère";
  const cinema1Movie2Director = "Director B";

  const cinema2Name = "UGC Toison d'Or";
  const cinema2Movie1Title = "Film 1 - Toison d'Or";
  const cinema2Movie1Director = "Director C";
  const cinema2Movie2Title = "Film 2 - Toison d'Or";
  const cinema2Movie2Director = "Director D";

  return (
    <div>
      <PageTitle title={pageTitle} />
      

      <div>
        <Cinema 
          name={cinema1Name}
          title={cinema1Movie1Title}
          director={cinema1Movie1Director}
          title2={cinema1Movie2Title}
          director2={cinema1Movie2Director}
        />
      </div>

      <div>
        <Cinema2
         name={cinema2Name}
         title={cinema2Movie1Title}
         director={cinema2Movie1Director}
         title2={cinema2Movie2Title}
         director2={cinema2Movie2Director}
         />
      </div>
    </div>
  );
};

interface PageTitleProps {
  title : string ;
}
const PageTitle = (props : PageTitleProps)=>{
  return (
      <h1>{props.title}</h1>
  );
}

interface Cinema1NameProps {
  name : string;
  title: string;
  director : string;
  title2: string;
  director2: string;
}
const Cinema = (props : Cinema1NameProps )=>{
  return(
    <>
    <h2>{props.name}</h2>
    <ul>
      <li>
        <strong>{props.title}</strong> - Réalisateur :{" "}{props.director}
      </li>
      <li><strong>{props.title2}</strong>- Réalisateur :{" "}{props.director2}
      </li>
    </ul>
    </>
  );
}
interface Cinema2NameProps{
  name: string;
  title:string;
  director : string;
  title2: string;
  director2: string;
}
const Cinema2 =  (props : Cinema2NameProps)=>{
  return(
    <>
      <h2>{props.name}</h2>

      <ul>
        <li><strong>{props.title}</strong>- Réalisateur :{" "}{props.director}
        </li>
        <li><strong>{props.title2}</strong>- Réalisateur :{" "}{props.director2}
        </li>
      </ul>

    </>
  )
}
export default App;
