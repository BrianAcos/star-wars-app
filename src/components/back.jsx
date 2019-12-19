const React = require('react');

class Back extends React.Component {
    render() {
        return (
            <div className="back" onClick={this.props.goToHome}>&#60; Volver al listado</div>
        )}
}

module.exports = Back;