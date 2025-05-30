import AsyncSelect from "react-select/async";
import { useMemo} from "react";
import debounce from "lodash.debounce";


type MovieOption = {
  value: string;
  label: string;
  poster: string;
};


const MovieSelect = ({ onChange }: { onChange: (option: MovieOption | null) => void }) => {
    const fetchMovies = async (inputValue: string): Promise<MovieOption[]> => {
        if (!inputValue) return [];
        const response = await fetch(
            `/api/movie/search?query=${encodeURIComponent(inputValue)}`,
        );
        const data = await response.json();
        if (!data.Search) return [];
        return data.Search.map((movie: any) => ({
            value: movie.imdbID,
            label: movie.Title,
            poster: movie.Poster || "https://via.placeholder.com/100x150?text=No+Image", // Fallback image
        }));
    };

    const debouncedFetchMovies = useMemo(() => {
        return debounce(
            (inputValue: string, callback: (options: MovieOption[]) => void) => {
            fetchMovies(inputValue).then(callback);
            },
            500
        );
    }, []);

    return (
        <AsyncSelect
            required={true}
            cacheOptions
            loadOptions={debouncedFetchMovies}
            onChange={onChange}
            placeholder="Search for a movie..."
            getOptionLabel={option => option.label}
            formatOptionLabel={option => (
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={option.poster} alt={option.label} style={{ width: 100, marginRight: 10 }} />
                <span>{option.label}</span>
            </div>
            )}
            getOptionValue={option => option.value}
            isClearable
            styles={{
                control: (base, state) => ({
                ...base,
                backgroundColor: "#212529", // Bootstrap dark bg
                color: "#fff",
                borderColor: state.isFocused ? "#86b7fe" : "#495057",
                boxShadow: state.isFocused ? "0 0 0 0.2rem rgba(13,110,253,.25)" : "none",
                '&:hover': {
                    borderColor: "#86b7fe",
                },
                }),
                menu: (base) => ({
                ...base,
                backgroundColor: "#343a40", // Darker dropdown bg
                color: "#fff",
                zIndex: 1051,
                }),
                option: (base, state) => ({
                ...base,
                backgroundColor: state.isFocused
                    ? "#495057"
                    : "#343a40", // Hover and default colors
                color: "#fff",
                '&:active': {
                    backgroundColor: "#495057",
                },
                }),
                singleValue: (base) => ({
                ...base,
                color: "#fff",
                }),
                input: (base) => ({
                ...base,
                color: "#fff",
                }),
                placeholder: (base) => ({
                ...base,
                color: "#adb5bd", // Bootstrap secondary text
                }),
            }}    
        />
    );
};

export default MovieSelect;