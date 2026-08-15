import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Tooltip,
  Legend,
} from 'chart.js'
import ChartFilter from './ChartFilter/ChartFilter'
import Loading from '../../../../UI/Loading/Loading'
import { useCallback, useEffect, useState } from 'react'
import { useShowsQuery } from '../../../../../queries/useShows'

// Manual registration (vs. `chart.js/auto`, which registers every chart type/scale/plugin) — this
// dashboard only ever renders a single Bar chart, and `chart.js/auto` was pulling ~320KB of unused
// chart types into the admin bundle.
ChartJS.register(CategoryScale, LinearScale, BarElement, BarController, Tooltip, Legend)

const EMPTY_SHOWS = []
const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

const getMonth = (date, myMonth) => {
  date.setMonth(myMonth)
  return date.toLocaleString('en-US', { month: 'short' }).toUpperCase()
}

const buildChartData = (year, upcoming, past) => {
  const shows = [...upcoming, ...past].map((show) => {
    const date = new Date(show.date)
    return { ...show, month: getMonth(date, date.getMonth()), year: date.getFullYear() }
  })
  const showsForYear = shows.filter((show) => show.year === year)
  const years = [...new Set(shows.map((show) => show.year))]

  return {
    chartData: {
      labels: MONTHS,
      datasets: [
        {
          label: 'SHOWS / MONTH',
          data: MONTHS.map((month) => showsForYear.filter((show) => show.month === month).length),
          backgroundColor: ['#1D3557'],
          borderRadius: 10,
        },
      ],
    },
    years,
  }
}

const Chart = () => {
  const currentYear = new Date().getFullYear()
  const { data, isPending, isSuccess } = useShowsQuery()
  const upcomingShows = data?.upcomingShows ?? EMPTY_SHOWS
  const pastShows = data?.pastShows ?? EMPTY_SHOWS

  const [selectedYear, setSelectedYear] = useState(currentYear)
  const [chartData, setChartData] = useState(null)
  const [yearsData, setYearsData] = useState([])

  const applyYear = useCallback(
    (year) => {
      const { chartData, years } = buildChartData(year, upcomingShows, pastShows)
      setChartData(chartData)
      setYearsData(years)
    },
    [upcomingShows, pastShows],
  )

  useEffect(() => {
    if (isSuccess) applyYear(selectedYear)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, upcomingShows, pastShows])

  const handleYearChange = (year) => {
    setSelectedYear(year)
    applyYear(year)
  }

  return (
    <div className="relative flex min-h-[400px] w-full flex-col">
      <ChartFilter
        filterChartData={handleYearChange}
        currYear={selectedYear}
        yearsData={yearsData}
      />
      {isPending ? (
        <Loading />
      ) : isSuccess && chartData?.datasets[0].data.some((count) => count > 0) ? (
        <Bar data={chartData} />
      ) : isSuccess ? (
        <h3 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-medium text-[var(--color-muted)]">
          No data for this year.
        </h3>
      ) : (
        <h3 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-medium text-[var(--color-muted)]">
          SOMETHING WENT WRONG.
        </h3>
      )}
    </div>
  )
}

export default Chart
