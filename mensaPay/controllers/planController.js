import Plan from '../models/Plan.js'
import Client from '../models/Client.js'

export const newPlan = async (req, res) => {
    try {
        const { nome, valor, duracao } = req.body

        const userId = req.userId

        const existingPlan = await Plan.findOne({ userId, nome })

        if (existingPlan) {
            return res.status(422).json({ msg: 'A plan with this name already exists' })
        }

        const plan = new Plan({
            nome,
            valor,
            duracao,
            userId
        })

        await plan.save()

        res.status(201).json(plan)
    } catch (err) {
        console.error(err)
        res.status(500).json({ msg: 'Server error', error: err.message })
    }
}

export const editPlan = async (req, res) => {
    const { data, planId } = req.body

    const updatedPlan = await Plan.findByIdAndUpdate(
        planId,
        {
            nome: data.nome,
            valor: data.valor,
            duracao: data.duracao
        },
        { new: true } 
    )

    if (!updatedPlan) {
        return res.status(404).json({ error: "Plano não encontrado" })
    }

    res.status(200).json(updatedPlan)
}

export const getUserPlans = async (req, res) => {
    const userId = req.userId

    try{
        const plans = await Plan.find({userId, hidden: { $ne: true }})
        res.status(201).json(plans)
    }catch(err){
        res.status(404).json({ msg: 'Plan not found'})
    }
}

export const deleteUserPlan = async (req, res) => {
    const { planId } = req.params

    const userId = req.userId
    
    const clients = await Client.find({ plano: planId, userId })

    if (clients.length > 0) {
        return res.status(400).json({ msg: 'Clientes ligados ao plano' })
    }


    try{
        await Plan.deleteOne({ _id: planId, userId })
        res.status(201).json({ msg: 'Plan deleted'})
    }catch(err){
        res.status(404).json(err)
    }
}