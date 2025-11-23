import { ThemeInput } from 'react-activity-calendar';

export const leetCodeConfig = {
    username: '__abhiraj_24_',
    apiUrl: 'https://leetcode-stats-api.herokuapp.com',
    title: 'LeetCode Activity',
    subtitle: 'problem solving journey',
    loadingState: {
        description: 'Loading LeetCode activity...',
    },
    errorState: {
        title: 'Unable to load LeetCode activity',
        description:
            'We could not fetch the LeetCode data. Please check your connection or try again later.',
        buttonText: 'View on LeetCode',
    },
    theme: {
        light: ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127'],
        dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
    } as ThemeInput,
    fontSize: 12,
    blockSize: 12,
    blockMargin: 4,
    maxLevel: 4,
    totalCountLabel: 'Total Solved',
    months: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ],
    weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
};
