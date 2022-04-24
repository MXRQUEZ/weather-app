import { ICountry } from "../types/ICountry";
import { INote } from "../types/INote";
import { convertStringToTime } from "../utils/timeParser";

interface IApi {
  key: string;
  weather: string;
  forecast: string;
  geo: string;
  ip: string;
  geoIP: string;
}

export const api: IApi = {
  key: "ed271e8a6e265f1cef792b341632072a",
  weather: "https://api.openweathermap.org/data/2.5/weather",
  forecast: "https://api.openweathermap.org/data/2.5/onecall",
  geo: "http://api.openweathermap.org/geo/1.0/direct",
  ip: "https://api.ipify.org?format=json",
  geoIP:
    "https://api.ipgeolocation.io/ipgeo-bulk?include=hostname&ip=8.8.8.8&apiKey=API_KEY",
};

interface IPicture {
  [weather: string]: { background: string; icon: string };
}

export const picture: IPicture = {
  sun: {
    background:
      "https://kartinkin.net/uploads/posts/2021-07/1627512332_30-kartinkin-com-p-step-tekstura-krasivo-32.png",
    icon: "wi wi-day-sunny",
  },
  rain: {
    background:
      "https://downloadhdwallpapers.in/wp-content/uploads/2017/12/Road-2560x1440.jpg",
    icon: "wi wi-rain",
  },
  clouds: {
    background:
      "https://funart.pro/uploads/posts/2021-04/1617460155_13-p-oboi-grozovoi-front-13.jpg",
    icon: "wi wi-cloudy",
  },
  clear: {
    background:
      "https://2.bp.blogspot.com/-mNNbM13xGUY/WMDBbKOwmPI/AAAAAAAAAJk/uajtbKQApGIeUfOy5o4NcUZ0YjIRxDAuACEw/s1600/Field%2Band%2Bsky_30.jpg",
    icon: "wi wi-cloud",
  },
  fog: {
    background:
      "https://wallup.net/wp-content/uploads/2016/01/260109-city-road-rain-wet-depth_of_field-lights-car-night-trees-worms_eye_view-shiny.jpg",
    icon: "wi wi-day-fog",
  },
  snow: {
    background:
      "https://wallup.net/wp-content/uploads/2019/10/802035-city-bokeh-winter-snow-beauty.jpg",
    icon: "wi wi-day-snow",
  },
};

export const testNotes: INote[] = [
  {
    id: "id1",
    time: convertStringToTime(`13:1`),
    text: "wake up",
  },
  {
    id: "id2",
    time: convertStringToTime(`5:11`),
    text: "Celebrate summer",
  },
  {
    id: "id3",
    time: convertStringToTime(`18:1`),
    text: "Celebrate autumn",
  },
];

