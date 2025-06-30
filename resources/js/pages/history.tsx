import AppLayout from '@/layouts/app-layout'
import { Head, usePage, Link } from '@inertiajs/react'
import React, { useState } from 'react';
import { type BreadcrumbItem, StudySession, Subject } from '@/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from 'date-fns';


type Sort = "day" | "subject" | "count";

interface usePageProps {
    studySessions: StudySession[],
    subjects: Subject[]
}


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'History',
        href: '/history',
    },
];

export default function history() {
    const { studySessions, subjects } = usePage().props;
    const [sortedBy, setSortedBy] = useState<Sort>('day');

    console.log(studySessions);
    console.log(subjects);

    function ewan() {
        switch(sortedBy) {
            case 'day':
                return studySessions.data.map((ss: StudySession, index: number) => (
                    <Link href={`#`}>
                        <li key={ss.id} className='p-4 border border-primary/50 w-full hover:border-primary transition-all rounded-xl cursor-pointer'>
                            <p>Study Session {index + 1}</p>
                            <p className='text-white/50'>{format(ss.created_at, 'MMMM d, y')} | {format(ss.created_at, 'h:m aa')}</p>
                        </li>
                    </Link>
                ))
            case 'subject':
                return subjects.data.map((subject: Subject) => (
                    <Link href={`#`}>
                        <li key={subject.id} className='p-4 border border-primary/50 w-full hover:border-primary transition-all rounded-xl cursor-pointer flex items-center justify-center'>
                            <p className='text-lg'>{subject.name}</p>
                        </li>
                    </Link>
                ))

        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="History" />
                <div className="w-full p-8">
                    <div className='flex justify-end'>
                        <Select 
                            value={sortedBy}
                            onValueChange={(value) => setSortedBy(value as Sort)}
                        >
                            <SelectTrigger value={sortedBy} className="w-[180px]">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="day">day</SelectItem>
                                <SelectItem value="subject">subject</SelectItem>
                                <SelectItem value="count">count</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <ul className='w-full min-h-20 mt-8 grid grid-cols-1 md:grid-cols-4 gap-4'>
                            { ewan() }
                        </ul>
                    </div>
                </div>
        </AppLayout>
    )
}


{/* 
    <p>Can be sorted by day.</p>
    <p>Can be sorted by subject.</p>
    <p>Can be sorted by the number of pomodoros.</p>
    <p>Paginated</p> 
*/}