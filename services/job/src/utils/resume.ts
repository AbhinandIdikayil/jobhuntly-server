import natural from 'natural';
import nlp from 'compromise';
import { fetchAndParsePDF } from './parsePdf';
import { calculateSentenceImportance, extractEducation, extractKeyPhrases, extractSkills, extractWorkExperience, getFrequentStemmedTerms } from './resumeAnalyzer';

export async function resumeAnalyzer(url: string, jobDescription: string, companySkills: string[], companyEducation: string[]): Promise<number | null> {
    try {
        if (!url) return null;

        let resumeText: string | null = await fetchAndParsePDF(url);
        if(!resumeText){
            return null
        }
        if (Array.isArray(resumeText)) resumeText = resumeText.join(' ');
        if (typeof resumeText !== 'string') throw new Error('Invalid resume text format');

        // Text preprocessing
        const tokenizer = new natural.WordTokenizer();
        const tokens = tokenizer.tokenize(resumeText.toLowerCase());
        const stemmedTokens = tokens.map(token => natural.PorterStemmer.stem(token));

        // NLP processing
        const doc = nlp(resumeText);
        const entities:any = doc.topics().json();
        const posTagged:any = doc.terms().out('tags');

        // Keyword extraction (using TF-IDF)
        const tfidf = new natural.TfIdf();
        tfidf.addDocument(stemmedTokens);
        const keywords:any = tfidf.listTerms(0)
            .filter(item => item.tfidf > 0.5)
            .map(item => item.term);

        // Text summarization
        const sentences:any = resumeText.split(/[.!?]+/);
        const summarizedSentences = sentences
            .map((sentence:any) => ({ sentence, score: calculateSentenceImportance(sentence, keywords) }))
            .sort((a:any, b:any) => b.score - a.score)
            .slice(0, 3)
            .map((item:any) => item.sentence);
        const summary = summarizedSentences.join('. ');

        const keyPhrases = extractKeyPhrases(posTagged);
        const skills = extractSkills(resumeText, companySkills);
        const education = extractEducation(resumeText, companyEducation);
        const workExperience = extractWorkExperience(resumeText,companyEducation);

        // Calculate score
        const score = calculateScore({
            resumeText,
            jobDescription,
            keywords,
            entities,
            skills,
            education,
            workExperience,
            keyPhrases,
            companySkills,
            companyEducation
        });

        const analyzedData = {
            keywords,
            entities,
            summary,
            skills,
            education,
            workExperience,
            frequentStemmedTerms: getFrequentStemmedTerms(stemmedTokens),
            score
        };

        console.log({ analyzedData });
        return score;
    } catch (error) {
        console.error('Error analyzing resume:', error);
        throw error;
    }
}

function calculateScore(data: {
    resumeText: string,
    jobDescription: string,
    keywords: string[],
    entities: any[],
    skills: string[],
    education: string[],
    workExperience: string[],
    keyPhrases: string[],
    companySkills: string[],
    companyEducation: string[]
}): number {
    const weights = {
        relevance: 0.25,
        skills: 0.25,
        education: 0.20,
        experience: 0.20,
        keywordDensity: 0.10
    };

    const relevanceScore = calculateRelevanceScore(data.resumeText, data.jobDescription);
    const skillScore = calculateSkillScore(data.skills, data.companySkills);
    const educationScore = calculateEducationScore(data.education, data.companyEducation);
    const experienceScore = calculateExperienceScore(data.workExperience);
    const keywordDensityScore = calculateKeywordDensityScore(data.resumeText, data.keywords);

    const totalScore = 
        relevanceScore * weights.relevance +
        skillScore * weights.skills +
        educationScore * weights.education +
        experienceScore * weights.experience +
        keywordDensityScore * weights.keywordDensity;

    return Math.min(Math.round(totalScore * 100), 100);
}

function calculateRelevanceScore(resumeText: string, jobDescription: string): number {
    const resumeTokens = new Set(resumeText.toLowerCase().split(/\W+/));
    const jobTokens = new Set(jobDescription.toLowerCase().split(/\W+/));
    const intersection = new Set([...resumeTokens].filter(x => jobTokens.has(x)));
    return intersection.size / jobTokens.size;
}

function calculateSkillScore(candidateSkills: string[], requiredSkills: string[]): number {
    const matchedSkills = candidateSkills.filter(skill => 
        requiredSkills.some(reqSkill => reqSkill.toLowerCase().includes(skill.toLowerCase()))
    );
    return matchedSkills.length / requiredSkills.length;
}

function calculateEducationScore(education: string[], requiredEducation: string[]): number {
    const educationLevels = {
        'high school': 1,
        'associate': 2,
        'bachelor': 3,
        'master': 4,
        'phd': 5
    };

    const candidateLevel = Math.max(...education.map(edu => 
        Object.entries(educationLevels).reduce((max, [level, score]) => 
            edu.toLowerCase().includes(level) ? Math.max(max, score) : max, 0
        )
    ));

    const requiredLevel = Math.max(...requiredEducation.map(edu => 
        Object.entries(educationLevels).reduce((max, [level, score]) => 
            edu.toLowerCase().includes(level) ? Math.max(max, score) : max, 0
        )
    ));

    return Math.min(candidateLevel / requiredLevel, 1);
}

function calculateExperienceScore(experience: string[]): number {
    const yearsOfExperience = experience.reduce((total, exp) => {
        const years = exp.match(/(\d+)\s*years?/);
        return total + (years ? parseInt(years[1]) : 0);
    }, 0);

    return Math.min(yearsOfExperience / 10, 1); // Assuming 10+ years is the maximum score
}

function calculateKeywordDensityScore(text: string, keywords: string[]): number {
    const wordCount = text.split(/\W+/).length;
    const keywordCount = keywords.reduce((count, keyword) => 
        count + (text.match(new RegExp(keyword, 'gi')) || []).length, 0
    );
    return Math.min(keywordCount / wordCount, 0.1); // Cap at 10% density
}

// ... (other helper functions remain the same)