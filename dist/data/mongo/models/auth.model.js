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
exports.AuthModel = void 0;
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const authSchema = new mongoose_1.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
            delete ret.password;
            delete ret.__v;
            delete ret._id;
            return ret;
        }
    },
    toObject: {
        transform: function (doc, ret) {
            delete ret.password;
            delete ret.__v;
            delete ret._id;
            return ret;
        }
    }
});
// Pre-save middleware to hash password
authSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // Only hash the password if it has been modified (or is new)
        if (!this.isModified('password'))
            return next();
        try {
            // Hash password with cost of 12
            const hashedPassword = yield bcryptjs_1.default.hash(this.password, 12);
            this.password = hashedPassword;
            next();
        }
        catch (error) {
            next(error);
        }
    });
});
// Pre-update middleware to hash password on updates
authSchema.pre(['findOneAndUpdate', 'updateOne'], function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const update = this.getUpdate();
        if (update.password) {
            try {
                const hashedPassword = yield bcryptjs_1.default.hash(update.password, 12);
                update.password = hashedPassword;
            }
            catch (error) {
                return next(error);
            }
        }
        next();
    });
});
// Instance method to compare password
authSchema.methods.comparePassword = function (candidatePassword) {
    return bcryptjs_1.default.compareSync(candidatePassword, this.password);
};
exports.AuthModel = (0, mongoose_1.model)("Auth", authSchema);
