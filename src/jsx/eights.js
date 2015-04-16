        //var section_template = require('../section_templates/eight.rt.js');
        var section_template = require('../templates/eight-section.rt.js');
        var header_template = require('../templates/eight-nav.rt.js');
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

        var sections = [{
            title: 'movies',
            'eight': movies
        }];

        var Section = React.createClass({
            getInitialState: function() {
                return {
                    title: 'movies',
                    eight: movies
                };
            },
            render: function() {
                return section_template.apply(this);
            }
        });
        var EightNav = React.createClass({
            render: function() {
              return header_template.apply(this);
            }

        });
        var Lists = React.createClass({
            render: function() {
                var eight_sections = this.props.sections.map(function(section) {
                    return ( 
                      <Section title={section.title} eight={section.eight} />
                    );
                });
                return ( 
                   <div className="sections-list" >
                    <EightNav /> 
                    {eight_sections}
                   </div>
                );
            }
        });
        React.render(
            <Lists sections={sections} />,
            document.body
        );
