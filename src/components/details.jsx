const React = require('react');

class Details extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          fav: this.props.fav,
        };
      }


    addToFav = () => {
        var people = {name: this.props.name};
        this.props.addToFav(people);
        this.setState({fav: !this.state.fav});
    }

    render() {
        const { name, gender, birth_year, height, mass, films } = this.props;
        return (
            <div className='details'>
                <div>
                    <h1>{name}</h1> <img onClick={this.addToFav} className="img" src={this.state.fav === false ? "./noFav.png" : "./fav.png"} alt="fav" />
                    <h3>{gender}</h3>
                    <h3>birth date: {birth_year}</h3>
                    <h3>Amount of films: {films}</h3>
                    <h3>Height: {height} | Mass: {mass}</h3>
                </div>
            </div>

        )
    }
}

module.exports = Details;