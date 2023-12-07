const hotelBookingForm = document.getElementById("booking_form");

const roomTypeCheckbox = document.getElementsByName("room_type");
const numOfSingleRooms = document.getElementById("single_room_num");
const numOfDoubleRooms = document.getElementById("double_room_num");
const numOfTripleRooms = document.getElementById("triple_room_num");

const numOfKids = document.getElementById("kids");

const extraRequirement = document.getElementsByName("extra_req");
const numOfExtraBeds = document.getElementById("num_of_beds");

const promoCode = document.getElementById("promocode");

const loyaltyPointsOnForm = document.getElementById("loyaltyPoints");

const showCurrentBooking = document.getElementById("outputTotal");


// Other extra elements on HTML Form
const hotelName = document.getElementById("stay");
const checkInDate = document.getElementById("checkin");
const checkOutDate = document.getElementById("checkout");
const customerPhone = document.getElementById("phone");
const customerName = document.getElementById("user_name");
const customerEmail = document.getElementById("user_email");
const numOfAdults = document.getElementById("adult");
const customerAddress = document.getElementById("address");



// Elements on loylty popup window
const bluredBackground = document.getElementById("bluredBackground");

const loyaltyPopupWindow = document.getElementById("popupLoyalty");
const showCurrentLoyalty = document.getElementById("loyaltyPointsToearn");
const showAvailableLoyalty = document.getElementById("pointsAvailable");
const showTotalLoyalty = document.getElementById("totalLoyaltyPoints");
const loyaltyWindowClose = document.getElementById("loyaltyClose");


// Hotel Booking summary popup elements
const hotelBookingSummaryPopup = document.getElementById("hotelConfirm");
const hotelBookingSummaryClose = document.getElementById("hotelClose");

const hotelNameOutput = document.getElementById("hotelNameOutput");
const checkInDateOutput = document.getElementById("checkInDateOutput");
const checkOutDateOutput = document.getElementById("checkOutDateOutput");

const customerNameOutput = document.getElementById("outputName");
const numOfAdultsOutput = document.getElementById("outputAdults");
const numOfKidsOutput = document.getElementById("outputKids");
const numOfRoomsOutput = document.getElementById("outputRooms");

const summaryOutput = document.getElementById("outputSummary");
const hotelBookingTotalOutput = document.getElementById("hotelTotal");
const loyaltyPointsSummary = document.getElementById("loyaltyPointsOutput");

const addToFavBtn = document.getElementById("addToFav");


// Buttons on html
const checkLoyaltyBtn = document.getElementById("loyaltyPointsCheck");
const hotelBookNowBtn = document.getElementById("book_now");
const applyFavouritesBtn = document.getElementById("applyFav");

let totalCost;
let singelRoomNum;
let doubleRoomNum;
let tripleRoomNum;
let extraBedsNum;
let kids;
let promoDiscount;

let availableLoyaltyPoints;

const singleRoomPrice = 25000;
const doubleRoomPrice = 35000;
const tripleRoomPrice = 40000;
const extraBedPrice = 8000;
const extraPriceForKids = 5000;

const selectedExtraRequirements = [];
const selectedRoomTypes = [];


initiallise();


// Update when room type is changed
roomTypeCheckbox.forEach(element => element.addEventListener("change", checkRoomType));

// Update when number of rooms are changed
numOfSingleRooms.addEventListener("change", calculateHotelCost);
numOfDoubleRooms.addEventListener("change", calculateHotelCost);
numOfTripleRooms.addEventListener("change", calculateHotelCost);

// Update when number of kids are changed
numOfKids.addEventListener("change", () => {
    kids = parseInt(numOfKids.value);
    calculateHotelCost();
})

// Update when extra beds checkbox changed
extraRequirement.forEach(element => element.addEventListener("change", checkExtraBeds));

// Update when number of extra beds are changed
numOfExtraBeds.addEventListener("change", calculateHotelCost);

