const API_KEY = "135e8c9b-78e1-4a59-a8fb-32a2bd21839d";
let countriesList = []; // Khởi tạo biến countriesList để lưu trữ danh sách quốc gia

// Function to fetch the country list from the API
const getCountries = async () => {
  try {
    const url = `https://holidayapi.com/v1/countries?key=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    const countriesList = data["countries"].map((item) => ({
      code: item.code,
      name: item.name,
    }));
    console.log(countriesList);
    return countriesList;
  } catch (err) {
    console.log("err", err);
  }
};

// Function to render list of countries
const renderCountries = async () => {
  try {
    countriesList = await getCountries();
    const countriesList$ = document.getElementById("countries-list");
    const ulCountriesList = countriesList$.children[2];
    ulCountriesList.innerHTML = "";
    countriesList.forEach((country, index) => {
      const x = document.createElement("li");
      x.innerHTML = `<div class="bullet">${index + 1}</div>
              <div class="li-wrapper">
                  <div class="li-title">${country.name}</div>
                  <div>Code: ${country.code}</div>
              </div>`;
      ulCountriesList.appendChild(x);
    });
  } catch (err) {
    console.log("err", err);
  }
};

// Function to fetch the language list from the API
const getLanguages = async () => {
  try {
    const url = `https://holidayapi.com/v1/languages?key=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    const languagesList = data["languages"].map((item) => ({
      code: item.code,
      name: item.name,
    }));
    console.log(languagesList);
    return languagesList;
  } catch (err) {
    console.log("err", err);
  }
};

// Function to render list of languages
const renderLanguages = async () => {
  try {
    const data = await getLanguages();
    const languagesList = document.getElementById("languages-list");
    const ulLanguagesList = languagesList.children[2];
    ulLanguagesList.innerHTML = "";
    data.forEach((language, index) => {
      const x = document.createElement("li");
      x.innerHTML = `<div class="bullet">${index + 1}</div>
                <div class="li-wrapper">
                    <div class="li-title">${language.name}</div>
                    <div>Code: ${language.code}</div>
                </div>`;
      ulLanguagesList.appendChild(x);
    });
  } catch (err) {
    console.log("err", err);
  }
};

// Function to fetch the holiday list from the API
const getHolidays = async () => {
  try {
    const queryString = generateQueryString();
    const url = `https://holidayapi.com/v1/holidays?pretty&key=${API_KEY}${queryString}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log("data", data);
    return data;
  } catch (error) {
    console.log("error", error.message);
  }
};

// Function to render list of holidays
const renderHolidays = async () => {
  try {
    const data = await getHolidays();
    const holidaysList = document.getElementById("holidays-list");
    const ulHolidaysList = holidaysList.getElementsByTagName("ul")[0];
    let countryTitle = "Unknown"; // Mặc định là Unknown nếu không tìm thấy tên quốc gia
    const countryCode = document
      .getElementById("country-query")
      .value.trim()
      .toUpperCase();
    // Tìm tên quốc gia từ danh sách quốc gia đã lưu trữ
    const countryData = countriesList.find(
      (country) => country.code === (countryCode || "VN")
    );
    if (countryData) {
      countryTitle = countryData.name;
    }

    const titleElement = holidaysList.getElementsByTagName("h3")[0];
    if (!titleElement) {
      const newTitleElement = document.createElement("h3");
      newTitleElement.textContent = `Holidays of ${countryTitle}`;
      holidaysList.insertBefore(newTitleElement, ulHolidaysList);
    } else {
      titleElement.textContent = `Holidays of ${countryTitle}`;
    }
    ulHolidaysList.innerHTML = ""; // Xóa nội dung hiện tại của danh sách
    data.holidays.forEach((holiday, index) => {
      const x = document.createElement("li");
      x.innerHTML = `<div class="bullet">${index + 1}</div>
          <div class="li-wrapper">
              <div class="li-title">${holiday.name}</div>
              <div>${holiday.date}</div>
          </div>`;
      ulHolidaysList.appendChild(x);
    });
  } catch (error) {
    console.log("error", error.message);
  }
};

const generateQueryString = () => {
  let queryString = "";
  const search = document.getElementById("search-query").value.trim();
  const year = document.getElementById("year-query").value.trim();
  const month = document.getElementById("month-query").value.trim();
  const day = document.getElementById("day-query").value.trim();
  const country = document
    .getElementById("country-query")
    .value.trim()
    .toUpperCase();
  const language = document.getElementById("language-query").value.trim();
  if (search) {
    queryString += `&search=${search}`;
  }
  if (year) {
    queryString += `&year=${year}`;
  } else {
    queryString += `&year=2023`;
  }
  if (month) {
    queryString += `&month=${month}`;
  }
  if (day) {
    queryString += `&day=${day}`;
  }
  if (country) {
    queryString += `&country=${country}`;
  } else {
    queryString += `&country=VN`; // Mặc định là Việt Nam
  }
  if (language) {
    queryString += `&language=${language}`;
  }
  return queryString;
};

// Event listener for rendering holidays
document
  .getElementById("holidays-btn")
  .addEventListener("click", renderHolidays);

// Event listener for rendering countries list
document
  .getElementById("countries-list-btn")
  .addEventListener("click", renderCountries);

// Event listener for rendering languages list
document
  .getElementById("languages-list-btn")
  .addEventListener("click", renderLanguages);

renderCountries();
renderLanguages();
