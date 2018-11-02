import React, { Component } from 'react';
import {FormGroup, FormControl,InputGroup, Glyphicon} from 'react-bootstrap';
import './App.css';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Gallery from './Gallery';

import withAuthorization from './withAuthorization';
import { db } from '../firebase';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      items: [],
      hasError: false,
    };
    this.search=this.search.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  
  handleKeyPress(event){
    if(event.key ==='Enter')
    this.search();
  }

  search(){
    let query = this.state.query;
    const BASE_URL = "https://www.googleapis.com/books/v1/volumes?q=" + query;
    query && fetch(BASE_URL, {method:"GET"})
    .then(response =>  response.json())
    .then(json => {
      let {items} = json;
      this.setState({
        items : items
      })

    })
    console.log("clicked on search  button" , this.state.query);
  }

  handleChange(event){
    this.setState({
      query: event.target.value
    })
  }

  componentDidMount() {
    const { onSetUsers } = this.props;

    db.onceGetUsers().then(snapshot =>
      onSetUsers(snapshot.val())
    );
  }

  componentDidCatch() {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
  }

  render() {
        
    return (
        <div className="Global">
            <h2>Book Explorer!</h2>
            <FormGroup>
                <InputGroup>
                    <FormControl type="text" 
                        placeholder="Search for a book" 
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}
                    />
                    <InputGroup.Addon onClick={this.search}>
                        <Glyphicon glyph="search"></Glyphicon>
                    </InputGroup.Addon>
                </InputGroup>
            </FormGroup>
            <Gallery items={this.state.items} />
        </div>
         );
     }
}
// const byPropKey = (propertyName, value) => () => ({
//     [propertyName]: value,
// });

// const UserList = ({ users }) =>
//     <div>
//         <h2>List of Usernames of Users</h2>
//         <p>(Saved on Sign Up in Firebase Database)</p>

//         {Object.keys(users).map(key =>
//             <div key={key}>{users[key].username}</div>   
//        )}
//     </div>

const mapStateToProps = (state) => ({
    users: state.userState.users,
});
    
const mapDispatchToProps = (dispatch) => ({
    onSetUsers: (users) => dispatch({ type: 'USERS_SET', users }),
});

const authCondition = (authUser) => !!authUser;


export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(HomePage);