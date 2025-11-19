import mongoose from 'mongoose'

const planSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    valor: {type: Number, required: true},
    duracao: {type: Number, required: true},
    userId: {type: String, required: true}
})

const Plan = mongoose.model('Plan', planSchema)

export default Plan