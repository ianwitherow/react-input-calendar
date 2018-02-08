var React = require('react');
var createClass = require('create-react-class');
var PropTypes = require('prop-types');

module.exports = createClass({

    propTypes: {
        next: PropTypes.func,
        prev: PropTypes.func,
        titleAction: PropTypes.func,
        data: PropTypes.string
    },

    render: function () {
        var prop = this.props;

        return (
            React.createElement("div", {className: "navigation-wrapper"}, 
                React.createElement("span", {onClick: prop.prev, className: "icon"}, React.createElement("i", {className: "fa fa-angle-left"})), 
                React.createElement("span", {onClick: prop.titleAction, className: "navigation-title"}, prop.data), 
                React.createElement("span", {onClick: prop.next, className: "icon"}, React.createElement("i", {className: "fa fa-angle-right"}))
            )
        );
    }

});
