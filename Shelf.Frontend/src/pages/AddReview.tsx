import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieSelect from "../components/MovieSelect";

const AddReview = ({auth}: {auth: boolean}) => {
    const [rating, setRating] = useState<number | "">("");

    const navigate = useNavigate();
    useEffect(() => {
            if (!auth) {
                navigate('/login-register');
            }
    }, [auth]);

    const handleAdd = (movie: any) => {
        console.log(movie);
    }
    
    return (
        <>
            <div className="w-100 d-flex justify-content-center">
                <div className="d-flex flex-column col-6">
                    <h1>Add Review</h1>
                    <form className="">
                        <label className="form-label h3">Movie</label>
                        <MovieSelect onChange={handleAdd}/>
                        <label className="form-label h3 mt-3">Rating</label>
                        <select 
                            className="form-select mb-4"
                            onChange={e => setRating(Number(e.target.value))}
                            required
                        >
                            <option value="" >Select Rating...</option>
                            {[...Array(10)].map((_, index) => (
                                <option key={index + 1} value={index + 1}>{index + 1}</option>
                            ))}
                        </select>
                        <textarea className="form-control mt-3 mb-4" rows={5} placeholder="Write your review here..."></textarea>
                        <button className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddReview;