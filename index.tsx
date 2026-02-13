/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import './index.css';
import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { createClient } from '@supabase/supabase-js';

// URL DO PROJETO SUPABASE (Atualizada)
const SUPABASE_URL = 'https://hoepznsyzdlrzzlrlurp.supabase.co';

// CHAVE PÚBLICA (ANON KEY)
const SUPABASE_KEY = 'sb_publishable_ne5Px1teeHCX7KS59_qKzA_J8hucLEg';

// Inicialização do cliente Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ============================================================================
// 1. ÍCONES (SVG Components)
// ============================================================================
const BuildingIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>);
const SunIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>);
const MoonIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>);
const DollarIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m-4-8c0-1.105.902-2 2-2h1c2.21 0 4 1.79 4 4s-1.79 4-4 4H9c-1.105 0-2-.895-2-2z" /></svg>);
const UsersIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>);
const HomeIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>);
const CalendarIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>);
const CloseIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>);
const BanIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>);
const BedIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>);
const ArrowUpIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>);
const ArrowDownIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>);
const ListBulletIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>);
const BroomIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 11l7-7 7 7M5 11v10h14V11M2 11h20M12 21a2 2 0 100-4 2 2 0 000 4z" transform="rotate(45 12 12) translate(-2 -4)"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1" transform="rotate(45 12 12) translate(-2 -4)"/></svg>);
const CheckCircleIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);
const WrenchScrewdriverIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632zM12 10.5h.008v.008H12v-.008z" /></svg>);
const TrashIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>);
const Cog6ToothIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257-1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.438.995s.145.755.438.995l1.003.827c.424.35.534.954.26 1.431l-1.296 2.247a1.125 1.125 0 01-1.37.49l-1.217-.456c-.355-.133-.75-.072-1.075.124.074-.04.147-.083.22-.127.332-.183-.582-.495-.645-.87l.213-1.281z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>);
const ArrowLeftOnRectangleIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l-3-3m0 0l-3 3m3-3V9" /></svg>);
const BanknotesIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414-.336.75-.75.75h-.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5m3-3l-3-3m0 0l-3 3m3-3v6m-9 3h2.25a.75.75 0 00.75-.75V15a.75.75 0 00-.75.75H5.25a.75.75 0 00-.75.75v1.5c0 .414.336.75.75.75m3-3h2.25a.75.75 0 00.75-.75V15a.75.75 0 00-.75.75H8.25a.75.75 0 00-.75.75v1.5c0 .414.336.75.75.75m3-3h2.25a.75.75 0 00.75-.75V15a.75.75 0 00-.75.75h-2.25a.75.75 0 00-.75.75v1.5c0 .414.336.75.75.75M15 12h-3v-3h3v3z" /></svg>);
const Bars3Icon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>);
const CloudIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" /></svg>);
const CloudSlashIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M9.75 9.75a3 3 0 004.5 4.5m-6.75-2.25a5.25 5.25 0 017.42-7.42m2.81 2.81a3 3 0 013.77 3.86l-1.5 1.5M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 012.33-1.463M18 19.5h-9" /></svg>);
const EyeIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>);
const PencilSquareIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>);

// ============================================================================
// 2. TIPOS E CONSTANTES
// ============================================================================
type ReservationStatus = 'Confirmada' | 'Cancelada' | 'Pendente';
type UserRole = 'editor' | 'viewer'; // Adicionado tipo de Role

type User = {
    name: string;
    role: UserRole;
};

type Reservation = {
    id: number;
    guestName: string;
    contact: string;
    accommodation: string;
    bookingChannel: string;
    description: string;
    adults: number;
    children: number;
    extraBed: boolean;
    breakfast: boolean;
    checkIn: string; // YYYY-MM-DD
    checkOut: string; // YYYY-MM-DD
    numberOfNights: number;
    totalRevenue: number;
    amountPaid: number;
    amountPending: number;
    downPayment: boolean;
    observations: string;
    status: ReservationStatus;
};
type NewReservationData = Omit<Reservation, 'id' | 'amountPending' | 'downPayment' | 'numberOfNights'>;

type SuiteStatusOptions = 'clean' | 'dirty' | 'occupied' | 'maintenance';
type SuiteStatus = {
    id: number;
    name: string;
    status: SuiteStatusOptions;
    guestName?: string;
    checkOutDate?: string;
    maintenanceReason?: string;
};

type ContactStatus = 'Novo' | 'Contatado' | 'Qualificado' | 'Agendado' | 'Convertido' | 'Não Qualificado' | 'Hóspede';
const CONTACT_STATUSES: ContactStatus[] = ['Novo', 'Contatado', 'Qualificado', 'Agendado', 'Convertido', 'Não Qualificado', 'Hóspede'];
type Contact = {
  id: number;
  name: string;
  company?: string;
  email?: string;
  phone?: string;
  status: ContactStatus;
  location?: string;
  notes?: string;
  createdAt: string;
  lastUpdate: string;
};

