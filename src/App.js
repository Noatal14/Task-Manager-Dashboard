import Header from './components/Header';
import Table from './components/Table';
import { connect } from "react-redux";

function App() {
  return (
    <div className="App">
      <Header />
      <Table />
    </div>
  );
}

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
