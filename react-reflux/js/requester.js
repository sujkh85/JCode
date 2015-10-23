var person = {
  "name" : "ssu",
  "age" : "30",
  "text" : "https"
}

var arr = [{
    name : "name1",
    data : "hihi"
  },
  {
    name : "name2",
    data : "1111"
  }
];

var actions = Reflux.createActions(
  ["updateAge","updateArr"]
)

var store = Reflux.createStore({
  listenables : [actions],

  onUpdateAge(){
    person.age = Math.random() * 100;
    this.trigger({person});
  },
  onUpdateArr(obj){
    arr.push(obj);
    this.trigger({ arr });
  },
  getInitialState(){
    return { person };
  }
});


//sample test

actions.updateAge();
actions.updateArr({
  name : "name3",
  data : "tttt"
});

var App = React.createClass({
  mixins : [Reflux.connect(store)],

  render(){
    var p = this.state.person;
    var items = this.props.items;
    return (
      <div>
        <h2>{p.name}</h2>
        <h2 onClick={actions.updateAge}>{p.age}</h2>
        <h2>{p.text}</h2>
        {
          items.map(function(item){
            return(
              <div>
                <h3>{ item.name }</h3>
                <h3>{ item.data }</h3>
              </div>
            );
          })
        }
      </div>
    );
  }
});

React.render(
  <App items={arr} />,
  document.getElementById('example')
  );