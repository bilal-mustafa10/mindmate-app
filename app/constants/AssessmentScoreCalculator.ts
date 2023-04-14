import { AngerCriteria, AnxietyScore, DepressionCriteria } from './AssessmentCriteria';

export interface IScoreResult {
    rawScore: number;
    tScore: number;
    result: string;
}

type Criteria = typeof DepressionCriteria | typeof AngerCriteria | typeof AnxietyScore;

export const calculateScore = (answers: number[], criteria: Criteria): IScoreResult => {
    const rawScore = answers.reduce((acc, score) => acc + score, answers.length);

    const tScore = criteria.find((c) => c.rawScore === rawScore).tScore;

    if (tScore < 55) {
        return { rawScore, tScore, result: 'None to slight' };
    } else if (tScore >= 55 && tScore <= 59.9) {
        return { rawScore, tScore, result: 'Mild' };
    } else if (tScore >= 60 && tScore <= 69.9) {
        return { rawScore, tScore, result: 'Moderate' };
    } else if (tScore >= 70) {
        return { rawScore, tScore, result: 'Severe' };
    }
};

export const calculateDepressionScore = (answers: number[]): IScoreResult =>
    calculateScore(answers, DepressionCriteria);

export const calculateAngerScore = (answers: number[]): IScoreResult => calculateScore(answers, AngerCriteria);

export const calculateAnxietyScore = (answers: number[]): IScoreResult => calculateScore(answers, AnxietyScore);
