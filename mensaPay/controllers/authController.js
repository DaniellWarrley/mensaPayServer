import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const cadastro = async (req, res) => {
    const { email, pass } = req.body

    if (!email) return res.status(422).json({ msg: 'Email is required' })
    if (!pass) return res.status(422).json({ msg: 'Password is required' })

    if (await User.findOne({ email })) {
        return res.status(422).json({ msg: 'Please use another email' })
    }

    const salt = await bcrypt.genSalt(12)
    const hashPass = await bcrypt.hash(pass, salt)

    const user = new User({ email, pass: hashPass })

    try {
        await user.save()
        res.status(201).json({ msg: 'User created successfully' })
    } catch (err) {
        console.error(err)
        res.status(500).json({ msg: 'Server error' })
    }
}

export const login = async (req, res) => {
    const { email, pass } = req.body

    if (!email) return res.status(422).json({ msg: 'Email is required' })
    if (!pass) return res.status(422).json({ msg: 'Password is required' })

    const user = await User.findOne({ email })

    if (!user) {
        return res.status(404).json({ msg: 'User not found' })
    }

    const checkPass = await bcrypt.compare(pass, user.pass)
    if (!checkPass) {
        return res.status(422).json({ msg: 'Invalid password' })
    }

    try {
        const secret = process.env.SECRET
        const token = jwt.sign({ id: user._id }, secret, { expiresIn: '7d' })
        res.status(200).json({ msg: 'You are logged in', token })
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
}