type CostCategory = 'Comissões' | 'Manutenção' | 'Salários' | 'Marketing' | 'Utilities' | 'Suprimentos' | 'Outros';
type CostType = 'Fixo' | 'Variável';
const COST_CATEGORIES: CostCategory[] = ['Comissões', 'Manutenção', 'Salários', 'Marketing', 'Utilities', 'Suprimentos', 'Outros'];
const COST_TYPES: CostType[] = ['Fixo', 'Variável'];
type Cost = {
    id: number;
    description: string;
    category: CostCategory;
    type: CostType;
    amount: number;
    date: string; // YYYY-MM-DD
};

type View = 'dashboard' | 'reservations' | 'financial' | 'contacts' | 'governance' | 'settings';

// ============================================================================
// 3. FUNÇÕES UTILITÁRIAS
// ============================================================================
const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
const formatDate = (dateString: string) => {
    if(!dateString) return '-';
    // Corrige problema de fuso horário ao criar data simples
    const parts = dateString.split('-');
    if(parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
    return new Date(dateString).toLocaleDateString('pt-BR');
};
const TOTAL_SUITES = 20;
const parseSuitesFromReservation = (res: Reservation): number => 1; // Simplificado

// ============================================================================
// 4. CONTEXTO E LÓGICA (COM SUPABASE)
// ============================================================================
interface AppContextType {
    isDarkMode: boolean; toggleDarkMode: () => void;
    currentView: View; setCurrentView: React.Dispatch<React.SetStateAction<View>>;
    isSidebarOpen: boolean; setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    reservations: Reservation[]; suiteStatuses: SuiteStatus[]; costs: Cost[]; contacts: Contact[];
    currentUser: User | null; // Alterado de loggedInUser string para objeto User
    handleAddReservation: (res: NewReservationData) => Promise<void>;
    handleUpdateReservation: (id: number, res: NewReservationData) => Promise<void>;
    handleDeleteReservation: (id: number) => Promise<void>;
    handleUpdateSuiteStatus: (suiteId: number, newStatus: string) => Promise<void>;
    handleAddContact: (newContact: Contact) => Promise<void>;
    handleDeleteContact: (id: number) => Promise<void>;
    handleAddCost: (newCostData: Omit<Cost, 'id'>) => Promise<void>;
    handleDeleteCost: (id: number) => Promise<void>;
    handleLogin: (l: string, p: string) => boolean; handleLogout: () => void;
    isLoading: boolean;
}
const AppContext = createContext<AppContextType | null>(null);
const useAppContext = () => useContext(AppContext)!;

const useAppLogic = (): AppContextType => {
    // Carrega tema e user do storage para não perder ao refresh (UX básica)
    const [isDarkMode, setIsDarkMode] = useState(() => {
        try { return JSON.parse(localStorage.getItem('hotel_dark_mode') || 'false'); } catch { return false; }
    });
    // Recupera usuário completo (objeto) do storage
    const [currentUser, setCurrentUser] = useState<User | null>(() => {
        try {
            const stored = sessionStorage.getItem('hotel_user');
            return stored ? JSON.parse(stored) : null;
        } catch {
            return null;
        }
    });

    const [currentView, setCurrentView] = useState<View>('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    // Dados (Vêm do Supabase)
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [suiteStatuses, setSuiteStatuses] = useState<SuiteStatus[]>([]);
    const [costs, setCosts] = useState<Cost[]>([]);
    const [contacts, setContacts] = useState<Contact[]>([]);
    
    const [isLoading, setIsLoading] = useState(false);

    // Persistir tema
    useEffect(() => {
        localStorage.setItem('hotel_dark_mode', JSON.stringify(isDarkMode));
        if(isDarkMode) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
    }, [isDarkMode]);

    // Carregar dados do Supabase
    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            // Reservas
            const { data: resData } = await supabase.from('reservations').select('*').order('check_in', { ascending: false });
            if (resData) {
                // Mapear snake_case (banco) para camelCase (app)
                const mappedRes = resData.map((r: any) => ({
                    id: r.id, guestName: r.guest_name, contact: r.contact, accommodation: r.accommodation, bookingChannel: r.booking_channel,
                    description: r.description, adults: r.adults, children: r.children, extraBed: r.extra_bed, breakfast: r.breakfast,
                    checkIn: r.check_in, checkOut: r.check_out, numberOfNights: r.number_of_nights, totalRevenue: r.total_revenue,
                    amountPaid: r.amount_paid, amountPending: r.amount_pending, downPayment: r.down_payment, observations: r.observations, status: r.status
                }));
                setReservations(mappedRes);
            }

            // Custos
            const { data: costData } = await supabase.from('costs').select('*').order('date', { ascending: false });
            if (costData) {
                setCosts(costData.map((c: any) => ({ ...c, amount: Number(c.amount) })));
            }

            // Contatos
            const { data: contactData } = await supabase.from('contacts').select('*').order('created_at', { ascending: false });
            if (contactData) {
                setContacts(contactData.map((c: any) => ({ ...c, createdAt: c.created_at, lastUpdate: c.last_update })));
            }

            // Suites
            const { data: suiteData } = await supabase.from('suite_statuses').select('*').order('id', { ascending: true });
            if (suiteData) {
                setSuiteStatuses(suiteData);
            } else {
                // Se tabela vazia, criar iniciais
                const initialSuites = Array.from({ length: 20 }, (_, i) => ({ name: `Apto ${i + 1}`, status: 'clean' }));
                const { data: newSuites, error } = await supabase.from('suite_statuses').insert(initialSuites).select();
                if(!error && newSuites) setSuiteStatuses(newSuites as any);
            }

        } catch (error) {
            console.error("Erro ao carregar dados:", error);
            // Não alertamos erro de conexão para não assustar, apenas logamos
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Atualizar dados ao logar ou focar na janela (Sincronia básica)
    useEffect(() => {
        if (currentUser) {
            fetchData();
            const interval = setInterval(fetchData, 30000); // Atualiza a cada 30s
            return () => clearInterval(interval);
        }
    }, [currentUser, fetchData]);

    // Ações de Banco de Dados
    const handleAddReservation = async (resData: NewReservationData) => {
        setIsLoading(true);
        const checkInDate = new Date(resData.checkIn);
        const checkOutDate = new Date(resData.checkOut);
        const nights = Math.max(1, Math.ceil(Math.abs(checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)));
        const amountPending = resData.totalRevenue - resData.amountPaid;

        const dbData = {
            guest_name: resData.guestName, contact: resData.contact, accommodation: resData.accommodation,
            booking_channel: resData.bookingChannel, description: resData.description, adults: resData.adults,
            children: resData.children, extra_bed: resData.extraBed, breakfast: resData.breakfast,
            check_in: resData.checkIn, check_out: resData.checkOut, number_of_nights: nights,
            total_revenue: resData.totalRevenue, amount_paid: resData.amountPaid, amount_pending: amountPending,
            down_payment: resData.amountPaid > 0, observations: resData.observations, status: resData.status
        };

        const { error } = await supabase.from('reservations').insert([dbData]);
        
        if (!error) {
            await fetchData();
            // Tenta adicionar contato se não existir
            handleAddContact({
                id: 0, name: resData.guestName, phone: resData.contact, status: 'Hóspede',
                notes: `Cliente desde ${resData.checkIn}`, createdAt: '', lastUpdate: ''
            });
        } else {
            alert('Erro ao salvar no banco: ' + error.message);
        }
        setIsLoading(false);
    };

    const handleUpdateReservation = async (id: number, resData: NewReservationData) => {
        setIsLoading(true);
        const checkInDate = new Date(resData.checkIn);
        const checkOutDate = new Date(resData.checkOut);
        const nights = Math.max(1, Math.ceil(Math.abs(checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)));
        const amountPending = resData.totalRevenue - resData.amountPaid;

        const dbData = {
            guest_name: resData.guestName, contact: resData.contact, accommodation: resData.accommodation,
            booking_channel: resData.bookingChannel, description: resData.description, adults: resData.adults,
            children: resData.children, extra_bed: resData.extraBed, breakfast: resData.breakfast,
            check_in: resData.checkIn, check_out: resData.checkOut, number_of_nights: nights,
            total_revenue: resData.totalRevenue, amount_paid: resData.amountPaid, amount_pending: amountPending,
            down_payment: resData.amountPaid > 0, observations: resData.observations, status: resData.status
        };

        const { error } = await supabase.from('reservations').update(dbData).eq('id', id);

        if (!error) {
            await fetchData();
        } else {
            alert('Erro ao atualizar reserva: ' + error.message);
        }
        setIsLoading(false);
    };

    const handleDeleteReservation = async (id: number) => {
        setIsLoading(true);
        await supabase.from('reservations').delete().eq('id', id);
        await fetchData();
        setIsLoading(false);
    };

    const handleUpdateSuiteStatus = async (suiteId: number, newStatus: string) => {
        // Atualização Otimista (uda na tela antes do banco)
        setSuiteStatuses(prev => prev.map(s => s.id === suiteId ? { ...s, status: newStatus as any } : s));
        await supabase.from('suite_statuses').update({ status: newStatus }).eq('id', suiteId);
    };

    const handleAddContact = async (newContact: Contact) => {
        // Verifica duplicidade local para economizar request
        const exists = contacts.find(c => c.name === newContact.name || (newContact.phone && c.phone === newContact.phone));
        if (exists) return;

        await supabase.from('contacts').insert([{
            name: newContact.name, company: newContact.company, email: newContact.email, phone: newContact.phone,
            status: newContact.status, location: newContact.location, notes: newContact.notes
        }]);
        // Atualiza silenciosamente depois
        fetchData();
    };

    const handleDeleteContact = async (id: number) => {
        await supabase.from('contacts').delete().eq('id', id);
        setContacts(prev => prev.filter(c => c.id !== id));
    };

    const handleAddCost = async (newCost: Omit<Cost, 'id'>) => {
        setIsLoading(true);
        const { error } = await supabase.from('costs').insert([newCost]);
        if (!error) await fetchData();
        setIsLoading(false);
    };

    const handleDeleteCost = async (id: number) => {
        await supabase.from('costs').delete().eq('id', id);
        setCosts(prev => prev.filter(c => c.id !== id));
    };

    // Auth Simples Refatorado
    const handleLogin = (uInput: string, pInput: string) => {
        const u = uInput.trim(); // Remove espaços acidentais
        const p = pInput.trim();

        let role: UserRole = 'viewer';
        let isValid = false;
        let displayName = u;

        if (u === 'Larissa' && p === 'Knupp24') {
            isValid = true;
            role = 'editor';
        } else if (u === 'Dione' && p === '12345678') {
            isValid = true;
            role = 'viewer'; // Dione é leitora
        } else if (u === 'Admin' && p === 'admin') {
            isValid = true;
            role = 'editor';
        } else if (u === 'Mara' && p === '@me19591959') {
            isValid = true;
            role = 'editor';
        }

        if (isValid) {
            const userObj = { name: displayName, role };
            setCurrentUser(userObj);
            sessionStorage.setItem('hotel_user', JSON.stringify(userObj));
            return true;
        }
        return false;
    };

    const handleLogout = () => {
        setCurrentUser(null);
        sessionStorage.removeItem('hotel_user');
    };
    const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

    return {
        isDarkMode, toggleDarkMode, currentView, setCurrentView, isSidebarOpen, setIsSidebarOpen,
        reservations, suiteStatuses, costs, contacts, currentUser,
        handleAddReservation, handleUpdateReservation, handleDeleteReservation, handleUpdateSuiteStatus,
        handleAddContact, handleDeleteContact, handleAddCost, handleDeleteCost,
        handleLogin, handleLogout, isLoading
    };
};

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const logic = useAppLogic();
    return <AppContext.Provider value={logic}>{children}</AppContext.Provider>;
};

// ============================================================================
// 5. COMPONENTES VISUAIS
// ============================================================================

// --- KPIS ---
const KpiCard: React.FC<{ title: string, value: string | number, icon?: React.ReactNode, colorClass?: string, description?: string }> = ({ title, value, icon, colorClass = 'bg-blue-600', description }) => (
    <div className={`p-6 rounded-xl shadow-lg text-white flex flex-col justify-between min-h-[140px] ${colorClass}`}>
        <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg opacity-90">{title}</h3>
            <div className="text-2xl opacity-80">{icon}</div>
        </div>
        <div>
            <p className="text-3xl font-bold mt-2">{value}</p>
            {description && <p className="text-xs opacity-80 mt-1">{description}</p>}
        </div>
    </div>
);

// --- DASHBOARD ---
const DashboardPage: React.FC = () => {
    const { reservations } = useAppContext();
    const confirmed = reservations.filter(r => r.status === 'Confirmada');
    
    // Métricas Simples
    const totalRevenue = confirmed.reduce((sum, r) => sum + Number(r.totalRevenue), 0);
    const totalCommission = totalRevenue * 0.20; // 20%
    const totalPending = confirmed.reduce((sum, r) => sum + Number(r.amountPending), 0);
    const occupancy = confirmed.length > 0 ? (confirmed.reduce((sum, r) => sum + r.numberOfNights, 0) / (TOTAL_SUITES * 30)) * 100 : 0; 

    return (
        <div className="p-6 space-y-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Visão Geral</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KpiCard title="Receita Total" value={formatCurrency(totalRevenue)} icon={<DollarIcon />} colorClass="bg-blue-600" />
                <KpiCard title="Comissões (20%)" value={formatCurrency(totalCommission)} icon={<BanknotesIcon />} colorClass="bg-purple-600" description="A pagar para Agência" />
                <KpiCard title="A Receber" value={formatCurrency(totalPending)} icon={<DollarIcon />} colorClass="bg-orange-500" />
                <KpiCard title="Ocupação (Mês)" value={`${occupancy.toFixed(1)}%`} icon={<BedIcon />} colorClass="bg-teal-600" />
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                <h3 className="text-xl font-bold mb-4 dark:text-white">Últimas Reservas</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left dark:text-gray-300">
                        <thead className="bg-gray-100 dark:bg-gray-700 uppercase text-xs">
                            <tr><th className="px-4 py-3">Hóspede</th><th className="px-4 py-3">Check-in</th><th className="px-4 py-3">Valor</th><th className="px-4 py-3">Status</th></tr>
                        </thead>
                        <tbody>
                            {reservations.slice(0, 5).map(r => (
                                <tr key={r.id} className="border-b dark:border-gray-700">
                                    <td className="px-4 py-3 font-medium">{r.guestName}</td>
                                    <td className="px-4 py-3">{formatDate(r.checkIn)}</td>
                                    <td className="px-4 py-3">{formatCurrency(r.totalRevenue)}</td>
                                    <td className="px-4 py-3">{r.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

// --- RESERVAS ---
const ReservationsPage: React.FC = () => {
    const { reservations, handleDeleteReservation, currentUser } = useAppContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingReservation, setEditingReservation] = useState<Reservation | null>(null);
    const isEditor = currentUser?.role === 'editor';

    const handleOpenNew = () => {
        setEditingReservation(null);
        setIsModalOpen(true);
    };

    const handleOpenEdit = (res: Reservation) => {
        setEditingReservation(res);
        setIsModalOpen(true);
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Reservas</h2>
                {isEditor && (
                    <button onClick={handleOpenNew} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold shadow">+ Nova</button>
                )}
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left dark:text-gray-300">
                        <thead className="bg-gray-100 dark:bg-gray-700 uppercase text-xs text-gray-700 dark:text-gray-200">
                            <tr>
                                <th className="px-6 py-3">Hóspede</th>
                                <th className="px-6 py-3">Período</th>
                                <th className="px-6 py-3">Pessoas</th>
                                <th className="px-6 py-3">Receita</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservations.map(r => (
                                <tr key={r.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                    <td className="px-6 py-4">
                                        <div className="font-bold">{r.guestName}</div>
                                        <div className="text-xs opacity-75">{r.contact}</div>
                                    </td>
                                    <td className="px-6 py-4">{formatDate(r.checkIn)} - {formatDate(r.checkOut)}</td>
                                    <td className="px-6 py-4">{r.adults}A, {r.children}C</td>
                                    <td className="px-6 py-4 font-bold text-blue-600 dark:text-blue-400">{formatCurrency(r.totalRevenue)}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs rounded-full font-bold ${r.status === 'Cancelada' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>{r.status}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {isEditor ? (
                                            <div className="flex justify-end gap-2">
                                                <button onClick={() => handleOpenEdit(r)} className="text-blue-500 hover:bg-blue-50 p-2 rounded"><PencilSquareIcon /></button>
                                                <button onClick={() => { if(confirm('Apagar reserva permanentemente?')) handleDeleteReservation(r.id); }} className="text-red-500 hover:bg-red-50 p-2 rounded"><TrashIcon /></button>
                                            </div>
                                        ) : (
                                            <span className="text-gray-400"><EyeIcon /></span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <AddReservationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} reservationToEdit={editingReservation} />
        </div>
    );
};

const AddReservationModal: React.FC<{ isOpen: boolean; onClose: () => void; reservationToEdit: Reservation | null }> = ({ isOpen, onClose, reservationToEdit }) => {
    const { handleAddReservation, handleUpdateReservation, isLoading } = useAppContext();
    const [formData, setFormData] = useState<any>({
        guestName: '', contact: '', checkIn: '', checkOut: '', adults: 2, children: 0,
        totalRevenue: 0, amountPaid: 0, status: 'Confirmada', accommodation: 'Quarto Padrão',
        bookingChannel: 'WhatsApp', observations: '', extraBed: false, breakfast: true
    });

    useEffect(() => {
        if (isOpen) {
            if (reservationToEdit) {
                setFormData({
                    guestName: reservationToEdit.guestName,
                    contact: reservationToEdit.contact,
                    checkIn: reservationToEdit.checkIn,
                    checkOut: reservationToEdit.checkOut,
                    adults: reservationToEdit.adults,
                    children: reservationToEdit.children,
                    totalRevenue: reservationToEdit.totalRevenue,
                    amountPaid: reservationToEdit.amountPaid,
                    status: reservationToEdit.status,
                    accommodation: reservationToEdit.accommodation,
                    bookingChannel: reservationToEdit.bookingChannel,
                    observations: reservationToEdit.observations,
                    extraBed: reservationToEdit.extraBed,
                    breakfast: reservationToEdit.breakfast
                });
            } else {
                setFormData({
                    guestName: '', contact: '', checkIn: '', checkOut: '', adults: 2, children: 0,
                    totalRevenue: 0, amountPaid: 0, status: 'Confirmada', accommodation: 'Quarto Padrão',
                    bookingChannel: 'WhatsApp', observations: '', extraBed: false, breakfast: true
                });
            }
        }
    }, [isOpen, reservationToEdit]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const dataToSave = {
            ...formData,
            adults: Number(formData.adults), children: Number(formData.children),
            totalRevenue: Number(formData.totalRevenue), amountPaid: Number(formData.amountPaid)
        };

        if (reservationToEdit) {
            await handleUpdateReservation(reservationToEdit.id, dataToSave);
        } else {
            await handleAddReservation(dataToSave);
        }
        onClose();
    };

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center p-0 md:p-4">
            <div className="bg-white dark:bg-gray-800 w-full h-[95vh] md:h-auto md:max-h-[90vh] rounded-t-2xl md:rounded-xl shadow-2xl md:max-w-lg flex flex-col">
                <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
                    <h3 className="text-xl font-bold dark:text-white">{reservationToEdit ? 'Editar Reserva' : 'Nova Reserva'}</h3>
                    <button onClick={onClose} className="p-2"><CloseIcon/></button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6">
                    <form id="reservation-form" onSubmit={handleSubmit} className="space-y-4">
                        <div><label className="text-xs font-semibold">Hóspede</label><input name="guestName" value={formData.guestName} placeholder="Nome Completo" required className="w-full p-3 border rounded dark:bg-gray-700 dark:text-white" onChange={handleChange} /></div>
                        <div><label className="text-xs font-semibold">Contato</label><input name="contact" value={formData.contact} placeholder="Telefone / Email" className="w-full p-3 border rounded dark:bg-gray-700 dark:text-white" onChange={handleChange} /></div>
                        
                        <div className="grid grid-cols-2 gap-3">
                            <div><label className="text-xs font-semibold">Check-in</label><input type="date" name="checkIn" value={formData.checkIn} required className="w-full p-3 border rounded dark:bg-gray-700 dark:text-white" onChange={handleChange} /></div>
                            <div><label className="text-xs font-semibold">Check-out</label><input type="date" name="checkOut" value={formData.checkOut} required className="w-full p-3 border rounded dark:bg-gray-700 dark:text-white" onChange={handleChange} /></div>
                        </div>

                        <div>
                            <label className="text-xs font-semibold">Acomodação</label>
                            <select name="accommodation" value={formData.accommodation} onChange={handleChange} className="w-full p-3 border rounded dark:bg-gray-700 dark:text-white">
                                <option>Quarto Padrão</option>
                                <option>Suíte Casal</option>
                                <option>Suíte Família</option>
                                <option>HOTEL COMPLETO</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div><label className="text-xs font-semibold">Adultos</label><input type="number" name="adults" value={formData.adults} className="w-full p-3 border rounded dark:bg-gray-700 dark:text-white" onChange={handleChange} /></div>
                            <div><label className="text-xs font-semibold">Crianças</label><input type="number" name="children" value={formData.children} className="w-full p-3 border rounded dark:bg-gray-700 dark:text-white" onChange={handleChange} /></div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-xs font-semibold">Valor Total (R$)</label>
                                <input type="number" name="totalRevenue" value={formData.totalRevenue} step="0.01" required className="w-full p-3 border rounded dark:bg-gray-700 dark:text-white font-bold" onChange={handleChange} />
                            </div>
                            <div>
                                <label className="text-xs font-semibold">Valor Pago (R$)</label>
                                <input type="number" name="amountPaid" value={formData.amountPaid} step="0.01" className="w-full p-3 border rounded dark:bg-gray-700 dark:text-white" onChange={handleChange} />
                            </div>
                        </div>
                        {formData.totalRevenue > 0 && <p className="text-xs text-purple-600 font-bold text-right">Comissão (20%): {formatCurrency(formData.totalRevenue * 0.2)}</p>}

                        <div className="grid grid-cols-2 gap-3">
                             <div>
                                <label className="text-xs font-semibold">Canal</label>
                                <input name="bookingChannel" placeholder="Ex: WhatsApp" value={formData.bookingChannel} className="w-full p-3 border rounded dark:bg-gray-700 dark:text-white" onChange={handleChange} />
                            </div>
                            <div>
                                <label className="text-xs font-semibold">Status</label>
                                <select name="status" value={formData.status} onChange={handleChange} className="w-full p-3 border rounded dark:bg-gray-700 dark:text-white">
                                    <option>Confirmada</option>
                                    <option>Pendente</option>
                                    <option>Cancelada</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-semibold">Observações</label>
                            <textarea name="observations" value={formData.observations} rows={2} className="w-full p-3 border rounded dark:bg-gray-700 dark:text-white" onChange={handleChange}></textarea>
                        </div>
                    </form>
                </div>

                <div className="p-4 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex justify-end gap-3 pb-8 md:pb-4 safe-area-pb">
                    <button type="button" onClick={onClose} className="px-4 py-3 bg-gray-200 rounded-lg text-black font-medium">Cancelar</button>
                    <button type="submit" form="reservation-form" disabled={isLoading} className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold shadow-lg w-full md:w-auto">{isLoading ? 'Salvando...' : 'Confirmar'}</button>
                </div>
            </div>
        </div>
    );
};

// --- FINANCEIRO ---
const FinancialPage: React.FC = () => {
    const { costs, handleAddCost, handleDeleteCost, currentUser } = useAppContext();
    const [newCost, setNewCost] = useState<any>({ description: '', amount: 0, category: 'Outros', date: new Date().toISOString().split('T')[0] });
    const isEditor = currentUser?.role === 'editor';

    return (
        <div className="p-6 space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Financeiro</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {isEditor && (
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow h-fit">
                        <h3 className="font-bold mb-4 dark:text-white">Lançar Despesa</h3>
                        <form onSubmit={(e) => { e.preventDefault(); handleAddCost(newCost); }} className="space-y-3">
                            <input placeholder="Descrição" required className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" onChange={e => setNewCost({ ...newCost, description: e.target.value })} />
                            <input type="number" placeholder="Valor" required className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" onChange={e => setNewCost({ ...newCost, amount: Number(e.target.value) })} />
                            <input type="date" value={newCost.date} required className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" onChange={e => setNewCost({ ...newCost, date: e.target.value })} />
                            <button type="submit" className="w-full bg-red-600 text-white p-2 rounded font-bold hover:bg-red-700">Adicionar Saída</button>
                        </form>
                    </div>
                )}
                <div className={`${isEditor ? 'lg:col-span-2' : 'lg:col-span-3'} bg-white dark:bg-gray-800 p-6 rounded-xl shadow overflow-hidden`}>
                    <table className="w-full text-sm dark:text-gray-300">
                        <thead className="bg-gray-100 dark:bg-gray-700 text-xs uppercase"><tr><th className="p-3 text-left">Data</th><th className="p-3 text-left">Desc.</th><th className="p-3 text-left">Valor</th><th className="p-3"></th></tr></thead>
                        <tbody>
                            {costs.map(c => (
                                <tr key={c.id} className="border-b dark:border-gray-700">
                                    <td className="p-3">{formatDate(c.date)}</td>
                                    <td className="p-3">{c.description}</td>
                                    <td className="p-3 text-red-600 font-bold">{formatCurrency(c.amount)}</td>
                                    <td className="p-3 text-right">
                                        {isEditor && <button onClick={() => handleDeleteCost(c.id)} className="text-gray-400 hover:text-red-500"><TrashIcon /></button>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

// --- GOVERNANÇA ---
const HousekeepingPage: React.FC = () => {
    const { suiteStatuses, handleUpdateSuiteStatus, currentUser } = useAppContext();
    const colors = { clean: 'bg-green-100 border-green-300', dirty: 'bg-red-100 border-red-300', occupied: 'bg-blue-100 border-blue-300', maintenance: 'bg-orange-100 border-orange-300' };
    const isEditor = currentUser?.role === 'editor';

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Governança</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {suiteStatuses.map(suite => (
                    <div key={suite.id} className={`p-4 border-2 rounded-xl flex flex-col justify-between h-32 ${colors[suite.status as keyof typeof colors]}`}>
                        <span className="font-bold text-lg dark:text-gray-800">{suite.name}</span>
                        <select 
                            value={suite.status} 
                            disabled={!isEditor}
                            onChange={(e) => handleUpdateSuiteStatus(suite.id, e.target.value)}
                            className="text-xs p-1 rounded border-gray-300 font-semibold disabled:opacity-50"
                        >
                            <option value="clean">Limpo</option>
                            <option value="dirty">Sujo</option>
                            <option value="occupied">Ocupado</option>
                            <option value="maintenance">Manutenção</option>
                        </select>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- CONTATOS ---
const ContactsPage: React.FC = () => {
    const { contacts, handleDeleteContact, currentUser } = useAppContext();
    const isEditor = currentUser?.role === 'editor';

    return (
        <div className="p-6">
             <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Contatos</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {contacts.map(c => (
                    <div key={c.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow border dark:border-gray-700">
                        <div className="flex justify-between">
                            <h4 className="font-bold dark:text-white">{c.name}</h4>
                            {isEditor && <button onClick={() => { if(confirm('Apagar contato?')) handleDeleteContact(c.id); }} className="text-gray-400 hover:text-red-500"><TrashIcon /></button>}
                        </div>
                        <p className="text-sm text-gray-500">{c.phone}</p>
                        <p className="text-xs mt-2 bg-gray-100 dark:bg-gray-700 p-2 rounded">{c.notes || 'Sem observações'}</p>
                    </div>
                ))}
             </div>
        </div>
    );
};

// --- SETTINGS (Vazio pois agora é automático) ---
const SettingsPage: React.FC = () => (
    <div className="p-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Configurações</h2>
        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
            <p className="text-green-600 font-bold flex items-center gap-2"><CloudIcon/> Sistema Conectado ao Banco de Dados (Supabase)</p>
            <p className="text-sm text-gray-500 mt-2">Seus dados estão sendo salvos automaticamente na nuvem. Larissa e Dione estão sincronizadas.</p>
        </div>
    </div>
);

// --- LOGIN ---
const LoginPage: React.FC = () => {
    const { handleLogin, isDarkMode, toggleDarkMode } = useAppContext();
    const [u, setU] = useState('');
    const [p, setP] = useState('');
    const [err, setErr] = useState('');

    return (
        <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
            <div className="absolute top-4 right-4"><button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">{isDarkMode ? <SunIcon /> : <MoonIcon />}</button></div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-sm">
                <div className="text-center mb-6">
                    <div className="mx-auto w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white mb-2"><BuildingIcon /></div>
                    <h1 className="text-2xl font-bold">Hotel Palace</h1>
                    <p className="text-sm opacity-70">Serra Verde Imperial</p>
                </div>
                <form onSubmit={(e) => { e.preventDefault(); if(!handleLogin(u,p)) setErr('Acesso negado'); }} className="space-y-4">
                    <input autoFocus placeholder="Usuário" className="w-full p-3 border rounded dark:bg-gray-700 dark:border-gray-600" value={u} onChange={e => setU(e.target.value)} />
                    <input type="password" placeholder="Senha" className="w-full p-3 border rounded dark:bg-gray-700 dark:border-gray-600" value={p} onChange={e => setP(e.target.value)} />
                    {err && <p className="text-red-500 text-center text-sm font-bold">{err}</p>}
                    <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition">Entrar</button>
                </form>
            </div>
        </div>
    );
};

// --- APP LAYOUT ---
const MainLayout: React.FC = () => {
    const { currentView, setCurrentView, isDarkMode, toggleDarkMode, currentUser, handleLogout, isLoading } = useAppContext();
    const isEditor = currentUser?.role === 'editor';
    
    const MenuBtn: React.FC<{ view: View, label: string, icon: any }> = ({ view, label, icon }) => (
        <button 
            onClick={() => setCurrentView(view)} 
            className={`flex items-center gap-3 p-3 rounded-lg w-full transition ${currentView === view ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
        >
            {icon} <span className="font-medium">{label}</span>
        </button>
    );

    return (
        <div className={`min-h-screen flex ${isDarkMode ? 'dark bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-gray-800 shadow-xl flex flex-col z-10 hidden md:flex">
                <div className="p-6 border-b dark:border-gray-700">
                    <h1 className="text-xl font-bold flex items-center gap-2"><BuildingIcon /> Hotel Palace</h1>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <MenuBtn view="dashboard" label="Visão Geral" icon={<HomeIcon />} />
                    <MenuBtn view="reservations" label="Reservas" icon={<CalendarIcon />} />
                    <MenuBtn view="financial" label="Financeiro" icon={<BanknotesIcon />} />
                    <MenuBtn view="contacts" label="Contatos" icon={<UsersIcon />} />
                    <MenuBtn view="governance" label="Governança" icon={<BroomIcon />} />
                    <MenuBtn view="settings" label="Configurações" icon={<Cog6ToothIcon />} />
                </nav>
                <div className="p-4 border-t dark:border-gray-700">
                    <div className="mb-4 text-sm opacity-70">
                        Olá, <strong>{currentUser?.name}</strong>
                        {!isEditor && <span className="block text-xs bg-yellow-100 text-yellow-800 px-1 rounded w-fit mt-1">Modo Leitor</span>}
                    </div>
                    <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 hover:text-red-600 font-bold text-sm"><ArrowLeftOnRectangleIcon /> Sair</button>
                </div>
            </aside>
            
            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                {isLoading && <div className="fixed top-0 left-0 right-0 h-1 bg-blue-600 animate-pulse z-50"></div>}
                
                {/* Mobile Header */}
                <div className="md:hidden p-4 bg-white dark:bg-gray-800 shadow flex justify-between items-center">
                    <span className="font-bold flex items-center gap-2"><BuildingIcon/> Hotel Palace</span>
                    <div className="flex items-center gap-2">
                        {!isEditor && <span className="text-xs bg-yellow-100 text-yellow-800 px-1 rounded">Leitor</span>}
                        <button onClick={() => setCurrentView(currentView === 'dashboard' ? 'settings' : 'dashboard')}><Bars3Icon /></button>
                        <button onClick={handleLogout} className="text-red-500"><ArrowLeftOnRectangleIcon/></button>
                    </div>
                </div>

                {currentView === 'dashboard' && <DashboardPage />}
                {currentView === 'reservations' && <ReservationsPage />}
                {currentView === 'financial' && <FinancialPage />}
                {currentView === 'contacts' && <ContactsPage />}
                {currentView === 'governance' && <HousekeepingPage />}
                {currentView === 'settings' && <SettingsPage />}
            </main>
        </div>
    );
};

const App: React.FC = () => {
    const { currentUser } = useAppContext();
    if (!currentUser) return <LoginPage />;
    return <MainLayout />;
};

// ============================================================================
// 10. RENDERIZAÇÃO (App Render)
// ============================================================================
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <AppProvider>
        <App />
      </AppProvider>
    </React.StrictMode>
  );
} else {
  console.error("Elemento root não encontrado no DOM.");
}
