// var SuperheroList = React.createClass({
//   render: function(){
//     return(
//       <div>
//       things....
//       </div>
//     );
//   }
// });//call this in your .render below
var SuperheroList = React.createClass({
  render: function(){
    var SuperheroNodes = this.props.data.map(function(superindex){
      return (
        <div key={superindex.id}>//this key is part of the giphy api requirements
          <img src={superindex.images.original.url}/>
        </div>
      )
    }); //data relates to what you called Superherolist below
    return (
      <div>
        {SuperheroNodes}
      </div>
    );
  }

});

//2 ways to do api:
// way 1:
// var SuperheroList = React.createClass({
//   loadSuperheroes: function() {//here's your function on click
//     console.log("works!")
//   },
//   render: function(){
//     return (
//       <div>
//         <button onClick={this.loadSuperheroes}>click for stuff</button>
//       </div>
//     );
//   }
// });
//way 2:
var SuperheroPage = React.createClass({
  loadSuperheroes: function() {//here's your function on click
    $.ajax({
      method: "GET",
      url: "http://api.giphy.com/v1/gifs/search?q=superhero&api_key=dc6zaTOxFJmzC",
success: function(data){//success is like your promise
  console.log(data);
  this.setState({list: data.data})
}.bind(this),
  error: function(xhr, status, err){
    console.log(status, err.toString())

  }.bind(this)


    })
    this.setState({name: "Nick"})//goes with getInitialState.  this is how you reset that value
    console.log("works!")
  },
  componentDidMount: function(){//"as soon as page loads, do the contained code" - no button needed
    this.loadSuperheroes();
  },//this is an object! use your commas!
  getInitialState: function(){
    return {//each key is the initial value
      // name: "Steve"
      list: []
    }
  },
  render: function(){
    return(
      <div>
        <button onClick={this.loadSuperheroes}>click for stuff</button>
        <SuperheroList data={this.state.list}/>//sets this.state.list to var data
      </div>
    );//{this.state.list}goes with initialstate
  }
});






// write this first, put at bottom
ReactDOM.render(
  <SuperheroPage/>,//connects the component on top
  document.getElementById('content')
);


///this.component.data only works in a render method.  if you use this.state, you open the scope to the whole app, while securing that state name as a single object (so you can't build 2 identical component names).
