        var template = React.createClass({
            render: function() {
                return hwRT.apply(this);
            }
        });
        React.render(
            React.createElement(template, null),
            document.getElementById('example')
        );
