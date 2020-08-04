const React = require('react');
const Navbar = require('./components/navbar');
const Card = require('./components/card');
const Details = require('./components/details');
const Filter = require('./components/filter');
const Back = require('./components/back');

// import React from 'react';
// export default Back;
// "homepage": "https://brianacos.github.io/star-wars-app/",

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      section: 'home',
      people: [],
      error: '',
      peopleClick: [],
    };
  }

//FETCH PARA BUSCAR LOS 10 PRIMERO PERSONAJES DE STAR WARS
  UNSAFE_componentWillMount() {
    fetch('https://swapi.dev/api/people/')
      .then(res => res.json())
      .then(data => {
        this.setState({
          people: data.results.map((result) => {
            const { name, gender, birth_year, height, mass } = result;
            const films = result.films.length;
            const fav = false;
            const obj = {name, gender, birth_year, height, mass, films, fav };
            return obj
          }),
          error: '',
        });
      })
      //SI NO HAY RESPUESTA DE LA API
      .catch((err) => {
        this.setState({
          people: [],
          error: 'Error al cargar personajes',
        });
        console.log(err);
        alert('error al cargar personajes');
      });
  }

  currentSection() {
    //SECCION HOME
    if (this.state.section === 'home') {
      return (
        <React.Fragment>
          <Filter section={this.state.section} goToFav={this.goToFav} />
          <div className="grid">
            {this.state.people.map(people => <Card addToFav={this.addToFav} peopleClick={this.peopleClick} fav={people.fav} name={people.name} gender={people.gender} birth_year={people.birth_year} height={people.height} mass={people.mass} films={people.films} key={people.name} />)}
          </div>
        </React.Fragment>
      );
    }
    //SECCION DETALLES DEL QUE SE LE HIZO CLICK
    if (this.state.section === 'details') {
      return (
        <React.Fragment>
          <Back goToHome={this.goToHome} />
          <Details addToFav={this.addToFav} fav={this.state.peopleClick.fav} name={this.state.peopleClick.name} gender={this.state.peopleClick.gender} birth_year={this.state.peopleClick.birth_year} height={this.state.peopleClick.height} mass={this.state.peopleClick.mass} films={this.state.peopleClick.films} />
        </React.Fragment>
      );
    }
    //SECCION FAVORITOS
    if (this.state.section === 'fav') {
      return (
        <React.Fragment>
          <Filter section={this.state.section} goToHome={this.goToHome} />
          <div className="grid">
            {this.state.people.map(people => {
              if (people.fav === true) {
               return <Card addToFav={this.addToFav} peopleClick={this.peopleClick} fav={people.fav} name={people.name} gender={people.gender} birth_year={people.birth_year} height={people.height} mass={people.mass} films={people.films} key={people.name} />
              } else {return null};
            })}
          </div>
        </React.Fragment>
      );
    }
  }

  // recoge los datos de la card que se hizo click, los agrega al estado en peopleClick, y cambia la seccion a details
  peopleClick = (name) => {
    this.setState({
      peopleClick: name,
    });
    this.goToDetails();
  }

  //agrega a favoritos
  addToFav = (forAdd) => {
    this.setState({
      people: this.state.people.map((people) => {
        if (people.name === forAdd.name) {
          const {name, gender, birth_year, height, mass, films} = people;
          const fav = !people.fav;
          const changeFav = {name, gender, birth_year, height, mass, films, fav};
          return changeFav;
        } else { return people}
      })
    });
  }

// VA A LA SECCION HOME
  goToHome = () => {
    this.setState({
      section: 'home'
    });
  }

// VA A LA SECCION DETALLES
  goToDetails = () => {
    this.setState({
      section: 'details'
    });
  }

//VA A LA SECCION FAVORITOS
  goToFav = () => {
    this.setState({
      section: 'fav'
    });
  }

  render() {
    //SI HAY ERROR LO DIBUJA
    if (this.state.error !== '') {
      return (<div>ERROR: {this.state.error}</div>);
    }
    return (
      <React.Fragment>
        <Navbar />
        {this.currentSection()}
      </React.Fragment>
    );
  }
}

export default App;
