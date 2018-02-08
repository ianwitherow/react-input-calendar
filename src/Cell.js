var React = require('react');
var createClass = require('create-react-class');
var PropTypes = require('prop-types');
var moment = require('moment');
require('moment-range');

module.exports = createClass({

    propTypes: {
        value: PropTypes.string,
        classes: PropTypes.string
    },

    render: function () {
        var classes = this.props.classes + ' cell';

        return (
            React.createElement("div", {className: classes}, this.props.value)
        );
    }

});
