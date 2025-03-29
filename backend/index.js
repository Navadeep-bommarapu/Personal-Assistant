    import express from "express";
    import pg from "pg";
    import dotenv from "dotenv";
    import cors from "cors";
    import bcrypt from "bcryptjs";
    import jwt from "jsonwebtoken";
    import bodyParser from "body-parser";
    import passport from "passport";
    import { Strategy } from "passport-local";

    dotenv.config();
    const app = express();
    const port = process.env.PORT || 5000;
    const saltRounds = 10;

    // Middleware
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors({
        origin: "http://localhost:5173", // Your frontend URL
        credentials: true
      }));

    // Postgres Connection
    const db = new pg.Client({
        user: "postgres",
        host: "localhost",
        database: "personalassistant",
        password: "postgre@005",
        port: 5432
    });
    db.connect();

    // Passport Local Strategy
    passport.use(new Strategy({ usernameField: "email" }, async (email, password, cb) => {
        try {
            const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);

            if (result.rows.length === 0) {
                return cb(null, false, { message: "User not found" });
            }

            const user = result.rows[0];

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return cb(null, false, { message: "Invalid credentials" });
            }

            return cb(null, user);
        } catch (err) {
            return cb(err);
        }
    }));

    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    });

    passport.deserializeUser(async (id, cb) => {
        try {
            const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
            if (result.rows.length > 0) {
                cb(null, result.rows[0]);
            } else {
                cb("User not found");
            }
        } catch (err) {
            cb(err);
        }
    });

    // Register Route
    app.post("/register", async (req, res) => {
        const { name, email, password } = req.body;

        try {
            const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [email]);

            if (checkResult.rows.length > 0) {
            return res.status(400).json({ redirectTo:"/login" });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const result = await db.query(
                "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
                [name, email, hashedPassword]
            );

            const user = result.rows[0];
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });

            res.json({ message: "User registered successfully", token, user });
        } catch (err) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    // Login Route
    app.post("/login", async (req, res) => {
        const { email, password } = req.body;

        try {
            const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);

            if (result.rows.length === 0) {
                return res.status(400).json({ error: "User not found" });
            }

            const user = result.rows[0];

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ error: "Invalid credentials" });
            }

            // Generate JWT token
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });

            res.json({ message: "Login successful", token, user });
        } catch (err) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    // Protected Route (User Info)
    app.get("/home", async (req, res) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) return res.status(401).json({ error: "Unauthorized" });

            const token = authHeader.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const result = await db.query("SELECT id, username, email FROM users WHERE id = $1", [decoded.id]);
            res.json({ user: result.rows[0] });
        } catch (err) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    // Start Server
    app.listen(port, () => console.log(`Server running on port ${port}`));
