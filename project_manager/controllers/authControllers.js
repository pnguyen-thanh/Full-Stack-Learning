import { User } from "../models/userModels.js"
import { apiResponse } from "../utils/api-response.js"
import { apiError } from "../utils/api-error.js"
import { asyncHandler } from "../utils/async-handler.js"
import {
    sendEmail,
    emailVerificationMailGenContent
} from "../utils/mail.js"

const registerUser = asyncHandler(async (req, res) => {
    const { email, username, password, role } = req.body

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw apiError({
            statusCode: 409, 
            message: "User with email or username already existed",
            errors: []
        })
    }

    const user = await User.create({
        email,
        password,
        username,
        isEmailVerified: false
    })

    const { unHashedToken, hashedToken, tokenExpiry } = user.generateTemporaryToken()

    user.emailVerificationToken = hashedToken
    user.emailVerificationExpiry = tokenExpiry

    await user.save({ validateBeforeSave: false })

    await sendEmail({
        email: user?.email,
        subject: "Please verify your email",
        mailgenContent: emailVerificationMailGenContent(
            user.username,
            `${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unHashedToken}`
        )
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken -emailVerificationToken -emailVerificationExpiry",
    )

    if (!createdUser) {
        throw apiError({
            statusCode: 500,
            message: "Something went wrong while registering the user",
            errors: []
        })
    }

    return res
        .status(201)
        .json(
            apiResponse(
                200,
                { user: createdUser},
                "User registered successfully and verification email has been sent!"
            )
        )
})

export {
    registerUser
}