import bcrypt from "bcryptjs";
import { prisma } from "../database/db.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET

export const register = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        if (!email || !password || !name) {
            return res.status(400).json({ message: "Missing fields" });
        }

        const exists = await prisma.user.findUnique({ where: { email } });
        if (exists) {
            return res.status(409).json({ message: "Email already used" });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                passwordHash,
                name,
            },
        });

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET, // make sure JWT_SECRET is in your .env
            { expiresIn: "7d" }
        );
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(201).json({ message: "User registered successfully!", user: { id: user.id, email: user.email, name: user.name } });
    } catch (error) {
        console.error("Register error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const logIn = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!user) {
            return res.status(404).json({message: "User was not found."});
        }

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid password, try again!"
            });
        }

        const token = jwt.sign({id: user.id, email: user.email}, JWT_SECRET, {
            expiresIn: "1h",
        });

        return res.json({
            message: "Login sucessfull!",
            token, 
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}