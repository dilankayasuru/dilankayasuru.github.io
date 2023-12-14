// --------------------------------------------------------------------------------------------------------------------
// ************************************ Needed DOM Elements for hotel room booking ************************************
// --------------------------------------------------------------------------------------------------------------------
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
const applyFavoritesBtn = document.getElementById("applyFav");


// ---------------------------------------------------------------------------------------------------------------------
// ************************************* Needed DOM Elements for adventure booking *************************************
// ---------------------------------------------------------------------------------------------------------------------
// Adventure booking form
const advBooking_form = document.getElementById("advBooking_form");

// Adventure booking form input values for calculations
const guideSelection = document.getElementsByName("guide");

const advLocalAdultsNum = document.getElementById("adv_local_adults");
const advLocalKidsNum = document.getElementById("adv_local_kids");
const advforeignAdultsNum = document.getElementById("adv_foreign_adults");
const advforeignKidsNum = document.getElementById("adv_foreign_kids");

// other input values of adventure booking
const advBookingName = document.getElementById("advBookingName");
const advBookingPhone = document.getElementById("advBookingPhone");
const advTime = document.getElementsByName("time");
const advDate = document.getElementById("advDate");

// Adventure Booking Buttons
const advBookBtn = document.getElementById("adv_booking");
const advApplyFav = document.getElementById("advApplyFav");

// Adventure booking summary output elements
const advCostDisplay = document.getElementById("advCost");

const advConfirmPopup = document.getElementById("advConfirm");

const advCustomerName = document.getElementById("advCustomerName");
const advDateOutput = document.getElementById("advDateOutput");
const timeSlotOutput = document.getElementById("timeSlotOutput");
const advOutputSummary = document.getElementById("advOutputSummary");
const advTotalOutput = document.getElementById("advTotalOutput");

const advPopupClose = document.getElementById("done");
const addToFavAdv = document.getElementById("addToFavAdv");

// Variables for Hotel room booking
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

let selectedExtraRequirements;
let selectedRoomTypes;

// Variables for Adventure booking
let guide;
let advTotalCost;
let advLocalAdults;
let advLocalKids;
let advForeignAdults;
let advForeignKids;
let selectedAdvTime;

let localAdultsPrice;
let localKidsPrice;
let foreignAdultsPrice;
let foreignKidsPrice;


initiallise();
initialliseAdvForm();


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

