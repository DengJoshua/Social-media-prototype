const express = require('express')
const mongoose = require('mongoose')
const { User } = require('../models/user')
const router = express.Router()

router.get('/:id', async (req, res) => {
    const friends = await User.findById(req.params.id).select('friends')
    res.send(friends)
})

router.post('/getmessages/:id', async (req, res) =>  {
    const userId = req.body.userId
    const me = await User.findById(req.params.id)

    const index = me.friends.findIndex(function(friend){
        return friend._id == userId
    })
    
    const inbox = me.friends[index].inbox
    res.send(inbox)
})

router.post('/sendMessage',  async (req, res) => {
    const me = await User.findById(req.body.myId)
    const friend  = await User.findById(req.body.friendId)
    const message = req.body.message


    await User.updateOne({ $and: [
    {_id: me._id},
    { "friends._id": friend._id}
    ]}, 
    {
    $push: {
        "friends.$.inbox": {
        message: message,
        from: me._id
   }}})
    
   await User.updateOne({ $and: [
    {_id: friend._id},
    { "friends._id": me._id}
    ]}, 
    {
    $push: {
        "friends.$.inbox": {
        message: message,
        from: me._id
   }}})

    res.send("Message sent.")
})





router.post('/sendFriendRequest', async (req, res) => {
    const me = await User.findById(req.body.myId)
    const user = await User.findById(req.body.reqId)

    await User.updateOne({_id: user._id}, {
    $push: {
        "friendRequests": {
            _id: me._id,
            username: me.username,
            profilePic: me.profile.profilePic,
            status: "pending",
            sentByMe: false,
            inbox:[]            
        }
    }})

    await User.updateOne({ _id: user._id }, {
        $push:{
            notifications: {
                content: me.username + " has sent you a friend request.",
                createdAt: new Date().getTime(),
                profilePic: me.profile.profilePic
            }
        }
    })

    await User.updateOne({ _id: me._id }, {
    $push: {
        "friends": {
            _id: user._id,
            username: user.username,
            profilePic: user.profile.profilePic,
            status: "pending",
            sentByMe: true,
            inbox:[]
        }
    }
    })
    

    res.json({ 
        "status":"success",
        "message":"Friend Request sent"
    })
})

//accept a friend request 
router.post('/acceptFriendRequest', async (req, res) => {
    const me = await User.findById(req.body.myId)
    const user = await User.findById(req.body.reqId)

    await User.updateOne({ _id: user._id }, {
        $push:{
            notifications: {
                content: me.username + " has accepted your friend request.",
                createdAt: new Date().getTime(),
                profilePic: me.profile.profilePic
            }
        }
    })

    await User.updateOne({ _id: me._id },{
        $pull: {
            friendRequests: {
                _id: user._id
            }
        }
    })

    await User.updateOne({ _id: me._id }, {
        $push: {
            "friends": {
                _id: user._id,
                username: user.username,
                profilePic: user.profile.profilePic,
                status: "accepted",
                sentByMe: false,
                inbox:[]
            }
        }
        })

    await User.updateOne({ $and: [{_id: user._id}, 
        { "friends._id": me._id  }] }, {
            $set: {
                "friends.$.status": "accepted"
            }
        }
    )

    res.json({
        "status":"succes",
        "message":"You are friends"
    })
})

//decline a friend request
router.post('/decline', async(req, res) => {
    const me = await User.findById(req.body.myId)
    const user = await User.findById(req.body.reqId)

    await User.updateOne({ _id: user._id }, {
        $push:{
            notifications: {
                content: me.username + " has declined your friend request.",
                createdAt: new Date().getTime(),
                profilePic: me.profile.profilePic
            }
        }
    })

    await User.updateOne({ _id: me._id },{
        $pull: {
            friendRequests: {
                _id: user._id
            }
        }
    })

    await User.updateOne({ _id: user._id },{
        $pull: {
            friends: {
                _id:me._id
            }
        }
    })
    res.json({
        "status":"success",
        "message":"Friend Request declined."
    })
})

//cancel sent friend request
router.post('/cancel', async(req, res) => {
    const me = await User.findById(req.body.myId)
    const user = await User.findById(req.body.reqId)

    await User.updateOne({ _id: user._id },{
        $pull: {
            friendRequests: {
                _id: me._id
            }
        }
    })

    await User.updateOne({ _id: me._id },{
        $pull: {
            friends: {
                _id: user._id
            }
        }
    })
    res.json({
        "status":"success",
        "message":"Friend Request cancelled."
    })
})



//delete and unfriend friends
router.post('/unfriend', async (req, res) => {
    const me = await User.findById(req.body.myId)
    const user = await User.findById(req.body.reqId)
    
    await User.updateOne({ _id: user._id }, {
        $push:{
            notifications: {
                content: me.username + " unfriended you.",
                createdAt: new Date().getTime(),
                profilePic: me.profile.profilePic
            }
        }
    })
    
    await User.updateOne({ _id: user._id },{
        $pull: {
            friends: {
                _id:me._id
            }
        }
    })

    await User.updateOne({ _id: me._id },{
        $pull: {
            friends: {
                _id: user._id
            }
        }
    })

    res.json({
        "status":"success",
        "message":"User has been unfriended."
    })
})



module.exports = router