import { SearchIcon } from "../assets/icons/SearchIcon"

export const Search = ({ onSearch, value }: ISearch) => {
    return <div className="box search-container" >
        <SearchIcon />
        <input value={value} onChange={e => onSearch(e.target.value)} placeholder="Search videos" />
    </div>
}

interface ISearch {
    onSearch: (value: string) => void;
    value: string;
}