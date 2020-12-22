import React from 'react';
import Card from './card'


export default class PlayGround extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cardImage: ['Aatrox', 'Ashe', 'Bard', 'Caitlyn', 'Darius', 'Ekko', 'Ezreal', 'Irelia', 'Jhin', 'Mordekaiser', 'Nasus', 'Nautilus', 'Pyke', 'Shen', 'Talon',
                'Lux', 'Master_Yi', 'Riven', 'Sion', 'Swain', 'Twisted_Fate', 'Vayne', 'Vladimir', 'Xin_Zhao', 'Yasuo'],
            duplicatedCards: [],
            randomizedCards: [],
            finalizedCards: [],
            openedCards: [],
            score: 0,
            matchedCards: 0,
            win: false,
            /* Timer */
            minutes: 0,
            seconds: 0,
            millis: 0,
            running: false,

            page1: true,
            page2: false,
            page3: false,

            name: '',
            pairs: 15,
            IsNext: 'human',
            playingvsbot: 'false',
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleStartClick = this.handleStartClick.bind(this);
        this.handleStopClick = this.handleStopClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.easy = this.easy.bind(this);
        this.normal = this.normal.bind(this);
        this.hard = this.hard.bind(this);
        this.start = this.start.bind(this)
        this.Bot = this.Bot.bind(this)
        this.solo = this.solo.bind(this)
        this.playingBot = this.playingBot.bind(this)

    }
    /* Pseudo */
    handleChange(event) {
        this.setState({ name: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ page1: false, page2: true });
    }


    /* Timer*/
    handleStartClick() {
        if (!this.state.running) {
            this.interval = setInterval(() => {
                this.tick();
            }, 100)

            this.setState({ running: true })
        }
    }

    handleStopClick() {
        if (this.state.running) {
            clearInterval(this.interval);
            this.setState({ running: false })
        }
    }


    tick() {
        let millis = this.state.millis + 1;
        let seconds = this.state.seconds;
        let minutes = this.state.minutes;

        if (millis === 10) {
            millis = 0;
            seconds = seconds + 1;
        }

        if (seconds === 60) {
            millis = 0;
            seconds = 0;
            minutes = minutes + 1;
        }

        this.update(millis, seconds, minutes);
    }

    zeroPad(value) {
        return value < 10 ? `0${value}` : value;
    }

    update(millis, seconds, minutes) {
        this.setState({
            millis: millis,
            seconds: seconds,
            minutes: minutes
        });
    }


    /*Game*/

    handleClick(name, index) {
        console.log(name);
        console.log(index);
        console.log(this.state.finalizedCards)
        this.handleStartClick();
        if (this.state.openedCards.length === 2) {
            setTimeout(() => {
                this.check();

            }, 750);


        } else {
            let Image = {
                name,
                index
            }
            let finalizedCards = this.state.finalizedCards
            let cardImage = this.state.openedCards
            finalizedCards[index].close = false
            cardImage.push(Image)
            this.setState({
                openedCards: cardImage,
                finalizedCards: finalizedCards
            })
            if (this.state.openedCards.length === 2) {
                setTimeout(() => {
                    this.check()
                }, 750);

            }
        }

    }
    Bot() {
        let currentIndex = this.state.finalizedCards.length;
        let randomIndex = Math.floor(Math.random() * currentIndex);
        let randomIndex2 = Math.floor(Math.random() * currentIndex);
        if (this.state.IsNext === 'bot') {
            setTimeout(() => {
                document.getElementsByClassName('card')[randomIndex2].click()
            document.getElementsByClassName('card')[randomIndex].click()  
            }, 750);
            
        }
    }

    check() {
        this.state.IsNext === 'human' ? this.setState({IsNext : 'bot'}) : this.setState({IsNext : 'human'});
        let finalizedCards = this.state.finalizedCards
        if ((this.state.openedCards[0].name === this.state.openedCards[1].name) && (this.state.openedCards[0].index !== this.state.openedCards[1].index)) {
            finalizedCards[this.state.openedCards[0].index].complete = true
            finalizedCards[this.state.openedCards[1].index].complete = true
            this.setState({ score: this.state.score + 3 })
            this.setState({ matchedCards: this.state.matchedCards + 1 })
            if (this.state.matchedCards === this.state.cardImage.length) { this.setState({win : true}) }
        } else {
            finalizedCards[this.state.openedCards[0].index].close = true
            finalizedCards[this.state.openedCards[1].index].close = true
            this.setState({ score: this.state.score <= 0 ? this.state.score : this.state.score - 1 })
        }
        this.setState({
            finalizedCards,
            openedCards: []
        });
        if (this.state.playingvsbot) { this.Bot() };
    }
    start() {
        this.state.cardImage = this.shuffle(this.state.cardImage)
        this.state.cardImage.length = this.state.pairs;
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
        this.state.finalizedCards = finalizedCards;
        console.log(this.start.duplicatedCards)

    }
    shuffle(array) {
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

    /* Render */
    PrintWinner() {
        if (this.state.win) {
            this.handleStopClick();
            const points_bonus = this.state.pairs === 6 ? (this.state.seconds <= 30 ? 3 : 0) : this.state.pairs === 12 ? 
                (this.state.seconds <= 50 ? 3 : 0) : this.state.pairs === 15 ? (this.state.minutes <= 2 ? 3 : 0) : 0;
            return (
                <div className="victory">Bien Joué {this.state.name} ! <br></br>Tu as Gagné avec {this.state.score + points_bonus} points  dont {points_bonus} points bonus et un temps de {this.state.minutes < 1 ? '' : this.state.minutes + 'minutes '} {this.state.seconds} secondes
                </div>
            )
        }
    }

    login_page() {
        return (
            <div className="page1">
                <div className="page_title">Bienvenue sur le jeu Memory Game réalisé en Reactjs</div>
                <div className="rule">
                    <ul className="rules">Les règles du jeu :
                        <li>Le joueur doit retourner 2 cartes identiques afin de remporter la paire</li>
                        <li>Retourner 2 cartes identiques rapporte 3 points</li>
                        <li>Retourner 2 cartes différentes fait perdre 1 points (toutefois, le score ne peut descendre en dessous de 0)</li>
                        <li>Terminer rapidement la partie rapporte des points supplémentaires</li>
                        <li>Le chronomètre se lancera automatiquement après la première carte retourné</li>
                        <li>Récupérer toutes les paires du plateau afin de gagner</li>
                    </ul>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Pseudo :<br></br>
                        <input type="text" value={this.state.name} onChange={this.handleChange} required />
                    </label><br></br>
                    <input type="submit" value="Jouer" />
                </form>
            </div>
        )
    }
    game_page() {
        return (<div>
                    {this.state.win ? this.PrintWinner() :
                        <div className="txt">Pseudo : {this.state.name}
                            <div className="segments">
                                <span className="mins">Timer : {this.zeroPad(this.state.minutes)}:</span>
                                <span className="secs">{this.zeroPad(this.state.seconds)} </span>
                                <span className="millis">.{this.state.millis}</span>
                            </div>
                            <div className="score"> Score : {this.state.score}</div>
                        </div>
                    }
                    <div className="playground">
                        {
                            this.state.finalizedCards.map((Image, index) => {
                                return <Card Image={Image.name} click={() => { this.handleClick(Image.name, index) }} close={Image.close} complete={Image.complete} />
                            })
                        }
                    </div>
                </div>
        )
    }
    bot_page() {
        return (
            <div className="difficulty">
                Choisir la difficulté de la partie :
                <div>
                    <a href="# " onClick={this.playingBot}>
                        <p><span className="bg"></span><span className="base"></span><span className="text">Jouer contre l'ordinateur</span></p>
                    </a>
                    <a className="transparent" href="# " onClick={this.solo}>
                        <p><span className="bg"></span><span className="base"></span><span className="text">Jouer seul</span></p>
                    </a>
                </div>
            </div>
        )
    }
    playingBot() {
        this.setState({ page3: false });
        this.setState({playingvsbot : true});
        console.log(this.state.playingvsbot)
    }
    solo() {
        this.setState({ page3: false });
        this.setState({playingvsbot : false});
        console.log(this.state.playingvsbot)
    }
    loadPage3() {
        this.setState({ page2: false, page3: true });
    }
    easy() {
        this.state.pairs = 6;
        this.loadPage3();
        this.start();
    }
    normal() {
        this.state.pairs = 12;
        this.loadPage3();
        this.start();
    }
    hard() {
        document.body.style.height = "1200px";
        this.state.pairs = 15;
        this.loadPage3();
        this.start();
    }
    difficulty_page() {
        return (
            <div className="difficulty">
                Choisir la difficulté de la partie :
                <div>
                    <a href="# " onClick={this.easy}>
                        <p><span className="bg"></span><span className="base"></span><span className="text">Facile : 6 paires</span></p>
                    </a>
                    <a className="white" href="# " onClick={this.normal}>
                        <p><span className="bg"></span><span className="base"></span><span className="text">Moyen : 12 paires</span></p>
                    </a>
                    <a className="transparent" href="# " onClick={this.hard}>
                        <p><span className="bg"></span><span className="base"></span><span className="text">Difficile : 15 paires</span></p>
                    </a>
                </div>
            </div>
        )
    }
    render() {
        return (
            <React.Fragment>
                {this.state.page1 ? this.login_page() : this.state.page2 ? this.difficulty_page() : this.state.page3 ? this.bot_page() : this.game_page()}
            </React.Fragment>

        )
    }
}
