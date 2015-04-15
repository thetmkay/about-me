        var hwRT = require('../templates/hw.rt.js');
        var React = require('react/addons');
        console.log('george nishimura');
        var template = React.createClass({
            render: function() {
                return hwRT.apply(this);
            }
        });
        React.render(
            React.createElement(template, null),
            document.getElementById('example')
        );
