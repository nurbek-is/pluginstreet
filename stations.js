var locations = [];
// constructor function
function station (city, chargeType, building, fullAddress, dateAdded) {
  this.city = city;
  this.chargeType = chargeType;
  this.building = building;
  this.fullAddress = fullAddress;
  this.dateAdded = dateAdded;
  locations.push(this);
}
// Instantiating new objects
var fourthMadis = new station ('seattle', 'Level 2 Charger', 'Fourth and Madison Building', "925 4th Avenue, Seattle, WA 98101", '01/12/2017');
var thirdMadis = new station ('seattle','DC Fast Charger', 'Wells Fargo Center', "999 3rd Ave, Seattle, WA, 98104", '05/12/2016');
var pikeHarvard = new station ('seattle','DC Fast Charger', 'Harvard Market', "1406 Harvard Ave, Seattle, WA 98122", '03/12/2016');
var lakeUnion = new station ('seattle','Level 2 Charger', 'Amazon - Obidos/Rufus', "550 Terry Ave N, Seattle, WA, 98109", '05/20/2016');
var tacoPubUti = new station ('tacoma', 'Level 2 Charger', 'Tacoma Public Utilities', "3628 S 35th St, Tacoma, Washington 98409", '09/12/2016');
var BellevueMall = new station ('bellevue', 'Level 2 Charger', 'Lincoln Square', '600 100th Pl NE, Bellevue, WA 98004', '01/12/2016');
var concTechBell = new station ('bellevue', 'DC Fast Charger', 'Concur Technologies', '601 108th Ave NE, Bellevue, WA 98004', '04/12/2016');
var southParkPor = new station ('portland', 'Level 2 Charger', 'South Park Seafood', '914 SW Taylor St. Portland, OR 97204', '06/12/2016');
var hotelJupiPor = new station ('portland', 'Tesla Supercharger', 'Hotel Jupiter','800 East Burnside, Portland, OR 97214', '02/12/2016');
