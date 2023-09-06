// https://<your-site.com>/api/revalidate?secret=<token>

// cant text in dev mode , use npm run build!!!


'https://localhost:3000/api/revalidate?path=/&secret=e03b1f6a67f40da43950ffd80c8d5b4'

import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if(req.query.secret !== process.env.MY_SECRET_TOKEN) {
        return res.status(401).json({message: 'Invalid token'})
    }

    const path = req.query.path as string

    await res.revalidate(path)

    return res.json({revalidated: true})
}