import React from "react"

// CSS Imports
import "./Filters.css"

const Filters = (props) => {
  const data = props.data

  if (data) {
    let uniqueContinents = [
      ...new Set(data["geonames"].map((item) => item.continent))
    ]
    uniqueContinents.sort()
    uniqueContinents.unshift("ALL")

    const continentOptions = uniqueContinents.map((continent) => (
      <option key={continent} value={continent}>
        {continent}
      </option>
    ))

    return (
      <div className="Filters">
        <label className="Filters-label" for="selectContinent">
          Continent
        </label>
        <select
          className="Filters-select"
          id="selectContinent"
          onChange={(e) => props.onChange(e.target.value, "continent")}
        >
          {continentOptions}
        </select>
        <label className="Filters-label" for="selectMetric">
          Metric
        </label>
        <select
          className="Filters-select"
          id="selectMetric"
          onChange={(e) => props.onChange(e.target.value, "metric")}
        >
          <option value="ALL">ALL</option>
          <option value="areaInSqKm">Area in Square KM</option>
          <option value="population">Population</option>
        </select>
        <label className="Filters-label" for="selectResults">
          Results
        </label>
        <select
          className="Filters-select"
          id="selectResults"
          onChange={(e) => props.onChange(e.target.value, "results")}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
    )
  }

  return (
    <div className="Filters">
      <label className="Filters-label" for="selectContinent">
        Continent
      </label>
      <select className="Filters-select" id="selectContinent" disabled>
        <option value="ALL">ALL</option>
      </select>
      <label className="Filters-label" for="selectMetric">
        Metric
      </label>
      <select className="Filters-select" id="selectMetric" disabled>
        <option value="ALL">ALL</option>
        <option value="areaInSqKm">Area in Square KM</option>
        <option value="population">Population</option>
      </select>
      <label className="Filters-label" for="selectResults">
        Results
      </label>
      <select className="Filters-select" id="selectResults" disabled>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20"></option>
      </select>
    </div>
  )
}

export default Filters
