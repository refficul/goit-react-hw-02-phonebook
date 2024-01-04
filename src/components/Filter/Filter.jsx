import PropTypes from 'prop-types';

export const Filter = ({ onSearch, filterValue }) => {
    return <label className="mb-2 flex flex-col items-center gap-2">Find contacts by name
        <input value={filterValue} type="text" onChange={(e) => onSearch(e.target.value)} className="rounded-lg pl-2 text-black"></input>
    </label>
}

Filter.propTypes = {
   onSearch: PropTypes.func.isRequired,
   filterValue: PropTypes.string.isRequired,
};