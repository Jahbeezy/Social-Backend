const { Schema, model } = require('mongoose');

//username, email, thoughts, friends, friendCount


const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true

        },
        email: {
            type: String,
            unique: true,
            required: true,
            // validate: {
            //     validator: function(input) {
            //         return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(input)
            //     },
            //     message: now => `${now.value} is not a valid email address.`
            // },
            required: [true, 'Email is required.']

        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thought"
            }
        ],

        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ],

        // friendCount: userSchema.countDocuments({friends}),
    },
    {
        toJSON: {
            getters: true,
        }
    },
)


const User = model('User', userSchema);

module.exports = User;