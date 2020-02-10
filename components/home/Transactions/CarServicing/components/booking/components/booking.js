import React, { memo } from 'react';
import DayPicker from "react-day-picker";
import { useCookies } from 'react-cookie';

const Index = memo(({_HandleDayChange,_HandleInputDate, model, date, timeslot, description, currentDate}) => {

    return (
        <div className="d-flex flex-column">

            <div className="d-flex flex-column flex-fill">
                <div className="d-flex flex-row">
                    <div style={{flex: 1, padding: 25}}>
                        <div  className="d-flex flex-row flex-fill">
                            <div className="form-group d-flex flex-column" style={{flex:0.5, marginRight:25}}>
                                <label>Your Car Model</label>
                                <input type="text" value={model} onChange={(e) => _HandleInputDate('model', e.target.value)}  className="form-control" placeholder="Enter your car model" id="model" name="model" />
                            </div>
                        </div>

                        <div  className="d-flex flex-row flex-fill">
                            <div className="form-group d-flex flex-column" style={{flex:0.5,  marginRight:25}}>
                                <label>Date</label>
                                <input type="text" value={currentDate} onChange={() => console.log('Date!')} className="form-control" placeholder="Pick your date" id="date" name="date" />
                            </div>

                            <div className="form-group d-flex flex-column" style={{flex:0.5}}>
                                <label>Timeslot</label>
                                <input type="text" value={timeslot} onChange={() => console.log('Timeslot!')} className="form-control" placeholder="Select your time" id="timeslot" name="timeslot" />
                            </div>
                        </div>

                        <div  className="d-flex flex-row flex-fill">
                            <div className="form-group d-flex flex-column" style={{flex:1}}>
                                <label>Description</label>
                                <input type="text" value={description}  onChange={(e) => _HandleInputDate('description', e.target.value)} className="form-control" placeholder="What would you like us to service for you?" id="description" name="description" />
                            </div>
                        </div>
                       
                    </div>

                    <DayPicker 
                        // modifiers={{
                        //     sunday: day => day.getDay() === 0,
                        //     firstOfMonth: day => day.getDate() === 1,
                        // }}               
                        onDayClick={_HandleDayChange} 
                        style={{width: "50%",}}
                        month={new Date()}
                    />

                    <style>{birthdayStyle}</style>
                </div>
            </div>

        </div>
        
    )

})
  
export default Index





// const [cookies, setCookie] = useCookies(['name']);
// setCookie('name', 'COOKIES!', { path: '/' });
// console.log(cookies)
// return (
//     <div className="d-flex justify-content-center align-items-center" style={{flex:1}}>
//         Maintenance booking system!
//         {cookies.name && <h1>Hello {cookies.name}!</h1>}
//     </div>
// );


function publicHolidays() {
    const year = 2020
    // Jan = 0, Feb = 1, ... Dec = 11
    // https://www.mom.gov.sg/newsroom/press-releases/2019/0408-public-holidays-for-2020
    const dates = [
      { month: 0, day: 1 },
      { month: 0, day: 25 },
      { month: 0, day: 26 },
      { month: 0, day: 27 },
      { month: 3, day: 10 },
      { month: 4, day: 1 },
      { month: 4, day: 7  },
      { month: 4, day: 24 },
      { month: 4, day: 25 },
      { month: 6, day: 31 },
      { month: 7, day: 9 },
      { month: 7, day: 10 },
      { month: 10, day: 14  },
      { month: 11, day: 25 },
    ]
      
    return (dates.map( date => (
        new Date(year, date.month, date.day)
      )))
}

const birthdayStyle = `.DayPicker-Day--highlighted {
    background-color: orange;
    color: white;
  }`;