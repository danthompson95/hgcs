import React from "react"

// Importing highcharts
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"

// Importing react-table
import { useTable, useBlockLayout, useSortBy } from "react-table"
import { FixedSizeList } from "react-window"

const Results = (props) => {
  const data = props.data
  const filters = props.filters

  const getPopulationData = () => {
    data.geonames.sort((a, b) =>
      a.population > b.population ? 1 : b.population > a.population ? -1 : 0
    )
    let resultTotal = filters.results
    let populationCounter = 0
    let parsedPopulationData = []
    let aggregatedPopulationData = 0
    for (let i in data.geonames) {
      if (filters.continent === "ALL") {
        if (populationCounter < resultTotal) {
          parsedPopulationData.push({
            name: data.geonames[i].countryName,
            y: parseInt(data.geonames[i].population)
          })
          populationCounter++
        } else {
          aggregatedPopulationData += parseInt(data.geonames[i].population)
        }
      } else {
        if (data.geonames[i].continent === filters.continent) {
          if (populationCounter < resultTotal) {
            parsedPopulationData.push({
              name: data.geonames[i].countryName,
              y: parseInt(data.geonames[i].population)
            })
            populationCounter++
          } else {
            aggregatedPopulationData += parseInt(data.geonames[i].population)
          }
        }
      }
    }

    parsedPopulationData.push({
      name: "Other",
      y: aggregatedPopulationData
    })

    const options = {
      title: {
        text: "Population"
      },
      chart: {
        type: "pie"
      },
      series: [
        {
          data: parsedPopulationData
        }
      ]
    }

    return options
  }

  const getAreaData = () => {
    data.geonames.sort((a, b) =>
      a.areaInSqKm > b.areaInSqKm ? 1 : b.areaInSqKm > a.areaInSqKm ? -1 : 0
    )
    let resultTotal = filters.results
    let areaCounter = 0
    let parsedAreaData = []
    let aggregatedAreaData = 0

    for (let i in data.geonames) {
      if (filters.continent === "ALL") {
        if (areaCounter < resultTotal) {
          parsedAreaData.push({
            name: data.geonames[i].countryName,
            y: parseInt(data.geonames[i].areaInSqKm)
          })
          areaCounter++
        } else {
          aggregatedAreaData += parseInt(data.geonames[i].areaInSqKm)
        }
      } else {
        if (data.geonames[i].continent === filters.continent) {
          if (areaCounter < resultTotal) {
            parsedAreaData.push({
              name: data.geonames[i].countryName,
              y: parseInt(data.geonames[i].areaInSqKm)
            })
            areaCounter++
          } else {
            aggregatedAreaData += parseInt(data.geonames[i].areaInSqKm)
          }
        }
      }
    }

    parsedAreaData.push({
      name: "Other",
      y: aggregatedAreaData
    })

    const options = {
      title: {
        text: "Area"
      },
      chart: {
        type: "pie"
      },
      series: [
        {
          data: parsedAreaData
        }
      ]
    }

    return options
  }

  const getAllTableData = () => {
    data.geonames.sort((a, b) =>
      a.continent > b.continent ? 1 : b.continent > a.continent ? -1 : 0
    )
    let tableData = []
    let columns = [
      {
        Header: "Continent",
        accessor: "continentName",
        Footer: (info) => {
          return <>Totals:</>
        }
      },
      {
        Header: "Country Name",
        accessor: "countryName",
        Footer: (info) => {
          const total = React.useMemo(
            () => info.rows.reduce((sum) => 1 + sum, 0),
            [info.rows]
          )

          return <>{total}</>
        }
      },
      {
        Header: "Area Square KM",
        accessor: "areaInSqKm",
        Footer: (info) => {
          const total = React.useMemo(
            () =>
              info.rows.reduce(
                (sum, row) => parseInt(row.values.areaInSqKm) + sum,
                0
              ),
            [info.rows]
          )

          return <>{total}</>
        }
      },
      {
        Header: "Population",
        accessor: "population",
        Footer: (info) => {
          const total = React.useMemo(
            () =>
              info.rows.reduce(
                (sum, row) => parseInt(row.values.population) + sum,
                0
              ),
            [info.rows]
          )

          return <>{total}</>
        }
      }
    ]

    for (let i in data.geonames) {
      if (filters.continent === "ALL") {
        tableData.push({
          continentName: data.geonames[i].continent,
          countryName: data.geonames[i].countryName,
          areaInSqKm: data.geonames[i].areaInSqKm,
          population: data.geonames[i].population
        })
      } else {
        if (data.geonames[i].continent === filters.continent) {
          tableData.push({
            continentName: data.geonames[i].continent,
            countryName: data.geonames[i].countryName,
            areaInSqKm: data.geonames[i].areaInSqKm,
            population: data.geonames[i].population
          })
        }
      }
    }

    return [tableData, columns]
  }

  const getAreaTableData = () => {
    data.geonames.sort((a, b) =>
      a.continent > b.continent ? 1 : b.continent > a.continent ? -1 : 0
    )
    let tableData = []
    let columns = [
      {
        Header: "Continent",
        accessor: "continentName",
        Footer: (info) => {
          return <>Totals:</>
        }
      },
      {
        Header: "Country Name",
        accessor: "countryName",
        Footer: (info) => {
          const total = React.useMemo(
            () => info.rows.reduce((sum) => 1 + sum, 0),
            [info.rows]
          )

          return <>{total}</>
        }
      },
      {
        Header: "Area Square KM",
        accessor: "areaInSqKm",
        Footer: (info) => {
          const total = React.useMemo(
            () =>
              info.rows.reduce(
                (sum, row) => parseInt(row.values.areaInSqKm) + sum,
                0
              ),
            [info.rows]
          )

          return <>{total}</>
        }
      }
    ]

    for (let i in data.geonames) {
      if (filters.continent === "ALL") {
        tableData.push({
          continentName: data.geonames[i].continent,
          countryName: data.geonames[i].countryName,
          areaInSqKm: data.geonames[i].areaInSqKm
        })
      } else {
        if (data.geonames[i].continent === filters.continent) {
          tableData.push({
            continentName: data.geonames[i].continent,
            countryName: data.geonames[i].countryName,
            areaInSqKm: data.geonames[i].areaInSqKm
          })
        }
      }
    }

    return [tableData, columns]
  }

  const getPopulationTableData = () => {
    data.geonames.sort((a, b) =>
      a.continent > b.continent ? 1 : b.continent > a.continent ? -1 : 0
    )
    let tableData = []
    let columns = [
      {
        Header: "Continent",
        accessor: "continentName",
        Footer: (info) => {
          return <>Totals:</>
        }
      },
      {
        Header: "Country Name",
        accessor: "countryName",
        Footer: (info) => {
          const total = React.useMemo(
            () => info.rows.reduce((sum) => 1 + sum, 0),
            [info.rows]
          )

          return <>{total}</>
        }
      },
      {
        Header: "Population",
        accessor: "population",
        Footer: (info) => {
          const total = React.useMemo(
            () =>
              info.rows.reduce(
                (sum, row) => parseInt(row.values.population) + sum,
                0
              ),
            [info.rows]
          )

          return <>{total}</>
        }
      }
    ]

    for (let i in data.geonames) {
      if (filters.continent === "ALL") {
        tableData.push({
          continentName: data.geonames[i].continent,
          countryName: data.geonames[i].countryName,
          population: data.geonames[i].population
        })
      } else {
        if (data.geonames[i].continent === filters.continent) {
          tableData.push({
            continentName: data.geonames[i].continent,
            countryName: data.geonames[i].countryName,
            population: data.geonames[i].population
          })
        }
      }
    }

    return [tableData, columns]
  }

  if (data) {
    let populationOptions = getPopulationData()
    let areaOptions = getAreaData()

    if (filters.metric === "ALL") {
      let [tableData, columns] = getAllTableData()

      return (
        <div className="Results">
          <HighchartsReact
            className="Results-two-charts"
            highcharts={Highcharts}
            options={populationOptions}
          />
          <HighchartsReact
            className="Results-two-charts"
            highcharts={Highcharts}
            options={areaOptions}
          />
          <Table className="Results-table" columns={columns} data={tableData} />
        </div>
      )
    } else if (filters.metric === "areaInSqKm") {
      let [tableData, columns] = getAreaTableData()

      return (
        <div className="Results">
          <HighchartsReact
            className="Results-one-chart"
            highcharts={Highcharts}
            options={areaOptions}
          />
          <Table className="Results-table" columns={columns} data={tableData} />
        </div>
      )
    } else {
      let [tableData, columns] = getPopulationTableData()

      return (
        <div className="Results">
          <HighchartsReact
            className="Results-one-chart"
            highcharts={Highcharts}
            options={populationOptions}
          />
          <Table className="Results-table" columns={columns} data={tableData} />
        </div>
      )
    }
  }
  return <div className="Results"></div>
}

