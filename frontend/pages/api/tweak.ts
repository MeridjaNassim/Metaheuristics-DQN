import { NextApiRequest, NextApiResponse } from 'next';

const handler =  (req:NextApiRequest, res:NextApiResponse) => {

    req.statusCode = 200


}

export default handler