'use client';

import { leetCodeConfig } from '@/config/LeetCode';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import Container from '../common/Container';
import { Button } from '../ui/button';

const ActivityCalendar = dynamic(
    () => import('react-activity-calendar').then((mod) => mod.default),
    { ssr: false },
);

type ContributionItem = {
    date: string;
    count: number;
    level: 0 | 1 | 2 | 3 | 4;
};

// Helper function to filter contributions to past year
function filterLastYear(contributions: ContributionItem[]): ContributionItem[] {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    return contributions.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= oneYearAgo;
    });
}

// Helper to calculate level based on count
function calculateLevel(count: number): 0 | 1 | 2 | 3 | 4 {
    if (count === 0) return 0;
    if (count === 1) return 1;
    if (count <= 3) return 2;
    if (count <= 6) return 3;
    return 4;
}

// Helper to calculate streaks and active days
function calculateStats(contributions: ContributionItem[]) {
    const sorted = [...contributions].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

    const totalActiveDays = sorted.filter((item) => item.count > 0).length;
    const totalSubmissions = sorted.reduce((sum, item) => sum + item.count, 0);

    let maxStreak = 0;
    let currentStreak = 0;
    let tempStreak = 0;

    // We need to iterate day by day to check for gaps
    if (sorted.length > 0) {
        const startDate = new Date(sorted[0].date);
        const endDate = new Date(sorted[sorted.length - 1].date);

        for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
            const dateStr = d.toISOString().split('T')[0];
            const hasContribution = sorted.find((item) => item.date === dateStr && item.count > 0);

            if (hasContribution) {
                tempStreak++;
            } else {
                maxStreak = Math.max(maxStreak, tempStreak);
                tempStreak = 0;
            }
        }
        maxStreak = Math.max(maxStreak, tempStreak);
    }

    return { totalActiveDays, totalSubmissions, maxStreak };
}

export default function LeetCode() {
    const [contributions, setContributions] = useState<ContributionItem[]>([]);
    const [stats, setStats] = useState({ totalActiveDays: 0, totalSubmissions: 0, maxStreak: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [hasError, setHasError] = useState(false);
    const { theme } = useTheme();

    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true);
                const response = await fetch(
                    `${leetCodeConfig.apiUrl}/${leetCodeConfig.username}`,
                );
                const data = await response.json();
                setTotal(data.totalSolved);
                if (data.status === 'success' && data.submissionCalendar) {
                    // Transform submissionCalendar (epoch -> count) to ContributionItem
                    const calendarData = Object.entries(data.submissionCalendar).map(
                        ([timestamp, count]) => {
                            const date = new Date(parseInt(timestamp) * 1000);
                            return {
                                date: date.toISOString().split('T')[0],
                                count: Number(count),
                                level: calculateLevel(Number(count)),
                            };
                        },
                    );

                    // Sort by date
                    calendarData.sort(
                        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
                    );

                    const filteredContributions = filterLastYear(calendarData);
                    setContributions(filteredContributions);
                    setStats(calculateStats(filteredContributions));
                } else {
                    setHasError(true);
                }
            } catch (err) {
                console.error('Failed to fetch LeetCode data:', err);
                setHasError(true);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, []);

    // Group contributions by month
    const contributionsByMonth = contributions.reduce(
        (acc, item) => {
            const date = new Date(item.date);
            const key = `${date.getFullYear()}-${date.getMonth()}`;
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(item);
            return acc;
        },
        {} as Record<string, ContributionItem[]>,
    );

    // Sort months
    const sortedMonths = Object.keys(contributionsByMonth).sort((a, b) => {
        const [yearA, monthA] = a.split('-').map(Number);
        const [yearB, monthB] = b.split('-').map(Number);
        return yearA === yearB ? monthA - monthB : yearA - yearB;
    });

    return (
        <Container className="mt-20">
            <div className="space-y-6">
                {/* Header */}
                <div className='flex items-center justify-between'>
                    <div>
                        <h2 className="text-2xl font-bold">{leetCodeConfig.title}</h2>
                        <p className="text-sm text-muted-foreground">
                            <b>{leetCodeConfig.username}</b>’s {leetCodeConfig.subtitle}
                        </p>
                    </div>
                    {total > 0 && (
                        <p className="text-sm text-primary font-semibold mt-1">
                            Total: <span className="font-extrabold">{total}</span> problems solved
                        </p>
                    )}
                </div>
                {/* Content */}
                {isLoading ? (
                    <div className="flex items-center justify-center py-16">
                        <div className="text-center">
                            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-sm text-muted-foreground">
                                {leetCodeConfig.loadingState.description}
                            </p>
                        </div>
                    </div>
                ) : hasError || contributions.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground border-2 border-dashed border-border rounded-xl">
                        <p className="font-medium mb-2">{leetCodeConfig.errorState.title}</p>
                        <p className="text-sm mb-4">
                            {leetCodeConfig.errorState.description}
                        </p>
                        <Button variant="outline" asChild>
                            <Link
                                href={`https://leetcode.com/${leetCodeConfig.username}`}
                                className="inline-flex items-center gap-2"
                            >
                                {leetCodeConfig.errorState.buttonText}
                            </Link>
                        </Button>
                    </div>
                ) : (
                    <div className="relative overflow-hidden">
                        <div className="relative bg-background/50 backdrop-blur-sm rounded-lg border border-dashed dark:border-white/10 border-black/20 p-6">
                            <div className="w-full overflow-x-auto flex gap-4 pb-4">
                                {sortedMonths.map((monthKey) => {
                                    const [year, month] = monthKey.split('-').map(Number);
                                    const monthName = new Date(year, month).toLocaleString('default', { month: 'short' });

                                    return (
                                        <div key={monthKey} className="flex flex-col items-center gap-2 flex-shrink-0">
                                            <ActivityCalendar
                                                data={contributionsByMonth[monthKey]}
                                                blockSize={10}
                                                blockMargin={4}
                                                blockRadius={2}
                                                fontSize={leetCodeConfig.fontSize}
                                                colorScheme={theme === 'dark' ? 'dark' : 'light'}
                                                maxLevel={leetCodeConfig.maxLevel}
                                                hideTotalCount={true}
                                                hideColorLegend={true}
                                                hideMonthLabels={true}
                                                theme={leetCodeConfig.theme}
                                                style={{
                                                    color: 'rgb(139, 148, 158)',
                                                }}
                                            />
                                            <span className="text-xs text-muted-foreground">{monthName}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Container>
    );
}