// Show loyalty points when button clicks
checkLoyaltyBtn.addEventListener("click", () => {
    checkLoyalty();
    loyaltyPopupWindow.style.transform = `none`;
    bluredBackground.style.display = 'block';
})
// Close loyalty Popup Window
loyaltyWindowClose.addEventListener("click", () => {
    loyaltyPopupWindow.style.transform = `translateY(100%) scale(0)`;
    bluredBackground.style.display = 'none';
})


// Form on submit
hotelBookNowBtn.addEventListener("click", function (event) {
    event.preventDefault();
    if(validateForm()) {
        checkPromoCode();
        calculateHotelCost();
    
        // Store Loyalty Points on local storage
        localStorage.setItem("loyalty", JSON.stringify(availableLoyaltyPoints + checkLoyalty()));
        showHotelBookingSummary();
    }
})

// Hotel booking summary close btn
hotelBookingSummaryClose.addEventListener("click", () => {

    hotelBookingForm.reset();
    initiallise();

    hotelBookingSummaryPopup.style.transform = `translateY(100%) scale(0)`;
    bluredBackground.style.display = 'none';
})

// Save data in local Storage
addToFavBtn.addEventListener("click", storeDataInLocalStorage)

// Get data from local storage and apple
applyFavouritesBtn.addEventListener("click", applyFavourites)



function initiallise() {
    totalCost = 0;
    singelRoomNum = 0;
    doubleRoomNum = 0;
    tripleRoomNum = 0;
    extraBedsNum = 0;
    kids = 0;
    promoDiscount = 0;

    loyaltyPointsOnForm.innerText = getLoyaltyPoints();
    showCurrentBooking.innerText = totalCost;
}


// Calculate total cost of booking
function calculateHotelCost() {

    singelRoomNum = parseInt(numOfSingleRooms.value);
    doubleRoomNum = parseInt(numOfDoubleRooms.value);
    tripleRoomNum = parseInt(numOfTripleRooms.value);

    extraBedsNum = parseInt(numOfExtraBeds.value);

    totalCost = singelRoomNum * singleRoomPrice + doubleRoomNum * doubleRoomPrice + tripleRoomNum * tripleRoomPrice + extraBedsNum * extraBedPrice + kids * extraPriceForKids - promoDiscount;
    console.log(`Total Cost: ${totalCost}`);
    showCurrentBooking.innerText = totalCost;
}


// Update when room type is changed function
function checkRoomType() {
    if (this.value === "single") {
        if (this.checked) {
            console.log("Single Checked")
            numOfSingleRooms.value = 1;
            calculateHotelCost();
        } else {
            console.log("Single unchecked")
            numOfSingleRooms.value = 0;
            calculateHotelCost();
        }
    } else if (this.value === "double") {
        if (this.checked) {
            console.log("double Checked")
            numOfDoubleRooms.value = 1;
            calculateHotelCost();
        } else {
            console.log("double unchecked")
            numOfDoubleRooms.value = 0;
            calculateHotelCost();
        }
    } else {
        if (this.checked) {
            console.log("triple Checked")
            numOfTripleRooms.value = 1;
            calculateHotelCost();
        } else {
            console.log("triple unchecked")
            numOfTripleRooms.value = 0;
            calculateHotelCost();
        }
    }
}


// Update when extra beds are chenged
function checkExtraBeds() {
    if (this.value === "extraBed") {
        if (this.checked) {
            console.log("Extra beds checked");
            numOfExtraBeds.value = 1;
            calculateHotelCost();
        } else {
            console.log("Extra beds unchecked")
            numOfExtraBeds.value = 0;
            calculateHotelCost();
        }
    }
}


// Check the Promo Code
function checkPromoCode() {
    if (promoCode.value === "Promo123") {
        promoDiscount = totalCost * (5 / 100);
        console.log("PromoCode Applied")
    }
}


