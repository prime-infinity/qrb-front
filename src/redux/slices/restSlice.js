import { createSlice } from "@reduxjs/toolkit";
//import { getRestOfOwner /*getRandomRest*/ } from "../../helpers/web";

export const restSlice = createSlice({
  name: "rest",
  initialState: {
    rest: null,
    restMenu:null,
  },
  reducers: {
    setRest: (state, action) => {
      state.rest = action.payload;
      state.restMenu = state.rest.menu
    },

    setRestSummary: (state, action) => {
      state.rest = { ...state.rest, summary: action.payload };
    },
    setRestImages: (state, action) => {
      state.rest = { ...state.rest, images: action.payload };
    },
    setRestTimes: (state, action) => {
      state.rest = { ...state.rest, time: action.payload };
    },
    searchRestMenu:(state,action)=>{
      //console.log(action.payload);
      //console.log(state.rest.menu)
      state.restMenu = state.rest.menu.filter((men)=>men.name === action.payload)
    },
    searchDiscarded:(state,action)=>{
      state.restMenu = state.rest.menu
    }
  },
});

export const { setRest } = restSlice.actions;
export const { setRestSummary } = restSlice.actions;
export const { setRestImages } = restSlice.actions;
export const { setRestTimes } = restSlice.actions;
export const { searchRestMenu } = restSlice.actions;
export const { searchDiscarded } =  restSlice.actions;

