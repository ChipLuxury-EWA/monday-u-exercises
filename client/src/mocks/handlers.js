import { rest } from "msw";

const items = [
    {
        id: 56,
        taskName: "Take dog out for a walk",
        status: true,
    },
    {
        id: 32,
        taskName: "Do the dishes",
        status: true,
    },
];

export const handlers = [
    rest.post("/item", (req, res, ctx) => {
        console.log(`sending to DB server:`, req.json())
        return res(ctx.status(200));
    }),

    rest.get('/items', (req, res,ctx) => {
        return res(ctx.json(items))
    })
];
