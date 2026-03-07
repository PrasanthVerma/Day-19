const postModel = require("../models/post.model")
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")
const likeModel = require("../models/like.model")


const imageKit = new ImageKit({
    privateKey: process.env.IMAGE_KIT_PRIVATE_KEY
})

async function createPostController(req, res) {

    console.log(req.body, req.file)

    if (!req.file) {
        return res.status(400).json({ message: "Image file is required" })
    }

    const file = await imageKit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: req.file.originalname || "upload",
    });

    // use the correct url property returned by ImageKit
    const imageURL = file.url || file.filePath || file.imageURL

    const post = await postModel.create({
        caption: req.body.caption,
        imageURL,
        user: req.user.id
    })

    res.status(200).json({
        message: "Post created",
        post
    })
}

async function getPostController(req, res) {

    const userId = req.user.id

    const posts = await postModel.find({ user: userId })

    return res.status(200).json({
        message: "Posts Fetched Successfully",
        posts
    })
}

async function getPostDetailsController(req, res) {

    const userId = req.user.id
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if (!post) {
        return res.status(404).json({
            message: "Post Not Found"
        })
    }

    const isValidUser = post.user.toString() === userId

    if (!isValidUser) {
        return res.status(401).json({
            message: "Unauthorized Request"
        })
    }

    return res.status(200).json({
        message: "Post details fetched successfully",
        post
    })

}

async function likePostController(req, res) {

    const username = req.user.username
    // console.log(username)
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if (!post) {
        return res.status(404).json({
            message: "Post not found."
        })
    }

    const like = await likeModel.create({
        post: postId,
        user: username
    })

    res.status(200).json({
        message: "Post liked successfully.",
        like
    })

}


async function unLikePostController(req, res) {
    const postId = req.params.postId
    const userId = req.user.id

    const isLiked = await likeModel.findOne({
        post: postId,
        user: userId
    })

    if (!isLiked) {
        return res.status(400).json({
            message: "Post didn't like"
        })
    }

    await likeModel.findOneAndDelete({ _id: isLiked._id })

    return res.status(200).json({
        message: "post un liked successfully."
    })
}


async function getFeedController(req, res) {

    const user = req.user
    // console.log(user)
    const posts = await Promise.all((await postModel.find().populate("user").lean())
        .map(async (post) => {

            const isLiked = await likeModel.findOne({
                user: user.username,
                post: post._id
            })

            post.isLiked = Boolean(isLiked)

            return post

        }))

    return res.status(200).json({
        message: "Feed fetched successfully",
        posts
    })
}

module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController,
    likePostController,
    unLikePostController,
    getFeedController

}