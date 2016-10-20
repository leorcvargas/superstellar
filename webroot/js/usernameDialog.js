import { sendMessage, JoinGame } from './communicationLayer';
import * as Utils from "./utils";

const WIDTH = 300;
const HEIGHT = 150;

const TEXT_STYLE = {
  fontFamily: 'Helvetica',
  fontSize: '8px',
  fill: '#FFFFFF',
  align: 'left',
  textBaseline: 'top'
};

export default class UsernameDialog {
  constructor () {
    this.domNode = document.createElement("div");

    this.domNode.className = 'game-dialog';

    this._updatePosition(); 
    this.domNode.innerHTML = `
    <div class="dialog-content">
      <p>Welcome Captain... errhm... what was your name again?</p>
      <form id="submit-username-form">
	<input autofocus class="underline-input" id="insert-name-input" type="text" />
	<input class="action-button" type="submit" value="Blast'em Off!" />
      </form>
    </div>
    `;
  }

  show () {
    document.body.appendChild(this.domNode);
    this.resizeListenerID = window.addEventListener("resize", () => { this._updatePosition() });
    this.submitListenerID  = document.
      getElementById("submit-username-form").
      addEventListener("submit", (ev) => {
	ev.preventDefault();
	this._sendJoinGame();
    });
  }

  hide () {
    window.removeEventListener("resize", this.resizeListenerID);
    window.removeEventListener("submit", this.submitListenerID);
    document.body.removeChild(this.domNode);
  }

  _updatePosition () {
    const { width, height } = Utils.getCurrentWindowSize();

    const x = (width - WIDTH) / 2 + 30;
    const y = (height - HEIGHT) / 2 + 30;

    this.domNode.style.top  = `${y}px`;
    this.domNode.style.left = `${x}px`;
    this.domNode.style.width = `${WIDTH}px`;
    this.domNode.style.height = `${HEIGHT}px`;
  }

  _sendJoinGame () {
    const nickname = document.getElementById("insert-name-input").value;
    sendMessage(new JoinGame(nickname));
  }
}