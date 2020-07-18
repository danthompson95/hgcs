import React, { Component } from "react"

// CSS Imports
import "./App.css"

// Importing Child Components
import Header from "./components/Header/Header"
import Filters from "./components/Filters/Filters"
import Results from "./components/Results/Results"

// Data info
const API =
  "http://api.geonames.org/countryInfoJSON?formatted=true&username=hydrane"

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: false,
      error: null,
      filters: {
        continent: "ALL",
        metric: "ALL",
        results: 5
      }
    }
  }

  componentDidMount() {}

  goButtonClickHandler() {
    fetch(API)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error("Something went wrong ...")
        }
      })
      .then((apiData) => this.setState({ data: apiData }))
      .catch((error) => this.setState({ error }))
  }

  filterChangedHandler(value, select) {
    this.setState({
      filters: {
        ...this.state.filters,
        [select]: value
      }
    })
  }

  render() {
    const { data, error, filters } = this.state

    if (error) {
      return <p>{error.message}</p>
    }

    return (
      <div className="App">
        <Header onClick={this.goButtonClickHandler.bind(this)} />
        <Filters data={data} onChange={this.filterChangedHandler.bind(this)} />
        <Results data={data} filters={filters} />
      </div>
    )
  }
}

export default App
