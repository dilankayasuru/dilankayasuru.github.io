const bookingForm = document.getElementById("booking_form");

const userNameInput = document.getElementById("user_name");
const userEmailInput = document.getElementById("user_email");
// const address = document.getElementById("user_email");
// const address = document.getElementById("user_email");

const hotelLocationInput = document.getElementsByName("stay");
const roomTypeInput = document.getElementsByName("room_type");

const singleRooms = document.getElementById("single_room_num");
const doubleRooms = document.getElementById("double_room_num");
const tripleRooms = document.getElementById("triple_room_num");

const roomAdults = document.getElementById("adult");
const roomKids = document.getElementById("kids");

const extraReqInput = document.getElementsByName("extra_req");
const extraBeds = document.getElementById("num_of_beds");

const promocodeInput = document.getElementById("promocode");

const guideInput = document.getElementsByName("guide");
// const timeSlot = document.getElementsByName("time");

const advLocalAdultsInput = document.getElementById("adv_local_adults");
const advLocalKidsInput = document.getElementById("adv_local_kids");
const advForeignAdultsInput = document.getElementById("adv_foreign_adults");
const advForeignKidsInput = document.getElementById("adv_foreign_kids");

const advCostOutput = document.getElementById("advCost")

// const applyPromo = document.getElementById("applyPromo");
const adventureBookBtn = document.getElementById("adv_booking");
const bookNowBtn = document.getElementById("book_now");
const checkLoyalty = document.getElementById("loyaltyPointsCheck");

const windowPop = document.getElementById("popupLol");
const loyaltyClose = document.getElementById("loyaltyClose");

const hotelConfirm = document.getElementById("hotelConfirm");
// const hotelConfirmBackground = document.getElementById("hotelConfirmBackground")
const hotelWindowClose = document.getElementById("hotelClose");

const advConfirm = document.getElementById("advConfirm");
const advWindowClose = document.getElementById("done");

const bluredBackground = document.getElementById("bluredBackground");


let doubleRoomsNum;
let singleRoomsNum;
let tripleRoomsNum;
let totalCost;

let kidsNum;
let extraBedsNum;
let loyaltyPoints;
const promoDiscount = (5 / 100);

let guide;
let adventureTotalCost;
let advLocalAdults;
let advLocalKids;
let advForeignKids;
let advForeignAdults;

initialise();

// const checkDate = document.getElementById("checkout")
// checkDate.addEventListener("change", show => console.log(checkDate.value))


singleRooms.addEventListener("change", checkSingleRoomCost);
doubleRooms.addEventListener("change", checkDoubleRoomCost);
tripleRooms.addEventListener("change", checkTripleRoomCost);
roomTypeInput.forEach(element => element.addEventListener("change", checkRoomType));
roomKids.addEventListener("change", checkNumOfKids);
extraBeds.addEventListener("change", getNumOfExtraBeds);
extraReqInput.forEach(element => element.addEventListener("change", checkExtraBed));
// promocodeInput.addEventListener("keyup", checkPromoDiscount);
bookNowBtn.addEventListener("click", function (event) {
    event.preventDefault();
    bookHotel();
})
guideInput.forEach(element => element.addEventListener("change", checkGuide))
advLocalAdultsInput.addEventListener("change", checkLocalAdults)
advLocalKidsInput.addEventListener("change", checkLocalKids)
advForeignAdultsInput.addEventListener("change", checkForeignAdults)
advForeignKidsInput.addEventListener("change", checkForeignKids)

checkLoyalty.addEventListener("click", checkLoyaltyPoints)
adventureBookBtn.addEventListener("click", showAdvConfirm)

loyaltyClose.addEventListener("click", closeWindow => {
    windowPop.classList.replace("popupShow", "popupHidden")
    bluredBackground.classList.replace("showBackgroundBlur", "hideBackgroundBlur")
})

hotelWindowClose.addEventListener("click", closeWindow => {
    hotelConfirm.classList.replace("popupShow", "popupHidden")
    bluredBackground.classList.replace("showBackgroundBlur", "hideBackgroundBlur")
})

advWindowClose.addEventListener("click", closeWindow => {
    advConfirm.classList.replace("popupShow", "popupHidden")
    bluredBackground.classList.replace("showBackgroundBlur", "hideBackgroundBlur")
})


function initialise() {
    doubleRoomsNum = 0;
    singleRoomsNum = 0;
    tripleRoomsNum = 0;
    kidsNum = 0;
    extraBedsNum = 0;
    guide = false;
    adventureTotalCost = 0;
    advLocalAdults = 0;
    advLocalKids = 0;
    advForeignKids = 0;
    advForeignAdults = 0;
    loyaltyPoints = 0;
    availableLoyaltyPoints = JSON.parse(localStorage.getItem('loyaltyPoints'))
    showLoyaltyPoints();
    calculateCost();
}

function calculateCost() {
    totalCost = singleRoomsNum * 25000 + doubleRoomsNum * 35000 + tripleRoomsNum * 40000 + kidsNum * 5000 + extraBedsNum * 8000;
    console.log(`After Change: ${totalCost}`);
    document.getElementById("output").innerText = `Total Cost: Rs. ${totalCost}`;
}

