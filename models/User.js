const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validation: [validateEmail, 'Email address is required'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        thoughts: {
            _id: [ThoughtSchema]
        },
        friends: {
            _id: [UserSchema]
        }
    }
    // ,
    // {
    //   toJSON: {
    //     virtuals: true,
    //     getters: true
    //   },
    //   id: false
    // }
)

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

module.exports = UserSchema;