var React = require('react');
var PropTypes = require('prop-types');
var createClass = require('create-react-class');
var cs = require('classnames');
var moment = require('moment');
require('moment-range');
var Cell = require('./Cell');
var ViewHeader = require('./ViewHeader');

module.exports = createClass({

    propTypes: {
        date: PropTypes.object,
        minDate: PropTypes.any,
        maxDate: PropTypes.any,
        changeView: PropTypes.func
    },

    years: [],

    checkIfYearDisabled: function (year) {
        return year.clone().endOf('year').isBefore(this.props.minDate) ||
            year.clone().startOf('year').isAfter(this.props.maxDate);
    },

    next: function() {
        var nextDate = this.props.date.clone().add(10, 'years');

        if (this.props.maxDate && nextDate.isAfter(this.props.maxDate)) {
            nextDate = this.props.maxDate;
        }

        this.props.setDate(nextDate);
    },

    prev: function() {
        var prevDate = this.props.date.clone().subtract(10, 'years');

        if (this.props.minDate && prevDate.isBefore(this.props.minDate)) {
            prevDate = this.props.minDate;
        }

        this.props.setDate(prevDate);
    },

    rangeCheck: function (currYear) {
        if (this.years.length === 0) {
            return false;
        }

        return this.years[0].label <= currYear && this.years[this.years.length-1].label >= currYear;
    },

    getYears: function () {
        var now = this.props.date,
            start = now.clone().subtract(5, 'year'),
            end = now.clone().add(6, 'year'),
            currYear = now.year(),
            items = [],
            inRange = this.rangeCheck(currYear);

        if (this.years.length > 0 && inRange) {
            return this.years;
        }

        moment()
            .range(start, end)
            .by('years', function(year) {
                items.push({
                    label: year.format('YYYY'),
                    disabled: this.checkIfYearDisabled(year),
                    curr: currYear === year.year()
                });
            }.bind(this));

        this.years = items;
        return items;
    },

    cellClick: function (e) {
        var year = parseInt(e.target.innerHTML, 10);
        var date = this.props.date.clone().year(year);

        if (this.checkIfYearDisabled(date)) {
            return;
        }

        this.props.prevView(date);
    },


    render: function () {
        var years = this.getYears();
        var currYear = this.props.date.year();

        var yearsCells = years.map(function (item, i) {
            var _class = cs({
                'year': true,
                'disabled': item.disabled,
                'current': item.label == currYear
            });
            return React.createElement(Cell, {value: item.label, classes: _class, key: i})
        });

        var currentDate = [years[0].label, years[years.length-1].label].join('-');

        return (
            React.createElement("div", {className: "years-view"}, 
                React.createElement(ViewHeader, {
                    prev: this.prev, 
                    next: this.next, 
                    data: currentDate}), 

                React.createElement("div", {className: "years", onClick: this.cellClick}, yearsCells)
            )
        );
    }

});
