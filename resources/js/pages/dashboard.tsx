import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, Note, Pomodoro, StudySession } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import Chart from '@/components/chart';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface UsePageProps {
    [key: string]: unknown
    pomodoros: Pomodoro[],
    notes: Note[],
    averageTime: number,
    studySessions: StudySession[]
}


export default function Dashboard() {
    const { pomodoros, notes, averageTime, studySessions } = usePage<UsePageProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-8 overflow-x-auto">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border p-8 flex flex-col">
                        <p className='text-center'>Total Hours</p>
                        <div className='flex-1 flex items-center justify-center'>
                            <p className='text-2xl text-center'>
                                { Math.floor(pomodoros.length * 25 / 60) } {Math.floor(pomodoros.length * 25 / 60) > 1? `hours`: 'hour'} and { pomodoros.length * 25 % 60 } { pomodoros.length * 25 % 60 > 1 ? "minutes" : "minute"}.
                            </p>
                        </div>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border p-8 flex flex-col">
                        <p className='text-center'>Average Time per Session</p>
                        <div className='flex-1 flex items-center justify-center'>
                            <p className='text-2xl text-center'>
                                { Math.floor(averageTime / 60) } {Math.floor(averageTime / 60) > 1? `hours`: 'hour'} and { averageTime % 60 } {averageTime % 60 > 1 ? "minutes" : "minute"}.
                            </p>
                        </div>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border p-8 flex flex-col">
                        <p className='text-center'>Number of Notes Written</p>
                        <div className='flex-1 flex items-center justify-center'>
                            <p className='text-2xl text-center'>
                                {notes.length} Notes
                            </p>
                        </div>
                    </div>
                </div>
                <div className="relative max-h-[400px] md:max-h-[500px] overflow-hidden rounded-xl border p-8">
                    <Chart studySessions={studySessions} />
                </div>
            </div>
        </AppLayout>
    );
}
