import Client from "../models/Client.js"
import Plan from "../models/Plan.js"

export const newClient = async (req, res) => {
    const { data } = req.body

    const userId = req.userId

    if(await Client.findOne({ userId, contato: data.contato})){
            return res.status(422).json({ msg: 'A client with that number already exist' })
    }

    const plan = await Plan.findById(data.plano)

    if(!plan){
        return res.status(404).json({ msg: 'Plan not found'})
    }

    let dataAtual = new Date()
    let dataVencimento = new Date(dataAtual)
    dataVencimento.setMonth(dataAtual.getMonth() + plan.duracao)

    const client = new Client({
        nome: data.nome,
        contato: data.contato,
        plano: data.plano,
        dataVencimento: dataVencimento,
        userId: userId
    })
    console.log(client)

    try{
        await client.save()
        res.status(201).json(client)
    }catch(err){
        console.error(err)
        res.status(500).json({ msg: 'Server error', error: err.message })
    }
}
export const getClients = async (req, res) => {
    const userId = req.userId

    try{
        const clients = await Client.find({userId})
        res.status(201).json(clients)
    }catch(err){
        res.status(404).json({ msg: 'Clients not found'})
    }
}
export const editClient = async(req, res) => {
    const {data, clientId} = req.body

    try{
        const updatedClient = await Client.findByIdAndUpdate(
            clientId,{
                nome: data.nome,
                contato: data.contato,
                plano: data.plano
            },
            { new: true }
        )

        return res.status(200).json(updatedClient)
    }catch(err){
        return res.status(404).json(err)
    }
}
export const deleteClient = async (req, res) =>{
    const { clientId } = req.params
    const userId = req.userId

    try{
        await Client.deleteOne({ _id: clientId, userId})
        res.status(200).json({msg: 'Cliente apagado'})
    }catch(err){
        res.status(404).json(err)
    }
}
export const efetuarPagamento = async (req, res) => {
    const { clientId } = req.body

    let client = await Client.findById(clientId)
    if(!client){
        return res.status(404).json({ msg: 'Client not found'})
    }

    let plan = await Plan.findById(client.plano)
    if(!plan){
        return res.status(404).json({ msg: 'Plan not found'})
    }
    let hoje = new Date()
    let dataVencimento = new Date(client.dataVencimento)

    if(getClientState(hoje, dataVencimento)){
        dataVencimento.setMonth(dataVencimento.getMonth() + plan.duracao)
        client.dataVencimento = dataVencimento
        try{
            await client.save()
            return res.status(201).json(client)
        }catch(err){
            return res.status(404).json(err)
        }
    }else{
        res.status(404).json({msg: 'Não é possivel efetuar o pagamento'})
    }
}
function getClientState(hoje, venc){
    hoje.setHours(0, 0, 0, 0)
    venc.setHours(0, 0, 0, 0)

    if (hoje > venc) {
        return true
    }else {
        return false
    }
}