import {NextFunction, Request, Response} from "express";
import {isObjectIdOrHexString} from "mongoose";

class CommonMiddleware {
    public isIdValid(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;

            if (!isObjectIdOrHexString(id)) {
                import {model, Schema, Types} from "mongoose";

                import {User} from "./user.model";

                const tokenSchema = new Schema(
                    {
                        accessToken: {
                            type: String,
                            required: true,
                        },
                        refreshToken: {
                            type: String,
                            required: true,
                        },
                        _userId: {
                            type: Types.ObjectId,
                            required: true,
                            ref: User,
                        },
                    },
                    {
                        timestamps: true,
                        versionKey: false,
                    },
                );

                export const Token = model("token", tokenSchema);
                throw new Error("wrong ID param");
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const commonMiddleware = new CommonMiddleware();