// Get loyalty points
function getLoyaltyPoints() {
    let loyaltySotred = JSON.parse(localStorage.getItem("loyalty"));
    if (!loyaltySotred) {
        availableLoyaltyPoints = 0;
        return 0;
    } else {
        availableLoyaltyPoints = loyaltySotred;
        return loyaltySotred;
    }
}

// Check Loyalty Points
function checkLoyalty() {
    let numOfRooms = singelRoomNum + doubleRoomNum + tripleRoomNum;;
    let loyalty = 0;

    if (numOfRooms > 3) {
        loyalty = numOfRooms * 20;
    }

    showCurrentLoyalty.innerText = loyalty;
    showTotalLoyalty.innerText = loyalty + availableLoyaltyPoints;
    showAvailableLoyalty.innerText = availableLoyaltyPoints;

    return loyalty;
}


// Create summary of booking popup
function createOrderSummary() {
    let orderSummary = "";

    if (singelRoomNum > 0) {
        orderSummary += `
        <div>
        <p><span>Single Rooms</span> x ${singelRoomNum}</p>
        <p>Rs. <span>${singelRoomNum * 25000}</span></p>
        </div>`;
        selectedRoomTypes.push("single");
    }
    if (doubleRoomNum > 0) {
        orderSummary += `
        <div>
        <p><span>Double Rooms</span> x ${doubleRoomNum}</p>
        <p>Rs. <span>${doubleRoomNum * 35000}</span></p>
        </div>`;
        selectedRoomTypes.push("double");
    }
    if (tripleRoomNum > 0) {
        orderSummary += `
        <div>
        <p><span>Triple Rooms</span> x ${tripleRoomNum}</p>
        <p>Rs. <span>${tripleRoomNum * 40000}</span></p>
        </div>`;
        selectedRoomTypes.push("triple");
    }

    if (kids > 0) {
        orderSummary += `
        <div>
        <p><span>Extra meals for Kids above 5 years</span> x ${kids}</p>
        <p>Rs. <span>${kids * 5000}</span></p>
        </div>`;
    }

    orderSummary += getExtraRequirements();

    if (promoDiscount > 0) {
        orderSummary += `
        <div>
        <p><span>Discount "Promo123"</span></p>
        <p>- Rs. <span>${promoDiscount}</span></p>
        </div>`;
    }

    return orderSummary;
}

// Get Extra Requirements
function getExtraRequirements() {
    let extraReq = "";

    extraRequirement.forEach(element => {
        if (element.checked) {
            if (element.value === "wifi") {
                extraReq += `
                <div>
                    <p><span>Wi-Fi</span></p>
                    <p><span>Free</span></p>
                </div>`;
                selectedExtraRequirements.push(element.value);
            } else if (element.value === "poolView") {
                extraReq += `
                <div>
                <p><span>Pool View Room</span></p>
                <p><span>Free</span></p>
                </div>`;
                selectedExtraRequirements.push(element.value);
            } else if (element.value === "gardenView") {
                extraReq += `
                <div>
                <p><span>Garden View Room</span></p>
                <p><span>Free</span></p>
                </div>`;
                selectedExtraRequirements.push(element.value);
            } else {
                extraReq += `
                <div>
                <p><span>Extra Beds</span> x ${extraBedsNum}</p>
                <p>Rs. <span>${extraBedsNum * extraBedPrice}</span></p>
                </div>`;
                selectedExtraRequirements.push(element.value);
            }
        }
    })

    return extraReq;
}

// Output to the summary of booking pupup snd show
function showHotelBookingSummary() {
    let numOfRooms = singelRoomNum + doubleRoomNum + tripleRoomNum
    let loyalty = (numOfRooms > 3) ? numOfRooms * 20 : 0;

    hotelNameOutput.innerText = `${hotelName.value}`;
    checkInDateOutput.innerText = `${checkInDate.value}`;
    checkOutDateOutput.innerText = `${checkOutDate.value}`;
    customerNameOutput.innerText = `${customerName.value}`;
    numOfAdultsOutput.innerText = `${numOfAdults.value}`;
    numOfKidsOutput.innerText = `${kids}`;
    numOfRoomsOutput.innerText = `${numOfRooms}`;

    summaryOutput.innerHTML = createOrderSummary();

    hotelBookingTotalOutput.innerText = `Rs. ${totalCost}`;

    loyaltyPointsSummary.innerText = `${loyalty}`;

    hotelBookingSummaryPopup.style.transform = 'none';
    bluredBackground.style.display = 'block';
}

