
export function generateOTP() {
    //! create a otp with length 4
    return Math.floor(1000 + Math.random() * 9000).toString()
}