function Table({ columns, data }) {
  const defaultColumn = React.useMemo(
    () => ({
      width: 150
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    totalColumnsWidth,
    prepareRow
  } = useTable(
    {
      columns,
      data,
      defaultColumn
    },
    useBlockLayout,
    useSortBy
  )

  const RenderRow = React.useCallback(
    ({ index, style }) => {
      const row = rows[index]
      prepareRow(row)
      return (
        <div
          {...row.getRowProps({
            style
          })}
          className="tr"
        >
          {row.cells.map((cell) => {
            return (
              <div {...cell.getCellProps()} className="td">
                {cell.render("Cell")}
              </div>
            )
          })}
        </div>
      )
    },
    [prepareRow, rows]
  )

  return (
    <div {...getTableProps()} className="table">
      <div>
        {headerGroups.map((headerGroup) => (
          <div {...headerGroup.getHeaderGroupProps()} className="tr">
            {headerGroup.headers.map((column) => (
              <div
                {...column.getHeaderProps(column.getSortByToggleProps())}
                className="th"
              >
                {column.render("Header")}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div {...getTableBodyProps()}>
        <FixedSizeList
          height={400}
          itemCount={rows.length}
          itemSize={35}
          width={totalColumnsWidth}
        >
          {RenderRow}
        </FixedSizeList>
      </div>
      <div>
        {footerGroups.map((footerGroups) => (
          <div {...footerGroups.getFooterGroupProps()}>
            {footerGroups.headers.map((column) => (
              <div {...column.getFooterProps()} className="td">
                {column.render("Footer")}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Results
