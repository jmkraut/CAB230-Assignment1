const hostUrl = 'http://localhost:3000'
const hackhouseUrl = 'https://cab230.hackhouse.sh'

export function fetchOffences(setOffences) {
    return fetch(hackhouseUrl + "/offences")
        .then(function(response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok.");
        })
        .then(function (result) {
            setOffences(result.offences)
        })
        .catch(function(error){
            console.log("There has been a problem with your fetch operation: ", error.message)
        })
}

export function fetchAreas(setAreas) {
    fetch(hackhouseUrl + "/areas")
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok.");
        })
        .then(function (result) {
            setAreas(result.areas)
        })
        .catch(function(error){
            console.log("There has been a problem with your fetch operation: ", error.message)
        })
}

export function fetchAges(setAges) {
    return fetch(hackhouseUrl + "/ages")
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok.");
        })
        .then(function (result) {
            setAges(result.ages)
        })
        .catch(function(error){
            console.log("There has been a problem with your fetch operation: ", error.message)
        })
}

export function fetchGenders(setGenders) {
    return fetch(hackhouseUrl + "/genders")
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok.");
        })
        .then(function (result) {
            setGenders(result.genders)
        })
        .catch(function(error){
            console.log("There has been a problem with your fetch operation: ", error.message)
        })
}

export function fetchYears(setYears) {
    return fetch(hackhouseUrl + "/years")
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok.");
        })
        .then(function (result) {
            setYears(result.years)
        })
        .catch(function(error){
            console.log("There has been a problem with your fetch operation: ", error.message)
        })
}

export function searchButton(offence, area, age, year, gender, setSearch) {
    let getParam = { method: "GET" };
    let head = { Authorization: `Bearer ${localStorage.getItem('accesspass')}` };
    getParam.headers = head;
// .replace(/[^A-Z0-9]/ig, "").toLowerCase()
    const Offence = 'offence=' + offence
    const Area = 'area=' + area
    const Age = 'age=' + age
    const Year = 'year=' + year
    const Gender = 'gender=' + gender

    const baseUrl = hackhouseUrl + "/search?";
    const query = Offence + '&' + Area + '&' + Age + '&' + Year + '&' + Gender
    const url = baseUrl + query;

    return fetch(encodeURI(url), getParam)
        .then(function (response) {

            if(response.status === 204){
                throw new Error("User is not logged in.")
            }
            if(response.status === 401){
                throw new Error("User is unauthorised.")
            }
            if(response.status === 400){
                throw new Error("Missing required parameter.")
            }
            if (response.ok) {
                console.log("Fetch successful.")
                return response.json()
            }
            throw new Error("Network response was not ok.")

        })
        .then(function (result) {
            setSearch(result.result)
        })
        .catch(function(error){
            console.log("There has been a problem with your fetch operation: ", error.message)
        })
}
