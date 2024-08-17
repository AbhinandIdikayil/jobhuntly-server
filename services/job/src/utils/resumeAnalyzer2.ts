import natural from 'natural';
import { SentimentAnalyzer } from 'natural';
import  wink from 'wink-nlp';
import model from 'wink-eng-lite-web-model';
import { fetchAndParsePDF } from './parsePdf';

const nlp = wink(model);

export async function analyzeResume(url: string) {
    try {
        let resumeText: any = await fetchAndParsePDF(url);

        // Ensure resumeText is a string
        if (typeof resumeText !== 'string') {
            if (Array.isArray(resumeText)) {
                resumeText = resumeText.join(' ');
            } else {
                throw new Error('Invalid resume text format');
            }
        }

        // Text preprocessing
        const tokenizer = new natural.WordTokenizer();
        const tokens = tokenizer.tokenize(resumeText.toLowerCase());
        const stemmedTokens = tokens.map(token => natural.PorterStemmer.stem(token));

        // Wink NLP processing
        const doc = nlp.readDoc(resumeText);

        // Named Entity Recognition
        const entities = doc.entities().out();

        // Part-of-speech tagging
        const posTagged = doc.tokens().out((its: any) => ({
            text: its.out(),
            pos: its.pos()
        }));

        // Keyword extraction (using TF-IDF)
        const tfidf = new natural.TfIdf();
        tfidf.addDocument(stemmedTokens);
        const keywords = tfidf.listTerms(0)
            .filter(item => item.tfidf > 0.5)
            .map(item => item.term);

        function analyzeSentiment(text: string): number {
            const analyzer = new SentimentAnalyzer('English', natural.PorterStemmer, 'afinn');
            return analyzer.getSentiment(tokenizer.tokenize(text));
        }

        // Extract key phrases based on POS patterns
        const keyPhrases = extractKeyPhrases(posTagged);

        // Skills extraction
        const skills = extractSkills(stemmedTokens);

        // Education extraction
        const education = extractEducation(doc);

        // Work experience extraction
        const workExperience = extractWorkExperience(doc);

        // Sentiment analysis
        const sentiment = analyzeSentiment(resumeText);

        // Text summarization
        const summary = summarizeText(doc);

        // Calculate readability
        const readability = calculateReadability(resumeText);

        // Calculate score
        const score = calculateScore(keywords, entities, skills, education, workExperience, keyPhrases, sentiment, readability);

        const analyzedData = {
            keywords,
            entities,
            summary,
            skills,
            education,
            workExperience,
            keyPhrases,
            sentiment,
            readability,
            frequentStemmedTerms: getFrequentStemmedTerms(stemmedTokens)
        };

        return { analyzedData, score };
    } catch (error) {
        console.error('Error analyzing resume:', error);
        throw error;
    }
}

function extractKeyPhrases(posTagged: any[]): string[] {
    const keyPhrases: string[] = [];
    const patterns = [
        ['JJ', 'NN'],  // Adjective + Noun
        ['VB', 'NN'],  // Verb + Noun
        ['NN', 'NN']   // Noun + Noun
    ];

    for (let i = 0; i < posTagged.length - 1; i++) {
        const current = posTagged[i];
        const next = posTagged[i + 1];

        for (const [tag1, tag2] of patterns) {
            if (current.pos === tag1 && next.pos === tag2) {
                keyPhrases.push(`${current.text} ${next.text}`);
            }
        }
    }

    return [...new Set(keyPhrases)];
}

function extractSkills(stemmedTokens: string[]): string[] {
    const skillKeywords = ['javascript', 'python', 'react', 'nodejs', 'mongodb', 'sql', 'aws', 'docker'].map(skill => natural.PorterStemmer.stem(skill));
    return [...new Set(stemmedTokens?.filter(token => skillKeywords.includes(token)))];
}

function extractEducation(doc: any): string[] {
    console.log('------------------------------')
    console.log(doc?.sentences())
    return doc.sentences()?.filter((s: any) =>
        s.out().toLowerCase().includes('degree') ||
        s.out().toLowerCase().includes('university') ||
        s.out().toLowerCase().includes('college')
    ).out();
}

function extractWorkExperience(doc: any): string[] {
    return doc.sentences().filter((s: any) =>
        s.out().toLowerCase().includes('work') ||
        s.out().toLowerCase().includes('job') ||
        s.out().toLowerCase().includes('position')
    ).out();
}



function summarizeText(doc: any): string {
    const sentences = doc.sentences().out();
    const numSentences = Math.min(3, Math.ceil(sentences.length * 0.2));
    return sentences.slice(0, numSentences).join(' ');
}

function calculateReadability(text: string): number {
    const words = text.trim().split(/\s+/).length;
    const sentences = text.split(/[.!?]+/).length;
    const syllables = text.toLowerCase().split(/[^aeiouy]+/).filter(Boolean).length;

    return 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words);
}

function calculateScore(keywords: string[], entities: any[], skills: string[], education: string[],
    workExperience: string[], keyPhrases: string[], sentiment: number, readability: number): number {
    const weights = {
        keyword: 0.15,
        entity: 0.10,
        skill: 0.20,
        education: 0.15,
        experience: 0.15,
        keyPhrase: 0.10,
        sentiment: 0.05,
        readability: 0.10
    };

    const keywordScore = Math.min(keywords.length, 10) * weights.keyword * 10;
    const entityScore = Math.min(entities.length, 10) * weights.entity * 10;
    const skillScore = Math.min(skills.length, 10) * weights.skill * 10;
    const educationScore = Math.min(education.length, 5) * weights.education * 20;
    const experienceScore = Math.min(workExperience.length, 5) * weights.experience * 20;
    const keyPhraseScore = Math.min(keyPhrases.length, 10) * weights.keyPhrase * 10;
    const sentimentScore = (sentiment + 1) * 50 * weights.sentiment; // Normalize sentiment to 0-100
    const readabilityScore = Math.min(Math.max(readability, 0), 100) * weights.readability;

    const totalScore = keywordScore + entityScore + skillScore + educationScore + experienceScore +
        keyPhraseScore + sentimentScore + readabilityScore;

    return Math.min(Math.round(totalScore), 100);
}

function getFrequentStemmedTerms(stemmedTokens: string[]): { term: string, frequency: number }[] {
    const termFrequency: { [key: string]: number } = {};
    stemmedTokens.forEach(term => {
        termFrequency[term] = (termFrequency[term] || 0) + 1;
    });

    return Object.entries(termFrequency)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 20)
        .map(([term, frequency]) => ({ term, frequency }));
}