// Store favourite booking in local storage
function storeDataInLocalStorage() {
    const bookingData = {
        customerName: customerName.value,
        customerEmail: customerEmail.value,
        customerAddress: customerAddress.value,
        customerPhone: customerPhone.value,
        hotelName: hotelName.value,
        roomTypes: selectedRoomTypes,
        singleRooms: singelRoomNum,
        doubleRooms: doubleRoomNum,
        tripleRooms: tripleRoomNum,
        adults: numOfAdults.value,
        kids: numOfKids.value,
        checkIn: checkInDate.value,
        checkOut: checkOutDate.value,
        extraRequirements: selectedExtraRequirements,
        extraBeds: extraBedsNum
    }

    localStorage.setItem("bookingData", JSON.stringify(bookingData));
}

// Apply favourites to the booking
function applyFavourites() {
    const bookingData = JSON.parse(localStorage.getItem('bookingData'));

    if (!(Object.is(bookingData, null))) {
        customerName.value = bookingData.customerName;
        customerEmail.value = bookingData.customerEmail;
        customerAddress.value = bookingData.customerAddress;
        customerPhone.value = bookingData.customerPhone;
        hotelName.value = bookingData.hotelName;
        numOfSingleRooms.value = bookingData.singleRooms;
        numOfDoubleRooms.value = bookingData.doubleRooms;
        numOfTripleRooms.value = bookingData.tripleRooms;
        numOfAdults.value = bookingData.adults;
        numOfKids.value = bookingData.kids;
        checkInDate.value = bookingData.checkIn;
        checkOutDate.value = bookingData.checkOut;
        numOfExtraBeds.value = bookingData.extraBeds;

        const extraRequirements = bookingData.extraRequirements;
        const roomTypes = bookingData.roomTypes;
        kids = numOfKids.value;


        // extraRequirements
        extraRequirements.forEach(storedElement => {
            extraRequirement.forEach(element => {
                if (element.value == storedElement) {
                    element.checked = true;
                }
            })
        })

        // roomTypes
        roomTypes.forEach(storedElement => {
            roomTypeCheckbox.forEach(element => {
                if (element.value == storedElement) {
                    element.checked = true;
                }
            })
        })
        calculateHotelCost();
    } else alert("You haven't saved any favourites!");

}

// Validate HTML Form input
function validateForm() {

    let validated = false;

    let userName = customerName.value;
    let userEmail = customerEmail.value;
    let userNumber = customerPhone.value;
    let roomType = validateRoomType();
    let adults = numOfAdults.value;
    let checkIn = checkInDate.value;
    let checkOut = checkOutDate.value;

    if (!(userName)) {
        alert("Please enter your Name");
    } else if (!(userEmail)) {
        alert("Please enter your email address");
    } else if (!(userNumber)) {
        alert("Please enter your mobile number");
    } else if (!(roomType)) {
        alert("Please select a room type");
    } else if (!(adults) || adults == 0) {
        alert("Please enter number of adults");
    } else if (!(checkIn)) {
        alert("Please enter check in date");
    } else if (!(checkOut)) {
        alert("Please enter check out date");
    } else {
        validated = true;
        console.log("Validation Done!");
    }
    return validated;
}

// Check whether at least one room is selected
function validateRoomType() {
    let roomtypeSelected = false;
    roomTypeCheckbox.forEach(element => {
        if (element.checked) {
            console.log(element.value)
            roomtypeSelected = true;
        }
    })
    return roomtypeSelected;
}