export const countries: ICountry = {
  BD: "Bangladesh",
  BE: "Belgium",
  BF: "Burkina Faso",
  BG: "Bulgaria",
  BA: "Bosnia and Herzegovina",
  BB: "Barbados",
  WF: "Wallis and Futuna",
  BL: "Saint Barthelemy",
  BM: "Bermuda",
  BN: "Brunei",
  BO: "Bolivia",
  BH: "Bahrain",
  BI: "Burundi",
  BJ: "Benin",
  BT: "Bhutan",
  JM: "Jamaica",
  BV: "Bouvet Island",
  BW: "Botswana",
  WS: "Samoa",
  BQ: "Bonaire, Saint Eustatius and Saba ",
  BR: "Brazil",
  BS: "Bahamas",
  JE: "Jersey",
  BY: "Belarus",
  BZ: "Belize",
  RU: "Russia",
  RW: "Rwanda",
  RS: "Serbia",
  TL: "East Timor",
  RE: "Reunion",
  TM: "Turkmenistan",
  TJ: "Tajikistan",
  RO: "Romania",
  TK: "Tokelau",
  GW: "Guinea-Bissau",
  GU: "Guam",
  GT: "Guatemala",
  GS: "South Georgia and the South Sandwich Islands",
  GR: "Greece",
  GQ: "Equatorial Guinea",
  GP: "Guadeloupe",
  JP: "Japan",
  GY: "Guyana",
  GG: "Guernsey",
  GF: "French Guiana",
  GE: "Georgia",
  GD: "Grenada",
  GB: "United Kingdom",
  GA: "Gabon",
  SV: "El Salvador",
  GN: "Guinea",
  GM: "Gambia",
  GL: "Greenland",
  GI: "Gibraltar",
  GH: "Ghana",
  OM: "Oman",
  TN: "Tunisia",
  JO: "Jordan",
  HR: "Croatia",
  HT: "Haiti",
  HU: "Hungary",
  HK: "Hong Kong",
  HN: "Honduras",
  HM: "Heard Island and McDonald Islands",
  VE: "Venezuela",
  PR: "Puerto Rico",
  PS: "Palestinian Territory",
  PW: "Palau",
  PT: "Portugal",
  SJ: "Svalbard and Jan Mayen",
  PY: "Paraguay",
  IQ: "Iraq",
  PA: "Panama",
  PF: "French Polynesia",
  PG: "Papua New Guinea",
  PE: "Peru",
  PK: "Pakistan",
  PH: "Philippines",
  PN: "Pitcairn",
  PL: "Poland",
  PM: "Saint Pierre and Miquelon",
  ZM: "Zambia",
  EH: "Western Sahara",
  EE: "Estonia",
  EG: "Egypt",
  ZA: "South Africa",
  EC: "Ecuador",
  IT: "Italy",
  VN: "Vietnam",
  SB: "Solomon Islands",
  ET: "Ethiopia",
  SO: "Somalia",
  ZW: "Zimbabwe",
  SA: "Saudi Arabia",
  ES: "Spain",
  ER: "Eritrea",
  ME: "Montenegro",
  MD: "Moldova",
  MG: "Madagascar",
  MF: "Saint Martin",
  MA: "Morocco",
  MC: "Monaco",
  UZ: "Uzbekistan",
  MM: "Myanmar",
  ML: "Mali",
  MO: "Macao",
  MN: "Mongolia",
  MH: "Marshall Islands",
  MK: "Macedonia",
  MU: "Mauritius",
  MT: "Malta",
  MW: "Malawi",
  MV: "Maldives",
  MQ: "Martinique",
  MP: "Northern Mariana Islands",
  MS: "Montserrat",
  MR: "Mauritania",
  IM: "Isle of Man",
  UG: "Uganda",
  TZ: "Tanzania",
  MY: "Malaysia",
  MX: "Mexico",
  IL: "Israel",
  FR: "France",
  IO: "British Indian Ocean Territory",
  SH: "Saint Helena",
  FI: "Finland",
  FJ: "Fiji",
  FK: "Falkland Islands",
  FM: "Micronesia",
  FO: "Faroe Islands",
  NI: "Nicaragua",
  NL: "Netherlands",
  NO: "Norway",
  NA: "Namibia",
  VU: "Vanuatu",
  NC: "New Caledonia",
  NE: "Niger",
  NF: "Norfolk Island",
  NG: "Nigeria",
  NZ: "New Zealand",
  NP: "Nepal",
  NR: "Nauru",
  NU: "Niue",
  CK: "Cook Islands",
  XK: "Kosovo",
  CI: "Ivory Coast",
  CH: "Switzerland",
  CO: "Colombia",
  CN: "China",
  CM: "Cameroon",
  CL: "Chile",
  CC: "Cocos Islands",
  CA: "Canada",
  CG: "Republic of the Congo",
  CF: "Central African Republic",
  CD: "Democratic Republic of the Congo",
  CZ: "Czech Republic",
  CY: "Cyprus",
  CX: "Christmas Island",
  CR: "Costa Rica",
  CW: "Curacao",
  CV: "Cape Verde",
  CU: "Cuba",
  SZ: "Swaziland",
  SY: "Syria",
  SX: "Sint Maarten",
  KG: "Kyrgyzstan",
  KE: "Kenya",
  SS: "South Sudan",
  SR: "Suriname",
  KI: "Kiribati",
  KH: "Cambodia",
  KN: "Saint Kitts and Nevis",
  KM: "Comoros",
  ST: "Sao Tome and Principe",
  SK: "Slovakia",
  KR: "South Korea",
  SI: "Slovenia",
  KP: "North Korea",
  KW: "Kuwait",
  SN: "Senegal",
  SM: "San Marino",
  SL: "Sierra Leone",
  SC: "Seychelles",
  KZ: "Kazakhstan",
  KY: "Cayman Islands",
  SG: "Singapore",
  SE: "Sweden",
  SD: "Sudan",
  DO: "Dominican Republic",
  DM: "Dominica",
  DJ: "Djibouti",
  DK: "Denmark",
  VG: "British Virgin Islands",
  DE: "Germany",
  YE: "Yemen",
  DZ: "Algeria",
  US: "United States",
  UY: "Uruguay",
  YT: "Mayotte",
  UM: "United States Minor Outlying Islands",
  LB: "Lebanon",
  LC: "Saint Lucia",
  LA: "Laos",
  TV: "Tuvalu",
  TW: "Taiwan",
  TT: "Trinidad and Tobago",
  TR: "Turkey",
  LK: "Sri Lanka",
  LI: "Liechtenstein",
  LV: "Latvia",
  TO: "Tonga",
  LT: "Lithuania",
  LU: "Luxembourg",
  LR: "Liberia",
  LS: "Lesotho",
  TH: "Thailand",
  TF: "French Southern Territories",
  TG: "Togo",
  TD: "Chad",
  TC: "Turks and Caicos Islands",
  LY: "Libya",
  VA: "Vatican",
  VC: "Saint Vincent and the Grenadines",
  AE: "United Arab Emirates",
  AD: "Andorra",
  AG: "Antigua and Barbuda",
  AF: "Afghanistan",
  AI: "Anguilla",
  VI: "U.S. Virgin Islands",
  IS: "Iceland",
  IR: "Iran",
  AM: "Armenia",
  AL: "Albania",
  AO: "Angola",
  AQ: "Antarctica",
  AS: "American Samoa",
  AR: "Argentina",
  AU: "Australia",
  AT: "Austria",
  AW: "Aruba",
  IN: "India",
  AX: "Aland Islands",
  AZ: "Azerbaijan",
  IE: "Ireland",
  ID: "Indonesia",
  UA: "Ukraine",
  QA: "Qatar",
  MZ: "Mozambique",
};
