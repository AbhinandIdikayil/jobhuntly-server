import natural from 'natural'
import nlp from 'compromise'
import { fetchAndParsePDF } from './parsePdf';

// const TfIdf = natural.TfIdf;
// const tokenizer = new natural.WordTokenizer();
// const stemmer = natural.PorterStemmer;

export async function resumeAnalyzer(url: string, companySkill: any, companyEducation: any): Promise<number | null> {
    try {
        if (url) {
            let resumeText: any = await fetchAndParsePDF(url);

            if (typeof resumeText !== 'string') {
                if (Array.isArray(resumeText)) {
                    resumeText = resumeText?.join(' ');
                } else {
                    throw new Error('Invalid resume text format');
                }
            }

            // Text preprocessing
            const tokenizer = new natural.WordTokenizer();
            const tokens = tokenizer.tokenize(resumeText.toLowerCase());
            const stemmedTokens = tokens.map(token => natural.PorterStemmer.stem(token));

            // Named Entity Recognition and Part-of-speech tagging
            let entities = [];
            let posTagged = [];
            try {
                const doc = nlp(resumeText);
                entities = doc.topics().json();
                posTagged = doc.terms().out('tags');
            } catch (nlpError) {
                console.warn('NLP processing error:', nlpError);
                // Continue with empty entities and posTagged
            }

            // Keyword extraction (using TF-IDF)
            const tfidf = new natural.TfIdf();
            tfidf.addDocument(stemmedTokens);
            const keywords = tfidf.listTerms(0)
                .filter(item => item.tfidf > 0.5)
                .map(item => item.term);

            // Text summarization (extractive method)
            const sentences = resumeText.split(/[.!?]+/);
            const summarizedSentences = sentences
                .map((sentence: any) => ({ sentence, score: calculateSentenceImportance(sentence, keywords) }))
                .sort((a: any, b: any) => b.score - a.score)
                .slice(0, 3)
                .map((item: any) => item.sentence);
            const summary = summarizedSentences.join('. ');


            const keyPhrases = extractKeyPhrases(posTagged);

            // Skills extraction
            const skills = extractSkills(resumeText, companySkill);

            // Education extraction
            const education = extractEducation(resumeText, companyEducation);

            // Work experience extraction
            const workExperience = extractWorkExperience(resumeText,companyEducation);

            // Calculate score
            const score = calculateScore(keywords, entities, skills, education, workExperience,
                keyPhrases
            );

            // Save to MongoDB
            const analyzedData = {
                keywords,
                entities,
                summary,
                skills,
                education,
                workExperience,
                frequentStemmedTerms: getFrequentStemmedTerms(stemmedTokens)  // New addition

            };
            console.log(analyzedData.frequentStemmedTerms, analyzedData.entities)
            console.log({ analyzedData, score })
            return score as number
        } else {
            return null
        }
    } catch (error) {
        console.error('Error analyzing resume:', error);
        throw error;
    }
}


function getFrequentStemmedTerms(stemmedTokens: any) {
    const termFrequency: any = {};
    stemmedTokens.forEach((term: any) => {
        termFrequency[term] = (termFrequency[term] || 0) + 1;
    });

    return Object.entries(termFrequency)
        .sort((a: any, b: any) => b[1] - a[1])
        .slice(0, 20)  // Get top 20 most frequent terms
        .map(([term, frequency]) => ({ term, frequency }));
}


function calculateSentenceImportance(sentence: any, keywords: any) {
    return keywords.filter((keyword: any) => sentence.toLowerCase().includes(keyword)).length;
}

function extractSkills(text: any, companySkill: any) {
    // This is a simple implementation. You might want to use a pre-defined list of skills or ML model.
    const skillKeywords = ['javascript', 'python', 'react', 'node.js', 'mongodb', 'sql', 'aws', 'docker', 'microservice', 'git', 'postgresql', 'kafka', 'css', 'ci/cd'];
    return skillKeywords.filter(skill => text.toLowerCase().includes(skill));
}

function extractEducation(text: any, companyEducation: any) {
    const educationKeywords = ['bachelor', 'master', 'phd', 'degree', 'bsc', 'bcom'];
    const sentences = text.split('.');
    return sentences.filter((sentence: any) =>
        educationKeywords.some(keyword => sentence.toLowerCase().includes(keyword))
    );
}

function extractWorkExperience(text: any,companyEducation: any) {
    const experienceKeywords = ['work experience', 'job history', 'employment'];
    const sentences = text.split('.');
    return sentences.filter((sentence: any) =>
        experienceKeywords.some(keyword => sentence.toLowerCase().includes(keyword))
    );
}

function calculateScore(keywords: any[], entities: any[], skills: any[], education: any[], workExperience: any[], keyPhrases: any[]): number {
    // Define weights for each component
    const weights = {
        keyword: 0.10,
        entity: 0.10,
        skill: 0.30,
        education: 0.20,
        experience: 0.20,
        keyPhrase: 0.10
    };

    // Calculate individual scores
    const keywordScore = Math.min(keywords.length, 5) * weights.keyword * 5;
    const entityScore = Math.min(entities.length, 10) * weights.entity * 10;
    const skillScore = Math.min(skills.length, 15) * weights.skill * 15;
    const educationScore = Math.min(education.length, 5) * weights.education * 20;
    const experienceScore = Math.min(workExperience.length, 5) * weights.experience * 20;
    const keyPhraseScore = Math.min(keyPhrases.length, 10) * weights.keyPhrase * 10;

    // Sum up all scores
    const totalScore = keywordScore + entityScore + skillScore + educationScore + experienceScore + keyPhraseScore;

    // Normalize to 0-100 scale
    return Math.min(Math.round(totalScore), 100);
}
function extractKeyPhrases(posTagged: any): string[] {
    if (!Array.isArray(posTagged) || posTagged.length === 0) {
        return [];
    }

    const keyPhrases: string[] = [];
    const patterns = [
        ['Adjective', 'Noun'],
        ['Verb', 'Noun'],
        ['Noun', 'Noun']
    ];

    for (let i = 0; i < posTagged.length - 1; i++) {
        const current = posTagged[i];
        const next = posTagged[i + 1];

        if (typeof current === 'string' && typeof next === 'string') {
            // If posTagged is an array of strings, we can't extract key phrases
            continue;
        }

        if (!current || !next || !current.tags || !next.tags) {
            continue;
        }

        for (const [tag1, tag2] of patterns) {
            if (Array.isArray(current.tags) && Array.isArray(next.tags) &&
                current.tags.includes(tag1) && next.tags.includes(tag2) &&
                current.text && next.text) {
                keyPhrases.push(`${current.text} ${next.text}`);
            }
        }
    }

    return [...new Set(keyPhrases)];  // Remove duplicates
}