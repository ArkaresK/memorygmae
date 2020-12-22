
import React from 'react';
export default class Card extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
      }
    clicked(Image){
      this.props.click(Image)
    }
    render(){
      return (
        <div className={"card" + (!this.props.close ? ' opened' : '') + (this.props.complete ? ' matched' : '')} onClick={() => this.clicked(this.props.Image)}>
          <div className="front">
          </div>
          <div className="back">
            <img src={/*akali */"https://raw.githubusercontent.com/ArkaresK/memorygmae/master/static/icons/" 
            + this.props.Image + ".png"} alt={this.props.Image}/>
          </div>
        </div>
      )
    }
  }