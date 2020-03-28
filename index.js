const root = document.getElementById("root");
//######################################################//
//Function we will use
function makeoperation(a, b, op) {
  let number = 0;
  switch (op) {
    case "+":
      number = parseFloat(a) + parseFloat(b);
      break;
    case "-":
      number = parseFloat(a) - parseFloat(b);
      break;
    case "x":
      number = parseFloat(a) * parseFloat(b);
      break;
    case "/":
      number = parseFloat(a) / parseFloat(b);
      break;
    case "%":
      number = parseFloat(a) % parseFloat(b);
      break;
  }
  return "" + number;
}
function changeSign(number){
  let n = parseFloat(number);
  return n > 0 ? "-" + n : "" + Math.abs(n);
}
//##################################################################//
//Main classes
class AcButton extends React.Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(){
    this.props.acClicked();
  }
  render() {
    return <button className="button" onClick={this.handleClick} >{this.props.value}</button>;
  }
}
class OperatorButton extends React.Component {
  constructor(props){
    super(props);
    this.handleChangeSign = this.handleChangeSign.bind(this);
    this.handleoperatorClicked = this.handleoperatorClicked.bind(this);
  }
  handleChangeSign(){
    this.props.signChange();
  }
  handleoperatorClicked(){
    this.props.operatorButton(this.props.value);
  }

  render() {
    return (
      <button className="button operatorButton" onClick={this.props.value == "+/-" ? this.handleChangeSign : this.handleoperatorClicked} >{this.props.value}</button>
    );
  }
}
class NumberButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleNumberChange = this.handleNumberChange.bind(this);
  }
  handleNumberChange() {
    this.props.numberClicked(this.props.value);
  }
  render() {
    return (
      <button
        className={this.props.value == "0" ? "button zeroButton" : "button"}
        onClick={this.handleNumberChange}
      >
        {this.props.value}
      </button>
    );
  }
}
class ButtonPalette extends React.Component {
  constructor(props) {
    super(props);
    this.passNumber = this.passNumber.bind(this);
    this.passAc = this.passAc.bind(this);
    this.changeSign = this.changeSign.bind(this);
    this.operatorClick = this.operatorClick.bind(this);
  }
  passNumber(number) {
    this.props.numberClicked(number);
  }
  passAc(){
    this.props.acClicked();
  }
  changeSign(){
    this.props.changeSignClicked();
  }
  operatorClick(value){
    this.props.operatorChanger(value);
  }

  render() {
    return (
      <div className="buttonPanel">
        <AcButton value="AC" acClicked={this.passAc} />
        <OperatorButton value="+/-" signChange={this.changeSign}/>
        <OperatorButton value="%" operatorButton={this.operatorClick} />
        <OperatorButton value="÷" operatorButton={this.operatorClick}/>

        <NumberButton value="7" numberClicked={this.passNumber} />
        <NumberButton value="8" numberClicked={this.passNumber} />
        <NumberButton value="9" numberClicked={this.passNumber} />
        <OperatorButton value="x" operatorButton={this.operatorClick}/>

        <NumberButton value="4" numberClicked={this.passNumber} />
        <NumberButton value="5" numberClicked={this.passNumber} />
        <NumberButton value="6" numberClicked={this.passNumber} />
        <OperatorButton value="-" operatorButton={this.operatorClick}/>

        <NumberButton value="1" numberClicked={this.passNumber} />
        <NumberButton value="2" numberClicked={this.passNumber} />
        <NumberButton value="3" numberClicked={this.passNumber} />
        <OperatorButton value="+"operatorButton={this.operatorClick}/>

        <NumberButton value="0" numberClicked={this.passNumber} />
        <NumberButton value="." numberClicked={this.passNumber} />
        <OperatorButton value="=" operatorButton={this.operatorClick} />
      </div>
    );
  }
}
class ResultPanel extends React.Component {
  render() {
    return <div className="resultPanel">{this.props.result}</div>;
  }
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screenNumber: "0",
      resultNumber: "",
      operator : "",
      lastOperator: "",
      lastNumber : ""
    };
    this.addNumber = this.addNumber.bind(this);
    this.acClicked = this.acClicked.bind(this);
    this.changeSign = this.changeSign.bind(this);
    this.changeOperator = this.changeOperator.bind(this);
  }
  addNumber(number) {
    this.setState((state, props) => ({
      screenNumber:
        state.screenNumber == "0" || state.operator != "" ? number : state.screenNumber + number,
      operator : ""
    }));
  }
  acClicked(){
    this.setState({
      screenNumber : "0",
      resultNumber: "",
      lastOperator: "",
      lastNumber : "",
      operator : ""
    })
  }
  changeSign(){
    this.setState((state,props) => ({
      screenNumber : state.screenNumber == "0" ? "0" : changeSign(state.screenNumber),
    }))
  }
  changeOperator(value){
    
    if(value == "="){
      if(this.state.lastOperator == "")return;
      this.setState((state,props) => ({
        screenNumber : makeoperation(state.lastNumber,state.screenNumber,state.lastOperator),
        resultNumber :  makeoperation(state.lastNumber,state.screenNumber,state.lastOperator),
        lastOperator : ""
      }))
    }
    else{
      this.setState((state, props) => ({
        operator : value,
        lastOperator : value,
        lastNumber : state.screenNumber
      }))
    }
    
  }
  render() {
    return (
      <div className="app">
        <ResultPanel result={this.state.screenNumber} />
        <ButtonPalette numberClicked={this.addNumber} acClicked={this.acClicked} changeSignClicked={this.changeSign} operatorChanger={this.changeOperator} />
      </div>
    );
  }
}
//Rendering
ReactDOM.render(<App />, root);
