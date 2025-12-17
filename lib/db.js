import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'db.json');

// Helper to read DB
function readDb() {
    try {
        const data = fs.readFileSync(dbPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading DB:", error);
        return { problems: [], startups: [], comments: [], votes: [], favorites: [] };
    }
}

// Helper to write DB
function writeDb(data) {
    try {
        fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error("Error writing DB:", error);
        return false;
    }
}

export const db = {
    // Problems
    problems: {
        getAll: () => readDb().problems,
        getById: (id) => readDb().problems.find(p => p.id === parseInt(id)),
        create: (problem) => {
            const data = readDb();
            const newProblem = {
                id: Date.now(),
                votes: 0,
                comments: 0,
                createdAt: new Date().toISOString(),
                ...problem
            };
            data.problems.unshift(newProblem);
            writeDb(data);
            return newProblem;
        },
        update: (id, updates) => {
            const data = readDb();
            const index = data.problems.findIndex(p => p.id === parseInt(id));
            if (index === -1) return null;

            data.problems[index] = { ...data.problems[index], ...updates };
            writeDb(data);
            return data.problems[index];
        }
    },

    // Startups
    startups: {
        getAll: () => readDb().startups,
        getById: (id) => readDb().startups.find(s => s.id === parseInt(id)),
        create: (startup) => {
            const data = readDb();
            const newStartup = {
                id: Date.now(),
                likes: 0,
                comments: 0,
                createdAt: new Date().toISOString(),
                ...startup
            };
            data.startups.unshift(newStartup);
            writeDb(data);
            return newStartup;
        },
        update: (id, updates) => {
            const data = readDb();
            const index = data.startups.findIndex(s => s.id === parseInt(id));
            if (index === -1) return null;

            data.startups[index] = { ...data.startups[index], ...updates };
            writeDb(data);
            return data.startups[index];
        }
    },

    // Proposals
    proposals: {
        getAll: () => readDb().proposals || [],
        getById: (id) => (readDb().proposals || []).find(p => p.id === id),
        getByProblemId: (problemId) => (readDb().proposals || []).filter(p => p.problemId == problemId),
        getByUserId: (userId) => (readDb().proposals || []).filter(p => p.userId === userId),
        create: (proposal) => {
            const data = readDb();
            if (!data.proposals) data.proposals = [];

            const newProposal = {
                id: 'prop' + Date.now(),
                status: 'submitted',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                ...proposal
            };

            data.proposals.push(newProposal);
            writeDb(data);
            return newProposal;
        },
        update: (id, updates) => {
            const data = readDb();
            if (!data.proposals) data.proposals = [];

            const index = data.proposals.findIndex(p => p.id === id);
            if (index === -1) return null;

            data.proposals[index] = {
                ...data.proposals[index],
                ...updates,
                updatedAt: new Date().toISOString()
            };
            writeDb(data);
            return data.proposals[index];
        }
    },

    // Users
    users: {
        getAll: () => readDb().users || [],
        findById: (id) => (readDb().users || []).find(u => u.id === id),
        findByEmail: (email) => (readDb().users || []).find(u => u.email === email),
        create: (user) => {
            const data = readDb();
            if (!data.users) data.users = [];

            const newUser = {
                id: 'u' + Date.now(),
                createdAt: new Date().toISOString(),
                ...user
            };

            data.users.push(newUser);
            writeDb(data);
            return newUser;
        }
    },

    // Comments
    comments: {
        getAll: () => readDb().comments || [],
        create: (comment) => {
            const data = readDb();
            if (!data.comments) data.comments = [];

            const newComment = {
                id: Date.now(),
                createdAt: new Date().toISOString(),
                ...comment
            };

            data.comments.push(newComment);
            writeDb(data);
            return newComment;
        }
    },

    // Votes
    votes: {
        getAll: () => readDb().votes || [],
        hasVoted: (userId, itemId, itemType = 'problem') => {
            const votes = readDb().votes || [];
            // Use == for itemId to handle string/number mismatch
            return votes.some(v => v.userId === userId && v.itemId == itemId && v.itemType === itemType);
        },
        getVoteCount: (itemId, itemType = 'problem') => {
            const votes = readDb().votes || [];
            // Use == for itemId to handle string/number mismatch
            return votes.filter(v => v.itemId == itemId && v.itemType === itemType).length;
        },
        addVote: (userId, itemId, itemType = 'problem') => {
            const data = readDb();
            if (!data.votes) data.votes = [];

            // Check if already voted
            // Use == for itemId to handle string/number mismatch
            const existing = data.votes.find(v =>
                v.userId === userId && v.itemId == itemId && v.itemType === itemType
            );

            if (existing) {
                const count = data.votes.filter(v => v.itemId == itemId && v.itemType === itemType).length;
                return { vote: existing, count };
            }

            const newVote = {
                id: Date.now(),
                userId,
                itemId: parseInt(itemId) || itemId, // Try to store as number if possible
                itemType,
                createdAt: new Date().toISOString()
            };

            data.votes.push(newVote);
            writeDb(data);

            const count = data.votes.filter(v => v.itemId == itemId && v.itemType === itemType).length;
            return { vote: newVote, count };
        },
        removeVote: (userId, itemId, itemType = 'problem') => {
            const data = readDb();
            if (!data.votes) data.votes = [];

            // Use == for itemId to handle string/number mismatch
            const index = data.votes.findIndex(v =>
                v.userId === userId && v.itemId == itemId && v.itemType === itemType
            );

            if (index !== -1) {
                data.votes.splice(index, 1);
                writeDb(data);
                const count = data.votes.filter(v => v.itemId == itemId && v.itemType === itemType).length;
                return { success: true, count };
            }

            const count = data.votes.filter(v => v.itemId == itemId && v.itemType === itemType).length;
            return { success: false, count };
        }
    },

    // Favorites
    favorites: {
        getAll: () => readDb().favorites || [],
        getUserFavorites: (userId) => {
            const favorites = readDb().favorites || [];
            return favorites.filter(fav => fav.userId === userId);
        },
        checkFavorite: (userId, itemId, itemType) => {
            const favorites = readDb().favorites || [];
            return favorites.some(fav =>
                fav.userId === userId && fav.itemId === itemId && fav.itemType === itemType
            );
        },
        addFavorite: (userId, itemId, itemType) => {
            const data = readDb();
            if (!data.favorites) data.favorites = [];

            // Check if already favorited
            const existing = data.favorites.find(
                fav => fav.userId === userId && fav.itemId === itemId && fav.itemType === itemType
            );

            if (existing) {
                return existing;
            }

            const newFavorite = {
                id: 'f' + Date.now(),
                userId,
                itemId,
                itemType,
                createdAt: new Date().toISOString()
            };

            data.favorites.push(newFavorite);
            writeDb(data);
            return newFavorite;
        },
        removeFavorite: (userId, itemId, itemType) => {
            const data = readDb();
            if (!data.favorites) data.favorites = [];

            const index = data.favorites.findIndex(
                fav => fav.userId === userId && fav.itemId === itemId && fav.itemType === itemType
            );

            if (index !== -1) {
                const removed = data.favorites.splice(index, 1)[0];
                writeDb(data);
                return removed;
            }
            return null;
        }
    }
};
