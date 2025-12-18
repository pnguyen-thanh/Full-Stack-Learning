import { User } from "../models/userModels.js"
import { apiResponse } from "../utils/api-response.js"
import { apiError } from "../utils/api-error.js"
import { asyncHandler } from "../utils/async-handler.js"
import {
    sendEmail,
    emailVerificationMailGenContent
} from "../utils/mail.js"

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
        return { accessToken, refreshToken }
    } catch (error) {
        throw apiError({
            statusCode: 500,
            message: "Something went wrong while generating access token",
            errors: []
        })
    }
}

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

const loginUser = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body

    if (!email || !username) {
        throw apiError({
            statusCode: 400,
            message: "Username and email are required",
            errors: []
        })
    }

    const user = await User.findOne({
        $or: [{ email }, { username }]
    })

    if (!user) {
        throw apiError({
            statusCode: 404,
            message: "User not found",
            errors: []
        })
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw apiError({
            statusCode: 400,
            message: "Invalid credentials",
            errors: []
        })
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)

    const logInUser = await User.findById(user._id).select(
        "-password -refreshToken -emailVerificationToken -emailVerificationExipry"
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(apiResponse({
            statusCode: 200,
            data: {
                user: logInUser,
                accessToken,
                refreshToken
            },
            message: "User logged in successfully"
        }))
})

export {
    registerUser,
    loginUser
}