import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './App.css'

const API = 'https://itunes.apple.com/us/rss/topalbums/limit=100/json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: PropTypes.array.isRequired,
      feed: null,
      uri: null,
      title: '',
      filteredEntries: null,
     };
     this.handleInputChange = this.handleInputChange.bind(this);
     
    }

  componentDidMount(){
    if(this.state.title === ''){
    fetch(API)
  .then(results => {
    return results.json();
  }).then(data => {
    let entries = data.feed.entry.map((ent) => {      
     return(     
  <div key={ent['title']['label'].toString()+" "+ent['category']['attributes']['term'].toString()}>
  <div></div>
    <div className="mt-5 mt-lg-0 col-sm-4 col-md-2">
      <div className="thecard">
        <div className="thecard__side thecard__side--front">
          <div className="card border-primary mb-3">
          <div className="card-header"><p>Album : {ent['title']['label'].split('-')[0].substring(0,40)}</p></div>
          <div className="card-body text-primary">
            <center><img src={ent['im:image'][2]['label']} alt="some text" width={ent['im:image'][2]['attributes']['height']} height={ent['im:image'][2]['attributes']['height']}/></center>
            <p>Artist :{ent['title']['label'].split('-')[1]}</p>
            <p>Category :{ent['category']['attributes']['term']}</p>
            <p>Price :{ent['im:price']['label']} {ent['im:price']['attributes']['currency']}</p>
          </div>
				</div>
      </div>
      
      <div className="thecard__side thecard__side--back">
				<div className="card text-white bg-dark mb-3">
          <div className="card-header"><p>Aditional Information</p></div>
          <div className="card-body">
          <center><img src={ent['im:image'][1]['label']} alt="some text" width={ent['im:image'][1]['attributes']['height']} height={ent['im:image'][1]['attributes']['height']}/></center>
            <p>rights :{ent['rights']['label']}</p>
            <a href={ent['link']['attributes']['href']}>Link to itunes</a>
            <p>Releaase Date :{ent['im:releaseDate']['attributes']['label']}</p>
          </div>
				</div>
      </div>
    </div>
  </div>
</div>
            
      )
    })
    var feed = data['feed']['author']['name']['label']
    var uri = data['feed']['author']['uri']['label']
    this.setState({entries: entries});
    this.setState({feed: feed});
    this.setState({uri: uri});
    this.setState({filteredEntries: entries});
    //console.log("state", this.state.entries);
  })
}
  }

  handleInputChange(e) {    
    this.setState({
      title: e.target.value
    });
    //console.log(e.target.value);
    if(e.target.value !== ''){
      var test =  
      this.state.entries.filter((ent2) => {
        if(ent2['key'].toLowerCase().includes(e.target.value.toLowerCase())){ 
          return true;
        }
        return false;
      })
      this.setState({entries: test});
    }else if(e.target.value === ''){
      this.setState({entries: this.state.filteredEntries});
      this.componentDidMount();
    }
  }
 
  render(){
    return(
      <div> 
      <center><a href={this.state.uri}>{this.state.feed}</a></center>
      <div className="form-group">
            <input
              type="text"
              name="album"
              className="form-control"
              value={this.state.album}
              onChange={this.handleInputChange}
              placeholder="Search by Album, Artist, Category"
              />
          </div>
          <div>      
      </div>
      <div className="row mt-5">
       {this.state.entries}
      </div>
      </div>
    )   
  }
}
export default App;