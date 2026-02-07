import { PrismaClient } from '@prisma/client';
import Redis from 'ioredis';
import { OpenAIApi, Configuration } from 'openai';

const prisma = new PrismaClient();
const redis = new Redis();
const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));

const getKnowledgeBaseArticles = async (query) => {
  try {
    const cachedArticles = await redis.get(`kb:${query}`);
    if (cachedArticles) {
      return JSON.parse(cachedArticles);
    }

    const articles = await prisma.article.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { content: { contains: query, mode: 'insensitive' } },
        ],
      },
    });

    await redis.set(`kb:${query}`, JSON.stringify(articles), 'EX', 3600);
    return articles;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw new Error('Could not fetch articles');
  }
};

const generateResponse = async (customerMessage) => {
  try {
    const articles = await getKnowledgeBaseArticles(customerMessage);
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'user', content: customerMessage },
        { role: 'assistant', content: `Here are some relevant articles: ${articles.map(article => article.title).join(', ')}` },
      ],
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating response:', error);
    throw new Error('Could not generate response');
  }
};

export { getKnowledgeBaseArticles, generateResponse };