const React = require('react');


class Card extends React.Component {

    goToDetails = () => {
        var people = {name: this.props.name, gender: this.props.gender, birth_year: this.props.birth_year, height: this.props.height, mass: this.props.mass, films: this.props.films, fav: this.props.fav};
        this.props.peopleClick(people);
    }

    addToFav = () => {
        var people = {name: this.props.name};
        this.props.addToFav(people);
    }

    render() {
        const { name, gender, birth_year } = this.props;
        return (
            <div className="card">
                <h2 onClick={this.goToDetails} >{name}</h2> <img onClick={this.addToFav} src={this.props.fav === false ? "./noFav.png" : "./fav.png"} alt="fav"/> <br/>
                <p onClick={this.goToDetails}>{gender} | birth date: {birth_year}</p>
            </div>
        )}
}

module.exports = Card;