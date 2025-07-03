import React, { FormEvent } from 'react';
import { useForm } from '@inertiajs/react';
import { Input } from './ui/input';


export default function SubjectForm() {
    const { data, setData, post, reset } = useForm({
        'name': "",
    })

    function submit(e: FormEvent) {
        e.preventDefault();
        post('/subjects', {
            onFinish: () => { reset() }
        });
    }


  return (
    <>
        <form onSubmit={submit}>
            <Input 
                placeholder="new subject" 
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
            />
        </form>
    </>
  )
}
