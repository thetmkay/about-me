        var template = require('../templates/eight.rt.js');
        var React = require('react/addons');

        var movies = [
            'The Dark Knight',
            'Princess Mononoke',
            'Ocean\'s 11',
            'In Bruges',
            'Love Actually',
            '500 Days of Summer',
            'Lost in Translation',
            'Something Else'
        ];

        var movies_eight = React.createClass({
            getInitialState: function() {
                return {
                    title: 'movies',
                    eight: movies
                };
            },
            render: function() {
                return template.apply(this);
            }
        });
        React.render(
            React.createElement(movies_eight, null),
            document.getElementById('example')
        );
