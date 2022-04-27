var baseurl = "http://localhost:5500/"

var errorCodes = {

    "INVALID_AUTHORIZATION": "License key is Invalid",

    "NO_AUTHORIZATION_PRESENT": "Authorization missing",

    "NO_STOCK_AVAILABLE": "Currently the stock is not available for that country",

    "DATABASE_INTERNAL_SERVER_ERROR": "Something went wrong within our backend database. Please try again, if the issue continues, please contact Twistyyy#0001 on Discord.",

    "ALREADY_ACCOUNT_UPGRADED": "Your account is already upgraded. If you lost premium, please continue to renew and renew your account by using your key",

    "USER_HAS_PLAN_HOPPED": "Your account already had premium and you got kicked out. You can't use this account to upgrade. Please create another account and use that",

    "LOCATION_NOT_CLOSE_TO_HOME": "For some reason we were unable to change your account country. Please try to change country account manually using any VPN to the country which you're trying to upgrade. After that try to upgrade again",

    "INVALID_COUNTRY": "We couldn't find the country. Please contact us with your key in our support server. We will look into this",

    "INVALID_LICENSE": "Your license key is invalid!",

    "NO_VALID_DATA_FOUND": "You're trying to renew but you dont have any account linked. you should go to upgrade!",

    "INVALID_TOKEN": "License key is Invalid",

    "NO_TOKEN_PROVIDED": "No License key is provided",

    "INVALID_CREDENTIALS": "The account details your provided is invalid. Please recheck and try again!",

    "SOMETHING_WENT_WRONG": "Something went wrong. Please try again!",

    "TOKEN_OR_ADDRESS_INVALID": "The upgrade process failed due to address invalidation. Please try again!",

    "ACCOUNT_UPGRADED": "Congrats, Your account is successfully upgraded",

    "SOMETHING_WENT_WRONG_WHILE_UPGRADE": "Something went wrong while upgrading your account, Please try again!",

    "UNABLE_TO_AUTHENTICATE_WITH_SPOTIFY": "Sorry, but we're unable to authenticate with spotify due to many reasons. Please try again!",

    "ERROR_WHILE_CHANGING_EMAIL": "Something went wrong while doing renew. Please try again!",

    "SOMETHING_WENT_WRONG_IN_NAME_TASK": "Something went wrong while we're trying to resolve your account details. Please try again!",

    "SOMETHING_WENT_WRONG_IN_TOKEN_TASK": "Something went wrong while trying to resolve your account. Please try again!",

    "SOMETHING_WENT_WRONG_IN_EMAIL_TASK": "Something went wrong while trying to resolve a verification. Please try again",

    "ACCOUNT_IS_PREMIUM": "Your account is already have premium, It has to be free."

}



async function getStockData(){

    const res = await fetch(baseurl + "/api/stock",{

        method: "GET",

    })

    return await res.json()
}


async function validateLicense(key,token){

    const res = await fetch(baseurl + "/api/token?token=" + key + "&recaptcha=" + token,{

        method: "GET"

    })

    if(res.status === 200){

        return await res.json()

    } else{

        return false

    }

}



async function upgradeAccount(key, email, password, country,token) {

    var myHeaders = new Headers();

    myHeaders.append("Authorization", key);

    myHeaders.append("Content-Type", "application/json");



    var raw = JSON.stringify({

        "license": key,

        "email": email,

        "password": password,

        "country": country

    });



    var requestOptions = {

        method: 'POST',

        headers: myHeaders,

        body: raw,

        redirect: 'follow'

    };



    const res = await fetch(baseurl + "/api/account/upgrade?recaptcha=" + token, requestOptions)

    return await res.json()

}



async function renewAccount(key,token, password, country) {

    var myHeaders = new Headers();

    myHeaders.append("Authorization", key);

    myHeaders.append("Content-Type", "application/json");



    var raw = JSON.stringify({

        "license": key,

        "password": password,

        "country": country

    });



    var requestOptions = {

        method: 'POST',

        headers: myHeaders,

        body: raw,

        redirect: 'follow'

    };



    const res = await fetch(baseurl + "/api/account/renew?recaptcha=" + token, requestOptions)

    return await res.json()

}