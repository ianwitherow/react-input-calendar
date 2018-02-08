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
            <div className="navigation-wrapper">
                <span onClick={prop.prev} className="icon" ><i className="fa fa-angle-left"></i></span>
                <span onClick={prop.titleAction} className="navigation-title" >{prop.data}</span>
                <span onClick={prop.next} className="icon" ><i className="fa fa-angle-right"></i></span>
            </div>
        );
    }

});
