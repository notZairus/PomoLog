import AppLayout from '@/layouts/app-layout'
import React, { useEffect } from 'react'
import { Head, usePage } from '@inertiajs/react'
import { type BreadcrumbItem } from '@/types';
import { format } from 'date-fns';



let id = 0;

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'History',
        href: '/history',
    },
    {
        title: `Notes`,
        href: `/history/${id}`
    }
];

export default function show() {
    const { notes } = usePage().props;
    
    console.log(notes);

    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="History" />
                <div className="w-full p-8">
                    {
                        notes.map((note, index) => (
                            <>
                                <p className='text-gray-400'>{format(note.created_at, 'MMMM dd, yyyy | hh:mm a')}</p>
                                <p>{index + 1}. {note.note}</p>
                            </>
                        ))
                    }
                </div>
            </AppLayout>
        </>
    ) 
}
