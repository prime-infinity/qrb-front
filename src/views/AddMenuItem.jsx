import React, { useEffect } from "react";
import { useState } from "react";
import AddCustomiModal from "../ui/AddCustomiModal";
import Overlay from "../ui/Overlay";
import Select from 'react-select';
import ImageUploading from "react-images-uploading";
import { useSelector, useDispatch } from "react-redux";
import { addMenuItem } from "../helpers/web";
import { toggleUploading } from "../redux/slices/menuSlice";
import { setRest } from "../redux/slices/restSlice";
import { useNavigate } from "react-router-dom";


const menuOptions = [
  { value: 'drinks',
   label: 'drinks', 
   id:1,
    data: [
      { id: 1,value:"coffee",label:"coffee", title: "coffee" },
      { id: 2,value:"Juice",label:"Juice", title: "Juice" },
      { id: 3,value:"Tea",label:"Tea", title: "Tea" },
      { id: 4,value:"Soda",label:"Soda", title: "Soda" },
      { id: 5,value:"Milk",label:"Milk", title: "Milk" },
      { id: 6,value:"Lemonade",label:"Lemonade", title: "Lemonade" },
    ],
   },
  { value: 'main menu',
   label: 'main menu', id:2,
    data: [
      { id: 1,value:"French Fries",label:"French Fries", title: "French Fries" },
      { id: 2,value:"Onion Rings",label:"Onion Rings", title: "Onion Rings" },
      { id: 3,value:"Fried Shrimps",label:"Fried Shrimps", title: "Fried Shrimps" },
      { id: 4,value:"Chicked",label:"Chicked", title: "Chicked" },
    ],
   },
  { value: 'lunch',
   label: 'lunch', 
   id:3,
   data: [
    { id: 1,value:"Donuts",label:"Donuts", title: "Donuts" },
    { id: 2,value:"Coke",label:"Coke", title: "Coke" },
    { id: 3,value:"Chips",label:"Chips", title: "Chips" },
  ],
   },
];