function calculateAdventureCost() {
    if (guide) {
        adventureTotalCost = advLocalAdults * (5000 + 1000) + advLocalKids * (2000 + 500) + advForeignAdults * (10000 + 1000) + advForeignKids * (5000 + 500);
    } else {
        adventureTotalCost = advLocalAdults * 5000 + advLocalKids * 2000 + advForeignAdults * 10000 + advForeignKids * 5000;
    }

    advCostOutput.innerText = `Total Adventure Cost: Rs. ${adventureTotalCost}`
}

function checkSingleRoomCost() {
    singleRoomsNum = parseInt(this.value);
    calculateCost();
    // console.log(`After Change Single Room Cost: ${roomCost}`);
}

function checkDoubleRoomCost() {
    doubleRoomsNum = parseInt(this.value);
    calculateCost();
    // console.log(`After Change Double Room Cost: ${roomCost}`);
}

function checkTripleRoomCost() {
    tripleRoomsNum = parseInt(this.value);
    calculateCost();
    // console.log(`After Change Triple Room Cost: ${roomCost}`);
}

function checkRoomType() {
    if (this.value == 'single') {
        if (!(this.checked)) {
            singleRooms.value = 0;
            singleRoomsNum = parseInt(singleRooms.value);
            calculateCost();
        } else {
            singleRooms.value = 1;
            singleRoomsNum = parseInt(singleRooms.value);
            calculateCost();
        }

    } else if (this.value == 'double') {
        if (!(this.checked)) {
            doubleRooms.value = 0;
            doubleRoomsNum = parseInt(doubleRooms.value);
            calculateCost();
        } else {
            doubleRooms.value = 1;
            doubleRoomsNum = parseInt(doubleRooms.value);
            calculateCost();
        }

    } else if (this.value == 'triple') {
        if (!(this.checked)) {
            tripleRooms.value = 0;
            tripleRoomsNum = parseInt(tripleRooms.value);
            calculateCost();
        } else {
            tripleRooms.value = 1;
            tripleRoomsNum = parseInt(tripleRooms.value);
            calculateCost();
        }
    }

    // console.log(`Changed CheckBox: ${roomCost}`)
}

function checkNumOfKids() {
    kidsNum = parseInt(this.value);
    calculateCost();
}

function getNumOfExtraBeds() {
    extraBedsNum = parseInt(extraBeds.value);
    calculateCost();
}

function checkExtraBed() {
    if (this.value == 'extraBed') {
        if (!this.checked) {
            extraBeds.value = 0;
            extraBedsNum = extraBeds.value;
            calculateCost();
        } else {
            extraBeds.value = 1;
            extraBedsNum = extraBeds.value;
            calculateCost();
        }
    }
}

function checkPromoDiscount() {
    if (promocodeInput.value == "Promo123") {
        calculateCost();
        totalCost -= (totalCost * promoDiscount)
    }
}

function bookHotel() {
    // event.preventDefault()
    checkPromoDiscount();
    calculateLoyaltyPoints();

    hotelConfirm.classList.replace("popupHidden", "popupShow")
    bluredBackground.classList.replace("hideBackgroundBlur", "showBackgroundBlur")

    bookingForm.reset();
    initialise();
}

function calculateLoyaltyPoints() {
    let numOfRooms = singleRoomsNum + doubleRoomsNum + tripleRoomsNum
    if (numOfRooms > 3) {
        loyaltyPoints = numOfRooms * 20 + availableLoyaltyPoints;
        localStorage.setItem('loyaltyPoints', JSON.stringify(loyaltyPoints))
    }
}

function showLoyaltyPoints() {
    if (availableLoyaltyPoints) {
        document.getElementById('loyaltyPoints').innerText = `Your Loyalty Points: ${availableLoyaltyPoints}`
    } else {
        document.getElementById('loyaltyPoints').innerText = 'Your Loyalty Points: 0'
    }
}

function checkGuide() {
    if (this.value == "withGuide") {
        if (this.checked) {
            guide = true;
        }
    } else {
        guide = false;
    }

    calculateAdventureCost();
}

function checkLocalAdults() {
    advLocalAdults = parseInt(this.value);
    calculateAdventureCost();
}

function checkLocalKids() {
    advLocalKids = parseInt(this.value);
    calculateAdventureCost();
}

function checkForeignAdults() {
    advForeignAdults = parseInt(this.value);
    calculateAdventureCost();
}

function checkForeignKids() {
    advForeignKids = parseInt(this.value);
    calculateAdventureCost();
}

function checkLoyaltyPoints() {
    let numOfRooms = singleRoomsNum + doubleRoomsNum + tripleRoomsNum
    let tempLoyaltyPonits = 0;
    if (numOfRooms > 3) {
        tempLoyaltyPonits = numOfRooms * 20;
    }
    windowPop.classList.replace("popupHidden", "popupShow")
    bluredBackground.classList.replace("hideBackgroundBlur", "showBackgroundBlur")
}

function showAdvConfirm() {
    advConfirm.classList.replace("popupHidden", "popupShow")
    bluredBackground.classList.replace("hideBackgroundBlur", "showBackgroundBlur")
}