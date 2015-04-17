        //var section_template = require('../section_templates/fav.rt.js');
        var React = require('react/addons');

        var movies = require('../../json/movies');
        var icecream = require('../../json/icecream');
        var snacks = require('../../json/snacks');
        var songs = require('../../json/songs');

        var eventstream = function() {
          var obj = {};
          var subscribers = [];

          var register = function(callback) {
            subscribers.push(callback);
          };

          var notify = function(args) {
            for(var i = 0; i < subscribers.length; i++) {
              subscribers[i](args);
            }
          } 
      
          obj.register =register;
          obj.notify = notify;
          return obj;
        }

        


        var comment_txt = "FILMNAME is a fantastic film with many likeable things that I will want to talk about here. I have a little more to talk about.";

        for (var i = 0; i < movies.length; i++){
          movies.picks[i].comment = comment_txt.replace("FILMNAME", movies[i].title);
        }

        var sections = [ movies,snacks,songs,icecream];
        var ExternalLink = React.createClass({
          render: function() {
          var link = this.props.link;
          if(link && link.text && link.url) { 
              return (
                <span>&nbsp;-&nbsp;<a href={link.url} target="_blank" className="link external">{link.text}</a></span>
              );
            }
           else {
            return (
              <span></span>
            )
            }
          }
        });
        var Pick = React.createClass({
          updateSelection: function(id) {
              this.setState({selected: id == this.props.index});
            },
          getInitialState: function() {
            this.props.stream.register(this.updateSelection);
            return {
              selected: this.props.selected
            }
          },
          handler: function(e) {
            e.preventDefault();
            this.props.stream.notify(this.props.index);
            this.setState({selected: true});
          },
          render: function() {
            var classes="fav-pick" + (this.state.selected? " selected":"") ;
              return (
<li className={classes}>
  <a onClick={this.handler} href="#" className="fav-link">{this.props.title}</a><ExternalLink link={this.props.link} /></li>
              );
            }
        });
        var PickList = React.createClass({
          getInitialState: function() {
            return {
              picks : this.props.picks
            }
          },
          render: function() {
            stream = this.props.stream;
            var list = this.state.picks.map(function(pick, index){
              var selected = pick.selected; 
              return (
                <Pick key={pick.title} link={pick.link} title={pick.title} selected={selected} index={index} stream={stream} />
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
            updateComment: function(id) {
                this.setState({comment : this.state.picks[id].comment});
            },
            getInitialState: function() {
              var eventStream = new eventstream();
              eventStream.register(this.updateComment);
              return {
                    title: this.props.title,
                    picks: this.props.picks,
                    comment: this.props.picks[this.props.default].comment,
                    stream: eventStream
                };
            },
            render: function() {
              return (
              <div className="fav-mod" id={this.state.title.replace(" ", "-")}>
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
                    <PickList picks={this.state.picks} stream={this.state.stream}/>
                  </div>
                </div>
                </div>

                )
            }
        });
        var FavNav = React.createClass({
            render: function() {
              return (
                <div className="fav-nav">
                  <span className="nav-title">&lt;3</span>
                </div>
              );
            }
        });
        var Lists = React.createClass({
            render: function() {
                var fav_sections = this.props.sections.map(function(section) {
                    section.picks[0].selected = true;
                    return ( 
                      <Section default={0} key={section.title} title={section.title} picks={section.picks} />
                    );
                });
                return ( 
                   <div className="sections-list" >
                    <FavNav /> 
                    <div className="fav-sections">{fav_sections}</div>
                   </div>
                );
            }
        });
        React.render(
            <Lists sections={sections} />,
            document.getElementById('main')
        );
