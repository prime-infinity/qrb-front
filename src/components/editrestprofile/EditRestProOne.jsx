import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { editRestProOne } from "../../helpers/web"
import { setRest } from "../../redux/slices/restSlice"

function EditRestProOne(){
    const dispatch = useDispatch();
    const rest = useSelector((state) => state.rest.rest);
    const authState = useSelector((state) => state.auth.auth);
    const [pending, setPending] = useState(false);
    const [error, setErrors] = useState(null);
    const [isUpdated,setIsUpdated]=useState(false)

    const [formData,setFrom]=useState({})

    useEffect(()=>{
        if(rest!==null){
            setFrom({id:rest._id,location:rest.location,year:rest.year,description:rest.description})
        }
        
    },[rest])

    const errorDiv = <small className="text-danger">{error}</small>;

    const handleErrors = (e) => {
        setPending(false)
        e.response?.data ? setErrors(e.response.data) : setErrors(e.message);
    };

    const handleSuccess = (e) => {
        setIsUpdated(true)
        setPending(false)
        dispatch(setRest(e))
    };

    const update = ()=>{
        setPending(true)
        setErrors(null)
        editRestProOne(formData,authState.token).then((res)=>{
            handleSuccess(res)
        }).catch((err)=>{
            handleErrors(err)
        })
    }

    return (
        <div className="col-12">
            <div className="row mx-1">
                <div className="col-12">
                   
                    <span style={{backgroundColor:"#eee"}} className="my-4 form-control border-start-0 ps-0 border-end-0 border-top-0 border border-dark br-0">
                        {rest?.name}
                    </span>

                    <input
                        value={formData.location}
                        onChange={(e)=>setFrom({...formData,location:e.target.value})}
                        type="text"
                        placeholder={formData.location}
                        className="my-4 form-control border-start-0 ps-0 border-end-0 border-top-0 border border-dark br-0"
                    />
                    <input
                        value={formData.year}
                        onChange={(e)=>setFrom({...formData,year:e.target.value})}
                        type="text"
                        placeholder={formData.year}
                        className="my-4 form-control border-start-0 ps-0 border-end-0 border-top-0 border border-dark br-0"
                    />
                    <input
                        value={formData.description}
                        onChange={(e)=>setFrom({...formData,description:e.target.value})}
                        type="text"
                        placeholder={formData.description?formData.description:"brief description"}
                        className="my-4 form-control border-start-0 ps-0 border-end-0 border-top-0 border border-dark br-0"
                    />
                    <div className="row text-center">
                        <div className="col-12">{error ? errorDiv : null}</div>
                    </div>
                    {isUpdated?
                    <button
                    className="btn py-3 my-3 btn-success w-100  q-font-weight-bold"
                    type="button"
                    >
                    {" "}
                    Updated
                    </button>:<button
                        onClick={update}
                        disabled={pending}
                        className="btn py-3 my-3 w-100 bg-them text-white q-font-weight-bold"
                    >
                        {pending && (
                        <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                        ></span>
                        )}
                        {!pending && <span>update</span>}
                    </button>}

                </div>
            </div>
        </div>
    )
}
export default EditRestProOne;