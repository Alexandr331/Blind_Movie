import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: req.body,
    max_tokens: 700,
    temperature: 0,
  });
  res.status(200).json({data: response.data.choices[0].text})
}