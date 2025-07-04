import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}




export interface State {
  name: "Focus Session" | "Short Break" | "Long Break",
  time: number
}

export interface StatesType {
  pomodoro: State,
  short_break: State,
  long_break: State,
}


export interface StudySession {
    id: number,
    pomodoros?: Pomodoro[],
    created_at: string
}

export type Subject = {
    id: number,
    name: string
}

export type Pomodoro = {
    id: number,
    study_session_id: number,
    subject_id: number,
    created_at: string,
}

export type Note = {
    id: number,
    pomodoro_id: number,
    note: string,
    created_at: string,
}