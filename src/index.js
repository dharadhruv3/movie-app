import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';

class App extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      movies: []
    };
  
  
  }
  componentDidMount() {
    // Is there a React-y way to avoid rebinding `this`? fat arrow?
    var th = this;
    this.serverRequest = 
      axios.get(this.props.source)
        .then(function(result) {    
          th.setState({
            movies: result.data
          });
        })
  }
  
  componentWillUnmount() {
    this.serverRequest.abort();
  }
  
  render() {
    return (
      <div>
        <h3>Movies!</h3>
        {/* Don't have an ID to use for the key, URL work ok? */}


        {this.state.movies.map(function(movie, i) {
        	var roles = movie.roles.map(role => <ul>
        				<li>{role.actor}</li>
        				<ul><li key="{role.actor}">{role.name}</li></ul>
	            	</ul> )
          return (
          		<ul key={i}>
	               {/*<li>{movie.name}</li>*/}
	                {roles}
                </ul>
          );
        })}
        
      </div>
    )
  }
}

ReactDOM.render(<App source="http://alintacodingtest.azurewebsites.net/api/Movies" />, document.querySelector("#root"));