function AddMenuItem() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const rest = useSelector((state) => state.rest.rest);
  const needToUpload = useSelector((state) => state.menu.uploadingMenu);
  const [active, setActive] = useState(true);
  const [isAddingCusto, setIsAdd] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [subOptions,setSubOptions] = useState(null)
  const [imageUpPending, setImageUpPending] = useState(false);
  const [imaUpLdErr, setImgErr] = useState(null);
  const authState = useSelector((state) => state.auth.auth);


  const [formData,setForm] = useState({
    active:true,
    name:"",
    price:"",
    description:"",
    cat:{}
  })

  const [images, setImages] = React.useState([]);
  
  const maxNumber = 6;

  const onChange = (imageList, addUpdateIndex) => {
    
    setImages(imageList);
  };
  const imgErrorDiv = <small className="text-danger">{imaUpLdErr}</small>;

  const addCustomiz = () => {
    setIsAdd(!isAddingCusto);
  };

  const mainCatSelected = (e)=>{
    //console.log(e)
    setSelectedOption(e)
    setSubOptions(null)
    setTimeout(() => {
      setSubOptions(e.data)
    }, 100);
    
    setForm({...formData,cat:{...formData.cat,mainId:e.id,mainTitle:e.value}})
  }

  const subCatSelected = (e)=>{
    //console.log(e)
    //console.log(selectedOption);
    setForm({...formData,cat:{...formData.cat,subId:e.id,subTitle:e.value}})

  }

  const setSetActive = (e)=>{
    setActive(e)
    setForm({...formData,active:e})
  }

  
  useEffect(()=>{
    if(needToUpload){
      uploadImages()
    }
     // eslint-disable-next-line
  },[needToUpload])

  const uploadImages = () => {
    setImageUpPending(true);
    setImgErr(null);
    const imageAsArray = images.map((img) => img.file);

    const formData2 = new FormData();

    for (let i = 0; i < imageAsArray.length; i++) {
      formData2.append("menu-images", imageAsArray[i], imageAsArray[i].name);
    }

    formData2.append("restid", rest._id);
    formData2.append("name",formData.name)
    formData2.append("active",formData.active)
    formData2.append("price",formData.price)
    formData2.append("description",formData.description)
    formData2.append("mainId",formData.cat.mainId)
    formData2.append("mainTitle",formData.cat.mainTitle)
    formData2.append("subId",formData.cat.subId)
    formData2.append("subTitle",formData.cat.subTitle)


      addMenuItem(formData2, authState.token)
      .then((res) => {

        //console.log(res);
        setImageUpPending(false);
        dispatch(setRest(res))
        dispatch(toggleUploading(false))
        navigate(`/${rest.name}/menu`);

      })
      .catch((err) => {
        setImageUpPending(false);
        dispatch(toggleUploading(false))
        err.response?.data
          ? setImgErr(err.response.data)
          : setImgErr(err.message);
      });
  };

  return (
    <>
      {" "}
      {isAddingCusto && (
        <>
          {" "}
          <AddCustomiModal />{" "}
          <Overlay closeOverlay={addCustomiz} width={`100%`} />
        </>
      )}
      <div className="container-fluid pt-5 pb-5 px-3 big-bg-theme" style={{minHeight:"100vh"}}>
        <div className="row pt-5">
          <div className="col-12">
            {/** image selection */}
            <div className="row justify-content-center ">
              <div className="col-11 mb-2">

                
                <ImageUploading
                  multiple
                  value={images}
                  onChange={onChange}
                  maxNumber={maxNumber}
                  acceptType={["jpg", "jpeg"]}
                  dataURLKey="data_url"
                >

                  {({
                    imageList,
                    onImageUpload,
                    onImageUpdate,
                    onImageRemove,
                    errors,
                  }) => (
                    
                    <div className="covers-list-wrapper">

                      <div className="">{imaUpLdErr ? imgErrorDiv : null}</div>

                      {errors && (
                        <div className="text-danger">
                          {errors.maxNumber && (
                            <span className="row">
                              Number of selected images exceed {maxNumber}
                            </span>
                          )}
                          {errors.acceptType && (
                            <span className="row">
                              Your selected file type is not allow
                            </span>
                          )}
                          {errors.maxFileSize && (
                            <span className="row">
                              Selected file size exceed maxFileSize
                            </span>
                          )}
                        </div>
                      )}

                      <ul className="covers-list ps-0">
                      {imageUpPending ? (
                        <li>
                         <a href="#!" className="cover-item" style={{height:"136px"}}>
                         <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                         </a>
                          
                        </li>
                      ) : (  
                        <li>

                          <label onClick={onImageUpload} className="cover-item" style={{height:"136px"}} htmlFor="coverbg">
                            <img src="/ang/round-add.svg" alt="" />
                          </label>
                          
                        </li>)}

                        {imageList.map((image, index) => (
                          <li key={index} className="col-5">

                            <a href="#!" className="cover-item" style={{height:"136px"}}>
                              <img src={image["data_url"]} alt="" />
                            </a>

                            <div className="row pt-2">
                          
                              <div className="col-12 text-center">
                                <span>
                                  <svg
                                    onClick={() => onImageRemove(index)}
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="svg-icon"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M6 18L18 6M6 6l12 12"
                                    />
                                  </svg>
                                </span>
                              </div>
                            </div>

                          </li>
                        ))}

                      </ul>

                    </div>

                  )}


                </ImageUploading>
                
              </div>
              <div className="col-12 fs-14 text-secondary">
                add images of videos to display the item to your customer
              </div>
            </div>
            {/** end of image selection */}

            {/**active or not */}
            <div className="row mt-4">
              <div className="col-6 fs-14">
                <input
                  className="form-check-input me-2"
                  type="radio"
                  checked={active}
                  onChange={() => setSetActive(true)}
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                />
                <label
                  className="form-check-label fw-bold"
                  htmlFor="flexRadioDefault1"
                >
                  active
                </label>{" "}
                <br />
                <div className="ps-4 fs-14 text-secondary">
                  item will be available on the menu
                </div>
              </div>
              <div className="col-6 fs-14">
                <input
                  className="form-check-input me-2"
                  type="radio"
                  checked={!active}
                  onChange={() => setSetActive(false)}
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                />
                <label
                  className="form-check-label fw-bold"
                  htmlFor="flexRadioDefault1"
                >
                  inactive
                </label>{" "}
                <br />
                <div className="ps-4 fs-14 text-secondary">
                  item will be hidden from the menu
                </div>
              </div>
            </div>
            {/** end of active or not */}

            {/** input */}
            <div className="row mt-4">
              <div className="col-12">
                <input
                  value={formData.name}
                  onChange={(e)=>setForm({...formData,name:e.target.value})}
                  type="text"
                  placeholder="name"
                  className="form-control fs-14 text-secondary big-bg-theme border-start-0 ps-0 border-end-0 border-top-0 border border-dark br-0"
                />
              </div>
              <div className="col-12 py-4">
                <input
                value={formData.price}
                onChange={(e)=>setForm({...formData,price:e.target.value})}
                  type="text"
                  placeholder="price($)"
                  className="form-control fs-14 text-secondary big-bg-theme border-start-0 ps-0 border-end-0 border-top-0 border border-dark br-0"
                />
              </div>
              <div className="col-12">
                <input
                value={formData.description}
                onChange={(e)=>setForm({...formData,description:e.target.value})}
                  type="text"
                  placeholder="description"
                  className="form-control fs-14 text-secondary big-bg-theme border-start-0 ps-0 border-end-0 border-top-0 border border-dark br-0"
                />
              </div>
            </div>
            {/** end of input */}

            {/** choose cate */}
            <div className="row mt-4">
              <span className="fw-bold mb-3">choose category</span>

              <div className="col-6">
                <span className="fs-14 text-secondary">main category</span>
                <Select
                  defaultValue={selectedOption}
                  onChange={(e)=>mainCatSelected(e)}
                  options={menuOptions}
                />
              </div>

              <div className="col-6">
                <span className="fs-14 text-secondary">sub category</span>
                {subOptions !== null && (<Select
                  
                  onChange={(e)=>subCatSelected(e)}
                  options={subOptions}
                />)}
              </div>
              
              
            </div>


            {/** end of choose cate */}

            {/** custimization */}
            
            {/** end custimization */}

            {/**delete item */}
            {/*<div className="row mt-5">
              <div className="col-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ width: "20px" }}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                delete item
              </div>
            </div>*/}
          </div>
        </div>
      </div>
    </>
  );
}

export default AddMenuItem;
