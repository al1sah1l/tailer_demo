import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
});

export default async function handler(
    textMessage:string
){
    try {
        const response = await openai.completions.create({
            model: "gpt-3.5-turbo-instruct",
            prompt: textMessage,
            max_tokens: 2000,
            temperature: 0,
        })

        console.log('OpenAI API Response:', response);
        console.log(response.choices[0]?.text.trim())

        return response.choices[0]?.text.trim();
    } catch (e) {
        console.log(e);
        return false
    }
}
