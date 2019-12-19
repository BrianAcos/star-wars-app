import React from 'react';
import './App.css';
const Navbar = require('./components/navbar');
const Card = require('./components/card');
const Details = require('./components/details');
const Filter = require('./components/filter');
const Back = require('./components/back');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      section: 'home',
      people: [],
      error: '',
      peopleClick: [],
      fav: [],
    };
  }

  UNSAFE_componentWillMount() {
    fetch('https://swapi.co/api/people')
      .then(res => res.json())
      .then(data => {
        this.setState({
          people: data.results,
          error: '',
        });
        console.log(this.state.people);
      })
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
    if (this.state.section === 'home') {
      return (
        <React.Fragment>
          <Filter />
          {this.state.people.map(people => <Card addToFav={this.addToFav} peopleClick={this.peopleClick} name={people.name} gender={people.gender} birth_year={people.birth_year} height={people.height} mass={people.mass} films={people.films} key={people.name} />)}
        </React.Fragment>
      );
    }
    if (this.state.section === 'details') {
      return (
        <React.Fragment>
          <Back goToHome={this.goToHome} />
          <Details name={this.state.peopleClick.name} gender={this.state.peopleClick.gender} birth_year={this.state.peopleClick.birth_year} height={this.state.peopleClick.height} mass={this.state.peopleClick.mass} films={this.state.peopleClick.films} />
        </React.Fragment>
      );
    }
    if (this.state.section === 'fav') {
      return (
        <React.Fragment>
          <Filter />
          {this.state.fav.map(people => <Card addToFav={this.addToFav} peopleClick={this.peopleClick} name={people.name} gender={people.gender} birth_year={people.birth_year} height={people.height} mass={people.mass} films={people.films} key={people.name} />)}
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
      fav: [forAdd],
      // fav: this.state.fav.map( people => { if (people.name !== forAdd.name) {return  [...forAdd]}
      // })
    });
    console.log(this.state.fav);
    
  }


  goToHome = () => {
    this.setState({
      section: 'home'
    });
  }

  goToDetails = () => {
    this.setState({
      section: 'details'
    });
  }

  goToFav = () => {
    this.setState({
      section: 'fav'
    });
  }

  render() {
    if (this.state.error !== '') {
      return (<div>ERROR: {this.state.error}</div>);
    }
    return (
      <React.Fragment>
        <Navbar />
        {this.currentSection()}
        <button onClick={this.goToHome}>seccion home</button>
        <button onClick={this.goToDetails}>seccion details</button>
        <button onClick={this.goToFav}>seccion fav</button>


      </React.Fragment>
    );
  }
}

export default App;
