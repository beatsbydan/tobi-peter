import Dropdown from '../../UI/Dropdown/Dropdown'
import { ALL_COUNTRIES, MISSING_COUNTRY } from '../../../Hooks/useCountryFilter'

const CountryFilter = ({ countries, value, onChange }) => (
  <div className="w-full max-w-60">
    <Dropdown
      list={[ALL_COUNTRIES, MISSING_COUNTRY, ...countries]}
      initialValue={value}
      onClick={onChange}
    />
  </div>
)

export default CountryFilter
