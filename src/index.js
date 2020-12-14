import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
/*import App from './App';
import reportWebVitals from './reportWebVitals';*/

class PlayGround extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
        cardImage: ['angular2','vue','react','grunt','phantomjs','ember','babel','ionic','gulp','meteor','yeoman','yarn','nodejs','bower','browserify'],
        duplicatedCards: [],
        randomizedCards: [],
        finalizedCards: [],
        openedCards: []
      }
      this.start()
    }
    handleClick(name,index){
      if(this.state.openedCards.length === 2){
        setTimeout(() => {
          this.check()
        },750)
      }else {
        let framework = {
          name,
          index
        }
        let finalizedCards = this.state.finalizedCards
        let cardImage = this.state.openedCards
        finalizedCards[index].close = false
        cardImage.push(framework)
        this.setState({
          openedCards: cardImage,
          finalizedCards: finalizedCards
        })
        if(this.state.openedCards.length === 2){
          setTimeout(() => {
            this.check()
          },750)
        }
      }
    } 
    check(){
      let finalizedCards = this.state.finalizedCards
      if((this.state.openedCards[0].name === this.state.openedCards[1].name) && (this.state.openedCards[0].index !== this.state.openedCards[1].index)){
        finalizedCards[this.state.openedCards[0].index].complete = true
        finalizedCards[this.state.openedCards[1].index].complete = true
      }else {
        finalizedCards[this.state.openedCards[0].index].close = true
        finalizedCards[this.state.openedCards[1].index].close = true
      }
      this.setState({
        finalizedCards,
        openedCards: []
      })
    }
    start(){
      let finalizedCards = [];
      this.state.duplicatedCards = this.state.cardImage.concat(this.state.cardImage)
      this.state.randomizedCards = this.shuffle(this.state.duplicatedCards)
      this.state.randomizedCards.map((name) => {
        finalizedCards.push({
          name,
          close: true,
          complete: false,
          fail: false
        })
      })
      this.state.finalizedCards = finalizedCards
    }
    shuffle(array){
      let currentIndex = array.length, temporaryValue, randomIndex;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array
    }
    render(){
      
      return (
        <div className="playground">
            {
              this.state.finalizedCards.map((framework, index) => {
                return <Card framework={framework.name} click={() => {this.handleClick(framework.name,index)}} close={framework.close} complete={framework.complete}/>
              })
            }
        </div>
      )
    }
}

class Card extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
      
      }
    }
  clicked(framework){
    this.props.click(framework)
  }
  render(){
    return (
      <div className={"card" + (!this.props.close ? ' opened' : '') + (this.props.complete ? ' matched' : '')} onClick={() => this.clicked(this.props.framework)}>
        <div className="front">
        </div>
        <div className="back">
          <img src={"https://raw.githubusercontent.com/samiheikki/javascript-guessing-game/master/static/logos/" + this.props.framework + ".png"} alt={this.props.framework}/>
        </div>
      </div>
    )
  }
}

ReactDOM.render( <PlayGround/>, document.getElementById('app'))
/*
import Card from './components/card'
function App(){
  return (
    <div>
      <h2>
        Can you remember where the cards are ?
      </h2>
      <Card 
        id={1}
        width={100}
        height={100}
        back={`../static/images/cards/spades_2.png`}
        front={`../static/images/cards/spades_3.png`}
        flipped={flipped.includes(1)}
        handleClick={()=> handleClick(1)}
        />
    </div>
  )
}
ReactDOM.render( App, document.getElementById('root'))*/