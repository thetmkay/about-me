        //var section_template = require('../section_templates/fav.rt.js');
        var section_template = require('../templates/fav-section.rt.js');
        var header_template = require('../templates/fav-nav.rt.js');
        var React = require('react/addons');

        var movies = [
            { title: 'The Dark Knight'},
            { title: 'Princess Mononoke'},
            { title: 'Ocean\'s 11'},
            { title: 'In Bruges'},
            { title: 'Love Actually'},
            { title: '500 Days of Summer'},
            { title: 'Lost in Translation'},
            { title: 'Something Else'}
        ];

        var sections = [{
            title: 'movies',
            'picks': movies
        }];

        var Section = React.createClass({
            getInitialState: function() {
                return {
                    title: this.props.title,
                    picks: this.props.picks
                };
            },
            render: function() {
                return section_template.apply(this);
            }
        });
        var FavNav = React.createClass({
            render: function() {
              return header_template.apply(this);
            }

        });
        var Lists = React.createClass({
            render: function() {
                var fav_sections = this.props.sections.map(function(section) {
                    section.picks[0].selected = true;
                    return ( 
                      <Section title={section.title} picks={section.picks} />
                    );
                });
                return ( 
                   <div className="sections-list" >
                    <FavNav /> 
                    {fav_sections}
                   </div>
                );
            }
        });
        React.render(
            <Lists sections={sections} />,
            document.body
        );
