import AppLayout from '@/layouts/app-layout'
import React, { MouseEvent, useEffect, useRef } from 'react'
import { Head, usePage } from '@inertiajs/react'
import { Note, type BreadcrumbItem } from '@/types';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { sleep } from '@/helper';



const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'History',
        href: '/history',
    },
    {
        title: `Notes`,
        href: "#"
    }
];

type UsePageProps = {
    notes: Note[]
}

export default function show() {
    const { notes } = usePage<UsePageProps>().props;

    function printNotes(e: MouseEvent) {
        const printBtn: HTMLButtonElement = e.target as HTMLButtonElement;

        if (!printBtn) return;
        
        printBtn.style.opacity = "0";
        window.print();
       
        sleep(1000).then(() => {
            printBtn.style.opacity = "1";
        })
    }

    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="History" />
                {notes.length > 0 
                ?
                    <div className="w-full p-8">
                        <div className='flex items-center justify-between'>
                            <h1 className='text-lg'>Notes taken on {format(notes[0].created_at, 'MMMM dd, yyyy')}</h1>
                            <div>
                                <Button 
                                    onClick={printNotes}
                                    size={'lg'} 
                                    className='cursor-pointer'
                                >
                                    Print
                                </Button>
                            </div>
                        </div>
                        <div className='mt-8 space-y-2 tracking-wide'>
                            {
                                notes.map((note, index) => (
                                    <>
                                        <p>{note.note}</p>
                                    </>
                                ))
                            }
                        </div>
                    </div>
                :
                    <div className='w-full h-full flex items-center justify-center'>
                        <h1>No Available Notes.</h1>
                    </div>
                }
            </AppLayout>
        </>
    ) 
}
