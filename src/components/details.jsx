const React = require('react');

class Details extends React.Component {
    render() {
        const { name, gender, birth_year, height, mass, } = this.props;
        return (
            <div className='details'>
                <h1>{name}</h1>
                <h3>{gender}</h3>
                <h3>birth date: {birth_year}</h3>
                <h3>Amount of films: numero de films </h3>
                <h3>Height: {height} | Mass: {mass} </h3>
            </div>
                
        )}
}

module.exports = Details;