// Hotel booking form on submit
hotelBookNowBtn.addEventListener("click", function (event) {
    event.preventDefault();
    if (validateForm()) {
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
applyFavoritesBtn.addEventListener("click", applyFavorites)



function initiallise() {
    totalCost = 0;
    singelRoomNum = 0;
    doubleRoomNum = 0;
    tripleRoomNum = 0;
    extraBedsNum = 0;
    kids = 0;
    promoDiscount = 0;

    selectedExtraRequirements = [];
    selectedRoomTypes = [];

    loyaltyPointsOnForm.innerText = getLoyaltyPoints();
    showCurrentBooking.innerText = totalCost;
}

// Initialise adventure booking variables
function initialliseAdvForm() {
    guide = false;
    advTotalCost = 0;
    advLocalAdults = 0;
    advLocalKids = 0;
    advForeignAdults = 0;
    advForeignKids = 0;
    localAdultsPrice = 5000;
    localKidsPrice = 2000;
    foreignAdultsPrice = 10000;
    foreignKidsPrice = 5000;
    selectedAdvTime = "";
    advCostDisplay.innerText = "0";
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

// Apply favorites to the booking
function applyFavorites() {
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
    } else alert("You haven't saved any favorites!");
}

// Validate HTML Form input
function validateForm() {

    let validated = false;

    let userName = customerName.value;
    let userEmail = customerEmail.value;
    let userNumber = customerPhone.value;
    let userAddress = customerAddress.value;
    let roomType = validateRoomType();
    let adults = numOfAdults.value;
    const checkIn = new Date(checkInDate.value);
    const checkOut = new Date(checkOutDate.value);

    if (!(userName)) {
        customerName.focus();
        alert("Please enter your Name");
    } else if (!(userEmail)) {
        customerEmail.focus();
        alert("Please enter your email address");
    } else if (!(userAddress)) {
        customerAddress.focus();
        alert("Please enter your address");
    } else if (!(userNumber) || isNaN(userNumber)) {
        customerPhone.focus();
        alert("Please enter a valid phone number");
    } else if (!(roomType)) {
        alert("Please select a room type");
    } else if (!(adults) || adults == 0) {
        numOfAdults.focus();
        alert("Please enter number of adults");
    } else if (!(checkIn > new Date())) {
        checkInDate.focus();
        alert("Please enter a valid check in date");
    } else if (!(checkOut > new Date())) {
        checkOutDate.focus();
        alert("Please enter a valid check out date");
    } else if (checkIn >= checkOut) {
        checkInDate.focus();
        alert("Check out date can not be older than check in date");
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
        } else {
            element.focus();
        }
    })
    return roomtypeSelected;
}


// --------------------------------------------------------------------------------------------------------------------
// ******************************** Adventure Booking Calculations starting from here *********************************
// --------------------------------------------------------------------------------------------------------------------


// Check whether if the guide was selected
guideSelection.forEach(element => element.addEventListener("change", () => {
    if (element.checked) {
        if (element.value === "withGuide") {
            localAdultsPrice = 6000;
            localKidsPrice = 2500;
            foreignAdultsPrice = 11000;
            foreignKidsPrice = 5500;
            console.log("Checked");
            guide = true;
            calculateAdvCost();
        } else {
            localAdultsPrice = 5000;
            localKidsPrice = 2000;
            foreignAdultsPrice = 10000;
            foreignKidsPrice = 5000;
            console.log("unchecked");
            guide = false;
            calculateAdvCost();
        }
    }
}));

// Check the number of local adults and update the total 
advLocalAdultsNum.addEventListener("change", calculateAdvCost);

// Check the number of local kids and update the total 
advLocalKidsNum.addEventListener("change", calculateAdvCost);

// Check the number of foreign adults and update the total 
advforeignAdultsNum.addEventListener("change", calculateAdvCost);

// Check the number of foreign kids and update the total 
advforeignKidsNum.addEventListener("change", calculateAdvCost);

// Handle the adventure book now button
advBookBtn.addEventListener("click", () => {
    calculateAdvCost();

    // Validate user input
    if (isAdvFormValidated()) {
        // Create adventure booking summary and add to the html
        advOutputSummary.innerHTML = createAdvSummary();
        // Display pop up window
        advConfirmPopup.style.transform = `none`;
        bluredBackground.style.display = 'block';
    }
});

// Close adventure booking summary pop up window
advPopupClose.addEventListener("click", () => {
    // Hide popup window
    advConfirmPopup.style.transform = `translateY(100%) scale(0)`;
    bluredBackground.style.display = 'none';
    // Reset the form after user close the popup window
    advBooking_form.reset();
    initialliseAdvForm();
});

// Store adventure booking data in the local storage
addToFavAdv.addEventListener("click", storeAdvBookingData);

// Apply adventure booking data to the form by getting data from the local storage
advApplyFav.addEventListener("click", applyAdvFavorites);


// Calculate total cost of addventure booking
function calculateAdvCost() {
    advLocalAdults = parseInt(advLocalAdultsNum.value);
    advLocalKids = parseInt(advLocalKidsNum.value);
    advForeignAdults = parseInt(advforeignAdultsNum.value);
    advForeignKids = parseInt(advforeignKidsNum.value)
    advTotalCost = advLocalAdults * localAdultsPrice + advLocalKids * localKidsPrice + advForeignAdults * foreignAdultsPrice + advForeignKids * foreignKidsPrice;
    advCostDisplay.innerText = advTotalCost;
    console.log(advTotalCost);
};

// Validate adventure booking form user inputs
function isAdvFormValidated() {
    let validated = false;

    let userName = advBookingName.value;
    let userNumber = advBookingPhone.value;
    let timeSlot = validateTimeSlot();
    let guests = parseInt(advLocalAdultsNum.value) + parseInt(advLocalKidsNum.value) + parseInt(advforeignAdultsNum.value) + parseInt(advforeignKidsNum.value);
    let date = advDate.value;

    // Checking null data to validate user input
    if (!(userName)) {
        advBookingName.focus();
        alert("Please enter your Name");
    } else if (!(userNumber) || isNaN(userNumber)) {
        advBookingPhone.focus();
        alert("Please enter a valid phone number");
    } else if (!(timeSlot)) {
        alert("Please select a time slot")
    } else if (guests <= 0) {
        advLocalAdultsNum.focus();
        alert("Please enter number of Guests");
    } else if (!(date)) {
        advDate.focus();
        alert("Please enter the date");
    } else if (new Date() > new Date(date)) {
        advDate.focus();
        advDate.value = "";
        alert("Please enter a valid date! Date can not be past");
    } else {
        validated = true;
        console.log("Validation Done!");
    }

    // Return true if all the validations are passed else false
    return validated;
}

// Validate adventure booking time slot
function validateTimeSlot() {
    let timeSelected = false;
    // At least one time slot has to be checked to return true
    advTime.forEach(element => {
        if (element.checked) {
            timeSelected = true;
        } else {
            element.focus();
        }
    })
    return timeSelected;
}

// Create adventure booking summary
function createAdvSummary() {
    let summary = "";
    // If the guide is selected add additional note at the end of the summary
    if (guide) {

        if (advLocalAdults > 0) {
            summary += summaryTemplate("Local Adults", advLocalAdults, localAdultsPrice);
        }

        if (advLocalKids > 0) {
            summary += summaryTemplate("Local Kids", advLocalKids, localKidsPrice);
        }

        if (advForeignAdults > 0) {
            summary += summaryTemplate("Foreign Adults", advForeignAdults, foreignAdultsPrice);
        }

        if (advForeignKids > 0) {
            summary += summaryTemplate("Foreign Kids", advForeignKids, foreignKidsPrice);
        }
        summary += `
        <p>Adults have charged by Rs. 1000 extra for guide</p>
        <p>Kids have charged by Rs. 500 extra for guide</p>`
    }
    else {

        if (advLocalAdults > 0) {
            summary += summaryTemplate("Local Adults", advLocalAdults, localAdultsPrice);
        }

        if (advLocalKids > 0) {
            summary += summaryTemplate("Local Kids", advLocalKids, localKidsPrice);
        }

        if (advForeignAdults > 0) {
            summary += summaryTemplate("Foreign Adults", advForeignAdults, foreignAdultsPrice);
        }

        if (advForeignKids > 0) {
            summary += summaryTemplate("Foreign Kids", advForeignKids, foreignKidsPrice);
        }
    }

    advCustomerName.innerText = `Name: ${advBookingName.value}`;
    advDateOutput.innerText = advDate.value;
    // Output the time slot selected
    advTime.forEach(timeElement => {
        switch (timeElement.value) {
            case "9to10":
                timeSlotOutput.innerText = "9.00 am - 10.00 am";
                selectedAdvTime = timeElement.value;
                break;
            case "11to12":
                timeSlotOutput.innerText = "11.00 am - 12.00 pm";
                selectedAdvTime = timeElement.value;
                break;
            case "2to3":
                timeSlotOutput.innerText = "2.00 pm - 3.00 pm";
                selectedAdvTime = timeElement.value;
                break;
        }
    });
    advTotalOutput.innerText = "Rs. " + advTotalCost;

    return summary;
}

// Template to create html elements to add on adventure booking summary
function summaryTemplate(guestType, num, price) {
    let summaryElement = "";

    summaryElement = `
    <div>
        <p><span>${guestType} </span> x ${num}</p>
        <p>Rs. <span>${num * price}</span></p>
    </div>`

    return summaryElement;
}

// Store favourite booking in local storage
function storeAdvBookingData() {
    // Store data as an object in the local storage
    const bookingData = {
        customerName: advBookingName.value,
        customerPhone: advBookingPhone.value,
        timeSlot: selectedAdvTime,
        localAdults: advLocalAdults,
        localKids: advLocalKids,
        foreignAdults: advForeignAdults,
        foreignKids: advForeignKids,
        date: advDate.value,
        guide: guide
    }
    localStorage.setItem("advBooking", JSON.stringify(bookingData));
}

// Apply favorites to the booking
function applyAdvFavorites() {
    // Getting data from the local storage
    const bookingData = JSON.parse(localStorage.getItem('advBooking'));

    // Check if the local stroage has the needed value
    if (!(Object.is(bookingData, null))) {
        advBookingName.value = bookingData.customerName;
        advBookingPhone.value = bookingData.customerPhone;
        advLocalAdultsNum.value = bookingData.localAdults;
        advLocalKidsNum.value = bookingData.localKids;
        advforeignAdultsNum.value = bookingData.foreignAdults;
        advforeignKidsNum.value = bookingData.foreignKids;
        advDate.value = bookingData.date;

        const timeSelected = bookingData.timeSlot;
        const guideSelected = bookingData.guide;


        // Select time slot from favorites
        advTime.forEach(element => {
            if (element.value == timeSelected) {
                element.checked = true;
            }
        });

        // Selecte guide choice from favorites
        guideSelection.forEach(element => {
            // Select with guide
            if (element.value == "withGuide" && guideSelected) {
                element.checked = true;
                localAdultsPrice = 6000;
                localKidsPrice = 2500;
                foreignAdultsPrice = 11000;
                foreignKidsPrice = 5500;
            }
            // Additional (Select with out guide)
            if (element.value == "withoutGuide" && !guideSelected) {
                element.checked = true;
            }
        })

        calculateAdvCost();
    } else alert("You haven't saved any favorites!");
    // trow an alert if the value is not saved in the local storage
}