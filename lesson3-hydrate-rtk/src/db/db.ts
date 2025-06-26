export const courses = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    title: `Course #${i + 1}`,
    company: 'it-incubator.io',
    isLiked: Math.random() > 0.5,
}));