/*export const getRestOwnerRest = (token) => async (dispatch) => {
  const dataFromGet = await getRestOfOwner(token);
  dispatch(setRest(dataFromGet));
  console.log("owner rest dispatched");
};*/
export const getBaseRest = () => (dispatch) => {
  let baseRest = {
    name: "yogurstory",
    location: "honolulu",
    year: "since 2010",
    description: "this is a brief description of the resturant",
    summary: "this is the short summary that was made for this business",
    phone: "0123456789",
    email: "email@mail.com",
    website: "website.com",
    address: "no 1, addres lane, address city",
    images: [
      "/ang/profile-cover.jpg",
      "/ang/profile-cover.jpg",
      "/ang/profile-cover.jpg",
      "/ang/profile-cover.jpg",
      "/ang/profile-cover.jpg",
    ],
    welcomescreen: "/videos/vdd.mp4",
    menu: [
      {
        name: "flavored cafe late",
        price:"2000",
        active:"true",
        description:"this is the description of the item",
        files:["/ang/gallery003.jpg"],
        cat: {
          mainTitle: "drinks",
          mainId: 1,
          subTitle: "coffee",
          subId: 1,
        },
      },
      {
        name: "flavored cafe late2",
        price:"2000",
        active:"true",
        description:"this is the description of the item",
        files:["/ang/gallery003.jpg"],
        cat: {
          mainTitle: "drinks",
          mainId: 1,
          subTitle: "coffee",
          subId: 1,
        },
      },
      {
        name: "flavored cafe late3",
        price:"2000",
        active:"true",
        description:"this is the description of the item",
        files:["/ang/gallery003.jpg"],
        cat: {
          mainTitle: "drinks",
          mainId: 1,
          subTitle: "coffee",
          subId: 1,
        },
      },
      {
        name: "flavored Milk",
        price:"2000",
        active:"true",
        description:"this is the description of the item",
        files:["/ang/gallery003.jpg"],
        cat: {
          mainTitle: "drinks",
          mainId: 1,
          subTitle: "Milk",
          subId: 5,
        },
      },
      {
        name: "flaMilk 2",
        price:"2000",
        active:"true",
        description:"this is the description of the item",
        files:["/ang/gallery003.jpg"],
        cat: {
          mainTitle: "drinks",
          mainId: 1,
          subTitle: "Milk",
          subId: 5,
        },
      },
      {
        name: "Lemonade",
        price:"2000",
        active:"true",
        description:"this is the description of the item",
        files:["/ang/gallery003.jpg"],
        cat: {
          mainTitle: "drinks",
          mainId: 1,
          subTitle: "Lemonade",
          subId: 6,
        },
      },
      {
        name: "Boring Tea",
        price:"2000",
        active:"true",
        description:"this is the description of the item",
        files:["/ang/gallery003.jpg"],
        cat: {
          mainTitle: "drinks",
          mainId: 1,
          subTitle: "Tea",
          subId: 3,
        },
      },
      {
        name: "Exciting Fries",
        price:"2000",
        active:"true",
        description:"this is the description of the item",
        files:["/ang/gallery003.jpg"],
        cat: {
          mainTitle: "main menu",
          mainId: 2,
          subTitle: "French Fries",
          subId: 1,
        },
      },
      {
        name: "More Exciting Fries",
        price:"2000",
        active:"true",
        description:"this is the description of the item",
        files:["/ang/gallery003.jpg"],
        cat: {
          mainTitle: "main menu",
          mainId: 2,
          subTitle: "French Fries",
          subId: 1,
        },
      },
      {
        name: "Most Exciting Fries",
        price:"2000",
        active:"true",
        description:"this is the description of the item",
        files:["/ang/gallery003.jpg"],
        cat: {
          mainTitle: "main menu",
          mainId: 2,
          subTitle: "French Fries",
          subId: 1,
        },
      },
      {
        name: "Standup Chicken",
        price:"2000",
        active:"true",
        description:"this is the description of the item",
        files:["/ang/gallery003.jpg"],
        cat: {
          mainTitle: "main menu",
          mainId: 2,
          subTitle: "Chicked",
          subId: 4,
        },
      },
      {
        name: "surrendered Chicken",
        price:"2000",
        active:"true",
        description:"this is the description of the item",
        files:["/ang/gallery003.jpg"],
        cat: {
          mainTitle: "main menu",
          mainId: 2,
          subTitle: "Chicked",
          subId: 4,
        },
      },
      {
        name: "Mr Crabs",
        price:"2000",
        active:"true",
        description:"this is the description of the item",
        files:["/ang/gallery003.jpg"],
        cat: {
          mainTitle: "main menu",
          mainId: 2,
          subTitle: "Fried Shrimps",
          subId: 3,
        },
      },
      {
        name: "LOrd of the RIngs?",
        price:"2000",
        active:"true",
        description:"this is the description of the item",
        files:["/ang/gallery003.jpg"],
        cat: {
          mainTitle: "main menu",
          mainId: 2,
          subTitle: "Onion Rings",
          subId: 2,
        },
      },
      {
        name: "LIght Snack 1",
        price:"2000",
        active:"true",
        description:"this is the description of the item",
        files:["/ang/gallery003.jpg"],
        cat: {
          mainTitle: "lunch",
          mainId: 3,
          subTitle: "Donuts",
          subId: 1,
        },
      },
      {
        name: "LIght Snack 2",
        price:"2000",
        active:"true",
        description:"this is the description of the item",
        files:["/ang/gallery003.jpg"],
        cat: {
          mainTitle: "lunch",
          mainId: 3,
          subTitle: "Donuts",
          subId: 1,
        },
      },
      {
        name: "Coke",
        price:"2000",
        active:"true",
        description:"this is the description of the item",
        files:["/ang/gallery003.jpg"],
        cat: {
          mainTitle: "lunch",
          mainId: 3,
          subTitle: "Coke",
          subId: 2,
        },
      },
      {
        name: "Chipanzees",
        price:"2000",
        active:"true",
        description:"this is the description of the item",
        files:["/ang/gallery003.jpg"],
        cat: {
          mainTitle: "lunch",
          mainId: 3,
          subTitle: "Chips",
          subId: 3,
        },
      },
      {
        name: "Chipmunks",
        price:"2000",
        active:"true",
        description:"this is the description of the item",
        files:["/ang/gallery003.jpg"],
        cat: {
          mainTitle: "lunch",
          mainId: 3,
          subTitle: "Chips",
          subId: 3,
        },
      },
      {
        name: "Literal Soda",
        price:"2000",
        active:"true",
        description:"this is the description of the item",
        files:["/ang/gallery003.jpg"],
        cat: {
          mainTitle: "drinks",
          mainId: 1,
          subTitle: "Soda",
          subId: 4,
        },
      },
      {
        name: "Fizzy Soda",
        price:"2000",
        active:"true",
        description:"this is the description of the item",
        files:["/ang/gallery003.jpg"],
        cat: {
          mainTitle: "drinks",
          mainId: 1,
          subTitle: "Soda",
          subId: 4,
        },
      },
      {
        name: "HollanDia Yoghurt",
        price:"2000",
        active:"true",
        description:"this is the description of the item",
        files:["/ang/gallery003.jpg"],
        cat: {
          mainTitle: "drinks",
          mainId: 1,
          subTitle: "Milk",
          subId: 5,
        },
      },
      {
        name: "Bread",
        price:"2000",
        active:"true",
        description:"this is the description of the item",
        files:["/ang/gallery003.jpg"],
        cat: {
          mainTitle: "lunch",
          mainId: 3,
          subTitle: "Donuts",
          subId: 1,
        },
      },
      {
        name: "Diet Coke",
        price:"2000",
        active:"true",
        description:"this is the description of the item",
        files:["/ang/gallery003.jpg"],
        cat: {
          mainTitle: "lunch",
          mainId: 3,
          subTitle: "Coke",
          subId: 2,
        },
      },
      {
        name: "LobStery",
        price:"2000",
        active:"true",
        description:"this is the description of the item",
        files:["/ang/gallery003.jpg"],
        cat: {
          mainTitle: "main menu",
          mainId: 2,
          subTitle: "Fried Shrimps",
          subId: 3,
        },
      },
      {
        name: "Literal french Fries",
        price:"2000",
        active:"true",
        description:"this is the description of the item",
        files:["/ang/gallery003.jpg"],
        cat: {
          mainTitle: "main menu",
          mainId: 2,
          subTitle: "French Fries",
          subId: 1,
        },
      },
      {
        name: "Boring Drink one",
        price:"2000",
        active:"true",
        description:"this is the description of the item",
        files:["/ang/gallery003.jpg"],
        cat: {
          mainTitle: "drinks",
          mainId: 1,
          subTitle: "Tea",
          subId: 3,
        },
      },
      {
        name: "CowBell",
        price:"2000",
        active:"true",
        description:"this is the description of the item",
        files:["/ang/gallery003.jpg"],
        cat: {
          mainTitle: "drinks",
          mainId: 1,
          subTitle: "Milk",
          subId: 5,
        },
      },
      {
        name: "Dano",
        price:"2000",
        active:"true",
        description:"this is the description of the item",
        files:["/ang/gallery003.jpg"],
        cat: {
          mainTitle: "drinks",
          mainId: 1,
          subTitle: "Milk",
          subId: 5,
        },
      },
    ],
  };

  dispatch(setRest(baseRest));
  console.log("base rest dispatched 2");
};

export default restSlice.reducer;
