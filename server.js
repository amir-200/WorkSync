import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import os from "os";
import http from "http"; // Import http module
import { Server as SocketIoServer } from "socket.io"; // Named import for socket.io

const app = express();
const server = http.createServer(app); // Create HTTP server
const io = new SocketIoServer(server); // Initialize Socket.IO server

app.use(express.static(path.join(path.resolve(), "front_page")));
app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect("mongodb://localhost:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Database is connected"))
.catch((err) => console.log("Database connection error:", err));

const messageSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

const Message = mongoose.model("authentics", messageSchema); // Correct model name

app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "views")); // Set the views directory

// Authentication middleware
const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;
    if (token) {
        try {
            const decoded = jwt.verify(token, "asikhdjfshdjf");
            req.user = await Message.findById(decoded._id);
            if (!req.user) return res.redirect("/login"); // Handle case where user is not found
            next();
        } catch (err) {
            console.error("Authentication error:", err);
            res.redirect("/login");
        }
    } else {
        res.redirect("/login");
    }
};

const numbers = (function* () {
    let i = 1;
    while (true) yield i++;
})();

    const numberValue = numbers.next().value;
    let user;

io.on('connection', (socket) => {
    socket.broadcast.emit('online', { name: user.name, socketId: socket.id });

    console.log('A user connected');

    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
        socket.broadcast.emit('offline', { number: numberValue });
    });
});


// Routes
app.get("/", (req, res) => {
    res.render("index.html");
});

app.get("/chat", isAuthenticated, (req, res) => {
    res.render("chatapp", { name: req.user.name }); 
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/register", (req, res) => { // Corrected route name
    res.render("register");
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Message.findOne({ email });
        if (!user) return res.redirect("/register");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.render("login", { message: "Incorrect password" });

        const token = jwt.sign({ _id: user._id }, "asikhdjfshdjf");
        res.cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 60 * 1000),
        });
        res.redirect("/chat");
    } catch (err) {
        console.error("Login error:", err);
        res.redirect("/login");
    }
});

app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    user = req.body
    try {
        let user = await Message.findOne({ email });
        if (user) return res.redirect("/login");

        const hashedPassword = await bcrypt.hash(password, 10);
        user = await Message.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign({ _id: user._id }, "asikhdjfshdjf");
        res.cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 60 * 1000),
        });
        res.redirect("/chat");
    } catch (err) {
        console.error("Registration error:", err);
        res.redirect("/register");
    }
});

app.get("/logout", (req, res) => {
    res.cookie("token", null, {
        httpOnly: true,
        expires: new Date(Date.now()),
    });
    res.redirect("/");
});

// Server listening
const interfaces = os.networkInterfaces();
let localIp = 'localhost';
for (let iface in interfaces) {
    for (let ifaceDetails of interfaces[iface]) {
        if (ifaceDetails.family === 'IPv4' && !ifaceDetails.internal) {
            localIp = ifaceDetails.address;
            break;
        }
    }
}

const PORT = 3010;
server.listen(PORT, localIp, () => {
    console.log(`Server listening on http://${localIp}:${PORT}`);
});
