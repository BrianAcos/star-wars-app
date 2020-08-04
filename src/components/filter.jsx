import React from 'react';

export default class Filter extends React.Component {

    goToSection = () => {
        if (this.props.section === 'home') {
            this.props.goToFav();
        } else {
            this.props.goToHome();
        }
    }

    render() {
        return (
            <div onClick={this.goToSection} className={this.props.section === 'home' ? "filter" : "filter active"}>filtrar por favoritos</div>
        )}
}
