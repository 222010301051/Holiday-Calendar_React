// App.js

import React, { useState, useContext, useEffect } from "react";
import "./App.css";
import { getMonth } from "./util";
import CalendarHeader from "./components/CalendarHeader";
import Sidebar from "./components/Sidebar";
import Month from "./components/Month";
import GlobalContext from "./context/GlobalContext";
import EventModal from "./components/EventModal";
import AllMonthsView from "./components/AllMonthsView";
import YearHeader from "./components/YearHeader";
import axios from "axios";
import dayjs from "dayjs";
import Loader from "./components/Loader";

function App() {
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const {
    dispatchCalEvent,
    monthIndex,
    showEventModal,
    viewMonth,
    viewYear,
    selectedCountry,
    setEvents: setGlobalContextEvents,
    daySelected,
    selectedEvent,
  } = useContext(GlobalContext);
  const [selectedYear, setSelectedYear] = useState(2024);
  const [events, setLocalEvents] = useState([]);

  useEffect(() => {
    // Dispatch an event when the application initially loads
    dispatchCalEvent({
      type: "push",
      payload: {
        title: "Hello",
        description: "Welcome",
        label: "red",
        day: daySelected.valueOf(),
        id: selectedEvent ? selectedEvent.id : Date.now(),
      },
    });
  }, [dispatchCalEvent]);

  useEffect(() => {
    setLoading(true);
    dispatchCalEvent({ type: "clear", payload: [] });
    setCurrentMonth(getMonth(monthIndex, selectedYear));
    fetchHolidays();
  }, [selectedYear, selectedCountry]);

  const fetchHolidays = async () => {
    try {
      const response = await axios.get(
        `https://calendarific.com/api/v2/holidays?api_key=7zMA341AL71xcaOKest0r6NfFmjF6h81&country=${selectedCountry}&year=${selectedYear}`
      );

      const fetchedEvents = response.data.response.holidays.map((holiday) => ({
        title: holiday.name,
        description: holiday.description,
        label: "red",
        day: dayjs(holiday.date.iso).toDate(),
        start: dayjs(holiday.date.iso).toDate(),
        end: dayjs(holiday.date.iso).toDate(),
      }));
      setLocalEvents(fetchedEvents);
      console.log(fetchedEvents);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching holidays:", error);
      setLoading(false);
    }
  };

  const getCountryCode = (country) => {
    const countryCodes = {
      AF: "Afghanistan",
      AL: "Albania",
      DZ: "Algeria",
      AS: "American Samoa",
      AD: "Andorra",
      AO: "Angola",
      AI: "Anguilla",
      AG: "Antigua and Barbuda",
      AR: "Argentina",
      AM: "Armenia",
      AW: "Aruba",
      AU: "Australia",
      AT: "Austria",
      AZ: "Azerbaijan",
      BH: "Bahrain",
      BD: "Bangladesh",
      BB: "Barbados",
      BY: "Belarus",
      BE: "Belgium",
      BZ: "Belize",
      BJ: "Benin",
      BM: "Bermuda",
      BT: "Bhutan",
      BO: "Bolivia",
      BA: "Bosnia and Herzegovina",
      BW: "Botswana",
      BR: "Brazil",
      VG: "British Virgin Islands",
      BN: "Brunei",
      BG: "Bulgaria",
      BF: "Burkina Faso",
      BI: "Burundi",
      CV: "Cabo Verde",
      KH: "Cambodia",
      CM: "Cameroon",
      CA: "Canada",
      KY: "Cayman Islands",
      CF: "Central African Republic",
      TD: "Chad",
      CL: "Chile",
      CN: "China",
      CO: "Colombia",
      KM: "Comoros",
      CG: "Congo",
      CD: "Congo Democratic Republic",
      CK: "Cook Islands",
      CR: "Costa Rica",
      CI: "Cote d'Ivoire",
      HR: "Croatia",
      CU: "Cuba",
      CW: "Curaçao",
      CY: "Cyprus",
      CZ: "Czech Republic",
      DK: "Denmark",
      DJ: "Djibouti",
      DM: "Dominica",
      DO: "Dominican Republic",
      TL: "East Timor",
      EC: "Ecuador",
      EG: "Egypt",
      SV: "El Salvador",
      GQ: "Equatorial Guinea",
      ER: "Eritrea",
      EE: "Estonia",
      ET: "Ethiopia",
      FK: "Falkland Islands",
      FO: "Faroe Islands",
      FJ: "Fiji",
      FI: "Finland",
      FR: "France",
      PF: "French Polynesia",
      GA: "Gabon",
      GM: "Gambia",
      GE: "Georgia",
      DE: "Germany",
      GH: "Ghana",
      GI: "Gibraltar",
      GR: "Greece",
      GL: "Greenland",
      GD: "Grenada",
      GU: "Guam",
      GT: "Guatemala",
      GG: "Guernsey",
      GN: "Guinea",
      GW: "Guinea-Bissau",
      GY: "Guyana",
      HT: "Haiti",
      VA: "Holy See (Vatican City)",
      HN: "Honduras",
      HK: "Hong Kong",
      HU: "Hungary",
      IS: "Iceland",
      IN: "India",
      ID: "Indonesia",
      IR: "Iran",
      IQ: "Iraq",
      IE: "Ireland",
      IM: "Isle of Man",
      IL: "Israel",
      IT: "Italy",
      JM: "Jamaica",
      JP: "Japan",
      JE: "Jersey",
      JO: "Jordan",
      KZ: "Kazakhstan",
      KE: "Kenya",
      KI: "Kiribati",
      XK: "Kosovo",
      KW: "Kuwait",
      KG: "Kyrgyzstan",
      LA: "Laos",
      LV: "Latvia",
      LB: "Lebanon",
      LS: "Lesotho",
      LR: "Liberia",
      LY: "Libya",
      LI: "Liechtenstein",
      LT: "Lithuania",
      LU: "Luxembourg",
      MO: "Macau",
      MK: "Macedonia, Republic of",
      MG: "Madagascar",
      MW: "Malawi",
      MY: "Malaysia",
      MV: "Maldives",
      ML: "Mali",
      MT: "Malta",
      MH: "Marshall Islands",
      MQ: "Martinique",
      MR: "Mauritania",
      MU: "Mauritius",
      YT: "Mayotte",
      MX: "Mexico",
      FM: "Micronesia",
      MD: "Moldova",
      MC: "Monaco",
      MN: "Mongolia",
      ME: "Montenegro",
      MS: "Montserrat",
      MA: "Morocco",
      MZ: "Mozambique",
      MM: "Myanmar",
      NA: "Namibia",
      NR: "Nauru",
      NP: "Nepal",
      NL: "Netherlands",
      NC: "New Caledonia",
      NZ: "New Zealand",
      NI: "Nicaragua",
      NE: "Niger",
      NG: "Nigeria",
      KP: "North Korea",
      MP: "Northern Mariana Islands",
      NO: "Norway",
      OM: "Oman",
      PK: "Pakistan",
      PW: "Palau",
      PA: "Panama",
      PG: "Papua New Guinea",
      PY: "Paraguay",
      PE: "Peru",
      PH: "Philippines",
      PL: "Poland",
      PT: "Portugal",
      PR: "Puerto Rico",
      QA: "Qatar",
      RE: "Reunion",
      RO: "Romania",
      RU: "Russia",
      RW: "Rwanda",
      SH: "Saint Helena",
      KN: "Saint Kitts and Nevis",
      LC: "Saint Lucia",
      MF: "Saint Martin",
      PM: "Saint Pierre and Miquelon",
      VC: "Saint Vincent and the Grenadines",
      WS: "Samoa",
      SM: "San Marino",
      ST: "Sao Tome and Principe",
      SA: "Saudi Arabia",
      SN: "Senegal",
      RS: "Serbia",
      SC: "Seychelles",
      SL: "Sierra Leone",
      SG: "Singapore",
      SX: "Sint Maarten",
      SK: "Slovakia",
      SI: "Slovenia",
      SB: "Solomon Islands",
      SO: "Somalia",
      ZA: "South Africa",
      KR: "South Korea",
      SS: "South Sudan",
      ES: "Spain",
      LK: "Sri Lanka",
      BL: "St. Barts",
      SD: "Sudan",
      SR: "Suriname",
      SE: "Sweden",
      CH: "Switzerland",
      SY: "Syria",
      TW: "Taiwan",
      TJ: "Tajikistan",
      TZ: "Tanzania",
      TH: "Thailand",
      BS: "The Bahamas",
      TG: "Togo",
      TO: "Tonga",
      TT: "Trinidad and Tobago",
      TN: "Tunisia",
      TR: "Turkey",
      TM: "Turkmenistan",
      TC: "Turks and Caicos Islands",
      TV: "Tuvalu",
      VI: "US Virgin Islands",
      UG: "Uganda",
      UA: "Ukraine",
      AE: "United Arab Emirates",
      GB: "United Kingdom",
      US: "United States",
      UY: "Uruguay",
      UZ: "Uzbekistan",
      VU: "Vanuatu",
      VE: "Venezuela",
      VN: "Vietnam",
      WF: "Wallis and Futuna",
      YE: "Yemen",
      ZM: "Zambia",
      ZW: "Zimbabwe",
      SZ: "eSwatini",
    };

    return (
      Object.keys(countryCodes).find(
        (code) => countryCodes[code] === country
      ) || "IN"
    ); // Default to US if no mapping found
  };

  return (
    <React.Fragment>
      {showEventModal && <EventModal />}

      <div className="h-screen flex flex-col">
        {viewYear && (
          <React.Fragment>
            <YearHeader />
            {loading && <Loader />}
            Enter Year
            <input
              type="number"
              value={selectedYear}
              style={{
                width: "100px",
                marginLeft: "10px",
                width: "100px",
                marginLeft: "10px",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                fontSize: "14px",
                outline: "none",
              }}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            />
            <AllMonthsView selectedYear={selectedYear} events={events} />
          </React.Fragment>
        )}
        {viewMonth && (
          <React.Fragment>
            <CalendarHeader />
            <input
              type="number"
              value={selectedYear}
              style={{
                width: "100px",
                marginLeft: "10px",
                width: "100px",
                marginLeft: "10px",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                fontSize: "14px",
                outline: "none",
              }}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            />
            {loading && <Loader />}
            <div className="flex flex-1">
              {/* Pass selectedYear as a prop to Month component */}
              <Sidebar />
              <Month
                month={currentMonth}
                selectedYear={selectedYear}
                events={events}
              />
            </div>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
}

export default App;
