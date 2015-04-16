        //var section_template = require('../section_templates/fav.rt.js');
        var section_template = require('../templates/fav-section.rt.js');
        var header_template = require('../templates/fav-nav.rt.js');
        var React = require('react/addons');

        var movies = require('../../json/movies').movies;

        var sections = [{
            title: 'movies',
            'picks': movies
        }];


        var comment_txt = "The Dark Knight is a fantastic film with many likeable things that I will want to talk about here. I have a little more to talk about.";

        var Pick = React.createClass({
          getInitialState: function() {
            return {
              title: this.props.title,
              link_text: this.props.link.text,
              link_url: this.props.link.url,
              key: this.props.key,
              selected: this.props.selected
            }
          },
          handler: function(e) {
            this.setState({selected: true});
            console.log(this.state.selected);
            this.props.handler(e);
          },
          render: function() {
            var classes="fav-pick" + (this.state.selected? " selected":"") ;
              return (
<li className={classes}>
  <a onClick={this.handler} href="#" className="fav-link">{this.state.title}</a>&nbsp;-&nbsp; 
  <a href={this.state.link_url} className="link external">{this.state.link_text}</a></li>
              );
            }
        });
        var PickList = React.createClass({
          getInitialState: function() {
            return {
              picks : this.props.picks,
              selected : 0,
              handler : this.props.handler
            }
          },
          render: function() {
            console.log(this.state.picks[0]);
            handler = this.state.handler;
            var list = this.state.picks.map(function(pick, index){
              
              var selected = pick.selected; 
              return (
                <Pick link={pick.link} title={pick.title} selected={selected} key={index} handler={handler.bind(null, index)} />
                )
            });
            return (
              <ol className="fav-list">
                { list }
              </ol>
            )

          }
        });
        var Section = React.createClass({
            getInitialState: function() {
                return {
                    title: this.props.title,
                    picks: this.props.picks,
                    comment: comment_txt
                };
            },
            clickHandler: function(id,e) {
              e.preventDefault();
              console.log(id);
              this.setState({comment : this.state.picks[id].comment});
              console.log(this.state.comment);
            },
            render: function() {
              return (
                <div className="fav-mod movies">
                <div className="fav-row">
                  <label className="fav-label">{this.state.title}</label>
                </div>
                <div className="fav-row fav-container">
                  <div className="feature-col fav-col">
                    <blockquote className="fav-comment">
                      <span className="quote-mark"></span>
                      <p className="fav-comment-txt">{this.state.comment}</p>
                    </blockquote>
                  </div>
                  <div className="list-col fav-col">
                    <PickList picks={this.state.picks} handler={this.clickHandler}/>
                  </div>
                </div>
                </div>

                )
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
                      <Section selected={0} title={section.title} picks={section.picks} />
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
