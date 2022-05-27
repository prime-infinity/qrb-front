import { useState } from "react";
import TimePicker from "react-time-picker";
//import { useDispatch } from "react-redux";
//import { setRestTimes } from "../../redux/slices/restSlice";

function EditRestProThr() {
  //const dispatch = useDispatch();
  const days = [
    { s: "M", h: "mon", o: 1 },
    { s: "T", h: "tue", o: 2 },
    { s: "W", h: "wed", o: 3 },
    { s: "TH", h: "thr", o: 4 },
    { s: "F", h: "fri", o: 5 },
    { s: "S", h: "sat", o: 6 },
    { s: "S", h: "sun", o: 7 },
  ];
  const [dates, setDates] = useState([
    {
      selectedDays: [
        { o: 1, s: "mon" },
        { o: 5, s: "fri" },
      ],
      times: [
        {
          openingTime: "9:00",
          closingTime: "6:00",
        },
      ],
    },
  ]);
  const [isUpdated, setIsUpdated] = useState(false);

  const selectDay = (indexOfDate, dayHide, dayOrder) => {
    //what needs to be done is to spread
    //the dates, and do the necessary
    /** the necessary, is to look for the particular
     * date within dates with the indexOfDate
     * then spread the "selectedDay" array in it, to add day,
     * but first, if day is already there, remove it
     * then order it and set it back to
     */

    const rearrange = (alreadyDays) => {
      //first, alreadyDay is empty, just push
      if (alreadyDays.length === 0) {
        return [{ o: dayOrder, s: dayHide }];
      } else {
        //extract order of alreadyDays into arr and check
        //if order of incoming in in there

        let extrt = alreadyDays.map((day) => day.o);
        //now, check if incoming order is in alreadyorder
        if (extrt.includes(dayOrder)) {
          //remove date
          let neww = alreadyDays.filter((day) => day.o !== dayOrder);
          return neww.sort((a, b) => a.o - b.o);
        } else {
          //add date
          let neww = [...alreadyDays, { o: dayOrder, s: dayHide }];
          return neww.sort((a, b) => a.o - b.o);
        }
      }
    };

    let newDate = dates.map((date) =>
      dates.indexOf(date) === indexOfDate
        ? {
            ...date,
            selectedDays: rearrange(date.selectedDays),
          }
        : date
    );
    setDates(newDate);
  };

  const isDaySelectd = (toCheckWith, check) => {
    let ord = toCheckWith.map((e) => e.o);
    if (ord.includes(check)) {
      return true;
    } else {
      return false;
    }
  };

  const setOpeningTime = (e, indexOfDate, indexOfTime) => {
    const rearrangeTime = (alreadyTime) => {
      //console.log(alreadyTime);
      let neww = alreadyTime.map((time) =>
        alreadyTime.indexOf(time) === indexOfTime
          ? {
              ...time,
              openingTime: e,
            }
          : time
      );
      return neww;
    };

    let newDate = dates.map((date) =>
      dates.indexOf(date) === indexOfDate
        ? {
            ...date,
            times: rearrangeTime(date.times),
          }
        : date
    );
    setDates(newDate);
  };

  const setClosingTime = (e, indexOfDate, indexOfTime) => {
    const rearrangeTime = (alreadyTime) => {
      //console.log(alreadyTime);
      let neww = alreadyTime.map((time) =>
        alreadyTime.indexOf(time) === indexOfTime
          ? {
              ...time,
              closingTime: e,
            }
          : time
      );
      return neww;
    };

    let newDate = dates.map((date) =>
      dates.indexOf(date) === indexOfDate
        ? {
            ...date,
            times: rearrangeTime(date.times),
          }
        : date
    );
    setDates(newDate);
  };

  const addHours = (indexOfDate) => {
    console.log(indexOfDate);
    let newTime = {
      openingTime: "2:00 PM",
      closingTime: "6:00 PM",
    };
    let newDate = dates.map((date) =>
      dates.indexOf(date) === indexOfDate
        ? {
            ...date,
            times: [...date.times, newTime],
          }
        : date
    );

    setDates(newDate);
  };

  const addSet = () => {
    const newSet = {
      selectedDays: [
        { o: 6, s: "sat" },
        { o: 7, s: "sun" },
      ],
      times: [
        {
          openingTime: "9:00",
          closingTime: "1:00",
        },
      ],
    };

    setDates([...dates, newSet]);
  };

  const removeSet = (e) => {
    let newDate = dates.filter((date) => dates.indexOf(date) !== e);
    setDates(newDate);
  };
  const update = () => {
    //dispatch(setRestTimes(dates));
    setIsUpdated(true);
  };
  return (
    <div className="col-12">
      <div className="row mx-1">
        <div className="col-12 border mt-5 p-3">
          {dates.length > 0 &&
            dates.map((date, index) => (
              <div key={index} className="mb-2">
                {date.selectedDays.length > 0 && (
                  <span key={index} className="pe-2">
                    {date.selectedDays[0].s} <span>-</span>{" "}
                    {date.selectedDays[date.selectedDays.length - 1].s}
                  </span>
                )}

                <span className="pe-2">|</span>

                {date.times.length > 0 &&
                  date.times.map((time, index) => (
                    <span key={index}>
                      {time.openingTime} - {time.closingTime}{" "}
                      {index !== date.times.length - 1 && (
                        <span className="px-2">&</span>
                      )}
                    </span>
                  ))}
              </div>
            ))}
        </div>
        <div className="col-4 offset-8 text-end mt-4 pe-0">
          <div onClick={addSet}>
            <span>
              <svg
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </span>
            <span className="fw-bold">add set</span>
          </div>
        </div>

        {/** the edit part */}
        {dates.length > 0 &&
          dates.map((date, index) => (
            <div key={index} className="col-12 my-4">
              {/** the upper part */}
              <div className="row">
                <div className="col-4 ps-0 fw-bold">set {index + 1}</div>
                <div className="col-4"></div>
                <div className="col-4 text-end pe-0 ">
                  <span onClick={() => removeSet(index)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={"24px"}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </span>
                </div>
              </div>
              {/** end upper part */}
              {/** days part */}
              <div className="row">
                <div className="col-12 mt-4">
                  <div
                    className="row flex-nowrap scroll-div"
                    style={{ overflowX: "scroll" }}
                  >
                    {days.map((day, index) => (
                      <div className="col-2 text-center" key={index}>
                        <div
                          onClick={() =>
                            selectDay(dates.indexOf(date), day.h, day.o)
                          }
                          className={`${
                            isDaySelectd(date.selectedDays, day.o) &&
                            "date-selected"
                          } fw-bold border rounded-circle py-2`}
                        >
                          {day.s}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/** end of days part */}

              {/** time part */}

              {date.times.map((time, index) => (
                <div className="row mt-4" key={index}>
                  <div className="col-6">
                    <div className="row">
                      <div className="col-6 fw-bold my-auto">opening:</div>
                      <div className="col-6 px-0">
                        <TimePicker
                          clearIcon={null}
                          clockIcon={null}
                          onChange={(value) =>
                            setOpeningTime(value, dates.indexOf(date), index)
                          }
                          value={time.openingTime}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="row">
                      <div className="col-6 fw-bold my-auto">closing:</div>
                      <div className="col-6 px-0">
                        <TimePicker
                          clearIcon={null}
                          clockIcon={null}
                          onChange={(value) =>
                            setClosingTime(value, dates.indexOf(date), index)
                          }
                          value={time.closingTime}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {/** end of time */}

              <div className="row">
                <div className="col-4 text-start mt-4 pe-0">
                  <div onClick={() => addHours(dates.indexOf(date))}>
                    <span>
                      <svg
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
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </span>
                    <span className="fw-bold">add hours</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

        <div className="col-12 mt-5">
          {isUpdated ? (
            <button
              className="btn py-3 my-3 btn-success w-100  q-font-weight-bold"
              type="button"
            >
              {" "}
              Updated
            </button>
          ) : (
            <button
              onClick={update}
              className="btn py-3 my-3 w-100 bg-them text-white q-font-weight-bold"
            >
              update time
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
export default EditRestProThr;
