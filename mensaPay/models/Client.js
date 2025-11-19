import mongoose from "mongoose"

const clientSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    contato: {type: String, required: true},
    dataVencimento: {type: Date, required: true},
    plano: {type: mongoose.Schema.Types.ObjectId, ref: 'Plan', required: true},
    userId: {type: String, required: true}
})

const Client =  mongoose.model('Client', clientSchema)

export default Client