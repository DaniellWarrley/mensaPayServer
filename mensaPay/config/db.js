import mongoose from "mongoose"

const connectDb = async () => {
    try{
        const dbUser = process.env.DB_USER
        const dbPass = process.env.DB_PASS

        mongoose.connect(
            `mongodb+srv://${dbUser}:${dbPass}@cluster0.1cfundp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
        )
    }catch(err){

    }
}

export default connectDb