import AppLayout from '@/layouts/app-layout'
import { Head, usePage, Link } from '@inertiajs/react'
import React, { useState, useEffect, useRef } from 'react';
import { type BreadcrumbItem, StudySession, Subject } from '@/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';


type Sort = "day" | "subject";

interface usePageProps {
    [key: string]: unknown, 
    studySessions: StudySession[],
    subjects: Subject[]
}


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'History',
        href: '/history',
    },
];

export default function History() {
    const { studySessions, subjects } = usePage<usePageProps>().props;
    const [sortedBy, setSortedBy] = useState<Sort>("day");

    useEffect(() => {
        if (!localStorage.getItem('sortBy')) {
            localStorage.setItem('sortBy', sortedBy); 
            return;
        }
        setSortedBy(localStorage.getItem('sortBy') as Sort);
    }, []);

    useEffect(() => {
        localStorage.setItem('sortBy', sortedBy);
    }, [sortedBy]);

    function ewan() {
        switch(sortedBy) {
            case 'day':
                return studySessions.data.map((ss: StudySession, index: number) => (
                    <Link href={`/history/${ss.id}?sortBy=study_session`}>
                        <li key={ss.id} className='p-4 h-full border border-primary/50 w-full hover:border-primary transition-all rounded-xl cursor-pointer'>
                            <p>Study Session {index + 1} #{ss.id}</p>
                            <p className='text-white/50'>{format(ss.created_at, 'MMMM d, y')} | {format(ss.created_at, 'h:m aa')}</p>
                        </li>
                    </Link>
                ))
            case 'subject':
                return subjects.data.map((subject: Subject) => (
                    <Link href={`/history/${subject.id}?sortBy=subject`}>
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
                    
                    <div className='flex justify-between'>
                        <div>
                            {
                                sortedBy === 'day' && 
                                studySessions.links.map((link: any) => (
                                    <Link href={link.url}>
                                        <Button 
                                            disabled={link.active || !link.url}
                                            dangerouslySetInnerHTML={{ __html: link.label}}
                                            variant={!link.active ? 'outline' : "ghost"}
                                        /> 
                                    </Link>
                                ))
                            }
                            {
                                sortedBy === 'subject' && 
                                subjects.links.map((link: any) => (
                                    <Link href={link.url}>
                                        <Button 
                                            disabled={link.active || !link.url}
                                            dangerouslySetInnerHTML={{ __html: link.label}}
                                            variant={!link.active ? 'outline' : "ghost"}
                                        /> 
                                    </Link>
                                ))
                            }
                            
                        </div>

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