"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const port = 3000;
const host = 'localhost';
const user_route_1 = __importDefault(require("./routes/user-route"));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const uri = 'mongodb+srv://root:1234@cluster0.aixg6kw.mongodb.net/?retryWrites=true&w=majority';
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(uri);
        console.log('Connected to MongoDB');
    }
    catch (err) {
        console.error('MongoDB Error:', err);
    }
});
connect().then(() => console.log('Connected to MongoDB'));
app.listen(port, host, () => {
    console.log(`Express Listening on ${host}:${port}`);
});
app.use('/api/user', user_route_1.default);
